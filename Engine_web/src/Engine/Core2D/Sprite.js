var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path='../Core/GlTexture.ts'/>
///<reference path='../Base.ts'/>
///<reference path='../Engine.ts'/>
///<reference path='../Events/TouchItem.ts'/>
/**
 * Created by yjh on 15/12/21.
 */
var Core2D;
(function (Core2D) {
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite(imageItem, x, y, w, h, sx, sy, sw, sh, frameCount, stride, zIndex) {
            if (sx === void 0) { sx = 0; }
            if (sy === void 0) { sy = 0; }
            if (sw === void 0) { sw = 1; }
            if (sh === void 0) { sh = 1; }
            if (zIndex === void 0) { zIndex = 0; }
            _super.call(this, x || 0, y || 0, w || 2 * imageItem.width / Engine.render.designResolution[1], h || 2 * imageItem.height / Engine.render.designResolution[1]);
            this.rotation = 0;
            this.opacity = 1;
            this.isRootSprite = false;
            this.frame = 0;
            this.actions = {};
            if (imageItem) {
                this.texture = imageItem.texture;
                this.resourceName = imageItem.name;
            }
            this.frameCount = frameCount || 1;
            this.stride = stride || 1;
            this.row = Math.floor(this.frameCount / this.stride);
            _a = [sx, sy, sw, sh, zIndex], this.sx = _a[0], this.sy = _a[1], this.sw = _a[2], this.sh = _a[3], this.zIndex = _a[4];
            var _a;
        }
        Sprite.prototype.update = function () {
            if (this.isRootSprite) {
                this.rx = this.x;
                this.ry = this.y;
                this.rw = this.w;
                this.rh = this.h;
                this.rScale = this.scale;
                this.rRotation = this.rotation;
                this.rOpacity = this.opacity;
            }
            else {
                var parent = this.parent;
                this.rx = this.x + parent.rx;
                this.ry = this.y + parent.ry;
                this.rw = this.w * parent.rw;
                this.rh = this.h * parent.rh;
                this.rScale = this.scale * parent.rScale;
                this.rRotation = this.rotation + parent.rRotation;
                this.rOpacity = this.opacity * parent.rOpacity;
            }
            _super.prototype.update.call(this, null);
            //没有纹理的化为虚拟sprite,直接跳过
            if (!this.texture) {
                return;
            }
            //纹理不同的话,先绘制buffer
            if (this.batchNode.currentTexture != this.texture.bufferTex) {
                this.batchNode.currentTexture = this.texture.bufferTex;
                this.batchNode.drawBuffer();
            }
            //加入绘制缓存
            var posBuffer = this.batchNode.posBuffer;
            var uvBuffer = this.batchNode.uvBuffer;
            var opacityBuffer = this.batchNode.opacityBuffer;
            var frame = Math.round(this.frame);
            var sx = this.rw * this.rScale * 0.5;
            var sy = this.rh * this.rScale * 0.5;
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
            var uvY = uvH * Math.floor(frame / this.stride);
            var tw = this.texture.sw;
            var th = this.texture.sh;
            var tx = this.texture.sx;
            var ty = this.texture.sy;
            var uvCursor = this.batchNode.updateCursor * 2;
            var posCursor = this.batchNode.updateCursor * 3;
            var zpos = this.batchNode.enableZPosition ? this.zIndex : 0;
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
            var cursor = this.batchNode.updateCursor;
            opacityBuffer[cursor] = opacityBuffer[cursor + 1] = opacityBuffer[cursor + 2] = opacityBuffer[cursor + 3] = this.rOpacity;
            this.batchNode.updateCursor += 4;
        };
        Sprite.prototype.setNewChild = function () {
            if (!this.batchNode) {
                return;
            }
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                child.batchNode = this.batchNode;
                child.isRootSprite = false;
                child.setNewChild();
            }
        };
        Sprite.prototype.appendChild = function (item) {
            this.setNewChild();
            _super.prototype.appendChild.call(this, item);
        };
        Sprite.prototype.insertChild = function (item, index) {
            this.setNewChild();
            _super.prototype.insertChild.call(this, item, index);
        };
        Sprite.deserialize = function (object) {
            //todo
            var spr = new Sprite(Engine.resourceCtl.getItem(object.resourceName), object.x, object.y, object.w, object.h, object.sx, object.sy, object.sw, object.sh, object.frameCount, object.stride, object.zIndex);
            for (var i = 0; i < object.children.length; i++) {
                spr.appendChild(Sprite.deserialize(object[i]));
            }
            return spr;
        };
        Sprite.prototype.serialize = function () {
            var object = {};
            object.children = [];
            //todo
            for (var i = 0; i < this.children.length; i++) {
                object.children.push(this.children[i].serialize());
            }
        };
        return Sprite;
    })(Events.TouchItem);
    Core2D.Sprite = Sprite;
})(Core2D || (Core2D = {}));
//# sourceMappingURL=Sprite.js.map