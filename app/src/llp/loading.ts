/**
 * Created by yjh on 16/8/7.
 */
import * as Engine from '../Engine/Engine'
import {SpriteBatchNode} from '../Engine/Core2D/SpriteBatchNode'
import {TextSprite} from '../Engine/Core2D/TextSprite'
import {Tween} from '../Engine/Animation/Tween'
import * as particle from './particle'
import * as Motion from '../Engine/Events/Motion'
import {Settings} from './settings'

let layer;
let promotionSprite
    , ps;
let shouldStop = false;
let promotion = null;

export function start() {
    particle.init();
    promotion=Settings.loadingPromotion;
    layer = new SpriteBatchNode();
    promotionSprite = new TextSprite(500, 200, '加载中..', 50);
    ps = new TextSprite(100, 50, '0%', 30);
    ps.y = -0.2;
    promotionSprite.opacity = 0;
    Tween(promotionSprite, 'opacity').translateTo(1, 500).translateTo(0, 500).then(changePromotion);
    layer.appendChild(promotionSprite);
    layer.appendChild(ps);
    Engine.render.appendChild(layer);
    Motion.start();
    particle.particleSystem.gravity = Motion.gravity;
    Engine.render.appendChild(particle.particleSystem);
}

function changePromotion() {
    if (!shouldStop) {
        promotionSprite.text = promotion[Math.floor(promotion.length * Math.random())];
        Tween(promotionSprite, 'opacity').translateTo(1, 500).delay(2000).translateTo(0, 500).then(changePromotion)
    }
}

export function progress(p) {
    if (isNaN(p)) {
        return
    }
    ps.text = '' + Math.floor(p * 100) + '%'
}

export function stop() {
    shouldStop = true;
    layer.removeChild(ps);
    promotionSprite.text = '即将开始';
    return new Promise((resolve)=> {
        Tween(promotionSprite, 'opacity').end();
        Tween(particle.particleSystem, 'opacity').delay(1500).translateTo(0, 500);
        Tween(promotionSprite, 'opacity').translateTo(1, 500).delay(1000).translateTo(0, 500).then(()=> {
            layer.destroy();
            Engine.render.removeChild(layer);
            Engine.render.removeChild(particle.particleSystem);
            Motion.stop();
            resolve()
        })
    })
}