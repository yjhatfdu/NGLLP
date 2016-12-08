/**
 * Created by yjh on 15/11/18.
 */
///<reference path='easing.ts'/>
import {Easing} from './easing'
import * as Engine from '../Engine'
import * as Base from '../Base'
import * as Util from '../Util/Util'


namespace TweenAction {
    export class Translate {
        easing;
        value;
        time;
        type = 0;

        constructor(value, time) {
            this.value = value;
            this.time = time;
        }
    }
    export class TranslateTo {
        easing;
        value;
        time;
        type = 1;

        constructor(value, time) {
            this.value = value;
            this.time = time;
        }
    }
    export class Loop {
        times = 0;
        type = 2;

        constructor(times?) {
            if (times) {
                this.times = times;
            } else {
                this.times = Number.MAX_VALUE;
            }
        }
    }
    export class Then {
        callback;
        type = 3;

        constructor(callback) {
            this.callback = callback
        }
    }
    export class Set {
        value;
        type = 4;

        constructor(value) {
            this.value = value
        }
    }
}

let TweenItemPool:Array<TweenItem> = [];

function TweenItemFactory(object:Base.ObjectBase, field, controller) {
    if (TweenItemPool.length == 0) {
        return new TweenItem(object, field, controller)
    } else {
        let newItem = TweenItemPool.shift();
        newItem.object = object;
        newItem.field = field;
        newItem.controller = controller;
        newItem.start();
        return newItem;
    }
}

class TweenItem {
    object;
    field;
    initialValue;
    tweenActList = [];
    startTime;
    lastActionTime;
    lastActionValue;
    currentActionIndex = 0;
    loopStart = 0;
    currentLoop = 0;
    controller;
    loopStartValue;
    lastAct;
    _resetAfterFinished = false;
    _loopAfterFinished = false;
    active = true;

    constructor(object:Base.ObjectBase, field, controller) {

        this.object = object;
        this.field = field;
        this.controller = controller;
        this.start();
    };

    start() {
        this.loopStartValue = this.lastActionValue = this.initialValue = this.object[this.field];


        this.lastActionTime = this.startTime = Util.getTime();
    }

    reset() {
        this.object[this.field] = this.initialValue;
        this.currentActionIndex = 0;
        this.loopStart = 0;
        this.currentLoop = 0;
        this.loopStartValue = this.lastActionValue = this.initialValue;
        this.lastActionTime = this.startTime = Util.getTime()
    }

    endAll() {
        this.controller.removeAllAnimations(this.object)
    }

    end() {
        if (this._loopAfterFinished) {
            this.reset();
            return
        }
        if (this._resetAfterFinished) {
            this.object[this.field] = this.initialValue;
        }
        this.controller.remove(this.object, this.field);
        this._loopAfterFinished = false;
        this._resetAfterFinished = false;
        this.object = null;
        this.currentLoop = 0;
        this.loopStart = 0;
        this.currentActionIndex = 0;
        this.tweenActList = [];
        this.lastAct = null;
        TweenItemPool.push(this);
    }

    update(now) {
        var tweenAct = this.tweenActList[this.currentActionIndex];
        do {

            if (tweenAct.type == 0) {
                //translate
                if (now - this.lastActionTime >= tweenAct.time) {
                    this.currentActionIndex++;
                    this.lastActionValue = this.lastActionValue + tweenAct.value;
                    this.object[this.field] = this.lastActionValue;
                    this.lastActionTime = this.lastActionTime + tweenAct.time;
                }
            } else if (tweenAct.type == 1) {
                //translate
                if (now - this.lastActionTime >= tweenAct.time) {
                    this.currentActionIndex++;
                    this.lastActionValue = tweenAct.value;
                    this.object[this.field] = this.lastActionValue;
                    this.lastActionTime = this.lastActionTime + tweenAct.time;
                }
            } else if (tweenAct.type == 2) {
                this.currentLoop++;
                if (this.currentLoop > tweenAct.times) {
                    this.currentActionIndex++;
                    this.currentLoop = 0;
                    this.loopStart = this.currentActionIndex;
                    this.loopStartValue = this.lastActionValue;
                } else {
                    this.currentActionIndex = this.loopStart;
                    this.lastActionValue = this.loopStartValue;
                    this.currentLoop++;
                }
            } else if (tweenAct.type == 3) {
                this.currentActionIndex++;
                tweenAct.callback()
            } else if (tweenAct.type == 4) {
                this.currentActionIndex++;
                this.object[this.field] = tweenAct.value
            }
            if (this.currentActionIndex >= this.tweenActList.length) {
                this.end();
                return
            }
            tweenAct = this.tweenActList[this.currentActionIndex];
        } while (!(tweenAct.type < 2));
        if (tweenAct.type == 0) {
            if (tweenAct.easing) {
                this.object[this.field] = tweenAct.easing(now - this.lastActionTime, this.lastActionValue, tweenAct.value, tweenAct.time)
            } else {
                this.object[this.field] = this.lastActionValue + tweenAct.value * (now - this.lastActionTime) / tweenAct.time
            }
        } else if (tweenAct.type == 1) {
            if (tweenAct.easing) {
                this.object[this.field] = tweenAct.easing(now - this.lastActionTime, this.lastActionValue, tweenAct.value - this.lastActionValue, tweenAct.time)
            } else {
                this.object[this.field] = this.lastActionValue + (tweenAct.value - this.lastActionValue) * (now - this.lastActionTime) / tweenAct.time
            }
        }
    }

