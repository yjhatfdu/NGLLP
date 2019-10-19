/**
 * Created by yjh on 16/8/20.
 */
import * as Engine from '../Engine/Engine'
import {Settings} from './settings'
import {SimpleParticleSystem} from "../Engine/ParticleSystem/SimpleParticleSystem";
import {Tween} from '../Engine/Animation/Tween'
import {channels, posXexpression, posYexpression} from "./map";

export let rankFXes: Array<SimpleParticleSystem> = [];

export function init() {
    for (let i = 0; i < channels.length; i++) {
        let ps = new SimpleParticleSystem(Engine.resourceCtl.getItem('uiAssets'), Settings.rankParticleSystem);
        ps.x = posXexpression(i, 1, 0, 0);
        ps.y = posYexpression(i, 1, 0, 0);
        ps.zIndex = 100;
        rankFXes.push(ps);
        Engine.render.appendChild(ps)
    }
}

export function playFX(channel, ranking) {
    let fx = rankFXes[channel];
    Tween(fx).endAll();

    Tween(fx).playAction(Settings.rankParticleAction);
    fx.color = Settings.rankParticleColor[ranking]
}
