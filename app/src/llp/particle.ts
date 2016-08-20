/**
 * Created by yjh on 16/8/14.
 */

import {GpuParticleSystem,EmitterType} from '../Engine/ParticleSystem/GpuParticleSystem'
import {Settings} from './settings'
export let particleSystem:GpuParticleSystem;

export function init() {
    particleSystem = new GpuParticleSystem(200, Settings.loadingParticleSystem);
    particleSystem.resistance = 0.05;
}