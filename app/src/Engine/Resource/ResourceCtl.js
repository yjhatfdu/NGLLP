System.register(['../Base', '../Engine', './ResourceItem', '../Network/Request'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Base, Engine, ResourceItem_1, Request_1;
    var ResourceCtl;
    return {
        setters:[
            function (Base_1) {
                Base = Base_1;
            },
            function (Engine_1) {
                Engine = Engine_1;
            },
            function (ResourceItem_1_1) {
                ResourceItem_1 = ResourceItem_1_1;
            },
            function (Request_1_1) {
                Request_1 = Request_1_1;
            }],
        execute: function() {
            ResourceCtl = (function (_super) {
                __extends(ResourceCtl, _super);
                function ResourceCtl() {
                    _super.apply(this, arguments);
                    this.resultDic = {};
                }
                ResourceCtl.prototype.loadResources = function (list, progressCallBack) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        return _this.loadResources_raw(list, resolve, reject, progressCallBack);
                    });
                };
                ResourceCtl.prototype.loadResources_raw = function (list, callBack, failCallBack, progressCallBack) {
                    failCallBack = failCallBack || function () {
                    };
                    progressCallBack = progressCallBack || function () {
                    };
                    var jobCount = 0;
                    var runningJobCount = 0;
                    var progress = [];
                    for (var i = 0; i < list.length; i++) {
                        var job = list[i];
                        var name_1 = job['name'];
                        var url = job['url'];
                        var cache = job['cache'];
                        var standAlone = job['standAloneTexture'] || false;
                        //todo implement filesystem api cache in chrome
                        var newJob = function (name, url, cache, standAlone) {
                            var _this = this;
                            if (/.+\.(jpg|png|jpeg)$/.test(url.toLowerCase())) {
                                jobCount++;
                                runningJobCount++;
                                progress[i] = 0;
                                var index_1 = i;
                                var img_1 = document.createElement('img');
                                img_1.onload = function () {
                                    this.resultDic[name] = new ResourceItem_1.ImageItem(img_1, this, name);
                                    this.resultDic[name].prepare(standAlone);
                                    runningJobCount--;
                                    progress[index_1] = 1;
                                    var p = 0;
                                    for (var j = 0; j < jobCount; j++) {
                                        p += progress[j];
                                    }
                                    progressCallBack(p / jobCount);
                                    if (runningJobCount == 0) {
                                        callBack(this);
                                    }
                                }.bind(this);
                                img_1.onerror = function (e) {
                                    failCallBack(e.toString());
                                };
                                img_1.src = url;
                            }
                            else if (/.+\.(mp3|m4a)$/.test(url.toLowerCase())) {
                                jobCount++;
                                runningJobCount++;
                                progress[i] = 0;
                                var index_2 = i;
                                var x_1 = new XMLHttpRequest();
                                x_1.open('GET', url, true);
                                x_1.responseType = 'arraybuffer';
                                x_1.onload = function () {
                                    if (x_1.status >= 400) {
                                        failCallBack(x_1.statusText);
                                    }
                                    Engine.audioCtl.ctx.decodeAudioData(x_1.response, function (buffer) {
                                        this.resultDic[name] = new ResourceItem_1.AudioItem(buffer, this, name);
                                        runningJobCount--;
                                        progress[index_2] = 1;
                                        progressCallBack(progress);
                                        if (runningJobCount == 0) {
                                            callBack();
                                        }
                                    }.bind(this), function () {
                                        failCallBack('AudioFile Decode Error: Resource name' + name);
                                    });
                                }.bind(this);
                                x_1.onprogress = function (x) {
                                    progress[index_2] = x.loaded / x.total;
                                    var p = 0;
                                    for (var j = 0; j < jobCount; j++) {
                                        p += progress[j];
                                    }
                                    progressCallBack(p / jobCount);
                                };
                                x_1.onerror = function () {
                                    failCallBack(x_1.statusText);
                                };
                                x_1.send();
                            }
                            else {
                                jobCount++;
                                runningJobCount++;
                                progress[i] = 0;
                                var index_3 = i;
                                Request_1.GET(url, null, null, function (x) {
                                }).then(function (resp) {
                                    _this.resultDic[name] = new ResourceItem_1.TextItem(resp, _this, name);
                                    runningJobCount--;
                                    progress[index_3] = 1;
                                    progressCallBack(progress);
                                    if (runningJobCount == 0) {
                                        callBack();
                                    }
                                }).catch(function (err) {
                                    failCallBack(err);
                                });
                            }
                        }.bind(this);
                        newJob(name_1, url, cache, standAlone);
                    }
                };
                ResourceCtl.prototype.getItem = function (name) {
                    return this.resultDic[name];
                };
                ResourceCtl.prototype.destroyItem = function (item) {
                    delete this.resultDic[item.name];
                };
                return ResourceCtl;
            }(Base.EventBase));
            exports_1("ResourceCtl", ResourceCtl);
        }
    }
});
//# sourceMappingURL=ResourceCtl.js.map