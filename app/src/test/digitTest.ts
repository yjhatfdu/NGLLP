/**
 * Created by yjh on 16/8/17.
 */
import * as Engine from '../Engine/Engine'
import {Digits} from '../Engine/Components/Digits'
import {SpriteBatchNode} from "../Engine/Core2D/SpriteBatchNode";

Engine.setEngine(document.body);
Engine.resourceCtl.loadResources([{'name': 'digits', 'url': '/llplayer/assets/lldigits.png'}])
.then(()=>{
    let digit=new Digits(Engine.resourceCtl.getItem('digits'),5,2,0,{
        sw:250/256,
        sh:200/256
    });
    let batch=new SpriteBatchNode();
    batch.appendChild(digit);
   Engine.render.appendChild(batch);
    window['test']=digit;
    digit.number=4567
});