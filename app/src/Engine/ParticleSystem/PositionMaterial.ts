import {Material} from "../Core/Material";
import {EmitterType} from './GpuParticleSystem'
/**
 * Created by yjh on 16/8/11.
 */
export class PositionMaterial extends Material {

    vst=`
        attribute vec2 position;
        varying vec2 uv;
        void main() {
        uv=(position+1.0)*0.5;
        gl_Position=vec4(position,0.0,1.0);
        }
    `;
    fst=`
        precision highp float;
        varying vec2 uv;
        uniform highp float deltaTime;
        uniform highp float currentTime;
        uniform lowp sampler2D velocityTexture;
        uniform sampler2D positionTexture;
        //描述粒子基本属性，x为大小，，z为出生时间，w为寿命
        uniform sampler2D staticTexture;
        uniform highp vec3 emitterPosition;

        #if (EMITTER_TYPE==0)

        #elif (EMITTER_TYPE==1)

        #elif (EMITTER_TYPE==2)
        uniform vec4 direction;
        #elif (EMITTER_TYPE==3)
        //half size;
        uniform highp vec3 emitterSize;
        #endif

        vec4 unpack(const in float depth)
        {
            const vec4 bit_shift = vec4(256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);
            const vec4 bit_mask  = vec4(0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);
            vec4 res = fract(depth * bit_shift);
            res -= res.xxyz * bit_mask;
            return res;
        }

        float pack(const in vec4 rgba_depth)
        {
            const vec4 bit_shift = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);
            float depth = dot(rgba_depth, bit_shift);
            return depth;
        }

        float lastRand=0.0;
        float rnd(){
            lastRand=fract(11035.15245*lastRand+0.12345);
            return lastRand;
        }
        float rnd_ext(){
            return 2.0*rnd()-1.0;
        }


        void main() {

        vec4 staticInfo=texture2D(staticTexture,uv);
        lastRand=staticInfo.y;
        vec4 pos=texture2D(positionTexture,uv);

        float particleTime=mod(currentTime-staticInfo.z,totalTime);
           //寿命结束
         if(particleTime>staticInfo.w){
            pos.w=0.0;
            gl_FragColor=vec4(pos);
            return;
         }
         //生成粒子
         if(particleTime>0.0 && particleTime<=deltaTime){
                #if (EMITTER_TYPE==0)
                 pos=vec4(emitterPosition,1.0);
                #elif (EMITTER_TYPE==1)
                 pos=vec4(emitterPosition,1.0);
                #elif (EMITTER_TYPE==2)

                #elif (EMITTER_TYPE==3)
                lastRand=staticInfo.y*fract(currentTime/totalTime);
                  pos=vec4(emitterPosition+vec3(rnd_ext()*emitterSize.x,rnd_ext()*emitterSize.y,rnd_ext()*emitterSize.z),1.0);
                #endif
             }
         vec4 v=texture2D(velocityTexture,uv);
         pos.xyz=pos.xyz+v.xyz*deltaTime;

         gl_FragColor=vec4(pos.xyz,v.w);
         //gl_FragColor=vec4(1.0,1.0,1.0,1.0);

        }
    `;

    totalTime;
    emitterPosition:Array<number>;
    currentTime:number;
    deltaTime:number;
    emitColor:Array<number>;
    emitterSize:Array<number>;
    constructor(totalTime,public emitterType=EmitterType.point) {
        super();
        this.totalTime=totalTime;
        this.attributes = [
            {name: 'position', size: 2},
        ];
        this.uniforms = [
            {name: 'positionTexture', type: '1i', value: 0},
            {name: 'velocityTexture', type: '1i', value: 1},
            {name: 'staticTexture', type: '1i', value: 2},
            {name: 'emitterPosition', type: '3fv', value: [0, 0, 0]},
            {name: 'currentTime', type: '1f', value: 0},
            {name: 'deltaTime', type: '1f', value: 0},
            {name: 'emitColor', type: '4fv', value: [1, 1, 1, 1]},
            {name: 'emitterSize', type: '3fv', value: [1, 1, 1 ]}
        ];
        this.enableBlend = false;
        this.enableDepthTest = false;
        this.enableDepthWrite = false;
        this.init()
    }
    init(){
        this.initProgram(this.vst,this.fst,{
            EMITTER_TYPE:this.emitterType,
            totalTime:this.totalTime
        })
    }

}