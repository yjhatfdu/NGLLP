/**
 * Created by yjh on 16/8/15.
 */
import * as Engine from '../Engine/Engine'
import {Sprite} from "../Engine/Core2D/Sprite";
import {Tween} from '../Engine/Animation/Tween'
import {SpriteBatchNode} from "../Engine/Core2D/SpriteBatchNode";
import {Easing} from "../Engine/Animation/easing";
import {Digits} from "../Engine/Components/Digits";
import {Settings} from "./settings"
import * as rankingFX from './rankingFx'


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
        this.currentCombo = 0;
    }

    getFinalResult() {
        return Math.min(1000000, Math.round(this.score + Math.min(this.maxCombo / this.totalNotes * 100000 * 2, 100000)))
    }

    getLatencyStat() {
        let sum = 0;
        for (let i = 0; i < this.count; i++) {
            sum += this.offsetData[i]
        }
        return sum / this.count
    }

    getOffsetStat() {
        let sum = 0;
        for (let i = 0; i < this.count; i++) {
            sum += Math.abs(this.offsetData[i])
        }
        return sum / this.count
    }
}

export let stat: Stat;

export const rankTiming = {
    miss: 200,
    bad: 160,
    good: 115.2,
    great: 72,
    perfect: 34.5
};


let perfectSe, greatSe, goodSe;
export let perfectSpr, greatSpr, goodSpr, badSpr, missSpr;
let currentRankSprite: Sprite;
let seLayer: SpriteBatchNode;
export let score: Digits, combo: Digits;
export function init(totalNotes) {
    rankingFX.init();
    stat = new Stat(totalNotes);
    perfectSe = Engine.resourceCtl.getItem('perfect');
    greatSe = Engine.resourceCtl.getItem('great');
    goodSe = Engine.resourceCtl.getItem('good');
    let uiItem = Engine.resourceCtl.getItem('uiAssets');
    perfectSpr = new Sprite(uiItem, Settings.rankInitialState.x, Settings.rankInitialState.y, null, null, Settings.sprites.perfect);
    greatSpr = new Sprite(uiItem, Settings.rankInitialState.x, Settings.rankInitialState.y, null, null, Settings.sprites.great);
    goodSpr = new Sprite(uiItem, Settings.rankInitialState.x, Settings.rankInitialState.y, null, null, Settings.sprites.good);
    badSpr = new Sprite(uiItem, Settings.rankInitialState.x, Settings.rankInitialState.y, null, null, Settings.sprites.bad);
    missSpr = new Sprite(uiItem, Settings.rankInitialState.x, Settings.rankInitialState.y, null, null, Settings.sprites.miss);
    seLayer = new SpriteBatchNode();
    seLayer.appendChildren([perfectSpr, greatSpr, goodSpr, badSpr, missSpr]);
    score = new Digits(Engine.resourceCtl.getItem('uiAssets'), 5, 2, null, Settings.sprites.scoreDigits);
    combo = new Digits(Engine.resourceCtl.getItem('uiAssets'), 5, 2, null, Settings.sprites.comboDigits);
    score.y = Settings.scoreInitialState.y;
    score.h = Settings.scoreInitialState.h;
    score.x = Settings.scoreInitialState.x;
    combo.y = Settings.comboInitialState.y;
    combo.x = Settings.comboInitialState.x;
    combo.h = Settings.comboInitialState.h;
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


function showRanking(spr: Sprite) {
    if (currentRankSprite) {
        Tween(currentRankSprite).endAll();
        currentRankSprite.opacity = 0;
    }
    currentRankSprite = spr;
    spr.resetState(Settings.rankInitialState);
    Tween(spr).playAction(Settings.rankAction);
    Tween(combo).endAll();
    combo.resetState(Settings.comboInitialState);
    combo.scale = Settings.comboInitialState.scale;
    combo.number = stat.currentCombo ? stat.currentCombo : null;
    Tween(combo).playAction(Settings.comboAction);

}

export function rank(offset, ch?) {
    if (offset == null) {
        showRanking(missSpr);
        stat.miss++;
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
        rankingFX.playFX(ch, 'perfect')
    } else if (offsetTime <= rankTiming.great) {
        Engine.audioCtl.playAudioItem(greatSe);
        stat.great++;
        stat.combo();
        stat.score += stat.scorePerNote * 0.8;
        showRanking(greatSpr);
        rankingFX.playFX(ch, 'great')
    } else if (offsetTime <= rankTiming.good) {
        Engine.audioCtl.playAudioItem(goodSe);
        stat.good++;
        stat.breakCombo();
        stat.score += stat.scorePerNote * 0.5;
        showRanking(goodSpr);
        rankingFX.playFX(ch, 'good')
    } else if (offsetTime <= rankTiming.bad) {
        stat.bad++;
        stat.breakCombo();
        stat.score += stat.scorePerNote * 0.3;
        showRanking(badSpr);
        rankingFX.playFX(ch, 'bad')
    } else {
        stat.miss++;
        stat.breakCombo();
        showRanking(missSpr);
        stat.count--
    }
    stat.offsetData[stat.count] = offset;
    stat.count++;
    Tween(score, 'number').end();
    Tween(score, 'number').translateTo(stat.score, 300);
}