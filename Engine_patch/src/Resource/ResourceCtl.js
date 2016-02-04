///<reference path='../lib/Promise.d.ts'/>
Resource.ResourceCtl.prototype.loadResources = function (list, progressCallBack) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        return _this.loadResources_raw(list, resolve, reject, progressCallBack);
    });
};
//# sourceMappingURL=ResourceCtl.js.map