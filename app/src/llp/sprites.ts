/**
 * Created by yjh on 16/8/8.
 */
import * as Engine from '../Engine/Engine'
import {uiLayer} from './game'
import {Sprite} from '../Engine/Core2D/Sprite'
import {QuadrangleSprite} from "../Engine/Core2D/QuadrangleSprite";
const noteSprInfo = {
    sx: 396 / 1024, sy: 15 / 1024, sw: 128 / 1024, sh: 128 / 1024
};

const parallelSprInfo = {
    sx: 242 / 1024, sy: 417 / 1024, sw: 128 / 1024, sh: 24 / 1024
};

const tailSprInfo = {
    sx: 255 / 1024, sy: 275 / 1024, sw: 128 / 1024, sh: 128 / 1024
};
const longNoteSprInfo = {
    sx: 36 / 1024, sy: 560 / 1024, sw: 500 / 1024, sh: 10 / 1024
};


let noteSpritePool:Array<Note> = [];

function init() {
}

class Note extends Sprite {
    parallelSpr:Sprite;
    noteSpr:Sprite;
    longNoteSpr:QuadrangleSprite;
    tailSprite:Sprite;

    set parallel(v) {
        this.parallelSpr.opacity = v ? 1 : 0;
    }

    set tail(v) {
        this.tailSprite.opacity = v ? 1 : 0;
    }

    set long(v) {
        this.longNoteSpr.opacity = v ? 0.5 : 0
    }
    set note(v){
        this.noteSpr.opacity=v?1:0;
    }

    destroy() {
        noteSpritePool.push(this);
        this.opacity = 0;
        this.tail=false;
        this.long=false;
    }

}
export function noteSpriteFactory(parallel = false) {
    if (noteSpritePool.length > 0) {
        let note = noteSpritePool.pop();
        note.opacity = 1;
        note.parallel = parallel;
        note.long=false;
        note.tail=false;
        note.note=true;
        return note
    } else {
        let uiTexture = Engine.resourceCtl.getItem('uiAssets');
        let newNote = new Note(null, 0, 0, 1, 1, {});
        let noteSpr = new Sprite(uiTexture, 0, 0, 1, 1, noteSprInfo);
        let parallelSpr = new Sprite(uiTexture, 0, 0, 1, parallelSprInfo.sh / parallelSprInfo.sw, parallelSprInfo);
        let tailSpr = new Sprite(uiTexture, 0, 0, 1, 1, tailSprInfo);
        let longNoteSpr = new QuadrangleSprite(uiTexture,longNoteSprInfo.sx,longNoteSprInfo.sy,longNoteSprInfo.sw,longNoteSprInfo.sh);
        newNote.appendChild(parallelSpr);
        newNote.appendChild(noteSpr);
        newNote.noteSpr = noteSpr;
        newNote.parallelSpr = parallelSpr;
        newNote.tailSprite=tailSpr;
        newNote.longNoteSpr=longNoteSpr;
        newNote.parallel = parallel;
        newNote.opacity = 1;
        uiLayer.appendChild(longNoteSpr);
        uiLayer.appendChild(tailSpr);
        uiLayer.appendChild(newNote);
        newNote.long=false;
        newNote.tail=false;
        return newNote
    }


}