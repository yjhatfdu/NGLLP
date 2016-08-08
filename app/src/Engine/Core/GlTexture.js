/**
 * Created by yjh on 15/12/20.
 */
System.register(['../Base', '../Engine'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Base, Engine;
    var BufferTexture, GlTexture;
    return {
        setters:[
            function (Base_1) {
                Base = Base_1;
            },
            function (Engine_1) {
                Engine = Engine_1;
            }],
        execute: function() {
            BufferTexture = (function () {
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
                BufferTexture.prototype.active = function (texIndex) {
                    if (texIndex === void 0) { texIndex = 0; }
                    this.gl.activeTexture(this.gl.TEXTURE0 + texIndex);
                    this.gl.bindTexture(this.gl.TEXTURE_2D, this.glTexture);
                };
                return BufferTexture;
            }());
            GlTexture = (function (_super) {
                __extends(GlTexture, _super);
                function GlTexture(source, bufferTexture, x, y, w, h) {
                    _super.call(this);
                    this.standAlone = false;
                    this.source = source;
                    if (bufferTexture) {
                        _a = [x, y, w, h], this.x = _a[0], this.y = _a[1], this.w = _a[2], this.h = _a[3];
                        this.bufferTex = bufferTexture;
                        this.glTexture = this.bufferTex.glTexture;
                        this.sx = x / bufferTexture.size;
                        this.sy = y / bufferTexture.size;
                        this.sw = w / bufferTexture.size;
                        this.sh = h / bufferTexture.size;
                    }
                    else {
                        this.standAlone = true;
                        this.sx = 0;
                        this.sy = 0;
                        this.sw = 1;
                        this.sh = 1;
                    }
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
                    if (standAlone) {
                        //todo 扩展支持video采样
                        var newGlTexture_1 = new GlTexture();
                        newGlTexture_1.glTexture = gl.createTexture();
                        gl.bindTexture(gl.TEXTURE_2D, newGlTexture_1.glTexture);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgObj);
                        return newGlTexture_1;
                    }
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
                    for (var i = 0; i < GlTexture.bufferTexList.length; i++) {
                        var bufferTexture = GlTexture.bufferTexList[i];
                        if (bufferTexture.subTextures.length == 0) {
                            return new GlTexture(src, bufferTexture, 0, 0, w, h);
                        }
                        for (var j = bufferTexture.subTextures.length - 1; j >= 0; j--) {
                            var subTex = bufferTexture.subTextures[j];
                            var x1 = subTex.x + subTex.w + 2, y1 = subTex.y + 2;
                            var x2 = subTex.x + 2, y2 = subTex.y + subTex.h + 2;
                            for (var k = bufferTexture.subTextures.length - 1; k >= 0; k--) {
                                var tmpSubTex = bufferTexture.subTextures[k];
                                var tx = tmpSubTex.x, ty = tmpSubTex.y, tw = tmpSubTex.w, th = tmpSubTex.h;
                                if ((x1 > tx + tw || y1 > ty + th || x1 + w < tx || y1 + h < ty) && x1 + w < bufferTexture.size && y1 + h < bufferTexture.size) {
                                    return new GlTexture(src, bufferTexture, x1, y1, w, h);
                                }
                                if ((x2 > tx + tw || y2 > ty + th || x2 + w < tx || y2 + h < ty) && x2 + w < bufferTexture.size && y2 + h < bufferTexture.size) {
                                    return new GlTexture(src, bufferTexture, x2, y2, w, h);
                                }
                            }
                        }
                    }
                    var gl = Engine.render.gl;
                    var newBufferTexture = new BufferTexture(gl, Math.min(gl.getParameter(gl.MAX_TEXTURE_SIZE), 4096));
                    GlTexture.bufferTexList.push(newBufferTexture);
                    return new GlTexture(src, newBufferTexture, 0, 0, w, h);
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
                    Engine.render.currentGlTexture[textureId] = this.glTexture;
                };
                GlTexture.textureIndex = {};
                GlTexture.bufferTexList = [];
                return GlTexture;
            }(Base.ObjectBase));
            exports_1("GlTexture", GlTexture);
        }
    }
});
//# sourceMappingURL=GlTexture.js.map