/**
 * Created by yjh on 15/12/25.
 */
    ///<reference path='../Core/Material.ts'/>
    ///<reference path='../Core/GlProgram.ts'/>
namespace Material{
    export class SpriteMaterial extends Core.Material{

        uniforms=[
            {name:'posZ',type:'1f'},
            {name:'texture',type:'1i',value:0}
        ];
        attributes=[
            {name:'position',size:2},
            {name:'uv',size:2},
            {name:'opacity',size:1}
        ];

        constructor(){
            super();
            this.autoBindAttrib=false;
            var vst=`
                attribute vec2 position;
                attribute vec2 uv;
                attribute float opacity;
                uniform mat4 mvpMat;
                uniform float posZ;
                varying float vOpacity;
                varying vec2 uvCoord;
                void main(){
                    vec4 pos=vec4(position,posZ,1.0);
                    gl_Position=mvpMat*pos;
                    uvCoord=uv;
                    vOpacity=opacity;
                }
            `;
            var fst=`
                precision lowp float;
                varying vec2 uvCoord;
                uniform sampler2D texture;
                varying float vOpacity;
                void main(){
                    vec4 color=texture2D(texture,uvCoord);
                    color[3]=color[3]*vOpacity;
                    gl_FragColor=color;
                }
            `;
            this.initProgram(vst,fst);
            this.enableBlend=true;
            this.enableDepthTest=true;
            this.enableDepthWrite=false;
        }
    }
}