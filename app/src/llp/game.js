System.register(['../Engine/Engine', '../Engine/Core2D/SpriteBatchNode', '../Engine/Core2D/Sprite', './loader', './loading', '../Engine/Animation/Tween', '../Engine/Animation/easing', "../Engine/Core2D/TextSprite"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Engine, SpriteBatchNode_1, Sprite_1, loader_1, loading, Tween_1, easing_1, TextSprite_1;
    var bgScale;
    return {
        setters:[
            function (Engine_1) {
                Engine = Engine_1;
            },
            function (SpriteBatchNode_1_1) {
                SpriteBatchNode_1 = SpriteBatchNode_1_1;
            },
            function (Sprite_1_1) {
                Sprite_1 = Sprite_1_1;
            },
            function (loader_1_1) {
                loader_1 = loader_1_1;
            },
            function (loading_1) {
                loading = loading_1;
            },
            function (Tween_1_1) {
                Tween_1 = Tween_1_1;
            },
            function (easing_1_1) {
                easing_1 = easing_1_1;
            },
            function (TextSprite_1_1) {
                TextSprite_1 = TextSprite_1_1;
            }],
        execute: function() {
            exports_1("bgScale", bgScale = 1);
            Engine.setEngine(document.body);
            loading.start();
            loader_1.load('52cRm0eIXbvuNoi9')
                .then(function (liveinfo) {
                return Engine.resourceCtl.loadResources([
                    { 'name': 'bg', 'url': liveinfo.bgimg, standAloneTexture: true },
                    { 'name': 'perfect', 'url': liveinfo.perfect },
                    { 'name': 'great', 'url': liveinfo.great },
                    { 'name': 'good', 'url': liveinfo.good },
                    { 'name': 'digits', 'url': liveinfo.digits },
                    { 'name': 'uiAssets', 'url': liveinfo.uiAssets },
                    { 'name': 'bgm', 'url': liveinfo.bgm },
                    { 'name': 'map', 'url': liveinfo.map },
                    { 'name': 'coverImg', 'url': liveinfo.coverImg, standAloneTexture: true },
                ], function (p) { return loading.progress(p); });
            })
                .then(function () { return loading.stop(); })
                .then(function () {
                var bgLayer = new SpriteBatchNode_1.SpriteBatchNode();
                var perfect = Engine.resourceCtl.getItem('perfect');
                var bg = Engine.resourceCtl.getItem('bg');
                var bgObject = new Sprite_1.Sprite(bg, 0, 0, bg.width / bg.height * 2, 2);
                function resizeBg() {
                    if (Engine.render.aspect > bg.height / bg.width) {
                        exports_1("bgScale", bgScale = Engine.render.aspect * bg.width / bg.height);
                    }
                    else {
                        exports_1("bgScale", bgScale = 1);
                    }
                    bgObject.w = bg.width / bg.height * 2 / bgScale;
                    bgObject.h = 2 / bgScale;
                }
                Engine.render.addEventListener('resize', resizeBg);
                resizeBg();
                bgLayer.appendChild(bgObject);
                Engine.audioCtl.loadBgm(Engine.resourceCtl.getItem('bgm'));
                var cover = Engine.resourceCtl.getItem('coverImg');
                var coverSprite = new Sprite_1.Sprite(cover, 0, 0.3, cover.width / cover.height, 1);
                var clickToStart = new TextSprite_1.TextSprite(400, 100, 'Touch To Start', 40);
                clickToStart.y = -0.4;
                bgLayer.appendChild(coverSprite);
                bgLayer.appendChild(clickToStart);
                Engine.render.appendChild(bgLayer);
                bgObject.opacity = .1;
                bgObject.addOneTimeListener('touchend', function () {
                    bgLayer.removeChild(coverSprite);
                    Engine.audioCtl.play(1);
                    Tween_1.Tween(clickToStart, 'opacity').translateTo(0, 200);
                    Tween_1.Tween(clickToStart, 'scale').translateTo(2, 300).easing(easing_1.Easing.easeInQuad).then(function () { return bgLayer.removeChild(clickToStart); });
                    Tween_1.Tween(bgObject, 'opacity').translateTo(1, 1000);
                    bgObject.addEventListener('touchstart', function () {
                        Engine.audioCtl.playAudioItem(perfect);
                    });
                });
            });
        }
    }
});
//# sourceMappingURL=game.js.map