/**
 * Created by yjh on 16/8/15.
 */
import * as Engine from '../Engine/Engine'
import {Sprite} from "../Engine/Core2D/Sprite";
import {Tween} from '../Engine/Animation/Tween'
import {SpriteBatchNode} from "../Engine/Core2D/SpriteBatchNode";
import {Easing} from "../Engine/Animation/easing";

export const rankTiming = {
    miss: 320,
    bad: 240,
    good: 160,
    great: 80,
    perfect: 40
};

const RankSprInfo = {
    perfect: {
        sx: 12 / 1024, sy: 4 / 1024, sw: 372 / 1024, sh: 102 / 1024, opacity: 0, scale: 0.7
    },
    great: {
        sx: 20 / 1024, sy: 109 / 1024, sw: 257 / 1024, sh: 80 / 1024, opacity: 0, scale: 0.7
    },
    good: {
        sx: 19 / 1024, sy: 209 / 1024, sw: 246 / 1024, sh: 80 / 1024, opacity: 0, scale: 0.7
    },
    bad: {
        sx: 19 / 1024, sy: 306 / 1024, sw: 172 / 1024, sh: 80 / 1024, opacity: 0, scale: 0.7
    },
    miss: {
        sx: 21 / 1024, sy: 398 / 1024, sw: 200 / 1024, sh: 80 / 1024, opacity: 0, scale: 0.7
    }
};

let perfectSe, greatSe, goodSe;
let perfectSpr, greatSpr, goodSpr, badSpr, missSpr;
let currentRankSprite:Sprite;
let seLayer:SpriteBatchNode;
export function init() {
    perfectSe = Engine.resourceCtl.getItem('perfect');
    greatSe = Engine.resourceCtl.getItem('great');
    goodSe = Engine.resourceCtl.getItem('good');
    let uiItem = Engine.resourceCtl.getItem('uiAssets');
    perfectSpr = new Sprite(uiItem, 0, 0, null, null, RankSprInfo.perfect);
    greatSpr = new Sprite(uiItem, 0, 0, null, null, RankSprInfo.great);
    goodSpr = new Sprite(uiItem, 0, 0, null, null, RankSprInfo.good);
    badSpr = new Sprite(uiItem, 0, 0, null, null, RankSprInfo.bad);
    missSpr = new Sprite(uiItem, 0, 0, null, null, RankSprInfo.miss);
    seLayer = new SpriteBatchNode();
    seLayer.appendChildren([perfectSpr, greatSpr, goodSpr, badSpr, missSpr]);
    Engine.render.appendChild(seLayer);
}

function showRanking(spr:Sprite) {
    if (currentRankSprite) {
        Tween(currentRankSprite, 'opacity').end();
        currentRankSprite.opacity = 0;
        currentRankSprite.scale = 0.7;
        Tween(currentRankSprite, 'opacity').end();
        Tween(currentRankSprite, 'scale').end();
    }
    currentRankSprite = spr;
    spr.opacity = 1;
    Tween(spr, 'opacity').delay(100).translateTo(0, 500);
    Tween(spr, 'scale').translateTo(1.0, 200).easing(Easing.easeOutElastic);
}

export function rank(offset, ch?) {
    if (offset == null) {
        showRanking(missSpr);
        return
    }
    let offsetTime = Math.abs(offset);
    if (offsetTime <= rankTiming.perfect) {
        Engine.audioCtl.playAudioItem(perfectSe);
        showRanking(perfectSpr);
    } else if (offsetTime <= rankTiming.great) {
        Engine.audioCtl.playAudioItem(greatSe);
        showRanking(greatSpr);
    } else if (offsetTime <= rankTiming.good) {
        Engine.audioCtl.playAudioItem(goodSe);
        showRanking(goodSpr);
    } else if (offsetTime <= rankTiming.bad) {
        showRanking(badSpr);
    } else {
        showRanking(missSpr);
    }
}