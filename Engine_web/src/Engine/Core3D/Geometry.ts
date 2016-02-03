/**
 * Created by yjh on 16/1/19.
 */
    ///<reference path='../Base.ts'/>
namespace Core3D{
    export class Geometry extends Base.ObjectBase{
        positionVBO;
        uvVBO;
        normalVBO;
        IBO;
        elementsCount=0;
        constructor(){
            super();
            var gl=Engine.render.gl;
            this.positionVBO=gl.createBuffer();
            this.uvVBO=gl.createBuffer();
            this.normalVBO=gl.createBuffer();
            this.IBO=gl.createBuffer();
        }
        bufferData(vbo,array){
            var gl=Engine.render.gl;
            gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
            gl.bufferData(gl.ARRAY_BUFFER,array,gl.STATIC_DRAW)
        }
        set positionArray(value){
            this.bufferData(this.positionVBO,value);
        }
        set uvArray(value){
            this.bufferData(this.uvVBO,value);
        }
        set normal(value){
            this.bufferData(this.normalVBO,value);
        }
        set elementsIndexArray(value){
            var gl=Engine.render.gl;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.IBO);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,value,gl.STATIC_DRAW);
            this.elementsCount=value.length
        }


        

    }
}