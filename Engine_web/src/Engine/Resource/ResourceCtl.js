var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by yjh on 15/12/19.
 */
///<reference path='ResourceItem.ts'/>
var Resource;
(function (Resource) {
    var ResourceCtl = (function (_super) {
        __extends(ResourceCtl, _super);
        function ResourceCtl() {
            _super.apply(this, arguments);
            this.resultDic = {};
        }
        ResourceCtl.prototype.loadResources = function (list, callBack, failCallBack, progressCallBack) {
            failCallBack = failCallBack || function () { };
            progressCallBack = progressCallBack || function () { };
            var jobCount = 0;
            var runningJobCount = 0;
            var progress = [];
            for (var i = 0; i < list.length; i++) {
                var job = list[i];
                var name = job['name'];
                var url = job['url'];
                var cache = job['cache'];
                var standAlone = job['standAloneTexture'] || false;
                //todo implement filesystem api cache in chrome
                var newJob = function (name, url, cache, standAlone) {
                    if (/.+\.(jpg|png|jpeg)$/.test(url.toLowerCase())) {
                        jobCount++;
                        runningJobCount++;
                        progress[i] = 0;
                        var index = i;
                        var img = document.createElement('img');
                        img.onload = function () {
                            this.resultDic[name] = new Resource.ImageItem(img, this, name);
                            this.resultDic[name].prepare(standAlone);
                            runningJobCount--;
                            progress[index] = 1;
                            var p = 0;
                            for (var j = 0; j < jobCount; j++) {
                                p += progress[j];
                            }
                            progressCallBack(p / jobCount);
                            if (runningJobCount == 0) {
                                callBack();
                            }
                        }.bind(this);
                        img.onerror = function (e) {
                            failCallBack(e.toString());
                        };
                        img.src = url;
                    }
                    else if (/.+\.(mp3|m4a)$/.test(url.toLowerCase())) {
                        jobCount++;
                        runningJobCount++;
                        progress[i] = 0;
                        var index = i;
                        var x = new XMLHttpRequest();
                        x.open('GET', url, true);
                        x.responseType = 'arraybuffer';
                        x.onload = function () {
                            Engine.audioCtl.ctx.decodeAudioData(x.response, function (buffer) {
                                this.resultDic[name] = new Resource.AudioItem(buffer, this, name);
                                runningJobCount--;
                                progress[index] = 1;
                                progressCallBack(progress);
                                if (runningJobCount == 0) {
                                    callBack();
                                }
                            }.bind(this), function () {
                                'AudioFile Decode Error: Resource name' + name;
                            });
                        }.bind(this);
                        x.onprogress = function (x) {
                            progress[index] = x.loaded / x.total;
                            var p = 0;
                            for (var j = 0; j < jobCount; j++) {
                                p += progress[j];
                            }
                            progressCallBack(p / jobCount);
                        };
                        x.send();
                    }
                }.bind(this);
                newJob(name, url, cache, standAlone);
            }
        };
        ResourceCtl.prototype.getItem = function (name) {
            return this.resultDic[name];
        };
        ResourceCtl.prototype.destroyItem = function (item) {
            delete this.resultDic[item.name];
        };
        return ResourceCtl;
    })(Base.EventBase);
    Resource.ResourceCtl = ResourceCtl;
})(Resource || (Resource = {}));
