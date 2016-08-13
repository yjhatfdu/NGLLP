/**
 * Created by yjh on 16/8/11.
 */

import {Object3D} from '../Core/Object3D'
import {vec3} from 'gl-matrix'
import * as Engine from '../Engine'
import {FrameBuffer} from '../Core/FrameBuffer'
import {PositionMaterial} from './PositionMaterial'
import {VelocityMaterial} from './VelocityMaterial'
import {ParticleMaterial} from "./ParticleMaterial";


export enum ParticleType{
    point,
    rectangle,

}
export enum EmitterType{
    point,
    directional,
    plane,
    volume_cube,
    volume_Sphere
}
export class GpuParticleSystem extends Object3D {

    enabled = true;
    support = false;
    gl:WebGLRenderingContext;
    private maxCountSqrt;
    private maxCount;
    private totalTime;

    private positionMaterial:PositionMaterial;
    private positionFB:FrameBuffer;
    private positionBufferedFB:FrameBuffer;
    private velocityMaterial:VelocityMaterial;
    private velocityFB:FrameBuffer;
    private velocityBufferedFB:FrameBuffer;

    private particleMaterial:ParticleMaterial;

    emitColor = [1, 1, 1, 1];

    particleType = 0;

    private staticInfoTexture;


    particleProperty = {
        size: 10,
        sizeVary: 0.1,
        life: 10,
        lifeVary: 0.1,
        speedVary: 0.01
    };
    feather;
    emitterType;
    emitVary = 0;
    emitSpeed = 1;
    emitPercent = 1;
    resistance = 0;
    wind = vec3.create();
    gravity;
    particlePerSec;
    emitPosition = vec3.create();
    simpleParticle;
    pointScale = 1;
    emitterSize = [2, 2, 2];
    fade = 1;
    opacity = 1;

    constructor(maxParticlePerSec, {emitSpeed=1, size=10, life=10,lifeVary = 0.1, sizeVary = 0.1, sizeLevel:number = 8, particleType = ParticleType.point, useTexture = false, emitterType = EmitterType.point, useWind = false, gravity = [0, -1, 0], speedVary = 10,simpleParticle=false,feather=0,resistance=0,pointScale=1,fade=1}) {
        super();
        this.gl = Engine.render.gl;
        if (this.gl['HALF_FLOAT']) {
            this.support = true
        } else {
            this.support = false;
            return this
        }
        this.maxCountSqrt = Math.pow(2, size);
        this.maxCount = Math.pow(this.maxCountSqrt, 2);
        this.totalTime = maxParticlePerSec ? this.maxCount / maxParticlePerSec : Math.pow(2, 64);
        this.particleProperty.size = size;
        this.particleProperty.sizeVary = sizeVary;
        this.particleProperty.life = life;
        this.particleProperty.lifeVary = lifeVary;
        this.particleProperty.speedVary = speedVary;
        this.emitSpeed = emitSpeed;
        this.gravity = gravity;
        this.particlePerSec = maxParticlePerSec;
        this.simpleParticle = simpleParticle;
        this.feather = feather;
        this.emitterType = emitterType;
        this.pointScale = pointScale;
        this.fade = fade;
        this.init();
    }

