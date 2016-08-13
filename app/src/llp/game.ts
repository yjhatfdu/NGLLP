/**
 * Created by yjh on 16/8/6.
 */
import * as Engine from '../Engine/Engine'

import {SpriteBatchNode} from '../Engine/Core2D/SpriteBatchNode'
import {Sprite} from '../Engine/Core2D/Sprite'
import {load} from './loader'
import * as loading from './loading'
import {Tween} from '../Engine/Animation/Tween'
import {Easing} from '../Engine/Animation/easing'
import {TextSprite} from "../Engine/Core2D/TextSprite";

import * as GameMap from  './map'

export let bgScale = 1;
export let uiLayer:SpriteBatchNode;
Engine.setEngine(document.body);


loading.start();

let live_id;
try{
    live_id=location.href.match(/live_id=(.+)/)[1]
}catch (e){
    live_id=null;
}
load(live_id)
    .then(liveinfo=> {
        document.title=liveinfo.title;
        return Engine.resourceCtl.loadResources([
            {'name': 'bg', 'url': liveinfo.bgimg, standAloneTexture: true},
            {'name': 'perfect', 'url': liveinfo.perfect},
            {'name': 'great', 'url': liveinfo.great},
            {'name': 'good', 'url': liveinfo.good},
            {'name': 'digits', 'url': liveinfo.digits},
            {'name': 'uiAssets', 'url': liveinfo.uiAssets},
            {'name': 'bgm', 'url': liveinfo.bgm},
            {'name': 'map', 'url': liveinfo.map},
            {'name': 'coverImg', 'url': liveinfo.coverImg, standAloneTexture: true},

        ], p=>loading.progress(p))
    })
    .then(()=>loading.stop())
    .then(()=> {

        GameMap.init(Engine.resourceCtl.getItem('map').json());
        let bgLayer = new SpriteBatchNode();
        uiLayer=new SpriteBatchNode(64);
        let perfect = Engine.resourceCtl.getItem('perfect');

        let bg = Engine.resourceCtl.getItem('bg');
        let bgObject = new Sprite(bg, 0, 0, bg.width / bg.height * 2, 2);

        function resizeBg() {
            if (Engine.render.aspect > bg.height / bg.width) {
                bgScale = Engine.render.aspect * bg.width / bg.height
            } else {
                bgScale = 1;
            }
            bgObject.w = bg.width / bg.height * 2 / bgScale;
            bgObject.h = 2 / bgScale;
        }

        Engine.render.addEventListener('resize', resizeBg);
        resizeBg();
        bgLayer.appendChild(bgObject);
        Engine.audioCtl.loadBgm(Engine.resourceCtl.getItem('bgm'));
        let cover = Engine.resourceCtl.getItem('coverImg');
        let coverSprite = new Sprite(cover, 0, 0.3, cover.width / cover.height, 1);
        let clickToStart = new TextSprite(400, 100, 'Touch To Start', 40);
        clickToStart.y = -0.4;
        bgLayer.appendChild(coverSprite);
        bgLayer.appendChild(clickToStart);
        Engine.render.appendChild(bgLayer);

        bgObject.opacity = .1;
        bgLayer.opacity=0;
        Tween(bgLayer,'opacity').translateTo(1,500);
        bgObject.addOneTimeListener('touchend', ()=> {

            Engine.audioCtl.play(1);
            Tween(clickToStart, 'opacity').translateTo(0, 200)
                .then(()=>Engine.render.appendChild(uiLayer));
            Tween(coverSprite,'opacity').translateTo(0,200)
                .then(()=>bgLayer.removeChild(coverSprite));
            Tween(coverSprite,'scale').translateTo(2,300).easing(Easing.easeInQuad);
            Tween(clickToStart, 'scale').translateTo(2, 300).easing(Easing.easeInQuad).then(()=>bgLayer.removeChild(clickToStart));
            Tween(bgObject, 'opacity').translateTo(1, 1000);
            bgObject.addEventListener('touchstart', ()=> {
                Engine.audioCtl.playAudioItem(perfect);
            })
        });
    });
