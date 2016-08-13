/**
 * Created by yjh on 16/8/12.
 */
import {Material} from "../Core/Material";
import {EmitterType} from './GpuParticleSystem'
/**
 * Created by yjh on 16/8/11.
 */
export class VelocityMaterial extends Material {

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
            uniform vec3 gravity;

            //阻力系数
            uniform float resistance;

            uniform sampler2D velocityTexture;

            //描述粒子基本属性，x为大小,y为随机种子，z为出生时间，w为寿命
            uniform sampler2D staticTexture;


            uniform vec3 wind;



            uniform float emitSpeed;
            uniform float emitVary;
            uniform float emitPercent;
            uniform float speedVary;


            #if (EMITTER_TYPE==0)

            #elif (EMITTER_TYPE==1)
            uniform vec4 direction;
            #elif (EMITTER_TYPE==2)
            uniform vec4 direction;
            #elif (EMITTER_TYPE==3)

            #endif

             highp float lastRand;
             float rnd(){
                    lastRand=fract(1103.515245*lastRand+0.12345);
                    return lastRand;
             }
             float rnd_ext(){
                    return 2.0*rnd()-1.0;
             }


            void main() {

                 mediump vec4 staticInfo=texture2D(staticTexture,uv);
                 lastRand=fract(staticInfo.y+currentTime/totalTime);
                 vec4 v=texture2D(velocityTexture,uv);
                 highp float particleTime=mod(currentTime-staticInfo.z,totalTime);
                    //寿命结束

                  if(particleTime>staticInfo.w){
                  gl_FragColor=vec4(0.0,0.0,0.0,0.0);
                     return;
                  }
                  highp float offsetTime=mod(currentTime,totalTime)-staticInfo.z;
                 if(offsetTime < deltaTime&&offsetTime>0.0){
                 if(rnd()>emitPercent){
                 gl_FragColor=vec4(0.0,0.0,0.0,0.0);
                 return;
                 }
                    #if (EMITTER_TYPE==0)
                        vec3 dir=normalize(vec3(rnd_ext(),rnd_ext(),rnd_ext()));
                    #elif (EMITTER_TYPE==1)
                        vec3 dir=normalize(direction.xyz+direction.w*vec3(rnd_ext(),rnd_ext(),rnd_ext()));
                    #elif (EMITTER_TYPE==2)
                        vec3 dir=normalize(direction.xyz+direction.w*vec3(rnd_ext(),rnd_ext(),rnd_ext()));
                    #elif (EMITTER_TYPE==3)
                        vec3 dir=normalize(vec3(rnd_ext(),rnd_ext(),rnd_ext()));
                    #endif
                   v.xyz=dir*emitSpeed*(1.0+emitVary*rnd_ext());

                   v.w=1.0;


                 }
                 vec3 a=gravity;
                 a=a+vec3(rnd_ext(),rnd_ext(),rnd_ext())*speedVary*v.xyz;

                 //#if (USE_WIND==1)
                 //a=a-edge(v.xyz,0.001)*0.5*pow(v.xyz-wind,2.0)*resistance*staticInfo.x*staticInfo.x;
                 //#else



                 //#endif

                 v.xyz=v.xyz+a*deltaTime;
                 v.xyz=v.xyz*(1.0-resistance*resistance);

                 gl_FragColor=v;
             }
    `;

    emitterType:EmitterType=EmitterType.point;
    totalTime;
    emitSpeed:number;
    emitVary:number;
    emitPercent:number;
    speedVary:number;
    resistance:number;
    currentTime:number;
    deltaTime:number;
    gravity:Array<number>;
    wind:Array<number>;

    constructor(totalTime) {
        super();
        this.totalTime=totalTime;
        this.attributes = [
            {name: 'position', size: 2},
        ];
        this.uniforms = [
            {name: 'velocityTexture', type: '1i', value: 0},
            {name: 'staticTexture', type: '1i', value: 1},
            {name: 'emitSpeed', type: '1f', value: 1},
            {name: 'emitVary', type: '1f', value: 1},
            {name: 'emitPercent', type: '1f', value: 1},
            {name: 'speedVary', type: '1f', value: 1},
            {name: 'resistance', type: '1f', value: 1},
            {name: 'currentTime', type: '1f', value: 0},
            {name: 'deltaTime', type: '1f', value: 0},
            {name: 'gravity', type: '3fv', value: [1, 1, 1]},
            {name: 'wind', type: '3fv', value: [0, 0, 0]}
        ];
        this.enableBlend = false;
        this.enableDepthTest = false;
        this.enableDepthWrite = false;
        this.init();
    }
    init(){
        this.initProgram(this.vst,this.fst,{
            EMITTER_TYPE:this.emitterType,
            totalTime:this.totalTime,
            USE_WIND:0
        })
    }

}