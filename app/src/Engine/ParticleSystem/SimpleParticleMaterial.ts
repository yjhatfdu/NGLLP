/**
 * Created by yjh on 16/8/19.
 */
import {Material} from "../Core/Material";
import * as Engine from '../Engine'
export class SimpleParticleMaterial extends Material {
    color = [1, 1, 1, 1];
    progress = 0;
    size = 5;
    opacity = 1;
    fade = 1;
    speed=1;

    constructor(private sx, private sy, private sh, private sw, private row, private stride) {
        super();

        let vst = `
            //x,y,size
            attribute vec3 position;
            //born,direction,speed,textureType
            attribute vec4 properties;
            uniform mat4 mvpMat;
            uniform float progress;
            uniform float fade;
            uniform float size;
            uniform float speed;
            varying float textType;
            varying float fopacity;
            void main(){
                float p=max(0.0,progress-properties[0]);
                vec2 _speed=vec2(cos(properties[1]),sin(properties[1]))*properties[2];
                gl_Position=mvpMat*vec4(position.xy+_speed*speed*p,0.0,1.0);
                gl_PointSize=position[2]*size*P;
                if(p==0.0){gl_PointSize=0.0;};
                textType=properties[3];
                fopacity=1.0-pow(progress,3.0/fade);

            }
        `;
        let fst = `
        //#define sx=0.0;
        //#define sy=0.0;
        //#define sw=0.0;
        //#define sh=0.0;
        //#define row=0.0;
        //#define stride=0.0;
        precision mediump float;
        uniform sampler2D texture;
        uniform vec4 color;
        uniform float opacity;
        varying float textType;
        varying float fopacity;
        void main(){
            float x=mod(textType,stride);
            float y=mod(floor(textType/stride),row);
            vec2 uv=gl_PointCoord*vec2(sw/stride,sh/row)+vec2(sx+x*sw/stride,sy+y*sh/row);
            //gl_FragColor=texture2D(texture,gl_PointCoord*vec2(sw,sh)+vec2(sx,sy));
            gl_FragColor=texture2D(texture,uv)*color;
            gl_FragColor.xyz=gl_FragColor.xyz*1.5*gl_FragColor.a;
            gl_FragColor[3]=gl_FragColor[3]*opacity*fopacity*1.5;



        }`;
        this.uniforms=[
            {name:"color",type:"4fv"},
            {name:"progress",type:"1f"},
            {name:"fade",type:"1f"},
            {name:"size",type:"1f"},
            {name:"texture",type:"1i",value:0},
            {name:"opacity",type:"1f"},
            {name:"speed",type:"1f"},
        ];
        this.attributes=[
            {name:"position",size:3},
            {name:"properties",size:4},
        ];
        this.initProgram(vst,fst,{
            sx:sx.toPrecision(5),
            sy:sy.toPrecision(5),
            sh:sh.toPrecision(5),
            sw:sw.toPrecision(5),
            row:row.toPrecision(5),
            stride:stride.toPrecision(5),
            P:Engine.render.pointScale.toPrecision(5)
        });
        this.enableBlend = true;
        this.enableDepthTest = false;
        this.enableDepthWrite = false;
    }
}