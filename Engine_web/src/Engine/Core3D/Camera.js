var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by yjh on 16/2/2.
 */
///<reference path='../Core/Object3D.ts'/>
var Core3D;
(function (Core3D) {
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera(render) {
            _super.call(this);
            this.isActive = false;
            this.viewMat = mat4.create();
            this.perspectiveMat = mat4.create();
            this.isRoot = true;
            this.render = render;
        }
        Camera.prototype.setAsDefaultCamera = function () {
            if (this.render.defaultCamera) {
                this.render.defaultCamera.isActive = false;
            }
            this.isActive = true;
            this.render.defaultCamera = this;
            this.render.viewMat = this.viewMat;
            this.render.perspectiveMat = this.perspectiveMat;
            //this.render.eyePosition=this.position;
        };
        return Camera;
    })(Core.Object3D);
    Core3D.Camera = Camera;
    var PerspectiveCamera = (function (_super) {
        __extends(PerspectiveCamera, _super);
        function PerspectiveCamera(render, x, y, z, fov, near, far, aspect) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 1.5; }
            if (fov === void 0) { fov = 67.3; }
            if (near === void 0) { near = 0.1; }
            if (far === void 0) { far = 300; }
            if (aspect === void 0) { aspect = null; }
            _super.call(this, render);
            this.center = vec3.create();
            this.headerUp = new Float32Array([0, 1, 0]);
            this.aspect = aspect;
            this.position[0] = x;
            this.position[1] = y;
            this.position[2] = z;
            this.fov = fov;
            this.near = near;
            this.far = far;
        }
        PerspectiveCamera.prototype.update = function () {
            //mat4.identity(this.viewMat);
            mat4.lookAt(this.viewMat, this.position, this.center, this.headerUp);
            mat4.perspective(this.perspectiveMat, this.fov / 180 * Math.PI, this.aspect || 1 / this.render.aspect, this.near, this.far);
        };
        PerspectiveCamera.prototype.lookAt = function (center, headerUp) {
            vec3.copy(this.center, center);
            vec3.copy(this.headerUp, headerUp);
        };
        return PerspectiveCamera;
    })(Camera);
    Core3D.PerspectiveCamera = PerspectiveCamera;
})(Core3D || (Core3D = {}));
