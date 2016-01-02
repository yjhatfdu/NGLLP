/**
 * Created by yjh on 15/12/15.
 */
///<reference path='Base.ts'/>
///<reference path='Resource/ResourceCtl.ts'/>
///<reference path='Core/AudioCtl.ts'/>
///<reference path='Core/Render.ts'/>
    ///<reference path='Events/TouchCtl.ts'/>

namespace Engine{

    export var settings={
        container:null,
        pixelRatio:1
    };
    export function setEngine(container,pixelRatio=window.devicePixelRatio){
        settings.container=container;
        settings.pixelRatio=pixelRatio;
        Engine. audioCtl=new Core.AudioCtl();
        Engine. resourceCtl=new Resource.ResourceCtl();
        Engine. render=new Core.Render();
        Engine. touchCtl=new Events.TouchCtl()
    }
    export var audioCtl:Core.AudioCtl;
    export var resourceCtl:Resource.ResourceCtl;
    export var render:Core.Render;
    export var touchCtl:Events.TouchCtl
}