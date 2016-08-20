/**
 * Created by yjh on 16/8/20.
 */
import * as Engine from '../Engine/Engine'
import {SimpleParticleSystem} from "../Engine/ParticleSystem/SimpleParticleSystem";
import {Tween} from '../Engine/Animation/Tween'

Engine.setEngine(document.body,[1024,768]);
Engine.resourceCtl.loadResources([{"name": "pst", url: "../../assets/uiAssets.png"}])
    .then(()=> {
        let ps = new SimpleParticleSystem(Engine.resourceCtl.getItem('pst'), {
            "sw": 128,
            "sh": 128,
            "sx": 600,
            "sy": 400,
            "stride":2,
            "row":2,
            size:15,
            speed:2,
            scale:0.1,
            randomize:1,
            fade:2
        });
        ps.x=1;
        ps.y=1;
        window['ps']=ps;
        Engine.render.appendChild(ps);
        ps.progress=0.3;
        Tween(ps,'progress').translateTo(1,150).delay(500).loop()
    })