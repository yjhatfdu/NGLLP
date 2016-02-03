var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by yjh on 15/12/21.
 */
///<reference path='../Material/SpriteMaterial.ts'/>
///<reference path='../Core/Object3D.ts'/>
///<reference path='Sprite.ts'/>
var Core2D;
(function (Core2D) {
    var SpriteBatchNode = (function (_super) {
        __extends(SpriteBatchNode, _super);
        function SpriteBatchNode(size) {
            if (size === void 0) { size = 32; }
            _super.call(this);
            this.material = new Material.SpriteMaterial();
            this.updateCursor = 0;
            this.initBuffer(size);
        }
        SpriteBatchNode.prototype.initBuffer = function (size) {
            this.size = size;
            this.posBuffer = new Float32Array(size * 8);
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
            this.material.bufferIBO(indexBuffer);
        };
        SpriteBatchNode.prototype.appendChild = function (item) {
            item.batchNode = this;
            item.setNewChild();
            item.isRootSprite = true;
            _super.prototype.appendChild.call(this, item);
            this.children.sort(function (x, y) {
                return x.zIndex - y.zIndex;
            });
        };
        SpriteBatchNode.prototype.insertChild = function (item, index) {
            item.batchNode = this;
            item.setNewChild();
            item.isRootSprite = true;
            _super.prototype.insertChild.call(this, item, index);
            this.children.sort(function (x, y) {
                return x.zIndex - y.zIndex;
            });
            if (this.getChildrenCount() > this.size) {
                this.size *= 2;
                this.initBuffer(this.size);
            }
        };
        SpriteBatchNode.prototype.removeChild = function (item) {
            _super.prototype.removeChild.call(this, item);
            var count = this.getChildrenCount();
            if (count > 16 && count < this.size * 0.5) {
                this.size *= 0.5;
                this.initBuffer(this.size);
            }
        };
        SpriteBatchNode.prototype.update = function () {
            _super.prototype.update.call(this);
            this.drawBuffer();
        };
        SpriteBatchNode.prototype.drawBuffer = function () {
            if (this.updateCursor == 0) {
                return;
            }
            this.currentTexture.active();
            this.material.bufferData('position', this.posBuffer, true);
            this.material.bufferData('uv', this.uvBuffer, true);
            this.material.bufferData('opacity', this.opacityBuffer, true);
            var gl = this.material.gl;
            gl.drawElements(gl.TRIANGLES, this.updateCursor * 1.5, gl.UNSIGNED_SHORT, 0);
            //gl.drawArrays(gl.TRIANGLES,0,6);
            this.updateCursor = 0;
        };
        return SpriteBatchNode;
    })(Core.Object3D);
    Core2D.SpriteBatchNode = SpriteBatchNode;
})(Core2D || (Core2D = {}));