    addTweenAction(act) {
        this.tweenActList.push(act);
        this.lastAct = act;
    }

    translateTo(to, time) {
        this.addTweenAction(new TweenAction.TranslateTo(to, time));
        return this
    }

    translate(distance, time) {
        this.addTweenAction(new TweenAction.Translate(distance, time));
        return this
    }

    easing(func:Function) {
        this.lastAct.easing = func;
        return this
    }

    loop(times?) {
        this.addTweenAction(new TweenAction.Loop(times));
        return this
    }

    delay(time) {
        this.addTweenAction(new TweenAction.Translate(0, time));
        return this
    }

    then(callback) {
        this.addTweenAction(new TweenAction.Then(callback));
        return this;
    }

    set(value) {
        this.addTweenAction( new TweenAction.TranslateTo(value, 0));
        return this
    }

    resetAfterFinished(flag = true) {
        this._resetAfterFinished = flag;
    }

    loopAfterFinished(flag = true) {
        this._loopAfterFinished = flag;
    }

}
class _TweenCtl {
    animationList = {};
    selectObject = {};

    constructor() {
        Engine.eventBus.addEventListener('beforeupdate', this.update.bind(this))
    }

    add(object, field):TweenItem|_TweenCtl {
        if (!object.uuid) {
            object.uuid = Math.random() + '';
        }
        if (!field) {
            this.selectObject = object;
            return this;
        }
        var key = object.uuid + field;
        if (!this.animationList[key]) {
            this.animationList[key] = TweenItemFactory(object, field, this);
        }
        return this.animationList[key];
    }

    select(object, field) {
        return this.add(object, field);
    }

    endAll() {
        this.removeAllAnimations(this.selectObject)
    }

    removeAllAnimations(object) {
        for (var i in this.animationList) {
            if (this.animationList[i].object == object) {
                this.animationList[i].end();
                delete this.animationList[i]
            }
        }
    }

    remove(object, field) {
        delete this.animationList[object.uuid + field]
    }

    playAction(actions) {
        this.removeAllAnimations(this.selectObject);
        let lastAction;
        let defaultAction;
        for (let field of Object.keys(actions)) {
            let actList = actions[field];
            var action:any = this.add(this.selectObject, field);
            defaultAction = action;
            for (let j = 0; j < actList.length; j++) {
                var oneAct = actList[j];
                switch (oneAct['type']) {
                    case 'translate':
                    {
                        action.translate(oneAct['value'], oneAct['time']);
                        break
                    }
                    case 'translateTo':
                    {
                        action.translateTo(oneAct['value'], oneAct['time']);
                        break
                    }
                    case 'delay':
                    {
                        action.delay(oneAct['time']);
                        break
                    }
                    case 'loop':
                    {
                        action.loop(oneAct['times']);
                        break
                    }
                    case 'set':
                    {
                        action.set(oneAct['value']);
                        break
                    }
                    case'end':
                    {
                        lastAction = action;
                    }
                }
                if (oneAct['easing']&&oneAct['easing']!='none') {
                    action.easing(Easing[oneAct['easing']])
                }
            }
        }
        return lastAction || defaultAction;
    }

    update() {
        var now = Util.getTime();
        for (var i in this.animationList) {
            this.animationList[i].update(now);
        }
    }
}


export let TweenCtl = new _TweenCtl();
export let Tween = TweenCtl.add.bind(TweenCtl);
