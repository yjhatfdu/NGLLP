/**
 * Created by yjh on 15/12/21.
 */
///<reference path='Sprite.ts'/>

import {SpriteProtocol} from "./Sprite";
import {NodeBase} from '../Base'
import {vec2,vec3} from 'gl-matrix'

export class QuadrangleSprite extends NodeBase implements SpriteProtocol {
    batchNode;
    isRootSprite;
    opacity = 1;
    zIndex = 0;
    texture;
    private rp0 = vec2.create();
    private rp1 = vec2.create();
    private rp2 = vec2.create();
    private rp3 = vec2.create();

    constructor(imgItem, public sx = 0, public sy = 0, public sw = 0, public sh = 0, public p0 = vec2.create(), public p1 = vec2.create(), public p2 = vec2.create(), public p3 = vec2.create()) {
        super();
        this.texture = imgItem.texture;
        this.sx = this.sx / imgItem.width;
        this.sy = this.sy / imgItem.height;
        this.sw = this.sw ? this.sw / imgItem.width : 1;
        this.sh = this.sh ? this.sh / imgItem.height : 1
    }

    setNewChild() {
        return
    }

    appendChild(item) {
        //cannot has child
        return
    }

    update() {
        let parent = this.parent;
        let rOpacity = (this.parent.rOpacity || this.parent.opacity) * this.opacity;
        if (rOpacity == 0) {
            return
        }
        if (this.isRootSprite) {
            this.rp0[0] = this.p0[0];
            this.rp0[1] = this.p0[1];
            this.rp1[0] = this.p1[0];
            this.rp1[1] = this.p1[1];
            this.rp2[0] = this.p2[0];
            this.rp2[1] = this.p2[1];
            this.rp3[0] = this.p3[0];
            this.rp3[1] = this.p3[1];
        } else {
            this.rp0[0] = this.p0[0] * parent.rw + parent.rx;
            this.rp0[1] = this.p0[1] * parent.rh + parent.ry;
            this.rp1[0] = this.p1[0] * parent.rw + parent.rx;
            this.rp1[1] = this.p1[1] * parent.rh + parent.ry;
            this.rp2[0] = this.p2[0] * parent.rw + parent.rx;
            this.rp2[1] = this.p2[1] * parent.rh + parent.ry;
            this.rp3[0] = this.p3[0] * parent.rw + parent.rx;
            this.rp3[1] = this.p3[1] * parent.rh + parent.ry;
        }
        super.update(null);
        if (this.batchNode.currentTexture != (this.texture.bufferTex || this.texture)) {
            this.batchNode.drawBuffer();
            this.batchNode.currentTexture = (this.texture.bufferTex || this.texture);
        }
        let posBuffer = this.batchNode.posBuffer;
        let uvBuffer = this.batchNode.uvBuffer;
        let opacityBuffer = this.batchNode.opacityBuffer;
        let uvCursor = this.batchNode.updateCursor * 2;
        let posCursor = this.batchNode.updateCursor * 3;
        let zpos = this.batchNode.enableZPosition ? this.zIndex : 0;
        let tx = this.texture.sx+this.sx*this.texture.sw;
        let ty = this.texture.sy+this.sy*this.texture.sh;
        let tw =  this.texture.sw*this.sw;
        let th =  this.texture.sh*this.sh;
        posBuffer[posCursor++] = this.rp0[0];
        uvBuffer[uvCursor++] = tx;
        posBuffer[posCursor++] = this.rp0[1];
        uvBuffer[uvCursor++] = ty;
        posBuffer[posCursor++] = zpos;





        posBuffer[posCursor++] = this.rp2[0];
        uvBuffer[uvCursor++] = tx;
        posBuffer[posCursor++] = this.rp2[1];
        uvBuffer[uvCursor++] = ty+th;
        posBuffer[posCursor++] = zpos;

        posBuffer[posCursor++] = this.rp1[0];
        uvBuffer[uvCursor++] = tx+tw;
        posBuffer[posCursor++] = this.rp1[1];
        uvBuffer[uvCursor++] = ty;
        posBuffer[posCursor++] = zpos;

        posBuffer[posCursor++] = this.rp3[0];
        uvBuffer[uvCursor++] = tx+tw;
        posBuffer[posCursor++] = this.rp3[1];
        uvBuffer[uvCursor++] = ty+th;
        posBuffer[posCursor++] = zpos;

        let cursor = this.batchNode.updateCursor;

        opacityBuffer[cursor++] = opacityBuffer[cursor++] = opacityBuffer[cursor++] = opacityBuffer[cursor++] = rOpacity;
        this.batchNode.updateCursor += 4;
    }

    serialize() {

    }
}
