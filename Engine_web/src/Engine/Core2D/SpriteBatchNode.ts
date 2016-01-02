import {Float32Array} from "../../../../../../../Applications/WebStorm.app/Contents/plugins/JavaScriptLanguage/typescriptCompiler/external/lib";
/**
 * Created by yjh on 15/12/21.
 */
namespace Core2D{
    export class SpriteBatchNode extends Core.Object3D{
        material=new Material.SpriteMaterial();
        constructor(){
            super();

        }

        posBuffer:Float32Array;
        uvBuffer:Float32Array;
        opacityBuffer:Float32Array;
        size=32;
        opacity;
        updateCursor=0;
        currentTexture;
        initBuffer(size){
            this.posBuffer=new Float32Array(size*8);
            this.uvBuffer=new Float32Array(size*8);
            this.opacityBuffer=new Float32Array(size*4);
            var indexBuffer=new Float32Array(size*6);
            for(var i=0;i<size;i++){
                indexBuffer[6*i]=4*i;
                indexBuffer[6*i+1]=4*i+1;
                indexBuffer[6*i+2]=4*i+2;
                indexBuffer[6*i+3]=4*i+1;
                indexBuffer[6*i+4]=4*i+2;
                indexBuffer[6*i+5]=4*i+3;
            }
            this.material.bufferIBO(indexBuffer)
        }


        appendChild(item:Sprite){
            item.batchNode=this;
            item.setNewChild();
            super.appendChild(item);
            this.children.sort(function (x:Sprite,y:Sprite) {
                return x.zIndex-y.zIndex
            })
        }
        insertChild(item:Sprite,index){
            item.batchNode=this;
            item.setNewChild();
            super.insertChild(item,index);
            this.children.sort(function (x:Sprite,y:Sprite) {
                return x.zIndex-y.zIndex
            });
            if(this.getChildrenCount()>this.size){
                this.size*=2;
                this.initBuffer(this.size)
            }
        }
        removeChild(item){
            super.removeChild(item);
            var count=this.getChildrenCount();
            if(count>16 && count<this.size*0.5){
                this.size*=0.5;
                this.initBuffer(this.size)
            }
        }

        update(){

            super.update();
            this.drawBuffer();
        }
        drawBuffer(){
            if(this.updateCursor==0){
                return
            }
            this.currentTexture.active();
            this.material.bufferData('pos',this.posBuffer,true);
            this.material.bufferData('uv',this.uvBuffer,true);
            this.material.bufferData('opacity',this.opacityBuffer,true);
            var gl=this.material.gl;
            gl.drawElements(gl.TRIANGLES,this.updateCursor,gl.UNSIGNED_SHORT,0);
            this.updateCursor=0;
        }
    }
}