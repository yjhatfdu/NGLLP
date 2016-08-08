/**
 * Created by yjh on 16/1/19.
 */
///<reference path='../Base.ts'/>

import * as Base from '../Base'
import * as Engine from '../Engine'
export class Geometry extends Base.ObjectBase {
    positionVBO;
    uvVBO;
    normalVBO;
    IBO;
    elementsCount = 0;
    vboSet = {};

    constructor() {
        super();
        let gl = Engine.render.gl;
        this.positionVBO = gl.createBuffer();
        this.uvVBO = gl.createBuffer();
        this.normalVBO = gl.createBuffer();
        this.IBO = gl.createBuffer();
        this.vboSet['position'] = this.positionVBO;
        this.vboSet['uv'] = this.uvVBO;
        this.vboSet['normal'] = this.normalVBO;
    }

    bufferData(vbo, array, staticDraw = true) {
        var gl = Engine.render.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, array, staticDraw ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW)
    }

    bufferVBO(attributeName, array, staticDraw = true) {
        this.bufferData(this.vboSet[attributeName], array, staticDraw);
    }

    createVBO(attributeName) {
        this.vboSet[attributeName] = Engine.render.gl.createBuffer();
    }

    getVBO(attributeName) {
        return this.vboSet[attributeName]
    }

    set positionArray(value) {
        this.bufferData(this.positionVBO, value);
    }

    set uvArray(value) {
        this.bufferData(this.uvVBO, value);
    }

    set normalArray(value) {
        this.bufferData(this.normalVBO, value);
    }

    set elementsIndexArray(value) {
        let gl = Engine.render.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, value, gl.STATIC_DRAW);
        this.elementsCount = value.length
    }


}
