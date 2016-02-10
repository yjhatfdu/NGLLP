System.register(['Events/TouchCtl', 'Events/TouchItem'], function(exports_1) {
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (TouchCtl_1_1) {
                exportStar_1(TouchCtl_1_1);
            },
            function (TouchItem_1_1) {
                exportStar_1(TouchItem_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=Events.js.map