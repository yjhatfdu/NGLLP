System.register(['../Base', '../Engine'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Base, Engine_1;
    var TouchEvents, TouchCtl;
    return {
        setters:[
            function (Base_1) {
                Base = Base_1;
            },
            function (Engine_1_1) {
                Engine_1 = Engine_1_1;
            }],
        execute: function() {
            exports_1("TouchEvents", TouchEvents = {
                OnTouchStart: 'touchstart',
                OnTouchEnd: 'touchend',
            });
            TouchCtl = (function (_super) {
                __extends(TouchCtl, _super);
                function TouchCtl() {
                    _super.call(this);
                    this.itemList = {};
                    this.figureState = {};
                    this.canvas = Engine_1.Engine.render.canvas;
                    if (document.createTouch) {
                        this.canvas.addEventListener("touchstart", this.onTouchStart.bind(this), true);
                        this.canvas.addEventListener("touchend", this.onTouchEnd.bind(this), true);
                    }
                    else {
                        this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this), true);
                        this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this), true);
                    }
                }
                TouchCtl.prototype.onTouchStart = function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    this.dispatchEvent(TouchEvents.OnTouchStart);
                    for (var i = 0; i < e.changedTouches.length; i++) {
                        var touch = e.changedTouches[i];
                        //this.figureState[touch.identifier]={x:touch.pageX,y:touch.pageY};
                        this.findAndDispatchEvent(TouchEvents.OnTouchStart, touch.pageX, touch.pageY);
                    }
                };
                TouchCtl.prototype.onTouchMove = function (e) {
                };
                TouchCtl.prototype.onTouchEnd = function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    this.dispatchEvent("touch");
                };
                TouchCtl.prototype.onMouseDown = function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    this.findAndDispatchEvent(TouchEvents.OnTouchStart, e.pageX, e.pageY);
                    this.dispatchEvent("touchstart");
                };
                TouchCtl.prototype.onMouseMove = function (e) {
                };
                TouchCtl.prototype.onMouseUp = function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    this.dispatchEvent("touch");
                };
                TouchCtl.prototype.addTouchItem = function (item, event) {
                    var level = item.level;
                    if (!this.itemList[event]) {
                        this.itemList[event] = [];
                    }
                    if (!this.itemList[event][level]) {
                        this.itemList[event][level] = [];
                    }
                    this.itemList[event][level].push(item);
                    this.itemList[event].sort(function (x, y) {
                        return y.zIndex - x.zIndex;
                    });
                    item.addEventListener('levelchange', function () {
                    }.bind(this));
                };
                TouchCtl.prototype.removeTouchItem = function (item, event) {
                    var level = item.level;
                    var list = this.itemList[event][level];
                    if (!list) {
                        return;
                    }
                    var index = list.indexOf(item);
                    if (index >= 0) {
                        list.splice(index, 1);
                    }
                };
                TouchCtl.prototype.findAndDispatchEvent = function (event, pageX, pageY) {
                    if (!this.itemList[event]) {
                        return;
                    }
                    var x = (2 * pageX / Engine_1.Engine.render.width - 1) / Engine_1.Engine.render.aspect;
                    var y = 2 * pageY / Engine_1.Engine.render.height - 1;
                    //handle capture
                    for (var l_1 = 0; l_1 < this.itemList[event].length; l_1++) {
                        var list_1 = this.itemList[event][l_1];
                        if (list_1) {
                            for (var i = 0; i < list_1.length; i++) {
                                var item = list_1[i];
                                if (!item) {
                                    continue;
                                }
                                if (x > item.rx - 0.5 * item.rw && x < item.rx + 0.5 * item.rw && y > item.ry - 0.5 * item.rh && y < item.ry + 0.5 * item.rh) {
                                    if (item.dispatchEvent(event, item, true)) {
                                        return;
                                    }
                                    else {
                                        item.hit = true;
                                    }
                                }
                            }
                        }
                    }
                    for (var l = this.itemList[event].length - 1; l >= 0; l--) {
                        var list = this.itemList[event][l];
                        if (list) {
                            for (var j = list.length - 1; j >= 0; j--) {
                                if (list[j].hit == true) {
                                    list[j].dispatchEvent(event, list[j]);
                                    list[j].hit = false;
                                }
                            }
                        }
                    }
                };
                return TouchCtl;
            })(Base.EventBase);
            exports_1("TouchCtl", TouchCtl);
        }
    }
});
//# sourceMappingURL=TouchCtl.js.map