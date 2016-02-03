/**
 * Created by yjh on 15/12/21.
 */
    ///<reference path='../Material/SpriteMaterial.ts'/>
    ///<reference path='../Core/Object3D.ts'/>
    ///<reference path='Sprite.ts'/>
namespace Core2D{
    export class SpriteBatchNode extends Core.Object3D{
        material=new Material.SpriteMaterial();
        constructor(size=32){
            super();
            this.initBuffer(size)

        }

        posBuffer:Float32Array;
        uvBuffer:Float32Array;
        opacityBuffer:Float32Array;
        opacity;
        updateCursor=0;
        size;
        currentTexture;
        initBuffer(size){
            this.size=size;
            this.posBuffer=new Float32Array(size*8);
            this.uvBuffer=new Float32Array(size*8);
            this.opacityBuffer=new Float32Array(size*4);
            var indexBuffer=new Uint16Array(size*6);
            for(var i=0;i<size;i++){
                indexBuffer[6*i]=4*i;
                indexBuffer[6*i+1]=4*i+1;
                indexBuffer[6*i+2]=4*i+2;
                indexBuffer[6*i+3]=4*i;
                indexBuffer[6*i+4]=4*i+2;
                indexBuffer[6*i+5]=4*i+3;
            }
            this.material.bufferIBO(indexBuffer)
        }


        appendChild(item:Sprite){
            item.batchNode=this;
            item.setNewChild();
            item.isRootSprite=true;
            super.appendChild(item);
            this.children.sort(function (x:Sprite,y:Sprite) {
                return x.zIndex-y.zIndex
            })
        }
        insertChild(item:Sprite,index){
            item.batchNode=this;
            item.setNewChild();
            item.isRootSprite=true;
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
            this.material.bufferData('position',this.posBuffer,true);
            this.material.bufferData('uv',this.uvBuffer,true);
            this.material.bufferData('opacity',this.opacityBuffer,true);
            var gl=this.material.gl;
            gl.drawElements(gl.TRIANGLES,this.updateCursor*1.5,gl.UNSIGNED_SHORT,0);
            //gl.drawArrays(gl.TRIANGLES,0,6);
            this.updateCursor=0;
        }
    }
}