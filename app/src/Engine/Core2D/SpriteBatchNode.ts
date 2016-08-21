/**
 * Created by yjh on 15/12/21.
 */
import {Object3D} from '../Core/Object3D'
import {Sprite, SpriteProtocol} from './Sprite'
import {CreateSpriteMaterial} from '../Material/SpriteMaterial'
export class SpriteBatchNode extends Object3D {
    material = CreateSpriteMaterial();

    constructor(size = 32) {
        super();
        this.initBuffer(size)

    }

    protected posBuffer: Float32Array;
    protected uvBuffer: Float32Array;
    protected opacityBuffer: Float32Array;
    opacity=1;
    protected updateCursor = 0;
    protected size;
    protected currentTexture;
    enablePerspective = false;
    //use z-index as z posistion
    enableZPosition = false;
    needUpdate = false;

    initBuffer(size) {
        this.size = size;
        this.posBuffer = new Float32Array(size * 12);
        this.uvBuffer = new Float32Array(size * 8);
        this.opacityBuffer = new Float32Array(size * 4);
        var indexBuffer = new Uint16Array(size * 6);
        for (var i = 0; i < size; i++) {
            indexBuffer[6 * i] = 4 * i;
            indexBuffer[6 * i + 1] = 4 * i + 1;
            indexBuffer[6 * i + 2] = 4 * i + 2;
            indexBuffer[6 * i + 3] = 4 * i;
            indexBuffer[6 * i + 4] = 4 * i + 2;
            indexBuffer[6 * i + 5] = 4 * i + 3;
        }
        this.material.bufferIBO(indexBuffer)
    }


    appendChild(item: SpriteProtocol) {
        item.batchNode = this;
        item.parent=this;
        item.setNewChild();
        item.isRootSprite = true;
        super.appendChild(item);
        this.needUpdate = true;

    }

    insertChild(item: SpriteProtocol, index) {
        item.batchNode = this;
        item.setNewChild();
        item.isRootSprite = true;
        super.insertChild(item, index);
        this.needUpdate = true;

    }

    removeChild(item) {
        super.removeChild(item);

    }

    update() {
        if (this.needUpdate) {
            this.updateChildren();
        }
        super.update();
        this.material.active();
        this.drawBuffer();
    }

    private updateChildren() {
        this.needUpdate = false;
        var count = this.getChildrenCount();
        if (count < this.size * 0.5) {
            this.size = Math.max(Math.pow(2, Math.ceil(Math.log(count) / Math.log(2))), 16);
            this.initBuffer(this.size)
        }
        if (count > this.size) {
            this.size = Math.pow(2, Math.ceil(Math.log(count) / Math.log(2)));
            this.initBuffer(this.size)
        }
    }

    drawBuffer() {
        if (this.updateCursor == 0) {
            return
        }
        this.currentTexture.active();
        this.material.bufferData('position', this.posBuffer, true);
        this.material.bufferData('uv', this.uvBuffer, true);
        this.material.bufferData('opacity', this.opacityBuffer, true);
        var gl = this.material.gl;
        gl.drawElements(gl.TRIANGLES, this.updateCursor * 1.5, gl.UNSIGNED_SHORT, 0);
        //gl.drawArrays(gl.TRIANGLES,0,6);
        this.updateCursor = 0;
    }
}
