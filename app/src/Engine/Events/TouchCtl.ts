/**
 * Created by yjh on 15/12/19.
 */
///<reference path='../Base.ts'/>
import * as Base from '../Base'
import * as Engine from '../Engine'

export var TouchEvents = {
    touchstart: 'touchstart',
    touchend: 'touchend',

};
export class TouchCtl extends Base.EventBase {
    canvas;
    itemList = {};
    figureState = {};

    constructor() {
        super();
        this.canvas = Engine.render.canvas;
        if (document.createTouch) {
            this.canvas.addEventListener("touchstart", this.onTouchStart.bind(this), true);
            this.canvas.addEventListener("touchend", this.onTouchEnd.bind(this), true);
        } else {
            this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this), true);
            this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this), true);
        }
    }

    getPos(x, y) {
        if (Engine.render.landscape) {
            return [(2 * x / Engine.render.width - 1) / Engine.render.aspect, 1 - 2 * y / Engine.render.height]
        } else {
            return [(2 * x / Engine.render.width - 1)/Engine.render.designAspect, Engine.render.aspect / Engine.render.designAspect *(1- 2 * y / Engine.render.height)];


        }
    }

    onTouchStart(e) {
        e.stopPropagation();
        e.preventDefault();
        for (let i = 0; i < e.changedTouches.length; i++) {
            let touch = e.changedTouches[i];
            let [x,y]=this.getPos(touch.pageX, touch.pageY);
            this.findAndDispatchEvent(TouchEvents.touchstart, x, y);
            this.dispatchEvent("touchstart", {x, y})
        }
    }

    onTouchMove(e) {

    }

    onTouchEnd(e) {
        e.stopPropagation();
        e.preventDefault();
        for (let i = 0; i < e.changedTouches.length; i++) {
            let touch = e.changedTouches[i];
            let [x,y]=this.getPos(touch.pageX, touch.pageY);
            this.findAndDispatchEvent(TouchEvents.touchend, x, y);
            this.dispatchEvent("touchend", {x, y});
        }

    }

    onMouseDown(e) {
        e.stopPropagation();
        e.preventDefault();
        let [x,y]=this.getPos(e.offsetX, e.offsetY);
        this.findAndDispatchEvent(TouchEvents.touchstart, x, y);
        this.dispatchEvent("touchstart", {x, y});
    }

    onMouseMove(e) {
    }

    onMouseUp(e) {
        e.stopPropagation();
        e.preventDefault();
        let [x,y]=this.getPos(e.offsetX, e.offsetY);
        this.findAndDispatchEvent(TouchEvents.touchend, x, y);
        this.dispatchEvent("touchend", {x, y});
    }

    addTouchItem(item, event) {
        let level = item.level;
        if (!this.itemList[event]) {
            this.itemList[event] = []
        }
        if (!this.itemList[event][level]) {
            this.itemList[event][level] = []
        }
        this.itemList[event][level].push(item);
        this.itemList[event].sort(function (x, y) {
            return y.zIndex - x.zIndex
        });
        item.addEventListener('levelchange', function () {

        }.bind(this))
    }

    removeTouchItem(item, event) {
        let level = item.level;
        let list = this.itemList[event][level];
        if (!list) {
            return
        }
        let index = list.indexOf(item);
        if (index >= 0) {
            list.splice(index, 1)
        }
    }

    findAndDispatchEvent(event, x, y) {
        if (!this.itemList[event]) {
            return
        }
        //handle capture
        for (let l = 0; l < this.itemList[event].length; l++) {
            let list = this.itemList[event][l];
            if (list) {
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    if (!item) {
                        continue
                    }
                    if (x > item.rx - 0.5 * item.rw && x < item.rx + 0.5 * item.rw && y > item.ry - 0.5 * item.rh && y < item.ry + 0.5 * item.rh) {
                        if (item.dispatchEvent(event, item, true)) {
                            return
                        } else {
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
                        list[j].hit = false
                    }
                }
            }
        }
    }

}