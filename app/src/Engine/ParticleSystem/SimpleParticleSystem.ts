/**
 * Created by yjh on 16/2/5.
 */
import {Object3D} from '../Core/Object3D'
import {vec3} from 'gl-matrix'
import * as Engine from '../Engine'
import {SimpleParticleMaterial} from "./SimpleParticleMaterial";
import {mat4} from 'gl-matrix'


export class SimpleParticleSystem extends Object3D {
    color;
    progress = 0;
    size;
    opacity;
    material:SimpleParticleMaterial;
    fade = 1;
    speed=1;
    private particleCount;

    set x(v) {
        this.position[0] = v
    }

    get x() {
        return this.position[0]
    }

    set y(v) {
        this.position[1] = v
    }

    get y() {
        return this.position[1]
    }

    constructor(imageItem, {x=0,y=0,sx=0,sy=0,sh=null,sw=null,row=1,stride=1,size=4,particleCount=200,randomize=1,color=[1, 1, 1, 1],opacity=1,speed=1,scale=1,fade=1}) {
        super();
        this.particleCount = particleCount;
        this.enablePerspective = false;
        sx = sx / imageItem.width * imageItem.texture.sw;
        sy = sy / imageItem.height * imageItem.texture.sh;
        sw = (sw ? sw / imageItem.width : 1) * imageItem.texture.sw;
        sh = (sh ? sh / imageItem.height : 1) * imageItem.texture.sh;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.opacity = opacity;
        this.scale=scale;
        this.speed=speed;
        this.fade=fade;
        let textureTypes = row * stride;
        let posData = new Float32Array(particleCount * 3);
        let attrData = new Float32Array(particleCount * 4);
        for (let i = 0; i < particleCount; i++) {
            let posAngle = Math.PI * 2 * Math.random();
            let dist = Math.pow(Math.random(), 3) * randomize;
            posData[3 * i] = dist * Math.cos(posAngle);
            posData[3 * i + 1] = dist * Math.sin(posAngle);
            posData[3 * i + 2] = 1 + Math.pow(Math.random(), 1.5) * randomize * (Math.random() < 0.5 ? 1 : -1);
            attrData[4 * i] = Math.random();
            attrData[4 * i + 1] = Math.random() * Math.PI * 2;
            attrData[4 * i + 2] = 1 + Math.pow(Math.random(), 1.5) * randomize * (Math.random() < 0.5 ? 1 : -1);
            attrData[4 * i + 3] = Math.floor(Math.random() * textureTypes)
        }
        this.material = new SimpleParticleMaterial(sx, sy, sh, sw, row, stride);
        this.material.textures = [imageItem.texture];
        this.material.bufferData('position', posData);
        this.material.bufferData('properties', attrData);
        this.material.mvpMat = this.mvpMat;
    }

    update() {
        if (this.opacity <= 0||this.progress>=1||this.progress<=0) {
            return
        }
        super.update();
        this.material.color = this.color;
        this.material.opacity = this.opacity;
        this.material.progress = this.progress;
        this.material.size = this.size;
        this.material.fade = this.fade;
        this.material.speed=this.speed;
        this.material.active();
        Engine.render.gl.drawArrays(Engine.render.gl.POINTS, 0, this.particleCount)
    }
}

