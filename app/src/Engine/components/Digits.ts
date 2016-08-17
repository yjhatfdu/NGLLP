import {Sprite} from "../Core2D/Sprite";
/**
 * Created by yjh on 16/8/17.
 */
export class Digits extends Sprite {
    private aspect = 1;
    private _number = null;
    alignCenter = true;
    private needUpdate = true;
    private numberSprs = [];
    private imgItem;
    private _h=1;
    constructor(imgItem, public stride, public row, number = null, {
        sw=1,sh=1,sx=0,sy=0,alignCenter=true,x=0,y=0,h=1
        }) {
        super(null, 0, 0, 1, 1, {});
        if (row * stride != 10) {
            throw('You should have 10 digits')
        }
        this.imgItem = imgItem;
        this.aspect = sw / stride / sh * row;
        this._number = number;
        this.sw = sw;
        this.sh = sh;
        this.sx = sx;
        this.sy = sy;
        this.x = x;
        this.y = y;
        this.w = this.h = h;

        this.alignCenter = alignCenter;
        this.updateNumber();
    }

    updateNumber() {
        if(this.number==null){
            for (let i of this.children){
                i.opacity=0
            }
            this.needUpdate=false;
            return
        }
        let num = Math.round(this.number) + '';
        let length = num.length;
        for (let i = this.numberSprs.length; i < length; i++) {
            let newSpr = new Sprite(this.imgItem, 0, 0, this.aspect, 1, {
                sh: this.sh,
                sw: this.sw,
                sx: this.sx,
                sy: this.sy,
                frameCount:10,
                stride: this.stride
            });
            this.appendChild(newSpr);
            this.numberSprs.push(newSpr);
        }
        let offset=this.alignCenter?-(length-1)*this.aspect*0.5:0;
        for(let i=0;i<length;i++){
            let spr=this.numberSprs[i];
            spr.frame=parseInt(num[i]);
            spr.x=(offset+this.aspect*i)*this._h;
            spr.opacity=1;
        }
        for(let i=length;i<this.numberSprs.length;i++){
            this.numberSprs[i].opacity=0;
        }
        this.needUpdate=false;
    }

    get number() {
        return this._number
    }

    set number(v) {
        this._number = v;
        this.needUpdate = true;
    }
    set h(v){
        this._h=this.w=v;
        this.needUpdate=true
    }
    get h(){
        return this._h
    }

    update(){
        if(this.needUpdate&&this.opacity>0){
            this.updateNumber()
        }
        super.update()

    }
}