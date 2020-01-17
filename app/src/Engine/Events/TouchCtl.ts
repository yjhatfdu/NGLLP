/**
 * Created by yjh on 15/12/19.
 */
///<reference path='../Base.ts'/>
import * as Base from '../Base'
import * as Engine from '../Engine'

let touchStatePool = [];

class TouchState {
    public x = 0;
    public y = 0;
    public id = 0;

    static create(id, x, y) {
        let touch;
        if (touchStatePool.length > 0) {
            touch = touchStatePool.pop()
        } else {
            touch = new TouchState()
        }
        touch.id = id;
        touch.x = x;
        touch.y = y;
        return touch
    }

    destroy() {
        touchStatePool.push(this)
    }
}

export const TouchEvents = {
    touchstart: 'touchstart',
    touchend: 'touchend',

};


export class TouchCtl extends Base.EventBase {
    private canvas;
    private itemList = {};

    public enableTracking = false;
    public touchList: Array<Array<number>>;

    constructor() {
        super();
        this.canvas = Engine.render.canvas;
        // if (window.ontouchstart) {
            this.canvas.addEventListener("touchstart", this.onTouchStart.bind(this), true);
            this.canvas.addEventListener("touchend", this.onTouchEnd.bind(this), true);
            this.canvas.addEventListener("touchmove", this.onTouchMove.bind(this), true)
        // } else {
        //     this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this), true);
        //     this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this), true);
        // }
    }

    private getPos(x, y) {
        if (Engine.render.landscape) {
            return [(2 * x / Engine.render.width - 1) / Engine.render.aspect, 1 - 2 * y / Engine.render.height]
        } else {
            return [(2 * x / Engine.render.width - 1) / Engine.render.designAspect, Engine.render.aspect / Engine.render.designAspect * (1 - 2 * y / Engine.render.height)];
        }
    }

    private updateTouch(touches: TouchList) {
        this.touchList = [];
        for (let i = 0; i < touches.length; i++) {
            let t = touches[i];
            let pos = this.getPos(t.pageX, t.pageY);
            this.touchList.push(pos)
        }
    }

    private onTouchStart(e: TouchEvent) {
        e.stopPropagation();
        e.preventDefault();
        if (this.enableTracking) {
            this.updateTouch(e.touches)
        }
        for (let i = 0; i < e.changedTouches.length; i++) {
            let touch = e.changedTouches[i];
            let [x, y] = this.getPos(touch.pageX, touch.pageY);
            this.findAndDispatchEvent(TouchEvents.touchstart, x, y);
            this.dispatchEvent("touchstart", {x, y})
        }
    }

    private onTouchMove(e) {
        if (this.enableTracking) {
            this.updateTouch(e.touches)
        }
        for (let i = 0; i < e.changedTouches.length; i++) {
            let touch = e.changedTouches[i];
            let [x, y] = this.getPos(touch.pageX, touch.pageY);
            this.dispatchEvent("touchmove", {x, y})
        }
    }

    private onTouchEnd(e) {
        e.stopPropagation();
        e.preventDefault();
        if (this.enableTracking) {
            this.updateTouch(e.touches)
        }
        for (let i = 0; i < e.changedTouches.length; i++) {
            let touch = e.changedTouches[i];
            let [x, y] = this.getPos(touch.pageX, touch.pageY);
            this.findAndDispatchEvent(TouchEvents.touchend, x, y);
            this.dispatchEvent("touchend", {x, y});
        }

    }

    private onMouseDown(e) {
        e.stopPropagation();
        e.preventDefault();
        let [x, y] = this.getPos(e.offsetX, e.offsetY);
        this.findAndDispatchEvent(TouchEvents.touchstart, x, y);
        this.dispatchEvent("touchstart", {x, y});
    }

    private onMouseMove(e) {
    }

    private onMouseUp(e) {
        e.stopPropagation();
        e.preventDefault();
        let [x, y] = this.getPos(e.offsetX, e.offsetY);
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

    private findAndDispatchEvent(event, x, y) {
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
        for (let l = this.itemList[event].length - 1; l >= 0; l--) {
            let list = this.itemList[event][l];
            if (list) {
                for (let j = list.length - 1; j >= 0; j--) {
                    if (list[j].hit == true) {
                        list[j].dispatchEvent(event, list[j]);
                        list[j].hit = false
                    }
                }
            }
        }
    }

}
