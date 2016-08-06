System.register(['../Base', '../Core/GlTexture'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Base, GlTexture_1;
    var ResourceItem, AudioItem, ImageItem;
    return {
        setters:[
            function (Base_1) {
                Base = Base_1;
            },
            function (GlTexture_1_1) {
                GlTexture_1 = GlTexture_1_1;
            }],
        execute: function() {
            ResourceItem = (function (_super) {
                __extends(ResourceItem, _super);
                function ResourceItem(controller, name) {
                    _super.call(this);
                    this.prepared = false;
                    this.controller = controller;
                    this.name = name;
                }
                ResourceItem.prototype.prepare = function () {
                };
                ResourceItem.prototype.destroy = function () {
                    this.controller.destroyItem(this);
                };
                return ResourceItem;
            })(Base.ObjectBase);
            exports_1("ResourceItem", ResourceItem);
            AudioItem = (function (_super) {
                __extends(AudioItem, _super);
                function AudioItem(buffer, controller, name) {
                    _super.call(this, controller, name);
                    this.prepared = true;
                    this.audioBuffer = buffer;
                    this.bgmDuration = this.audioBuffer.duration;
                }
                AudioItem.prototype.prepare = function () {
                };
                AudioItem.prototype.prepareBgm = function () {
                };
                AudioItem.prototype.destroy = function () {
                    _super.prototype.destroy.call(this);
                    this.audioBuffer = null;
                };
                return AudioItem;
            })(ResourceItem);
            exports_1("AudioItem", AudioItem);
            ImageItem = (function (_super) {
                __extends(ImageItem, _super);
                function ImageItem(img, controller, name) {
                    _super.call(this, controller, name);
                    this.img = img;
                    this.width = img.width;
                    this.height = img.height;
                }
                ImageItem.prototype.prepare = function (standAlone) {
                    if (standAlone === void 0) { standAlone = false; }
                    if (!this.prepared) {
                        this.texture = GlTexture_1.GlTexture.getTexture(this.img, standAlone);
                        this.texture.deleteSource();
                        this.img = null;
                    }
                };
                ImageItem.prototype.destroy = function () {
                    this.texture.destroy();
                };
                return ImageItem;
            })(ResourceItem);
            exports_1("ImageItem", ImageItem);
        }
    }
});
//# sourceMappingURL=ResourceItem.js.map