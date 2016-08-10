/**
 * Created by yjh on 15/12/19.
 */
///<reference path='ResourceItem.ts'/>
import * as Base from '../Base'
import * as Engine from '../Engine'
import {ResourceItem, AudioItem, ImageItem,TextItem} from './ResourceItem'
import {GET} from '../Network/Request'

export class ResourceCtl extends Base.EventBase {
    resultDic = {};

    loadResources(list: Array<any>, progressCallBack?) {
        return new Promise((resolve, reject) =>
            this.loadResources_raw(list, resolve, reject, progressCallBack)
        )
    }

    private loadResources_raw(list: Array<any>, callBack, failCallBack?, progressCallBack?) {
        failCallBack = failCallBack || function () {
            };
        progressCallBack = progressCallBack || function () {
            };
        let jobCount = 0;
        let runningJobCount = 0;
        let progress = [];
        for (var i = 0; i < list.length; i++) {
            let job = list[i];
            let name = job['name'];
            let url = job['url'];
            let cache = job['cache'];
            let standAlone = job['standAloneTexture'] || false;

            //todo implement filesystem api cache in chrome

            let newJob = function (name, url, cache, standAlone) {
                if (/.+\.(jpg|png|jpeg)$/.test(url.toLowerCase())) {
                    jobCount++;
                    runningJobCount++;
                    progress[i] = 0;
                    let index = i;
                    let img = document.createElement('img');
                    img.onload = function () {
                        this.resultDic[name] = new ImageItem(img, this, name);
                        this.resultDic[name].prepare(standAlone);
                        runningJobCount--;
                        progress[index] = 1;
                        var p = 0;
                        for (var j = 0; j < jobCount; j++) {
                            p += progress[j]
                        }
                        progressCallBack(p / jobCount);
                        if (runningJobCount == 0) {
                            callBack(this)
                        }
                    }.bind(this);
                    img.onerror = function (e) {
                        failCallBack(e.toString())
                    };
                    img.src = url
                } else if (/.+\.(mp3|m4a)$/.test(url.toLowerCase())) {
                    jobCount++;
                    runningJobCount++;
                    progress[i] = 0;
                    let index = i;
                    let x = new XMLHttpRequest();
                    x.open('GET', url, true);
                    x.responseType = 'arraybuffer';
                    x.onload = function () {
                        if (x.status >= 400) {
                            failCallBack(x.statusText)
                        }
                        Engine.audioCtl.ctx.decodeAudioData(
                            x.response,
                            function (buffer) {
                                this.resultDic[name] = new AudioItem(buffer, this, name);
                                runningJobCount--;
                                progress[index] = 1;
                                progressCallBack(progress);
                                if (runningJobCount == 0) {
                                    callBack()
                                }
                            }.bind(this), function () {
                                failCallBack('AudioFile Decode Error: Resource name' + name)
                            })
                    }.bind(this);
                    x.onprogress = function (x) {
                        progress[index] = x.loaded / x.total;
                        let p = 0;
                        for (let j = 0; j < jobCount; j++) {
                            p += progress[j]
                        }
                        progressCallBack(p / jobCount);
                    };
                    x.onerror = function () {
                        failCallBack(x.statusText)
                    };
                    x.send()
                } else{
                    jobCount++;
                    runningJobCount++;
                    progress[i] = 0;
                    let index = i;
                    GET(url,null,null,x=>{

                    }).then(resp=>{
                        this.resultDic[name]=new TextItem(resp,this,name);
                        runningJobCount--;
                        progress[index] = 1;
                        progressCallBack(progress);
                        if (runningJobCount == 0) {
                            callBack()
                        }

                    }).catch(err=>{
                        failCallBack(err)
                    })
                }
            }.bind(this);

            newJob(name, url, cache, standAlone)

        }
    }

    getItem(name) {
        return this.resultDic[name]
    }

    destroyItem(item: ResourceItem) {
        delete this.resultDic[item.name]
    }
}