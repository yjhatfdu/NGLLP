/**
 * Created by yjh on 16/3/30.
 */
///<reference path='../../API.d.ts'/>
    import {Material} from 'NGLLP/Core'
export class MMDMaterial extends Material{
    constructor(){
        super([
            {name:'bones',type:'matrix4fv'},
            {name:'diffuse',type:'1f'},
            {name:'alpha',type:'1f'},
            {name:'shininess',type:'1f'},
            {name:'specular',type:'1f'},
            {name:'ambient',type:'3fv'},
            {name:'texture',type:'1i'},
            {name:'toonTexture',type:'1i'},
            {name:'edgeFlag',type:'1f'},

        ],[
            {name:'position',size:3},
            {name:'uv',size:2},
            {name:'normal',size:3},
            {name:'boneNumber',size:2,type:'UNSIGNED_SHORT'},
            {name:'boneWeight',size:1},
            {name:'edgeFlag',size:1,type:'UNSIGNED_BYTE'}
        ]);
        this.autoBindAttrib=false;
        this.enableBlend=false;
        this.enableDepthTest=true;
        this.enableDepthWrite=true;

    }
}