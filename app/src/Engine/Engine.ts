/**
 * Created by yjh on 15/12/15.
 */

import * as Base from './Base'
import {Render} from './Core/Render'
import {TouchCtl} from './Events/TouchCtl'
import {ResourceCtl} from './Resource/ResourceCtl'
import {AudioCtl} from './Core/AudioCtl'


export var settings = {
    container: null,
    pixelRatio: 1
};

export function setEngine(container, pixelRatio = window.devicePixelRatio) {
    settings.container = container;
    settings.pixelRatio = pixelRatio;
    audioCtl = new AudioCtl();
    resourceCtl = new ResourceCtl();
    render = new Render();
    touchCtl = new TouchCtl();
}

export function loadScript(src) {
    var scriptNode = document.createElement('script');
    document.body.appendChild(scriptNode);
    scriptNode.src = src
}

export var audioCtl: AudioCtl;
export var resourceCtl: ResourceCtl;
export var render: Render;
export var touchCtl: TouchCtl;
export var eventBus: Base.EventBase = new Base.EventBase();