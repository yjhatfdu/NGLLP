/**
 * Created by yjh on 16/8/19.
 */
export let Settings = {
    "settingVersion":1,
    "loadingPromotion": [
        "加载中..",
        "正在同步神经接口..",
        "正在和长者谈笑风生..",
        "正在前往花村..",
        "正在丢雷姆..",
        "正在召集lo娘..",
        "正在打call..",
        "正在潜入音乃木坂学院..",
        "正在鄙视bog..",
        "正在和小学生对喷..",
        "正在pr穹妹..",
        "正在重构LLP..",
        "正在给LLP续命..",
        "正在发现女装少年..",
        "少女祈祷中..",
        "正在吞谱..",
        "正在卡loading..",
        "正在准备面基..",
        "正在收扶老二..",
        "正在为您接通妖妖灵..",
        "正在调戏日日日..",
        "正在擦洗note..",
        "正在爆破手机..",
        "正在捕食二刺螈..",
        "正在播撒头皮屑.."
    ],
    "loadingParticleSystem": {
        "size": 6,
        "simpleParticle": false,
        "emitterType": 3,
        "pointScale": 10,
        "emitSpeed": 1,
        "fade": 5,
        "enabled": true,
        "color": [1, 1, 1]
    },
    "sprites": {
        "noteSpr": {
            "sx": 396, "sy": 15, "sw": 128, "sh": 128
        },
        "parallelSpr": {
            "sx": 242, "sy": 417, "sw": 128, "sh": 24
        },

        "tailSpr": {
            "sx": 255, "sy": 275, "sw": 128, "sh": 128
        },
        longNoteSpr: {
            "sx": 36, "sy": 560, "sw": 500, "sh": 10
        },
        "perfect": {
            "sx": 12, "sy": 4, "sw": 372, "sh": 102, "opacity": 0, "scale": 0.7
        },
        "great": {
            "sx": 20, "sy": 109, "sw": 257, "sh": 80, "opacity": 0, "scale": 0.7
        },
        "good": {
            "sx": 19, "sy": 209, "sw": 246, "sh": 80, "opacity": 0, "scale": 0.7
        },
        "bad": {
            "sx": 19, "sy": 306, "sw": 172, "sh": 80, "opacity": 0, "scale": 0.7
        },
        "miss": {
            "sx": 21, "sy": 398, "sw": 200, "sh": 80, "opacity": 0, "scale": 0.7
        },
        "comboDigits": {
            "sw": 250,
            "sh": 200,
            "sx": 600,
            "sy": 200,
            "row":2,
            "stride":5
        },
        "scoreDigits": {
            "sw": 250,
            "sh": 200,
            "sx": 600,
            "sy": 200,
            "row":2,
            "stride":5
        },
    },

    "rankInitialState": {
        "x": 0,
        "y": 0,
        "scale": 0.5,
        "opacity": 1
    },
    "rankAction": {
        "opacity": [
            {"type": "delay", "time": 100},
            {"type": "translateTo", "time": 500, "value": 0}
        ],
        "scale": [
            {"type": "translateTo", "time": 200, "value": 0.8, "easing": "easeOutElastic"}
        ]
    },
    "comboInitialState": {
        "x": 0.0,
        "y": 0.3,
        "h": 0.2,
        "scale": 1,
        "opacity": 1
    },
    "comboAction": {
        "scale": [
            {"type": "translateTo", "value": 1.4, "time": 60},
            {"type": "translateTo", "value": 1, "time": 100},
        ]
    },
    "longNotePressAction": {
        "opacity": [
            {"type": "translateTo", "value": 0.2, "time": 1000},
            {"type": "translateTo", "value": 0.5, "time": 1000},
            {"type": "loop", "times": null},
        ]
    },
    "longNoteInitialState": {
        "opacity": 0.5
    },
    "backgroundSprites": [],

    "rankParticleSystem":{
        "sw": 128,
        "sh": 128,
        "sx": 600,
        "sy": 400,
        "stride":2,
        "row":2,
        "size":35,
        "speed":3,
        "scale":0.1,
        "randomize":1,
        "fade":2
    },
    "rankParticleColor":{
        perfect:[1.0,1.0,0.76,1.0],
        great:[0.7,0.7,1.0,1.0],
        good:[0.8,0.6,0.6,1.0],
        bad:[0.6,0.6,0.6,1.0]
    },
    "rankParticleAction":{
        "progress":[
            {"type":"set","value":0.4,"time":300},
            {"type":"translateTo","value":1,"time":300}
        ]
    }

};