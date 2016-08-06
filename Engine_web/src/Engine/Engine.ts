/**
 * Created by yjh on 15/12/15.
 */
///<reference path='Base.ts'/>
///<reference path='Resource/ResourceCtl.ts'/>
///<reference path='Core/AudioCtl.ts'/>
///<reference path='Core/Render.ts'/>
///<reference path='Events/TouchCtl.ts'/>
///<reference path='Core2D/Sprite.ts'/>
///<reference path='Core2D/SpriteBatchNode.ts'/>
///<reference path='Core2D/TextSprite.ts'/>
///<reference path='Util/Util.ts'/>
import * as Base from './Base'
import {Render} from './Core/Render'
import {TouchCtl} from './Events/TouchCtl'
import {ResourceCtl} from './Resource/ResourceCtl'
import {AudioCtl} from './Core/AudioCtl'

 export module Engine{

    export var settings={
        container:null,
        pixelRatio:1
    };
    export function setEngine(container,pixelRatio=window.devicePixelRatio){
        settings.container=container;
        settings.pixelRatio=pixelRatio;
        Engine. audioCtl=new AudioCtl();
        Engine. resourceCtl=new ResourceCtl();
        Engine. render=new Render();
        Engine. touchCtl=new TouchCtl();
    }
    export function loadScript(src){
        var scriptNode=document.createElement('script');
        document.body.appendChild(scriptNode);
        scriptNode.src=src
    }
    export var audioCtl:AudioCtl;
    export var resourceCtl:ResourceCtl;
    export var render:Render;
    export var touchCtl:TouchCtl;
    export var eventBus:Base.EventBase =new Base.EventBase();
}