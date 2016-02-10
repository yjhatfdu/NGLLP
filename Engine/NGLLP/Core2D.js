System.register(['Core2D/Sprite', 'Core2D/SpriteBatchNode'], function(exports_1) {
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (Sprite_1_1) {
                exportStar_1(Sprite_1_1);
            },
            function (SpriteBatchNode_1_1) {
                exportStar_1(SpriteBatchNode_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=Core2D.js.map