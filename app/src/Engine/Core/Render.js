System.register(['./Object3D', '../Engine', '../Core3D/Camera', 'gl-matrix'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Object3D_1, Engine, Camera_1, gl_matrix_1;
    var Render;
    return {
        setters:[
            function (Object3D_1_1) {
                Object3D_1 = Object3D_1_1;
            },
            function (Engine_1) {
                Engine = Engine_1;
            },
            function (Camera_1_1) {
                Camera_1 = Camera_1_1;
            },
            function (gl_matrix_1_1) {
                gl_matrix_1 = gl_matrix_1_1;
            }],
        execute: function() {
            Render = (function (_super) {
                __extends(Render, _super);
                function Render() {
                    _super.call(this);
                    this.designResolution = [1024, 768];
                    this.width = 0;
                    this.height = 0;
                    this.p = 1;
                    this.vpMat = gl_matrix_1.mat4.create();
                    this.materialStack = [];
                    this.currentGlTexture = [];
                    this.root = this;
                    this.isRoot = true;
                    this.p = Engine.settings.pixelRatio;
                    this.container = Engine.settings.container;
                    this.canvas = document.createElement('canvas');
                    this.container.appendChild(this.canvas);
                    this.canvas.style.width = this.canvas.style.height = "100%";
                    this.setupGL();
                    this.defaultCamera = new Camera_1.PerspectiveCamera(this);
                    this.defaultCamera.setAsDefaultCamera();
                    this.resize();
                    window.addEventListener('resize', function () {
                        this.resize();
                    }.bind(this));
                    this.dispatchEvent('InitFinished');
                    this.update();
                }
                Render.prototype.setupGL = function () {
                    this.gl = this.canvas.getContext('webgl', {
                        premultipliedAlpha: false,
                        alpha: false
                    }) || this.canvas.getContext('experimental-webgl', {
                        premultipliedAlpha: false,
                        alpha: false
                    });
                    if (!this.gl) {
                        throw "WebGL Not Support";
                    }
                    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
                    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
                    var hf = this.gl.getExtension('OES_texture_half_float');
                    this.gl['HALF_FLOAT'] = hf.HALF_FLOAT_OES;
                    this.gl.getExtension('OES_texture_float');
                    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
                };
                Render.prototype.resize = function () {
                    this.canvas.width = (this.width = this.canvas.offsetWidth) * this.p;
                    this.canvas.height = (this.height = this.canvas.offsetHeight) * this.p;
                    this.aspect = this.height / this.width;
                    this.gl.viewport(0, 0, this.width * this.p, this.height * this.p);
                    this.dispatchEvent('resize');
                };
                Render.prototype.update = function () {
                    window.requestAnimationFrame(this.update.bind(this));
                    Engine.eventBus.dispatchEvent("beforeupdate");
                    Engine.audioCtl.update();
                    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
                    if (this.defaultCamera) {
                        this.defaultCamera.update();
                    }
                    gl_matrix_1.mat4.multiply(this.vpMat, this.perspectiveMat, this.viewMat);
                    _super.prototype.update.call(this);
                    Engine.eventBus.dispatchEvent("afterupdate");
                };
                return Render;
            })(Object3D_1.Object3D);
            exports_1("Render", Render);
        }
    }
});
//# sourceMappingURL=Render.js.map