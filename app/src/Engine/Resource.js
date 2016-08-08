System.register(['Resource/ResourceCtl', 'Rsource/ResourceItem'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (ResourceCtl_1_1) {
                exportStar_1(ResourceCtl_1_1);
            },
            function (ResourceItem_1_1) {
                exportStar_1(ResourceItem_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=Resource.js.map