System.register(['NGLLP/Core3D', "NGLLP/Engine", "./MMDMaterial"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Core3D_1, Engine_1, MMDMaterial_1;
    var Model;
    return {
        setters:[
            function (Core3D_1_1) {
                Core3D_1 = Core3D_1_1;
            },
            function (Engine_1_1) {
                Engine_1 = Engine_1_1;
            },
            function (MMDMaterial_1_1) {
                MMDMaterial_1 = MMDMaterial_1_1;
            }],
        execute: function() {
            Model = (function (_super) {
                __extends(Model, _super);
                function Model(loader) {
                    _super.call(this);
                    this.initialized = false;
                    this.toonTextures = [];
                    this.material = new MMDMaterial_1.MMDMaterial();
                    this.loader = loader;
                }
                Model.prototype.init = function () {
                    return Promise.all([
                        this.initMaterials.bind(this)(),
                        Promise.resolve(this.initVerticles())
                    ]);
                };
                Model.prototype.initVerticles = function () {
                    var verticles = this.loader.verticles;
                    var count = verticles.length;
                    this.positionArray = new Float32Array(count * 3);
                    var uvArray = new Float32Array(count * 2);
                    var normalArray = new Float32Array(count * 2);
                    var boneNumberArray = new Uint16Array(count * 2);
                    var boneWeightArray = new Float32Array(count);
                    var edgeFlagArray = new Uint8Array(count);
                    for (var i = 0; i < count; i++) {
                        var v = verticles[i];
                        this.positionArray[i * 3] = v.x;
                        this.positionArray[i * 3 + 1] = v.y;
                        this.positionArray[i * 3 + 2] = v.z;
                        uvArray[i * 2] = v.u;
                        uvArray[i * 2 + 1] = v.v;
                        normalArray[i * 3] = v.nx;
                        normalArray[i * 3 + 1] = v.ny;
                        normalArray[i * 3 + 2] = v.nz;
                        boneNumberArray[i * 2] = v.bone_num1;
                        boneNumberArray[i * 2 + 1] = v.bone_num2;
                        boneWeightArray[i] = v.bone_weight;
                        edgeFlagArray[i] = v.edge_flag;
                    }
                    this.oriPositionArray = new Float32Array(this.positionArray);
                    _super.prototype.createVBO.call(this, 'position');
                    _super.prototype.createVBO.call(this, 'normal');
                    _super.prototype.createVBO.call(this, 'boneNumber');
                    _super.prototype.createVBO.call(this, 'uv');
                    _super.prototype.createVBO.call(this, 'boneWeight');
                    _super.prototype.createVBO.call(this, 'edgeFlag');
                    _super.prototype.bufferVBO.call(this, 'position', this.positionArray);
                    _super.prototype.bufferVBO.call(this, 'uv', uvArray);
                    _super.prototype.bufferVBO.call(this, 'normal', normalArray);
                    _super.prototype.bufferVBO.call(this, 'boneNumber', boneNumberArray);
                    _super.prototype.bufferVBO.call(this, 'boneWeight', boneWeightArray);
                    _super.prototype.bufferVBO.call(this, 'edgeFlag', edgeFlagArray);
                };
                Model.prototype.initMaterials = function () {
                    var _this = this;
                    return new Promise(function (resolve) {
                        var fileList = [];
                        for (var _i = 0, _a = _this.loader.materials; _i < _a.length; _i++) {
                            var item = _a[_i];
                            if (item.texture_file_name) {
                                fileList.push({ name: item.texture_file_name, url: item.texture_file_name, standAloneTexture: true });
                            }
                        }
                        for (var _b = 0, _c = _this.loader.toon_file_names; _b < _c.length; _b++) {
                            var item = _c[_b];
                            fileList.push({ name: item, url: item, standAloneTexture: true });
                        }
                        Engine_1.Engine.resourceCtl.loadResource(fileList).then(function (resourceCtl) {
                            for (var _i = 0, _a = _this.loader.materials; _i < _a.length; _i++) {
                                var item = _a[_i];
                                item.texture = resourceCtl.getItem(item.texture_file_name).texture;
                            }
                            for (var _b = 0, _c = _this.loader.toon_file_names; _b < _c.length; _b++) {
                                var item = _c[_b];
                                _this.toonTextures.push(resourceCtl.getItem(item).texture);
                            }
                            resolve();
                        });
                    });
                };
                return Model;
            }(Core3D_1.Geometry));
            exports_1("Model", Model);
        }
    }
});
//# sourceMappingURL=Model.js.map