    init() {

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.positionFB = new FrameBuffer(this.maxCountSqrt, 'HALF_FLOAT');
        this.positionBufferedFB = new FrameBuffer(this.maxCountSqrt, 'HALF_FLOAT');
        this.velocityFB = new FrameBuffer(this.maxCountSqrt, 'HALF_FLOAT');
        this.velocityBufferedFB = new FrameBuffer(this.maxCountSqrt, 'HALF_FLOAT');
        Engine.render.currentGlTexture[0] = null;
        let staticInfo = new Float32Array(this.maxCount * 4);
        let size = this.particleProperty.size * Engine.render.p;
        let sizeVary = this.particleProperty.sizeVary;
        let totalTime = this.maxCount / this.particlePerSec;
        let life = this.particleProperty.life;
        let lifeVary = this.particleProperty.lifeVary;
        for (var i = 0; i < this.maxCount; i++) {
            staticInfo[4 * i] = size * (1 + sizeVary * (Math.random() * 2 - 1));
            staticInfo[4 * i + 1] = Math.random();
            staticInfo[4 * i + 2] = i / this.maxCount * this.totalTime;
            staticInfo[4 * i + 3] = life * (1 + lifeVary * (Math.random() * 2 - 1));
        }
        this.staticInfoTexture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.staticInfoTexture);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.maxCountSqrt, this.maxCountSqrt, 0, this.gl.RGBA, this.gl.FLOAT, staticInfo);

        this.positionMaterial = new PositionMaterial(this.totalTime, this.emitterType);
        this.positionMaterial.bufferData('position', new Float32Array([-1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1]));
        this.positionMaterial.textures = [
            this.positionBufferedFB.texture,
            this.velocityFB.texture,
            this.staticInfoTexture
        ];

        this.velocityMaterial = new VelocityMaterial(this.totalTime);
        this.velocityMaterial.bufferData('position', new Float32Array([-1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1]));
        this.velocityMaterial.textures = [
            this.velocityBufferedFB.texture,
            this.staticInfoTexture
        ];

        let mul;
        let iboarray;
        switch (this.particleType) {
            case 0:
            {
                mul = 2;
                iboarray = new Uint16Array(this.maxCount);
                for (var i = 0; i < this.maxCount; i++) {
                    iboarray[i] = i;
                }
                break
            }
            case 1:
            {
                mul = 8;
                //暂未实现rectangle sprite
            }
        }
        let uvBuffer = new Float32Array(this.maxCount * 2);
        //var uvCoordBuffer=new Float32Array(this.maxCount*2);
        let unit = 1 / this.maxCountSqrt;
        for (let x = 0; x < this.maxCountSqrt; x++) {
            for (let y = 0; y < this.maxCountSqrt; y++) {
                var pos = 2 * (this.maxCountSqrt * y + x);
                uvBuffer[pos] = x * unit;
                uvBuffer[pos + 1] = y * unit;
            }
        }
        this.particleMaterial = new ParticleMaterial(this.totalTime, this.particleType, this.particleType, this.simpleParticle, 0);
        this.particleMaterial.bufferData('uv', uvBuffer);
        this.particleMaterial.bufferIBO(iboarray);
        this.particleMaterial.textures = [
            this.positionFB.texture,
            this.staticInfoTexture
        ];
        this.particleMaterial.mvpMat = this.mvpMat;

    }


    updatePositionTexture(deltaTime, currentTime) {
        this.positionMaterial.deltaTime = deltaTime;
        this.positionMaterial.currentTime = currentTime;
        this.positionMaterial.emitterPosition = <Array<number>>this.emitPosition;
        this.positionMaterial.emitterSize = this.emitterSize;
        [this.positionFB, this.positionBufferedFB] = [this.positionBufferedFB, this.positionFB];
        this.positionMaterial.textures[0] = this.positionBufferedFB.texture;
        this.positionMaterial.textures[1] = this.velocityFB.texture;
        this.positionMaterial.active();
        this.positionFB.use();
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        this.positionFB.release();
    }


    updateVelocityTexture(deltaTime, currentTime) {
        this.velocityMaterial.deltaTime = deltaTime;
        this.velocityMaterial.currentTime = currentTime;
        this.velocityMaterial.emitSpeed = this.emitSpeed;
        this.velocityMaterial.gravity = this.gravity;
        this.velocityMaterial.emitPercent = this.emitPercent;
        this.velocityMaterial.emitVary = this.emitVary;
        this.velocityMaterial.wind = <Array<number>>this.wind;
        this.velocityMaterial.resistance = this.resistance;
        this.velocityMaterial.speedVary = this.particleProperty.speedVary;
        [this.velocityFB, this.velocityBufferedFB] = [this.velocityBufferedFB, this.velocityFB];
        this.velocityMaterial.textures[0] = this.velocityBufferedFB.texture;
        this.velocityMaterial.active();
        this.velocityFB.use();
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        this.velocityFB.release();
    }

    drawParticle(deltaTime, currentTime) {
        this.particleMaterial.currentTime = currentTime;
        this.particleMaterial.feather = this.feather;
        this.particleMaterial.pointScale = this.pointScale;
        this.particleMaterial.fade = this.fade;
        this.particleMaterial.alpha=this.opacity;
        this.particleMaterial.active();
        this.gl.drawElements(this.gl.POINTS, this.maxCount, this.gl.UNSIGNED_SHORT, 0);
    }

    private lastTime = 0;
    private startTime = 0;

    update() {
        if (!(this.support && this.enabled)) {
            return
        }
        super.update();

        var currentTime = Date.now() * 0.001;
        if (!this.startTime) {
            this.startTime = currentTime
        }
        currentTime -= this.startTime;
        var deltaTime;
        deltaTime = this.lastTime ? currentTime - this.lastTime : 0;
        this.lastTime = currentTime;

        this.updateVelocityTexture(deltaTime, currentTime);
        this.updatePositionTexture(deltaTime, currentTime);

        //this.testMaterial.active();
        //this.gl.activeTexture(this.gl.TEXTURE0);
        //this.gl.drawArrays(this.gl.TRIANGLES,0,6);
        this.drawParticle(deltaTime, currentTime);
    }
}