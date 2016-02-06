/**
 * Created by yjh on 15/12/15.
 */
///<reference path='Base.ts'/>
///<reference path='Resource/ResourceCtl.ts'/>
///<reference path='Core/AudioCtl.ts'/>
///<reference path='Core/Render.ts'/>
///<reference path='Events/TouchCtl.ts'/>
///<reference path='Core2D/Sprite.ts'/>
///<reference path='Core2D/SpriteBatchNode.ts'/>
///<reference path='Core2D/TextSprite.ts'/>
///<reference path='Util/Util.ts'/>
var Engine;
(function (Engine) {
    Engine.settings = {
        container: null,
        pixelRatio: 1
    };
    function setEngine(container, pixelRatio) {
        if (pixelRatio === void 0) { pixelRatio = window.devicePixelRatio; }
        Engine.settings.container = container;
        Engine.settings.pixelRatio = pixelRatio;
        Engine.audioCtl = new Core.AudioCtl();
        Engine.resourceCtl = new Resource.ResourceCtl();
        Engine.render = new Core.Render();
        Engine.touchCtl = new Events.TouchCtl();
    }
    Engine.setEngine = setEngine;
    function loadScript(src) {
        var scriptNode = document.createElement('script');
        document.body.appendChild(scriptNode);
        scriptNode.src = src;
    }
    Engine.loadScript = loadScript;
    Engine.eventBus = new Base.EventBase();
})(Engine || (Engine = {}));
//# sourceMappingURL=Engine.js.map