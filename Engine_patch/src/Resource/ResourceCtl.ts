/**
 * Created by yjh on 16/2/4.
 */
///<reference path='../../lib/Promise.d.ts'/>
//promise patch
declare var Resource;
Resource.ResourceCtl.prototype.loadResources=function(list:Array<any>,progressCallBack?){
    return new Promise((resolve,reject) =>
        this.loadResources_raw(list,resolve,reject,progressCallBack)
    )
};