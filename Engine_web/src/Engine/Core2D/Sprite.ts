///<reference path='../Core/GlTexture.ts'/>
///<reference path='../Base.ts'/>
///<reference path='../Engine.ts'/>

/**
 * Created by yjh on 15/12/21.
 */
namespace Core2D {
    import ImageItem = Resource.ImageItem;

    export interface SpriteProtocol extends Base.NodeBase {
        batchNode;
        isRootSprite;
        opacity;
        zIndex;
    }

    export class Sprite extends Events.TouchItem implements SpriteProtocol {
        texture:Core.GlTexture;
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
        zIndex;
        frame = 0;

        constructor(imageItem:ImageItem, x?, y?, w?, h?, sx = 0, sy = 0, sw = 1, sh = 1, frameCount?, stride?, zIndex = 0) {
            super(w || 2 * imageItem.width / Engine.render.designResolution[1],
                h || 2 * imageItem.height / Engine.render.designResolution[1], x || 0, y || 0);
            this.texture = imageItem.texture;

            this.frameCount = frameCount || 1;
            this.stride = stride || 1;
            this.row = Math.ceil(this.frameCount / this.stride);
            [this.sx, this.sy, this.sw, this.sh, this.zIndex] = [sx, sy, sw, sh, zIndex];

        }

        update() {
            if (this.isRootSprite) {
                this.rx = this.x;
                this.ry = this.y;
                this.rw = this.w;
                this.rh = this.h;
                this.rScale = this.scale;
                this.rRotation = this.rotation;
                this.rOpacity = this.opacity;
            } else {
                var parent = this.parent;
                this.rx = this.x + parent.rx;
                this.ry = this.y + parent.ry;
                this.rw = this.w * parent.rw;
                this.rh = this.h * parent.rh;
                this.rScale = this.scale * parent.rScale;
                this.rRotation = this.rotation + parent.rRotation;
                this.rOpacity = this.opacity * parent.rOpacity;
            }
            super.update();
            //纹理不同的话,先绘制buffer
            if (this.batchNode.currentTexture != this.texture) {
                this.batchNode.currentTexture = this.texture;
                this.batchNode.drawBuffer();
            }
            //加入绘制缓存
            var posBuffer = this.batchNode.posBuffer;
            var uvBuffer = this.batchNode.uvBuffer;
            var opacityBuffer = this.batchNode.opacityBuffer;
            var frame = Math.round(this.frame);
            var sx = this.rw * this.rScale;
            var sy = this.rh * this.rScale;
            var ca = Math.cos(this.rRotation);
            var sa = Math.sin(this.rRotation);
            var casx = ca * sx;
            var casy = ca * sy;
            var sasx = sa * sx;
            var sasy = sa * sy;
            var x0 = -casx - sasy + this.rx;
            var y0 = -sasx + casy + this.ry;
            var x1 = x0 + casx + casx;
            var y1 = y0 + sasx + sasx;
            var x2 = x1 + sasy + sasy;
            var y2 = y1 - casy - casy;
            var x3 = x2 - casy - casy;
            var y3 = y2 - sasx - sasx;
            var uvW = this.sw / this.stride;
            var uvH = this.sh / this.row;
            var uvX = uvW * frame % this.stride;
            var uvY = uvH * (this.row - Math.floor(frame / this.stride));
            var tw = this.texture.sw;
            var th = this.texture.sh;
            var tx = this.texture.sx;
            var ty = this.texture.sy;
            var cursor = this.batchNode.updateCursor * 2;
            posBuffer[cursor] = x0;
            uvBuffer[cursor] = tx + tw * uvX;

            cursor++;
            posBuffer[cursor] = y0;
            uvBuffer[cursor] = ty + th * uvY;
            cursor++;
            posBuffer[cursor] = x1;
            uvBuffer[cursor] = tx + tw * (uvX + uvW);

            cursor++;
            posBuffer[cursor] = y1;
            uvBuffer[cursor] = uvBuffer[cursor - 2];
            cursor++;
            posBuffer[cursor] = x2;
            uvBuffer[cursor] = uvBuffer[cursor - 4];

            cursor++;
            posBuffer[cursor] = y2;
            uvBuffer[cursor] = ty + th * (uvY - uvH);
            cursor++;
            posBuffer[cursor] = x3;
            uvBuffer[cursor] = uvBuffer[cursor - 4];

            cursor++;
            posBuffer[cursor] = y3;
            uvBuffer[cursor] = uvBuffer[cursor - 2];
            cursor = this.batchNode.updateCursor;
            opacityBuffer[cursor] = opacityBuffer[cursor + 1] = opacityBuffer[cursor + 2] = opacityBuffer[cursor + 3] = this.rOpacity;

            this.batchNode.updateCursor += 4
        }

        setNewChild() {
            if (!this.batchNode) {
                return
            }
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                child.batchNode = this.batchNode;
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

    }



}

