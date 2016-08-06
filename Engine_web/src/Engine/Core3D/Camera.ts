/**
 * Created by yjh on 16/2/2.
 */
///<reference path='../Core/Object3D.ts'/>
import {Object3D} from '../Core'
import {Render} from '../Core/Render'
export class Camera extends Object3D {
    isActive = false;
    viewMat = mat4.create();
    perspectiveMat = mat4.create();
    render:Render;
    isRoot = true;

    constructor(render) {
        super();
        this.render = render
    }

    setAsDefaultCamera() {
        if (this.render.defaultCamera) {
            this.render.defaultCamera.isActive = false;
        }
        this.isActive = true;
        this.render.defaultCamera = this;
        this.render.viewMat = this.viewMat;
        this.render.perspectiveMat = this.perspectiveMat;
        //this.render.eyePosition=this.position;
    }

}
export class PerspectiveCamera extends Camera {
    aspect;
    fov;
    near;
    far;
    center = vec3.create();
    headerUp = new Float32Array([0, 1, 0]);

    constructor(render, x = 0, y = 0, z = 1.5, fov = 67.3, near = 0.1, far = 300, aspect = null) {
        super(render);
        this.aspect = aspect;
        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;
        this.fov = fov;
        this.near = near;
        this.far = far;
    }

    update() {
        //mat4.identity(this.viewMat);
        mat4.lookAt(this.viewMat, this.position, this.center, this.headerUp);
        mat4.perspective(this.perspectiveMat, this.fov / 180 * Math.PI, this.aspect || 1 / this.render.aspect, this.near, this.far)
    }

    lookAt(center:Float32Array, headerUp:Float32Array) {
        vec3.copy(this.center, center);
        vec3.copy(this.headerUp, headerUp)
    }

}