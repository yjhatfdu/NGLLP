/**
 * Created by yjh on 15/12/15.
 */
System.register(['./Base', './Core/Render', './Events/TouchCtl', './Resource/ResourceCtl', './Core/AudioCtl'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Base, Render_1, TouchCtl_1, ResourceCtl_1, AudioCtl_1;
    var settings, audioCtl, resourceCtl, render, touchCtl, eventBus;
    function setEngine(container, pixelRatio) {
        if (pixelRatio === void 0) { pixelRatio = window.devicePixelRatio; }
        settings.container = container;
        settings.pixelRatio = pixelRatio;
        exports_1("audioCtl", audioCtl = new AudioCtl_1.AudioCtl());
        exports_1("resourceCtl", resourceCtl = new ResourceCtl_1.ResourceCtl());
        exports_1("render", render = new Render_1.Render());
        exports_1("touchCtl", touchCtl = new TouchCtl_1.TouchCtl());
    }
    exports_1("setEngine", setEngine);
    function loadScript(src) {
        var scriptNode = document.createElement('script');
        document.body.appendChild(scriptNode);
        scriptNode.src = src;
    }
    exports_1("loadScript", loadScript);
    return {
        setters:[
            function (Base_1) {
                Base = Base_1;
            },
            function (Render_1_1) {
                Render_1 = Render_1_1;
            },
            function (TouchCtl_1_1) {
                TouchCtl_1 = TouchCtl_1_1;
            },
            function (ResourceCtl_1_1) {
                ResourceCtl_1 = ResourceCtl_1_1;
            },
            function (AudioCtl_1_1) {
                AudioCtl_1 = AudioCtl_1_1;
            }],
        execute: function() {
            exports_1("settings", settings = {
                container: null,
                pixelRatio: 1
            });
            exports_1("eventBus", eventBus = new Base.EventBase());
        }
    }
});
//# sourceMappingURL=Engine.js.map