System.register(['./Base', './Core/Render', './Events/TouchCtl', './Resource/ResourceCtl', './Core/AudioCtl'], function(exports_1) {
    var Base, Render_1, TouchCtl_1, ResourceCtl_1, AudioCtl_1;
    var Engine;
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
            (function (Engine) {
                Engine.settings = {
                    container: null,
                    pixelRatio: 1
                };
                function setEngine(container, pixelRatio) {
                    if (pixelRatio === void 0) { pixelRatio = window.devicePixelRatio; }
                    Engine.settings.container = container;
                    Engine.settings.pixelRatio = pixelRatio;
                    Engine.audioCtl = new AudioCtl_1.AudioCtl();
                    Engine.resourceCtl = new ResourceCtl_1.ResourceCtl();
                    Engine.render = new Render_1.Render();
                    Engine.touchCtl = new TouchCtl_1.TouchCtl();
                }
                Engine.setEngine = setEngine;
                function loadScript(src) {
                    var scriptNode = document.createElement('script');
                    document.body.appendChild(scriptNode);
                    scriptNode.src = src;
                }
                Engine.loadScript = loadScript;
                Engine.eventBus = new Base.EventBase();
            })(Engine = Engine || (Engine = {}));
            exports_1("Engine", Engine);
        }
    }
});
//# sourceMappingURL=Engine.js.map