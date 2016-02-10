System.register(['Core/AudioCtl', 'Core/Object3D', 'Core/Render'], function(exports_1) {
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (AudioCtl_1_1) {
                exportStar_1(AudioCtl_1_1);
            },
            function (Object3D_1_1) {
                exportStar_1(Object3D_1_1);
            },
            function (Render_1_1) {
                exportStar_1(Render_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=Core.js.map