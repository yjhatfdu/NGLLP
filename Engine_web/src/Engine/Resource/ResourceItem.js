var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by yjh on 15/12/19.
 */
///<reference path='../Core/GlTexture.ts'/>
///<reference path='../Base.ts'/>
var Resource;
(function (Resource) {
    var GlTexture = Core.GlTexture;
    var ResourceItem = (function (_super) {
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
    Resource.ResourceItem = ResourceItem;
    var AudioItem = (function (_super) {
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
    Resource.AudioItem = AudioItem;
    var ImageItem = (function (_super) {
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
                this.texture = GlTexture.getTexture(this.img, standAlone);
                this.texture.deleteSource();
                this.img = null;
            }
        };
        ImageItem.prototype.destroy = function () {
            this.texture.destroy();
        };
        return ImageItem;
    })(ResourceItem);
    Resource.ImageItem = ImageItem;
})(Resource || (Resource = {}));
