/**
 * Created by yjh on 16/2/4.
 */
///<reference path='../../lib/Promise.d.ts'/>
///<reference path='../../Native API.d.ts'/>
System.register(['Resource'], function(exports_1) {
    var Resource_1;
    return {
        setters:[
            function (Resource_1_1) {
                Resource_1 = Resource_1_1;
            }],
        execute: function() {
            Resource_1.ResourceCtl.prototype['loadResources'] = function (list, progressCallBack) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    return _this.loadResources_raw(list, resolve, reject, progressCallBack);
                });
            };
        }
    }
});
//# sourceMappingURL=ResourceCtl.js.map