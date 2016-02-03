var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by yjh on 16/1/19.
 */
///<reference path='../Base.ts'/>
var Core3D;
(function (Core3D) {
    var Geometry = (function (_super) {
        __extends(Geometry, _super);
        function Geometry() {
            _super.call(this);
            this.elementsCount = 0;
            var gl = Engine.render.gl;
            this.positionVBO = gl.createBuffer();
            this.uvVBO = gl.createBuffer();
            this.normalVBO = gl.createBuffer();
            this.IBO = gl.createBuffer();
        }
        Geometry.prototype.bufferData = function (vbo, array) {
            var gl = Engine.render.gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
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
        Object.defineProperty(Geometry.prototype, "normal", {
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
    })(Base.ObjectBase);
    Core3D.Geometry = Geometry;
})(Core3D || (Core3D = {}));
