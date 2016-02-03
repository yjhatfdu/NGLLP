var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by yjh on 16/1/19.
 */
///<reference path='../Core/Object3D.ts'/>
///<reference path='../Core/Material.ts'/>
///<reference path='Geometry.ts'/>
var Core3D;
(function (Core3D) {
    var Mesh = (function (_super) {
        __extends(Mesh, _super);
        function Mesh(material, geometry) {
            _super.call(this);
            this.drawRange = [0, 1];
            this.material = material;
            this.geometry = geometry;
            this.gl = Engine.render.gl;
        }
        Mesh.prototype.update = function (draw) {
            if (draw === void 0) { draw = true; }
            _super.prototype.update.call(this);
            this.material.active(false);
            this.material.bindVBO('position', this.geometry.positionVBO);
            this.material.bindVBO('uv', this.geometry.uvVBO);
            this.material.bindVBO('normal', this.geometry.normalVBO);
            this.material.bindIBO(this.geometry.IBO);
            this.material.mvpMat = this.mvpMat;
            if (draw) {
                var drawCount = Math.floor((this.drawRange[1] - this.drawRange[0]) * this.geometry.elementsCount / 3) * 3;
                var drawOffset = Math.floor(this.drawRange[0] * this.geometry.elementsCount / 3) * 3;
                this.gl.drawElements(this.gl.TRIANGLES, drawCount, this.gl.UNSIGNED_SHORT, drawOffset);
            }
        };
        return Mesh;
    })(Core.Object3D);
    Core3D.Mesh = Mesh;
})(Core3D || (Core3D = {}));
