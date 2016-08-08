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

    onTouchStart(e) {
        e.stopPropagation();
        e.preventDefault();
        this.dispatchEvent(TouchEvents.touchstart);
        for (let i = 0; i < e.changedTouches.length; i++) {
            let touch = e.changedTouches[i];
            this.findAndDispatchEvent(TouchEvents.touchstart, touch.pageX, touch.pageY);
            this.dispatchEvent("touchstart", touch)
        }
    }

    onTouchMove(e) {

    }

    onTouchEnd(e) {
        e.stopPropagation();
        e.preventDefault();
        for (let i = 0; i < e.changedTouches.length; i++) {
            let touch = e.changedTouches[i];
            this.findAndDispatchEvent(TouchEvents.touchend, touch.pageX, touch.pageY);
            this.dispatchEvent("touchend", touch)
        }

    }

    onMouseDown(e) {
        e.stopPropagation();
        e.preventDefault();
        this.findAndDispatchEvent(TouchEvents.touchstart, e.pageX, e.pageY);
        this.dispatchEvent("touchstart")
    }

    onMouseMove(e) {

    }

    onMouseUp(e) {
        e.stopPropagation();
        e.preventDefault();
        this.dispatchEvent("touch")
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

    findAndDispatchEvent(event, pageX, pageY) {
        if (!this.itemList[event]) {
            return
        }
        let x = (2 * pageX / Engine.render.width - 1) / Engine.render.aspect;
        let y = 2 * pageY / Engine.render.height - 1;
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