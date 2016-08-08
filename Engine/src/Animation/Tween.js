System.register(['./easing', 'Engine'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var easing_1, Engine_1;
    var TweenAction, TweenItem, TweenCtl;
    return {
        setters:[
            function (easing_1_1) {
                easing_1 = easing_1_1;
            },
            function (Engine_1_1) {
                Engine_1 = Engine_1_1;
            }],
        execute: function() {
            (function (TweenAction) {
                var Translate = (function () {
                    function Translate(value, time) {
                        this.type = 0;
                        this.value = value;
                        this.time = time;
                    }
                    return Translate;
                }());
                TweenAction.Translate = Translate;
                var TranslateTo = (function () {
                    function TranslateTo(value, time) {
                        this.type = 1;
                        this.value = value;
                        this.time = time;
                    }
                    return TranslateTo;
                }());
                TweenAction.TranslateTo = TranslateTo;
                var Loop = (function () {
                    function Loop(times) {
                        this.times = 0;
                        this.type = 2;
                        if (times) {
                            this.times = times;
                        }
                        else {
                            this.times = Number.MAX_VALUE;
                        }
                    }
                    return Loop;
                }());
                TweenAction.Loop = Loop;
            })(TweenAction || (TweenAction = {}));
            TweenItem = (function () {
                function TweenItem(object, field, controller) {
                    this.tweenActList = [];
                    this.startTime = 0;
                    this.lastActionTime = 0;
                    this.currentActionIndex = 0;
                    this.loopStart = 0;
                    this.currentLoop = 0;
                    this._resetAfterFinished = false;
                    this._loopAfterFinished = false;
                    this.active = true;
                    this.object = object;
                    this.field = field;
                    this.controller = controller;
                    this.start();
                }
                ;
                TweenItem.prototype.start = function () {
                    this.loopStartValue = this.lastActionValue = this.initialValue = this.object[this.field];
                    this.lastActionTime = this.startTime = Util.getTime();
                };
                TweenItem.prototype.reset = function () {
                    this.object[this.field] = this.initialValue;
                    this.currentActionIndex = 0;
                    this.loopStart = 0;
                    this.currentLoop = 0;
                    this.loopStartValue = this.lastActionValue = this.initialValue;
                    this.lastActionTime = this.startTime = Util.getTime();
                };
                TweenItem.prototype.end = function () {
                    if (this._loopAfterFinished) {
                        this.reset();
                        return;
                    }
                    if (this._resetAfterFinished) {
                        this.object[this.field] = this.initialValue;
                    }
                    this.controller.remove(this.object, this.field);
                };
                TweenItem.prototype.update = function (now) {
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
                        }
                        else if (tweenAct.type == 1) {
                            //translate
                            if (now - this.lastActionTime >= tweenAct.time) {
                                this.currentActionIndex++;
                                this.lastActionValue = tweenAct.value;
                                this.object[this.field] = this.lastActionValue;
                                this.lastActionTime = this.lastActionTime + tweenAct.time;
                            }
                        }
                        else if (tweenAct.type == 2) {
                            this.currentLoop++;
                            if (this.currentLoop > tweenAct.times) {
                                this.currentActionIndex++;
                                this.currentLoop = 0;
                                this.loopStart = this.currentActionIndex;
                                this.loopStartValue = this.lastActionValue;
                            }
                            else {
                                this.currentActionIndex = this.loopStart;
                                this.lastActionValue = this.loopStartValue;
                                this.currentLoop++;
                            }
                        }
                        if (this.currentActionIndex >= this.tweenActList.length) {
                            this.end();
                            return;
                        }
                        tweenAct = this.tweenActList[this.currentActionIndex];
                    } while (!(tweenAct.type < 2));
                    if (tweenAct.type == 0) {
                        if (tweenAct.easing) {
                            this.object[this.field] = tweenAct.easing(now - this.lastActionTime, this.lastActionValue, tweenAct.value, tweenAct.time);
                        }
                        else {
                            this.object[this.field] = this.lastActionValue + tweenAct.value * (now - this.lastActionTime) / tweenAct.time;
                        }
                    }
                    else if (tweenAct.type == 1) {
                        if (tweenAct.easing) {
                            this.object[this.field] = tweenAct.easing(now - this.lastActionTime, this.lastActionValue, tweenAct.value - this.lastActionValue, tweenAct.time);
                        }
                        else {
                            this.object[this.field] = this.lastActionValue + (tweenAct.value - this.lastActionValue) * (now - this.lastActionTime) / tweenAct.time;
                        }
                    }
                };
                TweenItem.prototype.addTweenAction = function (act) {
                    this.tweenActList.push(act);
                    this.lastAct = act;
                };
                TweenItem.prototype.translateTo = function (to, time) {
                    this.addTweenAction(new TweenAction.TranslateTo(to, time));
                    return this;
                };
                TweenItem.prototype.translate = function (distance, time) {
                    this.addTweenAction(new TweenAction.Translate(distance, time));
                    return this;
                };
                TweenItem.prototype.easing = function (func) {
                    this.lastAct.easing = func;
                    return this;
                };
                TweenItem.prototype.loop = function (times) {
                    this.addTweenAction(new TweenAction.Loop(times));
                    return this;
                };
                TweenItem.prototype.delay = function (time) {
                    this.addTweenAction(new TweenAction.Translate(0, time));
                    return this;
                };
                TweenItem.prototype.resetAfterFinished = function (flag) {
                    if (flag === void 0) { flag = true; }
                    this._resetAfterFinished = flag;
                };
                TweenItem.prototype.loopAfterFinished = function (flag) {
                    if (flag === void 0) { flag = true; }
                    this._loopAfterFinished = flag;
                };
                return TweenItem;
            }());
            TweenCtl = (function () {
                function TweenCtl() {
                    this.animationList = {};
                    this.selectObject = {};
                    Engine_1.Engine.eventBus.addEventListener('beforeupdate', this.update.bind(this));
                }
                TweenCtl.prototype.add = function (object, field) {
                    if (!object.uuid) {
                        object.uuid = Math.random() + '';
                    }
                    if (!field) {
                        this.selectObject = object;
                        return this;
                    }
                    var key = object.uuid + field;
                    if (!this.animationList[key]) {
                        this.animationList[key] = new TweenItem(object, field, this);
                    }
                    return this.animationList[key];
                };
                TweenCtl.prototype.select = function (object, field) {
                    return this.add(object, field);
                };
                TweenCtl.prototype.removeAllAnimations = function (object) {
                    for (var i in this.animationList) {
                        if (this.animationList[i].object == object) {
                            delete this.animationList[i];
                        }
                    }
                };
                TweenCtl.prototype.remove = function (object, field) {
                    delete this.animationList[object.uuid + field];
                };
                TweenCtl.prototype.playAction = function (action) {
                    this.removeAllAnimations(this.selectObject);
                    for (var i = 0; i < action.length; i++) {
                        var actlist = action[i];
                        var actions = this.add(this.selectObject, actlist['field']);
                        var list = actlist['list'];
                        for (var j; j < list.length; j++) {
                            var oneAct = list[j];
                            switch (oneAct['type']) {
                                case 'translate': {
                                    actions.translate(oneAct['distance'], oneAct['time']);
                                    break;
                                }
                                case 'translateTo': {
                                    actions.translateTo(oneAct['to'], oneAct['time']);
                                    break;
                                }
                                case 'delay': {
                                    actions.delay(oneAct['time']);
                                    break;
                                }
                                case 'loop': {
                                    actions.loop(oneAct['times']);
                                    break;
                                }
                            }
                            if (oneAct['easing']) {
                                actions.easing(easing_1.Easing[oneAct['easing']]);
                            }
                        }
                    }
                };
                TweenCtl.prototype.update = function () {
                    var now = Util.getTime();
                    for (var i in this.animationList) {
                        this.animationList[i].update(now);
                    }
                };
                return TweenCtl;
            }());
            exports_1("TweenCtl", TweenCtl);
            window['TweenCtl'] = new TweenCtl();
            window['Tween'] = window['TweenCtl'].add.bind(TweenCtl);
        }
    }
});
//# sourceMappingURL=Tween.js.map