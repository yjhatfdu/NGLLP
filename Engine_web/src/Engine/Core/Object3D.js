System.register(['../Base', '../Engine'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Base, Engine_1;
    var Object3D;
    return {
        setters:[
            function (Base_1) {
                Base = Base_1;
            },
            function (Engine_1_1) {
                Engine_1 = Engine_1_1;
            }],
        execute: function() {
            Object3D = (function (_super) {
                __extends(Object3D, _super);
                function Object3D() {
                    _super.apply(this, arguments);
                    this.isRoot = false;
                    this.position = vec3.create();
                    this.rotate = vec3.create();
                    this.scaleV = vec3.clone(new Float32Array([1, 1, 1]));
                    this.worldMat = mat4.create();
                    this.modelMat = mat4.create();
                    this.mvpMat = mat4.create();
                    this.enablePerspective = true;
                }
                Object3D.prototype.update = function () {
                    if (!this.isRoot) {
                        if (this.enablePerspective) {
                            mat4.identity(this.modelMat);
                            mat4.rotate(this.modelMat, this.modelMat, 1, this.rotate);
                            mat4.scale(this.modelMat, this.modelMat, this.scaleV);
                            mat4.translate(this.modelMat, this.modelMat, this.position);
                            mat4.mul(this.worldMat, this.modelMat, this.parent.worldMat);
                            mat4.mul(this.mvpMat, this.root.vpMat, this.worldMat);
                        }
                        else {
                            //mat4.identity(this.mvpMat);
                            //mat4.scale(this.mvpMat,this.mvpMat,new Float32Array([Engine.render.aspect,1,1]))
                            this.mvpMat[0] = Engine_1.Engine.render.aspect;
                        }
                    }
                    if (this.material) {
                        this.material.mvpMat = this.mvpMat;
                        this.material.active();
                    }
                    _super.prototype.update.call(this);
                };
                Object.defineProperty(Object3D.prototype, "posX", {
                    get: function () {
                        return this.position[0];
                    },
                    set: function (v) {
                        this.position[0] = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Object3D.prototype, "posY", {
                    get: function () {
                        return this.position[1];
                    },
                    set: function (v) {
                        this.position[1] = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Object3D.prototype, "posZ", {
                    get: function () {
                        return this.position[2];
                    },
                    set: function (v) {
                        this.position[2] = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object3D.prototype.translate = function (x, y, z) {
                    this.position[0] += x;
                    this.position[1] += y;
                    this.position[2] += z;
                };
                Object.defineProperty(Object3D.prototype, "scale", {
                    set: function (v) {
                        this.scaleV[0] = v;
                        this.scaleV[1] = v;
                        this.scaleV[2] = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object3D.prototype.rotateBy = function (x, y, z) {
                    this.rotate[0] += x;
                    this.rotate[1] += y;
                    this.rotate[2] += z;
                };
                Object3D.prototype.rotateTo = function (x, y, z) {
                    this.rotate[0] = x;
                    this.rotate[1] = y;
                    this.rotate[2] = z;
                };
                return Object3D;
            })(Base.NodeBase);
            exports_1("Object3D", Object3D);
        }
    }
});
//# sourceMappingURL=Object3D.js.map