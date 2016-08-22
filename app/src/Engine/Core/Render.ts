/**
 * Created by yjh on 15/12/15.
 */
import {Object3D} from './Object3D'
import * as Engine from '../Engine'
import {PerspectiveCamera, Camera} from '../Core3D/Camera'
import {mat4, vec3} from 'gl-matrix'
import {Sprite} from "../Core2D/Sprite";

export class Render extends Object3D {

    designAspect:number=1;
    width: number = 0;
    height: number = 0;
    landscape:boolean=true;
    p: number = 1;
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    gl;
    vpMat = mat4.create();
    viewMat;
    perspectiveMat;
    materialStack = [];
    defaultCamera: Camera;
    aspect;
    pointScale=1;
    currentGlTexture = [];
    currentGlProgram;


    constructor(public designResolution=[1024,768]) {
        super();
        this.root = this;
        this.isRoot = true;
        this.designAspect=this.designResolution[1]/this.designResolution[0];
        this.p = Engine.settings.pixelRatio;
        this.container = Engine.settings.container;
        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);
        this.canvas.style.width = this.canvas.style.height = "100%";
        this.setupGL();
        this.defaultCamera = new PerspectiveCamera(this);
        this.defaultCamera.setAsDefaultCamera();
        this.resize();
        window.addEventListener('resize', function () {
            this.resize()
        }.bind(this));
        this.dispatchEvent('InitFinished');
        this.update();
    }

    setupGL() {
        this.gl = this.canvas.getContext('webgl', {
                premultipliedAlpha: false,
                alpha: false
            }) || this.canvas.getContext('experimental-webgl', {
                premultipliedAlpha: false,
                alpha: false
            });
        if (!this.gl) {
            throw "WebGL Not Support"
        }
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        var hf = this.gl.getExtension('OES_texture_half_float');
        if(hf){
            this.gl['HALF_FLOAT'] = hf.HALF_FLOAT_OES;
        }
        this.gl.getExtension('OES_texture_float');
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    }

    resize() {
        this.canvas.style.width = this.container.offsetWidth+'px';
        this.canvas.style.height = this.container.offsetHeight+'px';
        this.canvas.width = (this.width = this.canvas.offsetWidth) * this.p;
        this.canvas.height = (this.height = this.canvas.offsetHeight) * this.p;
        this.aspect = this.height / this.width;
        this.gl.viewport(0, 0, this.width * this.p, this.height * this.p);
        this.landscape=(this.designResolution[1]/this.designResolution[0]>this.aspect);
        if(this.landscape){
            this.pointScale=this.height/this.designResolution[1]*this.p
        }else{
            this.pointScale=this.width/this.designResolution[1]*this.p
        }
        this.dispatchEvent('resize')
    }

    update() {
        window.requestAnimationFrame(this.update.bind(this));
        Engine.eventBus.dispatchEvent("beforeupdate");
        Engine.audioCtl.update();
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        if (this.defaultCamera) {
            this.defaultCamera.update();
        }
        mat4.multiply(this.vpMat, this.perspectiveMat, this.viewMat);
        super.update();
        Engine.eventBus.dispatchEvent("afterupdate")
    }
}
