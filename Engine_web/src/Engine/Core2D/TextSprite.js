/**
 * Created by yjh on 15/12/21.
 */
///<reference path='Sprite.ts'/>
///<reference path='../Core/GlTexture.ts'/>
System.register(['../Core/GlTexture', './Sprite', '../Base'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var GlTexture_1, Sprite_1, Base;
    var CanvasItem, TextSprite;
    return {
        setters:[
            function (GlTexture_1_1) {
                GlTexture_1 = GlTexture_1_1;
            },
            function (Sprite_1_1) {
                Sprite_1 = Sprite_1_1;
            },
            function (Base_1) {
                Base = Base_1;
            }],
        execute: function() {
            CanvasItem = (function (_super) {
                __extends(CanvasItem, _super);
                function CanvasItem(width, height) {
                    _super.call(this);
                    this.name = 'canvas';
                    this.resetSize(width, height);
                    this.texture = GlTexture_1.GlTexture.getTexture(this.canvas);
                }
                CanvasItem.prototype.resetSize = function (width, height) {
                    this.width = width;
                    this.height = height;
                    this.canvas = document.createElement('canvas');
                    this.canvas.width = width;
                    this.canvas.height = height;
                };
                return CanvasItem;
            })(Base.ObjectBase);
            //尽可能减少更新次数,每次更新在iOS平台会产生较大性能影响
            TextSprite = (function (_super) {
                __extends(TextSprite, _super);
                function TextSprite(width, height, text) {
                    _super.call(this, new CanvasItem(width, height));
                    this.needUpdate = true;
                    this._textContent = '';
                    this.canvasItem = this.resource;
                    this.canvas = this.canvasItem.canvas.getContext('2d');
                    this.canvas.textAlign = 'center';
                    this.canvas.textBaseline = 'middle;';
                    this.textColor = '#FFFFFF';
                    this.shadowColor = '#000000';
                    this.fontSize = 15;
                    this.fontType = 'SimHei, "Microsoft YaHei", Arial, Helvetica, sans-serif';
                    //this.shadowOffset=[3,3];
                    this.shadowBlur = 0;
                    this.text = text || '';
                }
                Object.defineProperty(TextSprite.prototype, "fontType", {
                    set: function (v) {
                        this._fontType = v;
                        this.canvas.font = this._fontSize + "px " + this._fontType;
                        this.needUpdate = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextSprite.prototype, "fontSize", {
                    set: function (v) {
                        this._fontSize = v;
                        this.canvas.font = this._fontSize + "px " + this._fontType;
                        this.needUpdate = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextSprite.prototype, "textColor", {
                    set: function (v) {
                        this.canvas.fillStyle = v;
                        this.needUpdate = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextSprite.prototype, "shadowColor", {
                    set: function (v) {
                        this.canvas.shadowColor = v;
                        this.needUpdate = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextSprite.prototype, "shadowBlur", {
                    set: function (v) {
                        this.canvas.shadowBlur = v;
                        this.needUpdate = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextSprite.prototype, "shadowOffset", {
                    set: function (v) {
                        this.canvas.shadowOffsetX = v[0];
                        this.canvas.shadowOffsetY = v[1];
                        this.needUpdate = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextSprite.prototype, "text", {
                    set: function (v) {
                        this._textContent = v;
                        this.needUpdate = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                TextSprite.prototype.update = function () {
                    if (this.needUpdate) {
                        this.canvas.clearRect(0, 0, this.canvasItem.width, this.canvasItem.height);
                        this.canvas.fillText(this._textContent, this.canvasItem.width / 2, this.canvasItem.height / 2);
                        this.canvasItem.texture.update();
                        this.needUpdate = false;
                    }
                    _super.prototype.update.call(this);
                };
                return TextSprite;
            })(Sprite_1.Sprite);
            exports_1("TextSprite", TextSprite);
        }
    }
});
//# sourceMappingURL=TextSprite.js.map