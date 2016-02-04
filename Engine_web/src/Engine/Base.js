var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by yjh on 15/12/15.
 */
///<reference path='Engine.ts'/>
var Base;
(function (Base) {
    var ObjectBase = (function () {
        function ObjectBase() {
            this.uuid = Math.random() + '';
        }
        ObjectBase.prototype.destroy = function () {
        };
        return ObjectBase;
    })();
    Base.ObjectBase = ObjectBase;
    var EventBase = (function (_super) {
        __extends(EventBase, _super);
        function EventBase() {
            _super.call(this);
            //提供事件处理功能
            this.listeners = {};
        }
        EventBase.prototype.dispatchEvent = function (event, args, captureOnly) {
            if (captureOnly === void 0) { captureOnly = false; }
            if (!this.listeners[event]) {
                return false;
            }
            for (var i in this.listeners[event]) {
                var l = this.listeners[event][i];
                if (l.useCapture == false && captureOnly == true) {
                    continue;
                }
                l.listener(args, this);
                if (l.oneTime) {
                    delete this.listeners[event][i];
                }
                return true;
            }
            return false;
        };
        EventBase.prototype.addEventListener = function (event, listener, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            var id = Math.random();
            this.listeners[event].push({ listener: listener, useCapture: useCapture, id: id });
            return id;
        };
        EventBase.prototype.addOneTimeListener = function (event, listener) {
            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            var id = Math.random();
            this.listeners[event].push({ listener: listener, useCapture: true, id: id, oneTime: true });
            return id;
        };
        EventBase.prototype.removeAllEventListenersOfEvent = function (event) {
            this.listeners[event] = [];
        };
        EventBase.prototype.removeListenerById = function (event, id) {
            var list = this.listeners[event];
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == id) {
                    list.splice(i, 1);
                    return;
                }
            }
        };
        EventBase.prototype.removeAllListeners = function () {
            this.listeners = {};
        };
        return EventBase;
    })(ObjectBase);
    Base.EventBase = EventBase;
    var NodeBase = (function (_super) {
        __extends(NodeBase, _super);
        function NodeBase() {
            _super.call(this);
            this.children = [];
            this.visible = true;
            this.level = 0;
            this._id = null;
        }
        NodeBase.getNodeById = function (id) {
            return NodeBase.nodeList[id];
        };
        Object.defineProperty(NodeBase.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (value) {
                if (NodeBase.nodeList[value]) {
                    throw "Duplicated id for node";
                }
                else {
                    if (NodeBase.nodeList[this._id]) {
                        delete NodeBase.nodeList[this._id];
                    }
                    NodeBase.nodeList[value] = this;
                }
            },
            enumerable: true,
            configurable: true
        });
        NodeBase.prototype.setNode = function () {
            this.level = this.parent.level + 1;
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].setNode();
            }
        };
        NodeBase.prototype.update = function (flag) {
            for (var i = 0; i < this.children.length; i++) {
                var node = this.children[i];
                if (node.visible) {
                    node.update();
                }
            }
        };
        NodeBase.prototype.appendChild = function (child) {
            child.root = this.root;
            child.parent = this;
            child.setNode();
            this.children.push(child);
            child.setNode();
        };
        NodeBase.prototype.insertChild = function (child, index) {
            if (index === void 0) { index = 0; }
            child.root = this.root;
            child.parent = this;
            child.setNode();
            this.children.splice(index, 0, child);
            child.setNode();
        };
        NodeBase.prototype.indexOfChild = function (child) {
            return this.children.indexOf(child);
        };
        NodeBase.prototype.removeChild = function (child) {
            this.children.splice(this.children.indexOf(child), 1);
        };
        NodeBase.prototype.getChildrenCount = function () {
            var count = this.children.length;
            for (var i = 0, il = count; i < il; i++) {
                count += this.children[i].getChildrenCount();
            }
            return count;
        };
        NodeBase.prototype.destroy = function () {
            delete NodeBase.nodeList[this._id];
        };
        NodeBase.nodeList = {};
        return NodeBase;
    })(EventBase);
    Base.NodeBase = NodeBase;
})(Base || (Base = {}));
