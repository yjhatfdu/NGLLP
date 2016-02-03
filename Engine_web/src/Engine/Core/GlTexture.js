var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by yjh on 15/12/20.
 */
///<reference path='../Engine.ts'/>
var Core;
(function (Core) {
    var BufferTexture = (function () {
        function BufferTexture(gl, size) {
            this.subTextures = [];
            this.gl = gl;
            this.size = size;
            this.glTexture = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(size * size * 4));
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        }
        BufferTexture.prototype.removeSubTex = function (item) {
            this.subTextures.splice(this.subTextures.indexOf(item), 1);
            if (this.subTextures.length == 0) {
                this.gl.deleteTexture(this.glTexture);
                GlTexture.removeBuffer(this);
            }
        };
        return BufferTexture;
    })();
    var GlTexture = (function (_super) {
        __extends(GlTexture, _super);
        function GlTexture(source, bufferTexture, x, y, w, h) {
            _super.call(this);
            this.source = source;
            _a = [x, y, w, h], this.x = _a[0], this.y = _a[1], this.w = _a[2], this.h = _a[3];
            this.bufferTex = bufferTexture;
            this.glTexture = this.bufferTex.glTexture;
            this.sx = x / bufferTexture.size;
            this.sy = y / bufferTexture.size;
            this.sw = w / bufferTexture.size;
            this.sh = h / bufferTexture.size;
            var _a;
        }
        GlTexture.getTexture = function (imgObj, standAlone) {
            if (standAlone === void 0) { standAlone = false; }
            if (!imgObj.uuid) {
                imgObj.uuid = Math.random() + '';
            }
            if (GlTexture.textureIndex[imgObj.uuid]) {
                return GlTexture.textureIndex[imgObj.uuid];
            }
            var width = imgObj.width;
            var height = imgObj.height;
            var gl = Engine.render.gl;
            if (Math.max(width, height) > Math.min(gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE), 4096)) {
                throw 'Could not create Texture: Image is too large';
            }
            var newGlTexture = GlTexture.findSpace(width, height, imgObj);
            newGlTexture.update();
            newGlTexture.bufferTex.subTextures.push(newGlTexture);
            GlTexture.textureIndex[imgObj.uuid] = newGlTexture;
            return newGlTexture;
        };
        GlTexture.findSpace = function (w, h, src) {
            //todo: optimize
            var result;
            for (var i = 0; i < GlTexture.bufferTexList.length; i++) {
                var bufferTexture = GlTexture.bufferTexList[i];
                if (bufferTexture.subTextures.length == 0) {
                    result = new GlTexture(src, bufferTexture, 0, 0, w, h);
                }
                for (var j = bufferTexture.subTextures.length - 1; j--; j >= 0) {
                    var subTex = bufferTexture.subTextures[j];
                    var x = subTex.x + subTex.w, y = subTex.y;
                    var conflict = false;
                    for (var k = bufferTexture.subTextures.length - 1; k--; k >= 0) {
                        var tmpSubTex = bufferTexture.subTextures[k];
                        var tx = tmpSubTex.x, ty = tmpSubTex.y, tw = tmpSubTex.w, th = tmpSubTex.h;
                        if (!(x > tx + tw || y > ty + th || x + w < tx || y + h < ty)) {
                            conflict = true;
                            break;
                        }
                        if (!conflict) {
                            result = new GlTexture(src, bufferTexture, x, y, w, h);
                            return result;
                        }
                        x = subTex.x;
                        y = subTex.y + subTex.h;
                        conflict = false;
                        for (var k = bufferTexture.subTextures.length - 1; k--; k >= 0) {
                            var tmpSubTex = bufferTexture.subTextures[k];
                            var tx = tmpSubTex.x, ty = tmpSubTex.y, tw = tmpSubTex.w, th = tmpSubTex.h;
                            if (!(x > tx + tw || y > ty + th || x + w < tx || y + h < ty) || x + w > bufferTexture.size || y + h > bufferTexture.size) {
                                conflict = true;
                                break;
                            }
                            if (!conflict) {
                                result = new GlTexture(src, bufferTexture, x, y, w, h);
                                return result;
                            }
                        }
                    }
                }
            }
            if (!result) {
                var gl = Engine.render.gl;
                var newBufferTexture = new BufferTexture(gl, Math.min(gl.getParameter(gl.MAX_TEXTURE_SIZE), 4096));
                GlTexture.bufferTexList.push(newBufferTexture);
                result = new GlTexture(src, newBufferTexture, 0, 0, w, h);
            }
            return result;
        };
        GlTexture.removeBuffer = function (item) {
            GlTexture.bufferTexList.splice(GlTexture.bufferTexList.indexOf(item), 1);
        };
        GlTexture.prototype.update = function () {
            var gl = Engine.render.gl;
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.bufferTex.glTexture);
            gl.texSubImage2D(gl.TEXTURE_2D, 0, this.x, this.y, gl.RGBA, gl.UNSIGNED_BYTE, this.source);
        };
        GlTexture.prototype.deleteSource = function () {
            this.source = null;
        };
        GlTexture.prototype.destroy = function () {
            this.bufferTex.removeSubTex(this);
            var gl = Engine.render.gl;
            gl.activeTexture(gl.Texture0);
            gl.bindTexture(gl.TEXTURE_2D, this.bufferTex.glTexture);
            gl.texSubImage2D(gl.TEXTURE_2D, 0, this.x, this.y, this.w, this.h, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4 * this.w * this.h));
        };
        GlTexture.prototype.active = function (textureId) {
            if (textureId === void 0) { textureId = 0; }
            var gl = Engine.render.gl;
            gl.activeTexture(gl.TEXTURE0 + textureId);
            gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
        };
        GlTexture.textureIndex = {};
        GlTexture.bufferTexList = [];
        return GlTexture;
    })(Base.ObjectBase);
    Core.GlTexture = GlTexture;
})(Core || (Core = {}));
