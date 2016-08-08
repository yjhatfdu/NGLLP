/**
 * Created by yjh on 16/1/19.
 */
///<reference path='../Base.ts'/>
System.register(['../Base', '../Engine'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Base, Engine;
    var Geometry;
    return {
        setters:[
            function (Base_1) {
                Base = Base_1;
            },
            function (Engine_1) {
                Engine = Engine_1;
            }],
        execute: function() {
            Geometry = (function (_super) {
                __extends(Geometry, _super);
                function Geometry() {
                    _super.call(this);
                    this.elementsCount = 0;
                    this.vboSet = {};
                    var gl = Engine.render.gl;
                    this.positionVBO = gl.createBuffer();
                    this.uvVBO = gl.createBuffer();
                    this.normalVBO = gl.createBuffer();
                    this.IBO = gl.createBuffer();
                    this.vboSet['position'] = this.positionVBO;
                    this.vboSet['uv'] = this.uvVBO;
                    this.vboSet['normal'] = this.normalVBO;
                }
                Geometry.prototype.bufferData = function (vbo, array, staticDraw) {
                    if (staticDraw === void 0) { staticDraw = true; }
                    var gl = Engine.render.gl;
                    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
                    gl.bufferData(gl.ARRAY_BUFFER, array, staticDraw ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW);
                };
                Geometry.prototype.bufferVBO = function (attributeName, array, staticDraw) {
                    if (staticDraw === void 0) { staticDraw = true; }
                    this.bufferData(this.vboSet[attributeName], array, staticDraw);
                };
                Geometry.prototype.createVBO = function (attributeName) {
                    this.vboSet[attributeName] = Engine.render.gl.createBuffer();
                };
                Geometry.prototype.getVBO = function (attributeName) {
                    return this.vboSet[attributeName];
                };
                Object.defineProperty(Geometry.prototype, "positionArray", {
                    set: function (value) {
                        this.bufferData(this.positionVBO, value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Geometry.prototype, "uvArray", {
                    set: function (value) {
                        this.bufferData(this.uvVBO, value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Geometry.prototype, "normalArray", {
                    set: function (value) {
                        this.bufferData(this.normalVBO, value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Geometry.prototype, "elementsIndexArray", {
                    set: function (value) {
                        var gl = Engine.render.gl;
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);
                        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, value, gl.STATIC_DRAW);
                        this.elementsCount = value.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Geometry;
            }(Base.ObjectBase));
            exports_1("Geometry", Geometry);
        }
    }
});
//# sourceMappingURL=Geometry.js.map