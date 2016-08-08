System.register(['Core/Object3D', 'Core/Render', 'Core/AudioCtl', 'Core/GlProgram', 'Core/Material', 'Core/GlTexture'], function(exports_1, context_1) {
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
            function (Object3D_1_1) {
                exportStar_1(Object3D_1_1);
            },
            function (Render_1_1) {
                exportStar_1(Render_1_1);
            },
            function (AudioCtl_1_1) {
                exportStar_1(AudioCtl_1_1);
            },
            function (GlProgram_1_1) {
                exportStar_1(GlProgram_1_1);
            },
            function (Material_1_1) {
                exportStar_1(Material_1_1);
            },
            function (GlTexture_1_1) {
                exportStar_1(GlTexture_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=Core.js.map