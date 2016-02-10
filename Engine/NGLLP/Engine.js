System.register(['Engine', '../src/Resource/ResourceCtl'], function(exports_1) {
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (Engine_1_1) {
                exportStar_1(Engine_1_1);
            },
            function (_1) {}],
        execute: function() {
        }
    }
});
//# sourceMappingURL=Engine.js.map