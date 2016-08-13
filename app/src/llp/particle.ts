/**
 * Created by yjh on 16/8/14.
 */

import {GpuParticleSystem,EmitterType} from '../Engine/ParticleSystem/GpuParticleSystem'
export let particleSystem:GpuParticleSystem;

export function init() {
    particleSystem = new GpuParticleSystem(200, {
        size: 6,
        simpleParticle: false,
        emitterType: EmitterType.volume_cube,
        pointScale: 10,
        emitSpeed: 1,
        fade: 5
    });
    particleSystem.resistance = 0.05;
}