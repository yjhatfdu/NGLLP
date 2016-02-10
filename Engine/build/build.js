System.register("NGLLP/Core", ['Core/AudioCtl', 'Core/Object3D', 'Core/Render'], function(exports_1) {
    "use strict";
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (AudioCtl_1_1) {
                exportStar_1(AudioCtl_1_1);
            },
            function (Object3D_1_1) {
                exportStar_1(Object3D_1_1);
            },
            function (Render_1_1) {
                exportStar_1(Render_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("NGLLP/Core2D", ['Core2D/Sprite', 'Core2D/SpriteBatchNode'], function(exports_2) {
    "use strict";
    function exportStar_2(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_2(exports);
    }
    return {
        setters:[
            function (Sprite_1_1) {
                exportStar_2(Sprite_1_1);
            },
            function (SpriteBatchNode_1_1) {
                exportStar_2(SpriteBatchNode_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("NGLLP/Core3D", ['Core3D/Camera'], function(exports_3) {
    "use strict";
    function exportStar_3(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_3(exports);
    }
    return {
        setters:[
            function (Camera_1_1) {
                exportStar_3(Camera_1_1);
            }],
        execute: function() {
        }
    }
});
/**
 * Created by yjh on 16/2/4.
 */
///<reference path='../../lib/Promise.d.ts'/>
///<reference path='../../Native API.d.ts'/>
System.register("src/Resource/ResourceCtl", ['Resource/ResourceCtl'], function(exports_4) {
    "use strict";
    var ResourceCtl_1;
    return {
        setters:[
            function (ResourceCtl_1_1) {
                ResourceCtl_1 = ResourceCtl_1_1;
            }],
        execute: function() {
            ResourceCtl_1.ResourceCtl.prototype['loadResources'] = function (list, progressCallBack) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    return _this.loadResources_raw(list, resolve, reject, progressCallBack);
                });
            };
        }
    }
});
System.register("NGLLP/Engine", ['Engine', "src/Resource/ResourceCtl"], function(exports_5) {
    "use strict";
    function exportStar_4(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_5(exports);
    }
    return {
        setters:[
            function (Engine_1_1) {
                exportStar_4(Engine_1_1);
            },
            function (_1) {}],
        execute: function() {
        }
    }
});
/**
 * Created by yjh on 16/1/29.
 */
///<reference path='../../Native API.d.ts'/>
///<reference path='../../lib/Promise.d.ts'/>
System.register("src/Network/HTTP", ['Network/Request'], function(exports_6) {
    "use strict";
    var Request_1;
    function HTTP(url, method, config, postObject, onprogress) {
        if (method === void 0) { method = 'GET'; }
        if (config === void 0) { config = { headers: {}, params: {} }; }
        if (postObject === void 0) { postObject = null; }
        return new Promise(function (resolve, reject) {
            var request = new Request_1.Request();
            request.open(url, method, config.params, config.headers, postObject, function (content) {
                resolve(content);
            }, function (err) {
                reject(err);
            }, onprogress);
        });
    }
    exports_6("HTTP", HTTP);
    function GET(url, config, onprogress) {
        if (config === void 0) { config = { headers: {}, params: {} }; }
        return HTTP(url, 'GET', config, null, onprogress);
    }
    exports_6("GET", GET);
    function POST(url, config, postObject, onprogress) {
        if (config === void 0) { config = { headers: {}, params: {} }; }
        if (postObject === void 0) { postObject = null; }
        return HTTP(url, 'POST', config, postObject, onprogress);
    }
    exports_6("POST", POST);
    return {
        setters:[
            function (Request_1_1) {
                Request_1 = Request_1_1;
            }],
        execute: function() {
        }
    }
});
//before typescript support partial module, we should patch the module like this
//Network['HTTP']=HTTP;
//Network['GET']=GET;
//Network['POST']=POST;
//Network.GET('/index.html')
//    .then(function (res) {
//        console.log(res);
//        return Network.GET('/test.json')
//    }).then(function(res){
//    console.log(res)
//})
//    .catch(function (err) {
//        console.log(err)
//    });
//
//async function load(){
//    try{
//        var res = await Network.GET('index.html');
//        console.log(res);
//        var res2 = await Network.GET('test.json');
//        console.log(res2)
//    }catch (e){
//        console.log(e)
//    }
//} 
System.register("NGLLP/Network", ['Network/Request', "src/Network/HTTP"], function(exports_7) {
    "use strict";
    function exportStar_5(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_7(exports);
    }
    return {
        setters:[
            function (Request_2_1) {
                exportStar_5(Request_2_1);
            },
            function (HTTP_1_1) {
                exportStar_5(HTTP_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("NGLLP/Resource", ['Resource/ResourceCtl'], function(exports_8) {
    "use strict";
    function exportStar_6(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_8(exports);
    }
    return {
        setters:[
            function (ResourceCtl_2_1) {
                exportStar_6(ResourceCtl_2_1);
            }],
        execute: function() {
        }
    }
});
/**
 * Created by yjh on 15/3/29.
 */
System.register("src/Animation/easing", [], function(exports_9) {
    "use strict";
    var Easing;
    return {
        setters:[],
        execute: function() {
            Easing = (function () {
                function Easing() {
                }
                Easing.easeInQuad = function (t, b, c, d) {
                    return c * (t /= d) * t + b;
                };
                Easing.easeOutQuad = function (t, b, c, d) {
                    return -c * (t /= d) * (t - 2) + b;
                };
                Easing.easeInOutQuad = function (t, b, c, d) {
                    if ((t /= d / 2) < 1)
                        return c / 2 * t * t + b;
                    return -c / 2 * ((--t) * (t - 2) - 1) + b;
                };
                Easing.easeInCubic = function (t, b, c, d) {
                    return c * (t /= d) * t * t + b;
                };
                Easing.easeOutCubic = function (t, b, c, d) {
                    return c * ((t = t / d - 1) * t * t + 1) + b;
                };
                Easing.easeInOutCubic = function (t, b, c, d) {
                    if ((t /= d / 2) < 1)
                        return c / 2 * t * t * t + b;
                    return c / 2 * ((t -= 2) * t * t + 2) + b;
                };
                Easing.easeInQuart = function (t, b, c, d) {
                    return c * (t /= d) * t * t * t + b;
                };
                Easing.easeOutQuart = function (t, b, c, d) {
                    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
                };
                Easing.easeInOutQuart = function (t, b, c, d) {
                    if ((t /= d / 2) < 1)
                        return c / 2 * t * t * t * t + b;
                    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
                };
                Easing.easeInQuint = function (t, b, c, d) {
                    return c * (t /= d) * t * t * t * t + b;
                };
                Easing.easeOutQuint = function (t, b, c, d) {
                    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
                };
                Easing.easeInOutQuint = function (t, b, c, d) {
                    if ((t /= d / 2) < 1)
                        return c / 2 * t * t * t * t * t + b;
                    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
                };
                Easing.easeInSine = function (t, b, c, d) {
                    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
                };
                Easing.easeOutSine = function (t, b, c, d) {
                    return c * Math.sin(t / d * (Math.PI / 2)) + b;
                };
                Easing.easeInOutSine = function (t, b, c, d) {
                    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
                };
                Easing.easeInExpo = function (t, b, c, d) {
                    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
                };
                Easing.easeOutExpo = function (t, b, c, d) {
                    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
                };
                Easing.easeInOutExpo = function (t, b, c, d) {
                    if (t == 0)
                        return b;
                    if (t == d)
                        return b + c;
                    if ((t /= d / 2) < 1)
                        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
                };
                Easing.easeInCirc = function (t, b, c, d) {
                    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
                };
                Easing.easeOutCirc = function (t, b, c, d) {
                    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
                };
                Easing.easeInOutCirc = function (t, b, c, d) {
                    if ((t /= d / 2) < 1)
                        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
                };
                Easing.easeInElastic = function (t, b, c, d) {
                    var s = 1.70158;
                    var m = 0;
                    var a = c;
                    if (t == 0)
                        return b;
                    if ((t /= d) == 1)
                        return b + c;
                    if (!m)
                        m = d * .3;
                    if (a < Math.abs(c)) {
                        a = c;
                        var s = m / 4;
                    }
                    else
                        var s = m / (2 * Math.PI) * Math.asin(c / a);
                    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / s)) + b;
                };
                Easing.easeOutElastic = function (t, b, c, d) {
                    var s = 1.70158;
                    var m = 0;
                    var a = c;
                    if (t == 0)
                        return b;
                    if ((t /= d) == 1)
                        return b + c;
                    if (!m)
                        m = d * .3;
                    if (a < Math.abs(c)) {
                        a = c;
                        var s = m / 4;
                    }
                    else
                        var s = m / (2 * Math.PI) * Math.asin(c / a);
                    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / m) + c + b;
                };
                Easing.easeInOutElastic = function (t, b, c, d) {
                    var s = 1.70158;
                    var m = 0;
                    var a = c;
                    if (t == 0)
                        return b;
                    if ((t /= d / 2) == 2)
                        return b + c;
                    if (!m)
                        m = d * (.3 * 1.5);
                    if (a < Math.abs(c)) {
                        a = c;
                        var s = m / 4;
                    }
                    else
                        var s = m / (2 * Math.PI) * Math.asin(c / a);
                    if (t < 1)
                        return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / m)) + b;
                    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / m) * .5 + c + b;
                };
                Easing.easeInBack = function (t, b, c, d) {
                    var s = 1.70158;
                    return c * (t /= d) * t * ((s + 1) * t - s) + b;
                };
                Easing.easeOutBack = function (t, b, c, d) {
                    var s = 1.70158;
                    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
                };
                Easing.easeInOutBack = function (t, b, c, d) {
                    var s = 1.70158;
                    if ((t /= d / 2) < 1)
                        return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
                };
                Easing.easeOutBounce = function (t, b, c, d) {
                    if ((t /= d) < (1 / 2.75)) {
                        return c * (7.5625 * t * t) + b;
                    }
                    else if (t < (2 / 2.75)) {
                        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                    }
                    else if (t < (2.5 / 2.75)) {
                        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                    }
                    else {
                        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                    }
                };
                Easing.linear = function (t, b, c, d) {
                    return b + c / d * t;
                };
                return Easing;
            }());
            exports_9("Easing", Easing);
        }
    }
});
System.register("src/Animation/Tween", ["src/Animation/easing", 'Engine'], function(exports_10) {
    "use strict";
    var easing_1, Engine_2;
    var TweenAction, TweenItem, TweenCtl;
    return {
        setters:[
            function (easing_1_1) {
                easing_1 = easing_1_1;
            },
            function (Engine_2_1) {
                Engine_2 = Engine_2_1;
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
                    Engine_2.Engine.eventBus.addEventListener('beforeupdate', this.update.bind(this));
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
                                case 'translateTo':
                                    {
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
            exports_10("TweenCtl", TweenCtl);
            window['TweenCtl'] = new TweenCtl();
            window['Tween'] = window['TweenCtl'].add.bind(TweenCtl);
        }
    }
});
//# sourceMappingURL=build.js.map