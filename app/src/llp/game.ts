/**
 * Created by yjh on 16/8/6.
 */
import * as Engine from '../Engine/Engine'

import {SpriteBatchNode} from '../Engine/Core2D/SpriteBatchNode'
import {Sprite} from '../Engine/Core2D/Sprite'
import {liveinfo, load} from './loader'
import * as loading from './loading'
import {Tween} from '../Engine/Animation/Tween'
import {Easing} from '../Engine/Animation/easing'
import {TextSprite} from "../Engine/Core2D/TextSprite";
import * as Result from "./result"
import * as GameMap from './map'
import * as Ranking from './ranking'
import {loadSettings, renderPrecision, Settings} from './settings'
import {build} from "llp-script";

export let uiLayer: SpriteBatchNode;
export let bgLayer: SpriteBatchNode;
export let title;


let live_id;
try {
    live_id = location.href.match(/live_id=(.+)/)[1]
} catch (e) {
    live_id = null;
}
load(live_id)
    .then(_ => {
        if (liveinfo.customize) {
            return loadSettings(liveinfo.customize)
        } else {
            return null
        }
    })
    .then(_ => {
        Engine.setEngine(document.body, [Settings.canvasSetting.width, Settings.canvasSetting.height], window.devicePixelRatio * renderPrecision);
        loading.start();
        document.title = liveinfo.title;
        title = liveinfo.title;
        return Engine.resourceCtl.loadResources([
            {'name': 'bg', 'url': liveinfo.bgimg, standAloneTexture: true},
            {'name': 'perfect', 'url': liveinfo.perfect, 'realExt': '.mp3'},
            {'name': 'great', 'url': liveinfo.great, 'realExt': '.mp3'},
            {'name': 'good', 'url': liveinfo.good, 'realExt': '.mp3'},
            {'name': 'uiAssets', 'url': liveinfo.uiAssets, standAloneTexture: true},
            {'name': 'bgm', 'url': liveinfo.bgm, 'realExt': '.mp3'},
            // {'name': 'm', 'url': liveinfo.bad,arrayBuffer:true},
            {'name': 'm', 'url': liveinfo.bad, arrayBuffer: true},
            {'name': 'coverImg', 'url': liveinfo.coverImg, standAloneTexture: true},
        ], p => loading.progress(p))
    })
    .then(() => loading.stop())
    .then(() => {
        bgLayer = new SpriteBatchNode();
        uiLayer = new SpriteBatchNode(64);
        let perfect = Engine.resourceCtl.getItem('perfect');
        let bg = Engine.resourceCtl.getItem('bg');
        let bgObject = new Sprite(bg, 0, 0, bg.width / bg.height * 2, 2, {});
        bgLayer.appendChild(bgObject);
        let bgRotation = build(Settings.canvasSetting.rotation, 'currentTime');
        let bgScale = build(Settings.canvasSetting.scale, 'currentTime');
        let bgOpacity = build(Settings.canvasSetting.opacity, 'currentTime');

        Engine.audioCtl.loadBgm(Engine.resourceCtl.getItem('bgm'));
        let cover = Engine.resourceCtl.getItem('coverImg');
        let coverSprite = new Sprite(cover, 0, 0.3, cover.width / cover.height, 1, {});
        let clickToStart = new TextSprite(400, 100, 'Touch To Start', 40);
        clickToStart.y = -0.4;
        bgLayer.appendChild(coverSprite);
        bgLayer.appendChild(clickToStart);
        Engine.render.appendChild(bgLayer);
        bgObject.opacity = .1;
        bgLayer.opacity = 0;
        Tween(bgLayer, 'opacity').translateTo(1, 500);

        GameMap.init(Engine.resourceCtl.getItem('m'));
        let started = false;
        let startGame = () => {
            if (started) {
                return
            }

            started = true;
            Engine.eventBus.addEventListener('beforeupdate', () => {
                let current = Engine.audioCtl.getBgmTime() * 1000 || 0;
                if(current>0){
                    bgObject.rotation = bgRotation(current);
                    bgObject.scale = bgScale(current);
                    bgObject.opacity=bgOpacity(current);
                }
            });
            GameMap.enableTouch();
            Engine.audioCtl.play(1.5);
            Tween(clickToStart, 'opacity').translateTo(0, 200)
                .then(() => Engine.render.appendChild(uiLayer));
            Tween(coverSprite, 'opacity').translateTo(0, 200)
                .then(() => bgLayer.removeChild(coverSprite));
            Tween(coverSprite, 'scale').translateTo(2, 300).easing(Easing.easeInQuad);
            Tween(clickToStart, 'scale').translateTo(2, 300).easing(Easing.easeInQuad).then(() => {
                bgLayer.removeChild(clickToStart);
                Ranking.showScore();
            });
            Tween(bgObject, 'opacity').translateTo(1, 1000);
        };
        bgObject.addOneTimeListener('touchend', startGame);
        Engine.keyboard.addOneTimeListener('keyup', startGame);
        Engine.eventBus.addEventListener('bgmEnd', () => Result.showResult())
    });
