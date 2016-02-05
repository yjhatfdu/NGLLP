/**
 * Created by yjh on 15/12/21.
 */
///<reference path='Sprite.ts'/>
///<reference path='../Core/GlTexture.ts'/>
namespace Core2D{
    class CanvasItem extends Base.ObjectBase implements Resource.ImageItemProtocol{
        width;
        height;
        texture:Core.GlTexture;
        name='canvas';
        canvas;
        constructor(width,height){
            super();
            this.resetSize(width,height);
            this.texture=Core.GlTexture.getTexture(this.canvas)
        }
        resetSize(width,height){
            this.width=width;
            this.height=height;
            this.canvas=document.createElement('canvas');
            this.canvas.width=width;
            this.canvas.height=height;
        }
    }


    //尽可能减少更新次数,每次更新在iOS平台会产生较大性能影响
    export class TextSprite extends Sprite{
        canvasItem:CanvasItem;
        canvas:CanvasRenderingContext2D;
        needUpdate=true;
        constructor(width,height,text?){
            super(new CanvasItem(width,height));
            this.canvasItem=this.resource;
            this.canvas=this.canvasItem.canvas.getContext('2d');
            this.canvas.textAlign='center';
            this.canvas.textBaseline='middle;';
            this.textColor='#FFFFFF';
            this.shadowColor='#000000';
            this.fontSize=15;
            this.fontType='SimHei, "Microsoft YaHei", Arial, Helvetica, sans-serif';
            //this.shadowOffset=[3,3];
            this.shadowBlur=0;
            this.text=text||'';
        }

        _fontSize;
        _fontType;
        set fontType(v:string){
            this._fontType=v;
            this.canvas.font=`${this._fontSize}px ${this._fontType}`;
            this.needUpdate=true;
        }

        set fontSize(v:number){
            this._fontSize=v;
            this.canvas.font=`${this._fontSize}px ${this._fontType}`;
            this.needUpdate=true;
        }

        set textColor(v:string){
            this.canvas.fillStyle=v;
            this.needUpdate=true;
        }

        set shadowColor(v:string){
            this.canvas.shadowColor=v;
            this.needUpdate=true;
        }

        set shadowBlur(v:number){
            this.canvas.shadowBlur=v;
            this.needUpdate=true;
        }

        set shadowOffset(v:Array<number>){
            this.canvas.shadowOffsetX=v[0];
            this.canvas.shadowOffsetY=v[1];
            this.needUpdate=true;
        }
        _textContent='';
        set text(v){
            this._textContent=v;
            this.needUpdate=true;
        }
        update(){
            if(this.needUpdate){
                this.canvas.clearRect(0,0,this.canvasItem.width,this.canvasItem.height);
                this.canvas.fillText(this._textContent,this.canvasItem.width/2,this.canvasItem.height/2);
                this.canvasItem.texture.update();
                this.needUpdate=false;
            }
            super.update();
        }



    }
}