/**
 * Created by yjh on 16/2/4.
 */
///<reference path='../../lib/Promise.d.ts'/>
///<reference path='../../Native API.d.ts'/>
System.register(['Resource/ResourceCtl'], function(exports_1) {
    var ResourceCtl_1;
    return {
        setters:[
            function (ResourceCtl_1_1) {
                ResourceCtl_1 = ResourceCtl_1_1;
            }],
        execute: function() {
            ResourceCtl_1.ResourceCtl.prototype['loadResources'] = function (list, progressCallBack) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    return _this.loadResources_raw(list, resolve, reject, progressCallBack);
                });
            };
        }
    }
});
//# sourceMappingURL=ResourceCtl.js.map