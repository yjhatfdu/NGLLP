/**
 * Created by yjh on 15/12/20.
 */
/**
 * Created by yjh on 15/11/19.
 */

import * as Base from '../Base'
import * as Engine from '../Engine'
import {GlProgram} from './GlProgram'


export class Material extends Base.ObjectBase {
    render;
    program;
    enableBlend = false;
    enableDepthTest = false;
    enableDepthWrite = false;
    uniformList = {};
    attributeList = {};
    IBO;
    gl;
    mvpMat;
    textures = [];
    uniforms = [];
    attributes = [];
    autoBindAttrib = true;

    constructor(uniformList?, attributeList?) {
        super();
        this.gl = Engine.render.gl;
        this.uniformList = uniformList || this.uniformList;
        this.attributeList = attributeList || this.attributeList;
    }

    initProgram(vst, fst, flags?) {
        this.program = GlProgram.getProgram(vst, fst, flags);
        this.gl.useProgram(this.program);
        try {
            this.bindUniform('mvpMat', 'Matrix4fv');
        } catch (e) {

        }
        this.bindUniforms(this.uniforms);
        this.bindAttributes(this.attributes);
    }

    bindUniform(name, type, value?) {
        this.uniformList[name] = {
            name: name,
            location: this.gl.getUniformLocation(this.program, name),
            func: this.gl['uniform' + type].bind(this.gl),
            ismat: type.indexOf('Matrix') >= 0,
            value: value
        }
    }

    bindUniforms(list) {
        for (var i = 0; i < list.length; i++) {
            this.bindUniform(list[i].name, list[i].type, list[i].value)
        }
    }

    uniformData(name, data, rightNow = false) {
        this.uniformList[name].value = data;
        if (rightNow) {
            let uniform = this.uniformList[name];
            if (uniform.ismat) {
                uniform.func(uniform.location, false, data)
            } else {
                uniform.func(uniform.location, data)
            }
        }

    }

    bindAttribute(name, size, type = 'FLOAT') {
        this.attributeList[name] = {
            name: name,
            location: this.gl.getAttribLocation(this.program, name),
            size: size,
            type: this.gl[type]
        }
    }

    bindVBO(name, vbo) {
        let attrib = this.attributeList[name];
        if (!attrib) {
            return
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
        this.gl.enableVertexAttribArray(attrib.location);
        this.gl.vertexAttribPointer(attrib.location, attrib.size, attrib.type, false, 0, 0)
    }

    bindIBO(IBO) {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, IBO);
    }

    bufferIBO(data) {
        if (!this.IBO) {
            this.IBO = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.IBO);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, data, this.gl.STATIC_DRAW)
    }

    bindAttributes(list) {
        for (var i = 0; i < list.length; i++) {
            this.bindAttribute(list[i].name, list[i].size, list[i].type)
        }
    }

    bufferData(name, data:Uint8Array|Int16Array|Int32Array|Float32Array, dynamic = false) {
        let attrib = this.attributeList[name];
        if (!attrib.vbo) {
            attrib.vbo = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attrib.vbo);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, dynamic ? this.gl.DYNAMIC_DRAW : this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(attrib.location);
        this.gl.vertexAttribPointer(attrib.location, attrib.size, this.gl.FLOAT, false, 0, 0)
    }

    bindTexture(texture, index) {
        this.textures[index] = texture;
    }

    active(push = false) {
        if (push) {
            Engine.render.materialStack.push(this)
        } else {
            Engine.render.materialStack[Engine.render.materialStack.length - 1] = this
        }
        this.gl.useProgram(this.program);
        if (this.enableBlend) {
            this.gl.enable(this.gl.BLEND)
        } else {
            this.gl.disable(this.gl.BLEND)
        }
        if (this.enableDepthTest) {
            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.depthFunc(this.gl.LEQUAL)
        } else {
            this.gl.disable(this.gl.DEPTH_TEST)
        }
        this.gl.depthMask(this.enableDepthWrite);
        //bind uniforms
        for (var i in this.uniformList) {
            var uniform = this.uniformList[i];
            let localValue = this[uniform.name];
            let value = (localValue == null || localValue == undefined) ? uniform.value : localValue;
            if (uniform.ismat) {
                if (!value) {
                    continue
                }
                uniform.func(uniform.location, false, value)
            } else {
                uniform.func(uniform.location, value)
            }

        }
        //bind attributes
        if (this.autoBindAttrib) {
            for (var j in this.attributeList) {
                let attrib = this.attributeList[j];
                if (!attrib.vbo) {
                    continue
                }
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attrib.vbo);
                this.gl.enableVertexAttribArray(attrib.location);
                this.gl.vertexAttribPointer(attrib.location, attrib.size, this.gl.FLOAT, false, 0, 0)
            }
        }


        if (this.IBO) {
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.IBO)
        }

        //bind textures
        for (let k = 0; k < this.textures.length; k++) {
            if (this.textures[k]) {
                this.gl.activeTexture(this.gl.TEXTURE0 + k);
                if (this.textures[k].active) {
                    this.textures[k].active(k)
                } else {
                    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[k])
                }

            }
        }

    }

    popMaterial() {
        Engine.render.materialStack.pop();
        Engine.render.materialStack[Engine.render.materialStack.length - 1].active()
    }
}

