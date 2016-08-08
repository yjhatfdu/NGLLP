/**
 * Created by yjh on 16/8/8.
 */
import * as Engine from '../Engine/Engine'
import {uiLayer} from './game'
import {Sprite} from '../Engine/Core2D/Sprite'
const noteSprInfo = {
    tx: 396/1024, ty: 15/1024, tw: 128/1024, th: 128/1024
};

const parallelSprInfo = {
    tx: 242/1024, ty: 417/1024, tw: 128/1024, th: 24/1024
};


let noteSpritePool = [];

function init() {

}

class NoteSprite extends Sprite {
    parallelSpr:Sprite;

    set parallel(v) {
        if (v == true) {
            this.parallelSpr.opacity = 1;
        } else {
            this.parallelSpr.opacity = 0;
        }
    }

    destroy() {
        noteSpritePool.push(this);
        this.opacity = 0;
    }

}
export function noteSpriteFactory(parallel = false, long = false) {
    if (noteSpritePool.length > 0) {
        let spr= noteSpritePool.pop();
        spr.opacity=1;
        return spr
    } else {
        let newSpr = new NoteSprite(Engine.resourceCtl.getItem('uiAssets'), 0, 0, 1, 1, noteSprInfo.tx, noteSprInfo.ty, noteSprInfo.tw, noteSprInfo.th);
        let parallelSpr = new Sprite(Engine.resourceCtl.getItem('uiAssets'), 0, 0, 1, parallelSprInfo.th / parallelSprInfo.tw, parallelSprInfo.tx, parallelSprInfo.ty, parallelSprInfo.tw, parallelSprInfo.th)
    }
    newSpr.appendChild(parallelSpr);
    newSpr.parallelSpr=parallelSpr;
    newSpr.parallel=parallel;
    newSpr.opacity=1;
    uiLayer.appendChild(newSpr);
    return newSpr

}