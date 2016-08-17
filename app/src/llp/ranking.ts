/**
 * Created by yjh on 16/8/15.
 */
import * as Engine from '../Engine/Engine'
import {Sprite} from "../Engine/Core2D/Sprite";
import {Tween} from '../Engine/Animation/Tween'
import {SpriteBatchNode} from "../Engine/Core2D/SpriteBatchNode";
import {Easing} from "../Engine/Animation/easing";
import {Digits} from "../Engine/Components/Digits";
import {Digits} from "../Engine/Components/Digits";


class Stat {
    public perfect = 0;
    public great = 0;
    public good = 0;
    public bad = 0;
    public miss = 0;
    public offsetData = new Float32Array(10000);
    public count = 0;
    public maxCombo = 0;
    public currentCombo = 0;
    public scorePerNote = 0;
    public score = 0;

    constructor(public totalNotes) {
        this.scorePerNote = 900000 / totalNotes;
    }

    combo() {
        this.currentCombo++;
        this.maxCombo = Math.max(this.currentCombo, this.maxCombo)
    }

    breakCombo() {
        this.currentCombo = 0
    }
}

export let stat:Stat;

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
    },
    digits: {
        sw: 250 / 256,
        sh: 200 / 256
    }
};

let perfectSe, greatSe, goodSe;
let perfectSpr, greatSpr, goodSpr, badSpr, missSpr;
let currentRankSprite:Sprite;
let seLayer:SpriteBatchNode;
let score:Digits, combo:Digits;
export function init(totalNotes) {
    stat = new Stat(totalNotes);
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
    score = new Digits(Engine.resourceCtl.getItem('digits'), 5, 2, 0, RankSprInfo.digits);
    combo = new Digits(Engine.resourceCtl.getItem('digits'), 5, 2, 0, RankSprInfo.digits);
    score.y = 0.75;
    score.h = 0.15;
    combo.y = 0.3;
    combo.h = 0.2;
    combo.opacity = 0;
    score.opacity = 0;
    seLayer.appendChildren([score, combo]);
    Engine.render.appendChild(seLayer);
}

export function showScore() {
    Tween(score, 'opacity').translateTo(1, 300);
    Tween(combo, 'opacity').translateTo(1, 300);
}
export function hideScore() {
    Tween(score, 'opacity').translateTo(0, 300);
    Tween(combo, 'opacity').translateTo(0, 300);
}


function showRanking(spr:Sprite) {
    if (currentRankSprite) {
        Tween(currentRankSprite, 'opacity').end();
        currentRankSprite.opacity = 0;
        currentRankSprite.scale = 0.6;
        Tween(currentRankSprite, 'opacity').end();
        Tween(currentRankSprite, 'scale').end();
    }
    currentRankSprite = spr;
    spr.scale = 0.5;
    spr.opacity = 1;
    Tween(spr, 'opacity').delay(100).translateTo(0, 500);
    Tween(spr, 'scale').translateTo(0.8, 200).easing(Easing.easeOutElastic);
    Tween(combo,'scale').end();
    combo.scale=1;
    combo.number=stat.currentCombo?stat.currentCombo:null;
    Tween(combo,'scale').translateTo(1.4,60).translateTo(1,100);

}

export function rank(offset, ch?) {
    if (offset == null) {
        showRanking(missSpr);
        stat.breakCombo();
        return
    }
    let offsetTime = Math.abs(offset);
    if (offsetTime <= rankTiming.perfect) {
        Engine.audioCtl.playAudioItem(perfectSe);
        stat.perfect++;
        stat.combo();
        stat.score += stat.scorePerNote;
        showRanking(perfectSpr);
    } else if (offsetTime <= rankTiming.great) {
        Engine.audioCtl.playAudioItem(greatSe);
        stat.great++;
        stat.combo();
        stat.score += stat.scorePerNote * 0.8;
        showRanking(greatSpr);
    } else if (offsetTime <= rankTiming.good) {
        Engine.audioCtl.playAudioItem(goodSe);
        stat.good++;
        stat.breakCombo();
        stat.score += stat.scorePerNote * 0.5;
        showRanking(goodSpr);
    } else if (offsetTime <= rankTiming.bad) {
        stat.bad++;
        stat.breakCombo();
        stat.score += stat.scorePerNote * 0.3;
        showRanking(badSpr);
    } else {
        stat.miss++;
        stat.breakCombo();
        showRanking(missSpr);
    }
    Tween(score, 'number').end();
    Tween(score, 'number').translateTo(stat.score, 300);
}