import {EventBase} from "../Base";
/**
 * Created by yjh on 2016/12/8.
 */
export class Keyboard extends EventBase {
    initialized = false;

    init() {
        if (this.initialized) {
            return
        }
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
        this.initialized = true;
    }

    addEventListener(event: string, func: Function, captureOnly = false) {
        this.init();
        return super.addEventListener(event, func, captureOnly)
    }

    onKeyDown(e) {
        e.preventDefault();
        e.stopPropagation();
        this.dispatchEvent('keydown', e.key)
    }

    onKeyUp(e) {
        e.preventDefault();
        e.stopPropagation();
        this.dispatchEvent('keyup', e.key)
    }
}