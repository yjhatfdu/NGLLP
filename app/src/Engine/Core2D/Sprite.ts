///<reference path='../Core/GlTexture.ts'/>
///<reference path='../Base.ts'/>
///<reference path='../Engine.ts'/>
///<reference path='../Events/TouchItem.ts'/>
///<reference path='../Resource/ResourceItem.ts'/>
/**
 * Created by yjh on 15/12/21.
 */
import {GlTexture} from '../Core/GlTexture'
import * as Engine from '../Engine'
import {TouchItem} from '../Events/TouchItem'
import {ImageItemProtocol} from '../Resource/ResourceItem'
import * as Base from '../Base'


export interface SpriteProtocol extends Base.NodeBase {
    batchNode;
    isRootSprite;
    opacity;
    zIndex;
    setNewChild();
}

export class Sprite extends TouchItem implements SpriteProtocol {
    texture:GlTexture;
    frameCount;
    stride;
    row;
    rotation = 0;
    opacity = 1;
    sx;
    sy;
    sw;
    sh;
    batchNode;
    isRootSprite = false;
    rx;
    ry;
    rw;
    rh;
    rScale;
    rRotation;
    rOpacity;
    frame = 0;
    actions = {};
    resourceName;
    resource;

    constructor(imageItem:ImageItemProtocol, x, y, w, h, {sx = 0, sy = 0, sw = 1, sh = 1, frameCount=1, stride=1, zIndex = 0}) {
        super(x || 0, y || 0, w || 2 * imageItem.width / Engine.render.designResolution[1],
            h || 2 * imageItem.height / Engine.render.designResolution[1]);
        if (imageItem) {
            this.texture = imageItem.texture;
            this.resourceName = imageItem.name;
            this.resource = imageItem;
        }


        this.frameCount = frameCount || 1;
        this.stride = stride || 1;
        this.row = Math.floor(this.frameCount / this.stride);
        [this.sx, this.sy, this.sw, this.sh, this.zIndex] = [sx, sy, sw, sh, zIndex];

    }

    update() {
        this.rOpacity = this.isRootSprite ? this.opacity * this.batchNode.opacity : this.opacity * this.parent.rOpacity;
        if (this.rOpacity == 0) {
            return
        }
        if (this.isRootSprite) {
            this.rx = this.x;
            this.ry = this.y;
            this.rw = this.w;
            this.rh = this.h;
            this.rScale = this.scale;
            this.rRotation = this.rotation;
        } else {
            var parent = this.parent as Sprite;
            this.rx = this.x + parent.rx;
            this.ry = this.y + parent.ry;
            this.rw = this.w * parent.rw;
            this.rh = this.h * parent.rh;
            this.rScale = this.scale * parent.rScale;
            this.rRotation = this.rotation + parent.rRotation;

        }
        super.update(null);
        //没有纹理的化为虚拟sprite,直接跳过
        if (!this.texture) {
            return
        }
        //纹理不同的话,先绘制buffer
        if (this.batchNode.currentTexture != (this.texture.bufferTex || this.texture)) {
            this.batchNode.drawBuffer();
            this.batchNode.currentTexture = (this.texture.bufferTex || this.texture);
        }
        //加入绘制缓存
        let posBuffer = this.batchNode.posBuffer;
        let uvBuffer = this.batchNode.uvBuffer;
        let opacityBuffer = this.batchNode.opacityBuffer;
        let frame = Math.floor(this.frame % (this.stride * this.row));
        let sx = this.rw * this.rScale * 0.5;
        let sy = this.rh * this.rScale * 0.5;
        let ca = Math.cos(this.rRotation);
        let sa = Math.sin(this.rRotation);
        let casx = ca * sx;
        let casy = ca * sy;
        let sasx = sa * sx;
        let sasy = sa * sy;
        let x0 = -casx - sasy + this.rx;
        let y0 = -sasx + casy + this.ry;
        let x1 = x0 + casx + casx;
        let y1 = y0 + sasx + sasx;
        let x2 = x1 + sasy + sasy;
        let y2 = y1 - casy - casy;
        let x3 = x0 + sasy + sasy;
        let y3 = y2 - sasx - sasx;
        let uvW = this.sw / this.stride;
        let uvH = this.sh / this.row;
        let uvX = uvW * frame % this.stride;
        let uvY = uvH * Math.floor(frame / this.stride);
        let tw = this.texture.sw;
        let th = this.texture.sh;
        let tx = this.texture.sx + this.sx * this.texture.sw;
        let ty = this.texture.sy + this.sy * this.texture.sh;
        let uvCursor = this.batchNode.updateCursor * 2;
        let posCursor = this.batchNode.updateCursor * 3;
        let zpos = this.batchNode.enableZPosition ? this.zIndex : 0;
        posBuffer[posCursor] = x0;
        uvBuffer[uvCursor] = tx + tw * uvX;

        posCursor++;
        uvCursor++;
        posBuffer[posCursor] = y0;
        uvBuffer[uvCursor] = ty + th * uvY;

        posCursor++;
        posBuffer[posCursor] = zpos;

        posCursor++;
        uvCursor++;
        posBuffer[posCursor] = x1;
        uvBuffer[uvCursor] = tx + tw * (uvX + uvW);

        posCursor++;
        uvCursor++;
        posBuffer[posCursor] = y1;
        uvBuffer[uvCursor] = uvBuffer[uvCursor - 2];

        posCursor++;
        posBuffer[posCursor] = zpos;

        posCursor++;
        uvCursor++;
        posBuffer[posCursor] = x2;
        uvBuffer[uvCursor] = uvBuffer[uvCursor - 2];

        posCursor++;
        uvCursor++;
        posBuffer[posCursor] = y2;
        uvBuffer[uvCursor] = ty + th * (uvY + uvH);

        posCursor++;
        posBuffer[posCursor] = zpos;

        posCursor++;
        uvCursor++;
        posBuffer[posCursor] = x3;
        uvBuffer[uvCursor] = uvBuffer[uvCursor - 6];

        posCursor++;
        uvCursor++;
        posBuffer[posCursor] = y3;
        uvBuffer[uvCursor] = uvBuffer[uvCursor - 2];

        posCursor++;
        posBuffer[posCursor] = zpos;

        let cursor = this.batchNode.updateCursor;
        opacityBuffer[cursor] = opacityBuffer[cursor + 1] = opacityBuffer[cursor + 2] = opacityBuffer[cursor + 3] = this.rOpacity;

        this.batchNode.updateCursor += 4
    }

    setNewChild() {
        if (!this.batchNode) {
            return
        }
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i] as Sprite;
            child.batchNode = this.batchNode;
            child.isRootSprite = false;
            child.setNewChild()
        }
    }

    appendChild(item:Sprite) {
        this.setNewChild();
        super.appendChild(item)
    }

    insertChild(item:Sprite, index) {
        this.setNewChild();
        super.insertChild(item, index)
    }

    static deserialize(object) {
        //todo
        let spr = new Sprite(Engine.resourceCtl.getItem(object.resourceName), object.x, object.y,
            object.w, object.h,object);
        for (let i = 0; i < object.children.length; i++) {
            spr.appendChild(Sprite.deserialize(object[i]))
        }
        return spr
    }

    serialize() {
        let object = {} as any;
        object.children = [];
        //todo
        for (let i = 0; i < this.children.length; i++) {
            object.children.push((this.children[i] as Sprite).serialize())
        }
    }

}




