/**
 * Created by yjh on 16/8/13.
 */
import * as Engine from '../Engine/Engine'
import {GpuParticleSystem,EmitterType} from "../Engine/ParticleSystem/GpuParticleSystem";

Engine.setEngine(document.body);
let ps = new GpuParticleSystem(200, {
    size: 6,
    simpleParticle: false,
    emitterType: EmitterType.volume_cube,
    pointScale: 10,
    emitSpeed: 1,
    fade: 5
});
ps.resistance = 0.05;
Engine.render.appendChild(ps);
window['ps'] = ps;