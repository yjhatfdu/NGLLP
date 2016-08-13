/**
 * Created by yjh on 16/8/13.
 */
import {Material} from "../Core/Material";

export class ParticleMaterial extends Material {

    private vst = `
        //#define PARTICLE_TYPE 0
        //#define totalTime 10.0
        /*#define PARTICLE_TYPE
            0:pointSprite;
            1:rectangle;
            2:cube
        */

        //#define USE_TEXTURE 0



        attribute vec2 uv;
        uniform float currentTime;


        uniform sampler2D positionTexture;
        uniform sampler2D staticTexture;


        uniform mat4 mvpMat;

        varying float opacity;
        // 范围 0-10
        uniform float fade;

        #if (USE_TEXTURE==0)
            varying vec4 color;
        #endif

        #if (PARTICLE_TYPE==0)
            uniform float pointScale;
        #else
            attribute vec2 uvCoord;
            uniform float rotateSpeed;
            varying vec2 vUvCoord;
        #endif
        float lastRand=0.0;
         float rnd(){
                lastRand=fract(11035.15245*lastRand+0.12345);
                return lastRand;
         }
         float rnd_ext(){
                return 2.0*rnd()-1.0;
         }
         mat4 rotationMatrix(vec3 axis, float angle){
            axis = normalize(axis);
            float s = sin(angle);
            float c = cos(angle);
            float oc = 1.0 - c;
            return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
            oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
            oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
            0.0,                                0.0,                                0.0,                                1.0);   }
        void main() {
            vec4 position=texture2D(positionTexture,uv);

            vec4 staticInfo=texture2D(staticTexture,uv);
            float particleTime=mod(currentTime-staticInfo.z,totalTime);
            if(particleTime>=staticInfo.w||position.w==0.0){
                    gl_Position=vec4(5.0,5.0,5.0,0.0);
                    return;
                  }
            gl_Position=mvpMat*position;
            #if (PARTICLE_TYPE==0)
                #if (SIMPLE_PARTICLE==0)
                     gl_PointSize=clamp(staticInfo.x/(gl_Position.z)*pointScale,1.0,50.0);
                     //gl_PointSize=sqrt(staticInfo.x/gl_Position.z);
                #else
                     gl_PointSize=1.0;
                #endif
            #else

                lastRand=particleTime;
                vec3 rotateDir=normalize(vec3(rnd_ext(),rnd_ext(),rnd_ext()));
                position=position*rotationMatrix(rotateDir,particleTime*rotateSpeed);
                vUvCoord=uvCoord;

            #endif

            #if (USE_TEXTURE==0)
                color=vec4(1.0,1.0,1.0,1.0);
            #endif
            float timeRatio=particleTime/staticInfo.w;
            opacity=mix(pow(timeRatio,0.1*fade),pow(1.0-timeRatio,0.1*fade),timeRatio);
            opacity=opacity/pow(gl_PointSize,0.08);

        }`;

    private fst = `
        precision mediump float;

        varying float opacity;
        uniform float feather;
        uniform float alpha;
        #if (PARTICLE_TYPE==0)

        #else
            varying vec2 vUvCoord;
        #endif

        #if (USE_TEXTURE==0)
            varying vec4 color;
        #else
            uniform sampler2D particleTexture;
        #endif

        void main() {
        #if (PARTICLE_TYPE==0)
            vec2 uv=gl_PointCoord;
        #else
            vec2 uv=vUvCoord;
        #endif

        #if (USE_TEXTURE==0)

        #else
            vec4 color=texture2D(particleTexture,vUvCoord);
        #endif
        #if (SIMPLE_PARTICLE==0)
            float fopacity=1.0-2.0*distance(uv,vec2(0.5,0.5));
            //float fopacity=1.0-step(0.5,distance(uv,vec2(0.5,0.5)));
            gl_FragColor=vec4(color.xyz,fopacity*opacity*color[3]*fopacity*alpha);
        #else
            gl_FragColor=color;
        #endif
        }
    `;


    private _simpleParticle = 0;
    private _useTexture = 0;


    set simpleParticle(v) {
        this._simpleParticle = v;
        this.needUpdate = true;
    }

    set useTexture(v) {
        this._useTexture = v;
        this.needUpdate = true
    }

    private totalTime;
    private needUpdate = true;

    currentTime:number;
    feather:number;
    pointScale=1;
    fade=1;
    alpha=1;

    constructor(totalTime, vertexUvData, private particleType = 0, simpleParticle = 0, useTexture = 0, textureUvData = null) {
        super();
        this.enableBlend=true;
        this.enableDepthTest=false;
        this.enableDepthWrite=false;
        this.totalTime = totalTime;
        this.simpleParticle = simpleParticle;
        this.useTexture = useTexture;
        this.attributes = [
            {name: 'uv', size: 2}
        ];
        if (this.particleType>0){
            this.attributes.push({'name':'uvCoord',size:2})
        }
        this.uniforms = [
            {name: 'currentTime', type: '1f', value: 0},
            {name: 'positionTexture', type: '1i', value: 0},
            {name: 'staticTexture', type: '1i', value: 1},
            {name: 'feather', type: '1f', value: 0},
            {name: 'pointScale', type: '1f', value: 1},
            {name: 'fade', type: '1f', value: 8},
            {name: 'alpha', type: '1f', value: 8},
        ];
        this.init();
    }

    init() {
        super.initProgram(this.vst, this.fst, {
            totalTime: this.totalTime,
            PARTICLE_TYPE: this.particleType,
            SIMPLE_PARTICLE: this._simpleParticle?1:0,
            USE_TEXTURE: this._useTexture
        });
        this.needUpdate=false;
    }
    active(push?){
        if(this.needUpdate){
            this.init()
        }
        super.active(push)
    }
}