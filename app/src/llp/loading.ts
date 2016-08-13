/**
 * Created by yjh on 16/8/7.
 */
import * as Engine from '../Engine/Engine'
import {SpriteBatchNode} from '../Engine/Core2D/SpriteBatchNode'
import {TextSprite} from '../Engine/Core2D/TextSprite'
import {Tween} from '../Engine/Animation/Tween'
import * as particle from './particle'
import * as Motion from '../Engine/Events/Motion'

let layer;
let promotionSprite
    ,ps;
let shouldStop = false;
let promotion = [
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
    '正在发现女装少年..',
    '少女祈祷中..',
    '正在吞谱..',
    '正在卡loding..',
    '正在准备面基..',
    '正在收扶老二..',
    '正在为您接通妖妖灵..',
    '正在调戏日日日..',
    '正在擦洗note..',
    '正在爆破手机..',
    '正在捕食二刺螈..'
];

export function start() {
    particle.init();
    layer = new SpriteBatchNode();
    promotionSprite = new TextSprite(500, 200, '加载中..', 50);
    ps=new TextSprite(100,50,'0%',30);
    ps.y=-0.2;
    promotionSprite.opacity = 0;
    Tween(promotionSprite, 'opacity').translateTo(1, 500).translateTo(0, 500).then(changePromotion);
    layer.appendChild(promotionSprite);
    layer.appendChild(ps);
    Engine.render.appendChild(layer);
    Motion.start();
    particle.particleSystem.gravity=Motion.gravity;
    Engine.render.appendChild(particle.particleSystem);
}

function changePromotion() {
    if (!shouldStop) {
        promotionSprite.text = promotion[Math.floor(promotion.length * Math.random())];
        Tween(promotionSprite, 'opacity').translateTo(1, 500).delay(2000).translateTo(0, 500).then(changePromotion)
    }
}

export function progress(p){
    if(isNaN(p)){
        return
    }
    ps.text=''+Math.floor(p*100)+'%'
}

export function stop() {
    shouldStop = true;
    layer.removeChild(ps);
    promotionSprite.text = '即将开始';
    return new Promise((resolve)=> {
        Tween(promotionSprite, 'opacity').end();
        Tween(particle.particleSystem,'opacity').delay(1500).translateTo(0,500);
        Tween(promotionSprite, 'opacity').translateTo(1, 500).delay(1000).translateTo(0, 500).then(()=> {
            layer.destroy();
            Engine.render.removeChild(layer);
            Engine.render.removeChild(particle.particleSystem);
            Motion.stop();
            resolve()
        })
    })
}