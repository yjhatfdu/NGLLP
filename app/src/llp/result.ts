/**
 * Created by yjh on 16/8/21.
 */
import * as Ranking from './ranking'
import {Tween} from '../Engine/Animation/Tween'
import {TextSprite} from "../Engine/Core2D/TextSprite";
import {Settings} from './settings'
import * as Engine from '../Engine/Engine'
import {Sprite} from '../Engine/Core2D/Sprite'
import {SpriteBatchNode} from "../Engine/Core2D/SpriteBatchNode";
import {bgLayer,title} from './game'


export function showResult(){
    Ranking.combo.opacity=0;
    let perfectCount=new TextSprite(200,60,Ranking.stat.perfect||'0',40);
    let greatCount=new TextSprite(200,60,Ranking.stat.great||'0',40);
    let goodCount=new TextSprite(200,60,Ranking.stat.good||'0',40);
    let badCount=new TextSprite(200,60,Ranking.stat.bad||'0',40);
    let missCount=new TextSprite(200,60,Ranking.stat.miss||'0',40);
    let uiItem= Engine.resourceCtl.getItem('uiAssets');
    let perfectSpr = new Sprite(uiItem, Settings.rankInitialState.x, Settings.rankInitialState.y, null, null, Settings.sprites.perfect);
    perfectSpr.x=0;
    perfectSpr.opacity=1;
    perfectSpr.y=0.5*perfectSpr.h;
    let perfect=new Sprite(null,null,null,1,1,{});
    perfectCount.y=-0.5*perfectCount.h;
    perfect.appendChildren([perfectCount,perfectSpr]);
    let greatSpr = new Sprite(uiItem, Settings.rankInitialState.x, Settings.rankInitialState.y, null, null, Settings.sprites.great);
    greatSpr.x=0;
    greatSpr.y=0.5*greatSpr.h;
    greatSpr.opacity=1;
    let great=new Sprite(null,null,null,1,1,{});
    greatCount.y=-0.5*greatCount.h;
    great.appendChildren([greatCount,greatSpr]);
    let goodSpr = new Sprite(uiItem, Settings.rankInitialState.x, Settings.rankInitialState.y, null, null, Settings.sprites.good);
    goodSpr.x=0;
    goodSpr.y=0.5*goodSpr.h;
    goodSpr.opacity=1;
    let good=new Sprite(null,null,null,1,1,{});
    goodCount.y=-0.5*goodCount.h;
    good.appendChildren([goodCount,goodSpr]);
    let badSpr = new Sprite(uiItem, Settings.rankInitialState.x, Settings.rankInitialState.y, null, null, Settings.sprites.bad);
    badSpr.x=0;
    badSpr.y=0.5*badSpr.h;
    badSpr.opacity=1;
    let bad=new Sprite(null,null,null,1,1,{});
    badCount.y=-0.5*badCount.h;
    bad.appendChildren([badCount,badSpr]);
    let missSpr = new Sprite(uiItem, Settings.rankInitialState.x, Settings.rankInitialState.y, null, null, Settings.sprites.miss);
    missSpr.x=0;
    missSpr.y=0.5*missSpr.h;
    missSpr.opacity=1;
    let miss=new Sprite(null,null,null,1,1,{});
    missCount.y=-0.5*missCount.h;
    miss.appendChildren([missCount,missSpr]);
    let finalScore=Ranking.stat.getFinalResult();
    let resultLayer=new SpriteBatchNode();
    resultLayer.appendChildren([perfect,great,good,bad,miss]);
    Engine.render.appendChild(resultLayer);
    Tween(Ranking.score).playAction(Settings.resultScoreAction);
    Tween(Ranking.score,'number').translateTo(finalScore,1000);
    Tween(perfect).playAction(Settings.resultRankCountActions.perfect);
    Tween(great).playAction(Settings.resultRankCountActions.great);
    Tween(good).playAction(Settings.resultRankCountActions.good);
    Tween(bad).playAction(Settings.resultRankCountActions.bad);
    Tween(miss).playAction(Settings.resultRankCountActions.miss);
    let technical=new TextSprite(800,40,`MAX COMBO:${Ranking.stat.maxCombo} TOTAL NOTES:${Ranking.stat.count} LATENCY:${Ranking.stat.getLatencyStat().toPrecision(2)}ms OFFSET:${Ranking.stat.getOffsetStat().toPrecision(2)}ms`);
    technical.shadowColor='#000000';
    technical.shadowBlur=3;
    technical.y=-0.4;
    resultLayer.appendChild(technical);
    Tween(technical).playAction(Settings.resultRankCountActions.technical);
    Tween(bgLayer,'opacity').translateTo(0.3,'500');
    let touchToRestart=new TextSprite(600,80,'Touch to Restart',50);
    touchToRestart.y=-0.7;
    resultLayer.appendChild(touchToRestart);
    Tween(touchToRestart,'opacity').set(0).delay(1500).translateTo(1,500).then(()=>{
        Engine.touchCtl.addEventListener('touchend',()=>location.reload());
    });
    let titleSpr=new TextSprite(500,50,title,20);
    titleSpr.x=-0.8;
    titleSpr.y=0.7;
    resultLayer.appendChild(titleSpr)
}