/**
 * Created by yjh on 15/12/21.
 */
///<reference path='../Base.ts'/>
import {TouchEvents, TouchCtl} from './TouchCtl'
import * as Engine from '../Engine'
import * as Base from '../Base'

export class TouchItem extends Base.NodeBase {
    x;
    y;
    w;
    h;
    scale = 1;
    rx;
    ry;
    rw;
    rh;
    listenerCount = {};
    zIndex = 0;
    rayCastColor=0;
    protected hit = false;

    constructor(x, y, w, h) {
        super();
        [this.x, this.y, this.w, this.h] = [x, y, w, h]
    }

    addEventListener(event: string, listener: Function, useCapture?) {
        if (TouchEvents[event]) {
            Engine.touchCtl.addTouchItem(this, event);
            this.listenerCount[event] = this.listenerCount[event] ? this.listenerCount[event] + 1 : 1;
        }
        return super.addEventListener(event, listener, useCapture || false);

    }

    addOneTimeListener(event: string, lisener: Function) {
        if (TouchEvents[event]) {
            Engine.touchCtl.addTouchItem(this, event);
            this.listenerCount[event] = this.listenerCount[event] ? this.listenerCount[event] + 1 : 1;
            return super.addOneTimeListener(event, function () {
                lisener();
                this.listenerCount--;
                this.checkListeners()
            }.bind(this))
        } else {
            super.addOneTimeListener(event, lisener)
        }
    }

    private checkListeners() {
        for (let i in this.listenerCount) {
            if (this.listenerCount[i] == 0) {
                Engine.touchCtl.removeTouchItem(this, i);
            }
        }
    }

    removeListenerById(event: string, id: number) {
        super.removeListenerById(event, id);
        if (TouchEvents[event]) {
            this.listenerCount[event]--;
            this.checkListeners()
        }
    }


    removeAllListeners() {
        super.removeAllListeners();
        for (let i in this.listenerCount) {
            this.listenerCount[i] = 0
        }
        this.checkListeners();
    }

    destroy() {
        this.removeAllListeners();
        super.destroy();
    }

}