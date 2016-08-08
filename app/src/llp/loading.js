System.register(['../Engine/Engine', '../Engine/Core2D/SpriteBatchNode', '../Engine/Core2D/TextSprite', '../Engine/Animation/Tween'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Engine, SpriteBatchNode_1, TextSprite_1, Tween_1;
    var layer, promotionSprite, ps, shouldStop, promotion;
    function start() {
        layer = new SpriteBatchNode_1.SpriteBatchNode();
        promotionSprite = new TextSprite_1.TextSprite(500, 200, '加载中..', 50);
        ps = new TextSprite_1.TextSprite(100, 50, '0%', 30);
        ps.y = -0.2;
        promotionSprite.opacity = 0;
        Tween_1.Tween(promotionSprite, 'opacity').translateTo(1, 500).translateTo(0, 500).then(changePromotion);
        layer.appendChild(promotionSprite);
        layer.appendChild(ps);
        Engine.render.appendChild(layer);
    }
    exports_1("start", start);
    function changePromotion() {
        if (!shouldStop) {
            promotionSprite.text = promotion[Math.floor(promotion.length * Math.random())];
            Tween_1.Tween(promotionSprite, 'opacity').translateTo(1, 500).delay(2000).translateTo(0, 500).then(changePromotion);
        }
    }
    function progress(p) {
        if (isNaN(p)) {
            return;
        }
        ps.text = '' + Math.floor(p * 100) + '%';
    }
    exports_1("progress", progress);
    function stop() {
        shouldStop = true;
        layer.removeChild(ps);
        promotionSprite.text = '即将开始';
        return new Promise(function (resolve) {
            Tween_1.Tween(promotionSprite, 'opacity').end();
            Tween_1.Tween(promotionSprite, 'opacity').translateTo(1, 500).delay(1000).translateTo(0, 500).then(function () {
                layer.destroy();
                Engine.render.removeChild(layer);
                resolve();
            });
        });
    }
    exports_1("stop", stop);
    return {
        setters:[
            function (Engine_1) {
                Engine = Engine_1;
            },
            function (SpriteBatchNode_1_1) {
                SpriteBatchNode_1 = SpriteBatchNode_1_1;
            },
            function (TextSprite_1_1) {
                TextSprite_1 = TextSprite_1_1;
            },
            function (Tween_1_1) {
                Tween_1 = Tween_1_1;
            }],
        execute: function() {
            shouldStop = false;
            promotion = [
                '加载中..',
                '正在同步神经接口..',
                '正在和长者谈笑风生..',
                '正在前往花村..',
                '正在丢雷姆..',
                '正在召集lo娘..',
                '正在打call..',
                '正在潜入音木坂学院..',
                '正在鄙视bog..',
                '正在和小学生对喷..',
                '正在pr穹妹..',
                '正在重构LLP..',
                '正在给LLP续命..',
                '正在发现女装少年..'
            ];
        }
    }
});
//# sourceMappingURL=loading.js.map