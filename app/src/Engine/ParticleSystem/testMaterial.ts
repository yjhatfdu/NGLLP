import {Material} from "../Core/Material";
/**
 * Created by yjh on 16/8/13.
 */
export class TestMaterial extends Material{
    vst=`
        attribute vec2 position;
        varying vec2 uv;
        void main() {
        uv=(position+1.0)*0.5;
        gl_Position=vec4(position,0.0,1.0);
        }
        `;
    fst=`
        precision mediump float;
        varying vec2 uv;
        uniform sampler2D texture;
        void main(){
            gl_FragColor=texture2D(texture,uv);
        }
    `;
    constructor(){
        super();
        this.attributes=[
            {name:'position',size:2}
        ];
        this.uniforms=[
            {name:'texture',type:'1i',value:0}
        ];
        super.initProgram(this.vst,this.fst);
    }
}
export class TestMaterial2 extends Material{
    vst=`
        attribute vec2 position;
        varying vec2 uv;
        void main() {
        uv=(position+1.0)*0.5;
        gl_Position=vec4(position,0.0,1.0);
        }
        `;
    fst=`
        precision mediump float;
        varying vec2 uv;
        void main(){
            gl_FragColor=vec4(255.0,255.0,255.0,0);
        }
    `;
    constructor(){
        super();
        this.attributes=[
            {name:'position',size:2}
        ];
        this.uniforms=[
        ];
        super.initProgram(this.vst,this.fst);
    }
}