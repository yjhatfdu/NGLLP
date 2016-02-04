/**
 * Created by yjh on 15/12/20.
 */
/**
 * Created by yjh on 15/11/19.
 */
///<reference path='Render.ts'/>
///<reference path='GlProgram.ts'/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Core;
(function (Core) {
    var Material = (function (_super) {
        __extends(Material, _super);
        function Material(uniformList, attributeList) {
            _super.call(this);
            this.enableBlend = false;
            this.enableDepthTest = false;
            this.enableDepthWrite = false;
            this.uniformList = {};
            this.attributeList = {};
            this.textures = [];
            this.uniforms = [];
            this.attributes = [];
            this.autoBindAttrib = true;
            this.gl = Engine.render.gl;
            this.uniformList = uniformList || this.uniformList;
            this.attributeList = attributeList || this.attributeList;
        }
        Material.prototype.initProgram = function (vst, fst, flags) {
            this.program = Core.GlProgram.getProgram(vst, fst, flags);
            this.gl.useProgram(this.program);
            this.bindUniform('mvpMat', 'Matrix4fv');
            this.bindUniforms(this.uniforms);
            this.bindAttributes(this.attributes);
        };
        Material.prototype.bindUniform = function (name, type, value) {
            this.uniformList[name] = { name: name, location: this.gl.getUniformLocation(this.program, name), func: this.gl['uniform' + type].bind(this.gl), ismat: type.indexOf('Matrix') >= 0, value: value };
        };
        Material.prototype.bindUniforms = function (list) {
            for (var i = 0; i < list.length; i++) {
                this.bindUniform(list[i].name, list[i].type, list[i].value);
            }
        };
        Material.prototype.uniformData = function (name, data) {
            this.uniformList[name].value = data;
        };
        Material.prototype.bindAttribute = function (name, size) {
            this.attributeList[name] = { name: name, location: this.gl.getAttribLocation(this.program, name), size: size };
        };
        Material.prototype.bindVBO = function (name, vbo) {
            var attrib = this.attributeList[name];
            if (!attrib) {
                return;
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
            this.gl.enableVertexAttribArray(attrib.location);
            this.gl.vertexAttribPointer(attrib.location, attrib.size, this.gl.FLOAT, false, 0, 0);
        };
        Material.prototype.bindIBO = function (IBO) {
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, IBO);
        };
        Material.prototype.bufferIBO = function (data) {
            if (!this.IBO) {
                this.IBO = this.gl.createBuffer();
            }
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.IBO);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
        };
        Material.prototype.bindAttributes = function (list) {
            for (var i = 0; i < list.length; i++) {
                this.bindAttribute(list[i].name, list[i].size);
            }
        };
        Material.prototype.bufferData = function (name, data, dynamic) {
            if (dynamic === void 0) { dynamic = false; }
            var attrib = this.attributeList[name];
            if (!attrib.vbo) {
                attrib.vbo = this.gl.createBuffer();
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attrib.vbo);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, data, dynamic ? this.gl.DYNAMIC_DRAW : this.gl.STATIC_DRAW);
            this.gl.enableVertexAttribArray(attrib.location);
            this.gl.vertexAttribPointer(attrib.location, attrib.size, this.gl.FLOAT, false, 0, 0);
        };
        Material.prototype.bindTexture = function (texture, index) {
            this.textures[index] = texture;
        };
        Material.prototype.active = function (push) {
            if (push === void 0) { push = false; }
            if (push) {
                Engine.render.materialStack.push(this);
            }
            else {
                Engine.render.materialStack[Engine.render.materialStack.length - 1] = this;
            }
            this.gl.useProgram(this.program);
            if (this.enableBlend) {
                this.gl.enable(this.gl.BLEND);
            }
            else {
                this.gl.disable(this.gl.BLEND);
            }
            if (this.enableDepthTest) {
                this.gl.enable(this.gl.DEPTH_TEST);
            }
            else {
                this.gl.disable(this.gl.DEPTH_TEST);
            }
            this.gl.depthMask(this.enableDepthWrite);
            //bind uniforms
            for (var i in this.uniformList) {
                var uniform = this.uniformList[i];
                if (uniform.ismat) {
                    uniform.func(uniform.location, false, uniform.value || this[uniform.name] || 0);
                }
                else {
                    uniform.func(uniform.location, uniform.value || this[uniform.name] || 0);
                }
            }
            //bind attributes
            if (this.autoBindAttrib) {
                for (var j in this.attributeList) {
                    var attrib = this.attributeList[j];
                    if (!attrib.vbo) {
                        continue;
                    }
                    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attrib.vbo);
                    this.gl.enableVertexAttribArray(attrib.location);
                    this.gl.vertexAttribPointer(attrib.location, attrib.size, this.gl.FLOAT, false, 0, 0);
                }
            }
            if (this.IBO) {
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.IBO);
            }
            //bind textures
            for (var k = 0; k < this.textures.length; k++) {
                if (this.textures[k]) {
                    this.gl.activeTexture(this.gl.TEXTURE0 + k);
                    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[k].active(k));
                }
            }
        };
        Material.prototype.popMaterial = function () {
            Engine.render.materialStack.pop();
            Engine.render.materialStack[Engine.render.materialStack.length - 1].active();
        };
        return Material;
    })(Base.ObjectBase);
    Core.Material = Material;
})(Core || (Core = {}));
//# sourceMappingURL=Material.js.map