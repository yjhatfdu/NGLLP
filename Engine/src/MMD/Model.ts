/**
 * Created by yjh on 16/3/29.
 */
///<reference path='../../API.d.ts'/>
    import {Geometry} from 'NGLLP/Core3D'
    import {PMDLoader} from "./PMDLoader";
    import {Engine} from "NGLLP/Engine"
import {ImageItem} from "NGLLP/Resource";
import {MMDMaterial} from "./MMDMaterial";
export class Model extends Geometry{
    loader:PMDLoader;
    initialized=false;
    positionArray:Float32Array;
    oriPositionArray:Float32Array;
    toonTextures=[];
    material=new MMDMaterial();
    constructor(loader:PMDLoader){
        super();
        this.loader=loader;
    }
    init(){

        return Promise.all([
                this.initMaterials.bind(this)(),
                Promise.resolve(this.initVerticles())
            ])

    }
    initVerticles(){
        let verticles=this.loader.verticles;
        let count=verticles.length;
        this.positionArray=new Float32Array(count*3);
        let uvArray=new Float32Array(count*2);
        let normalArray=new Float32Array(count*2);
        let boneNumberArray=new Uint16Array(count*2);
        let boneWeightArray=new Float32Array(count);
        let edgeFlagArray=new Uint8Array(count);
        for(let i=0;i<count;i++){
            let v=verticles[i];
            this.positionArray[i*3]=v.x;
            this.positionArray[i*3+1]=v.y;
            this.positionArray[i*3+2]=v.z;
            uvArray[i*2]=v.u;
            uvArray[i*2+1]=v.v;
            normalArray[i*3]=v.nx;
            normalArray[i*3+1]=v.ny;
            normalArray[i*3+2]=v.nz;
            boneNumberArray[i*2]=v.bone_num1;
            boneNumberArray[i*2+1]=v.bone_num2;
            boneWeightArray[i]=v.bone_weight;
            edgeFlagArray[i]=v.edge_flag;
        }
        this.oriPositionArray=new Float32Array(this.positionArray);
        super.createVBO('position');
        super.createVBO('normal');
        super.createVBO('boneNumber');
        super.createVBO('uv');
        super.createVBO('boneWeight');
        super.createVBO('edgeFlag');
        super.bufferVBO('position',this.positionArray);
        super.bufferVBO('uv',uvArray);
        super.bufferVBO('normal',normalArray);
        super.bufferVBO('boneNumber',boneNumberArray);
        super.bufferVBO('boneWeight',boneWeightArray);
        super.bufferVBO('edgeFlag',edgeFlagArray)


    }
    initMaterials(){
        return new Promise(resolve=>{
            let fileList=[];
            for(let item of this.loader.materials){
                if(item.texture_file_name){
                    fileList.push({name:item.texture_file_name,url:item.texture_file_name,standAloneTexture:true})
                }
            }
            for(let item of this.loader.toon_file_names){
                fileList.push({name:item,url:item,standAloneTexture:true})
            }
            Engine.resourceCtl.loadResource(fileList).then(resourceCtl=>{
                for(let item of this.loader.materials){
                    item.texture=(resourceCtl.getItem(item.texture_file_name) as ImageItem).texture;
                }
                for(let item of this.loader.toon_file_names){
                    this.toonTextures.push((resourceCtl.getItem(item) as ImageItem).texture);
                }
                resolve();
            });
        })
    }
}