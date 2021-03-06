/**
 * Created by yjh on 15/12/19.
 */
///<reference path='../Core/GlTexture.ts'/>
///<reference path='../Base.ts'/>
import * as Base from '../Base'
import {GlTexture} from '../Core/GlTexture'

export interface ImageItemProtocol {
    width;
    height;
    name;
    texture: GlTexture;
    destroy();
}

export class ResourceItem extends Base.ObjectBase {
    controller;
    name;
    prepared = false;

    constructor(controller, name) {
        super();
        this.controller = controller;
        this.name = name
    }

    prepare() {

    }

    destroy() {
        this.controller.destroyItem(this)
    }
}
export class AudioItem extends ResourceItem {
    audioBuffer;
    bgmDuration;
    prepared = true;

    constructor(buffer, controller, name) {
        super(controller, name);
        this.audioBuffer = buffer;
        this.bgmDuration = this.audioBuffer.duration
    }

    prepare() {

    }

    prepareBgm() {

    }

    destroy() {
        super.destroy();
        this.audioBuffer = null
    }
}

export class ImageItem extends ResourceItem implements ImageItemProtocol {
    img;
    width;
    height;
    texture: GlTexture;

    constructor(img, controller, name) {
        super(controller, name);
        this.img = img;
        this.width = img.width;
        this.height = img.height;
    }

    prepare(standAlone = false) {
        if (!this.prepared) {
            this.texture = GlTexture.getTexture(this.img, standAlone);
            this.texture.deleteSource();
            this.img = null
        }
    }

    destroy() {
        this.texture.destroy()
    }

}

export class TextItem extends ResourceItem {
    length;
    content;

    constructor(content, controller, name) {
        super(controller, name);
        this.content = content;
    }

    json() {
        if (typeof this.content == 'object') {
            return this.content
        } else {
            return JSON.parse(this.content)
        }
    }

    text() {

    }
}
