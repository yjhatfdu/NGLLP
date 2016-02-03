/**
 * Created by yjh on 15/12/20.
 */
    ///<reference path='../Engine.ts'/>
namespace Core{

    class BufferTexture{
        glTexture;
        subTextures=[];
        size;
        gl;
        constructor(gl,size){
            this.gl=gl;
            this.size=size;
            this.glTexture=gl.createTexture();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D,this.glTexture);
            gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,size,size,0,
                gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(size*size*4));
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        }
        removeSubTex(item){
            this.subTextures.splice(this.subTextures.indexOf(item),1);
            if(this.subTextures.length==0){
                this.gl.deleteTexture(this.glTexture);
                GlTexture.removeBuffer(this);
            }
        }
    }

    export class GlTexture extends Base.ObjectBase{

        static textureIndex={};
        static bufferTexList=[];
        static getTexture(imgObj,standAlone=false){
            if(!imgObj.uuid){
                imgObj.uuid=Math.random()+''
            }
            if(GlTexture.textureIndex[imgObj.uuid]){
                return GlTexture.textureIndex[imgObj.uuid]
            }
            var width=imgObj.width;
            var height=imgObj.height;
            var gl=Engine.render.gl;
            if (Math.max(width,height)>Math.min(gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),4096)){
                throw 'Could not create Texture: Image is too large'
            }
            var newGlTexture=GlTexture.findSpace(width,height,imgObj);
            newGlTexture.update();
            newGlTexture.bufferTex.subTextures.push(newGlTexture);
            GlTexture.textureIndex[imgObj.uuid]=newGlTexture;
            return newGlTexture

        }
        static findSpace(w,h,src){
            //todo: optimize
            var result;
            for (var i=0;i<GlTexture.bufferTexList.length;i++){
                var bufferTexture=GlTexture.bufferTexList[i];
                if(bufferTexture.subTextures.length==0){
                    result=new GlTexture(src,bufferTexture,0,0,w,h);
                }
                for(var j=bufferTexture.subTextures.length-1;j--;j>=0){
                    var subTex=bufferTexture.subTextures[j];
                    var x=subTex.x+subTex.w,y=subTex.y;
                    var conflict=false;
                    for(var k=bufferTexture.subTextures.length-1;k--;k>=0){
                        var tmpSubTex=bufferTexture.subTextures[k];
                        var tx=tmpSubTex.x,ty=tmpSubTex.y,tw=tmpSubTex.w,th=tmpSubTex.h;
                        if(!(x>tx+tw||y>ty+th||x+w<tx||y+h<ty)){
                            conflict=true;
                            break
                        }
                        if(!conflict){
                            result=new GlTexture(src,bufferTexture,x,y,w,h);
                            return result
                        }
                        x=subTex.x;y=subTex.y+subTex.h;
                        conflict=false;
                        for(var k=bufferTexture.subTextures.length-1;k--;k>=0) {
                            var tmpSubTex = bufferTexture.subTextures[k];
                            var tx = tmpSubTex.x, ty = tmpSubTex.y, tw = tmpSubTex.w, th = tmpSubTex.h;
                            if (!(x > tx + tw || y > ty + th || x + w < tx || y + h < ty)||x+w>bufferTexture.size||y+h>bufferTexture.size) {
                                conflict = true;
                                break
                            }
                            if (!conflict) {
                                result = new GlTexture(src, bufferTexture, x, y, w, h);
                                return result
                            }
                        }
                    }
                }
            }
            if(!result){
                var gl=Engine.render.gl;
                var newBufferTexture=new BufferTexture(gl,Math.min(gl.getParameter(gl.MAX_TEXTURE_SIZE),4096));
                GlTexture.bufferTexList.push(newBufferTexture);
                result=new GlTexture(src,newBufferTexture,0,0,w,h);
            }
            return result;
        }
        static removeBuffer(item){
            GlTexture.bufferTexList.splice(GlTexture.bufferTexList.indexOf(item),1)
        }

        bufferTex;
        source;
        x;y;w;h;
        sx;sy;sw;sh;
        glTexture;
        constructor(source,bufferTexture,x,y,w,h){
            super();
            this.source=source;
            [this.x,this.y,this.w,this.h]=[x,y,w,h];
            this.bufferTex=bufferTexture;
            this.glTexture=this.bufferTex.glTexture;
            this.sx=x/bufferTexture.size;
            this.sy=y/bufferTexture.size;
            this.sw=w/bufferTexture.size;
            this.sh=h/bufferTexture.size;
        }

        update(){
            var gl=Engine.render.gl;
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D,this.bufferTex.glTexture);
            gl.texSubImage2D(gl.TEXTURE_2D,0,this.x,this.y,gl.RGBA,gl.UNSIGNED_BYTE,this.source);
        }
        deleteSource(){
            this.source=null;
        }
        destroy(){
            this.bufferTex.removeSubTex(this);
            var gl=Engine.render.gl;
            gl.activeTexture(gl.Texture0);
            gl.bindTexture(gl.TEXTURE_2D,this.bufferTex.glTexture);
            gl.texSubImage2D(gl.TEXTURE_2D,0,this.x,this.y,this.w,this.h,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(4*this.w*this.h))
        }
        active(textureId=0){
            var gl=Engine.render.gl;
            gl.activeTexture(gl.TEXTURE0+textureId);
            gl.bindTexture(gl.TEXTURE_2D,this.glTexture);
        }
    }
}