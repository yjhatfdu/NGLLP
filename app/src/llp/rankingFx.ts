/**
 * Created by yjh on 16/8/20.
 */
import * as Engine from '../Engine/Engine'
import {Settings} from './settings'
import {SimpleParticleSystem} from "../Engine/ParticleSystem/SimpleParticleSystem";
import {Tween} from '../Engine/Animation/Tween'
export let rankFXes:Array<SimpleParticleSystem> = [];

export function init(){
    for(let i=0;i<9;i++){
        let ps=new SimpleParticleSystem(Engine.resourceCtl.getItem('uiAssets'),Settings.rankParticleSystem);
        ps.x=-Math.cos(Math.PI*(i/8))*1.246334;
        ps.y=0.501466-Math.sin(Math.PI*(i/8))*1.246334;
        ps.zIndex=100;
        rankFXes.push(ps);
        Engine.render.appendChild(ps)
    }
}

export function playFX(channel,ranking){
    let fx=rankFXes[channel];
    Tween(fx).endAll();

    Tween(fx).playAction(Settings.rankParticleAction);
    fx.color=Settings.rankParticleColor[ranking]
}