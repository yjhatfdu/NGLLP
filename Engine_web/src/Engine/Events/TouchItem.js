System.register(['./TouchCtl', '../Engine', '../Base'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var TouchCtl_1, Engine_1, Base;
    var TouchItem;
    return {
        setters:[
            function (TouchCtl_1_1) {
                TouchCtl_1 = TouchCtl_1_1;
            },
            function (Engine_1_1) {
                Engine_1 = Engine_1_1;
            },
            function (Base_1) {
                Base = Base_1;
            }],
        execute: function() {
            TouchItem = (function (_super) {
                __extends(TouchItem, _super);
                function TouchItem(x, y, w, h) {
                    _super.call(this);
                    this.scale = 1;
                    this.listenerCount = {};
                    this.zIndex = 0;
                    this.hit = false;
                    _a = [x, y, w, h], this.x = _a[0], this.y = _a[1], this.w = _a[2], this.h = _a[3];
                    var _a;
                }
                TouchItem.prototype.addEventListener = function (event, listener, useCapture) {
                    if (TouchCtl_1.TouchEvents[event]) {
                        Engine_1.Engine.touchCtl.addTouchItem(this, event);
                        this.listenerCount[event] = this.listenerCount[event] ? this.listenerCount[event] + 1 : 1;
                    }
                    return _super.prototype.addEventListener.call(this, event, listener, useCapture || false);
                };
                TouchItem.prototype.addOneTimeListener = function (event, lisener) {
                    if (TouchCtl_1.TouchEvents[event]) {
                        Engine_1.Engine.touchCtl.addTouchItem(self, event);
                        this.listenerCount[event] = this.listenerCount[event] ? this.listenerCount[event] + 1 : 1;
                        return _super.prototype.addOneTimeListener.call(this, event, function () {
                            lisener();
                            this.listenerCount--;
                            this.checkListeners();
                        }.bind(this));
                    }
                    else {
                        _super.prototype.addOneTimeListener.call(this, event, lisener);
                    }
                };
                TouchItem.prototype.checkListeners = function () {
                    for (var i in this.listenerCount) {
                        if (this.listenerCount[i] == 0) {
                            Engine_1.Engine.touchCtl.removeTouchItem(this, i);
                        }
                    }
                };
                TouchItem.prototype.removeListenerById = function (event, id) {
                    _super.prototype.removeListenerById.call(this, event, id);
                    if (TouchCtl_1.TouchEvents[event]) {
                        this.listenerCount[event]--;
                        this.checkListeners();
                    }
                };
                TouchItem.prototype.removeAllListeners = function () {
                    _super.prototype.removeAllListeners.call(this);
                    for (var i in this.listenerCount) {
                        this.listenerCount[i] = 0;
                    }
                    this.checkListeners();
                };
                TouchItem.prototype.destroy = function () {
                    this.removeAllListeners();
                    _super.prototype.destroy.call(this);
                };
                return TouchItem;
            })(Base.NodeBase);
            exports_1("TouchItem", TouchItem);
        }
    }
});
//# sourceMappingURL=TouchItem.js.map