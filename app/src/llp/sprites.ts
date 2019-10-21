/**
 * Created by yjh on 16/8/8.
 */
import * as Engine from '../Engine/Engine'
import {uiLayer} from './game'
import {Sprite} from '../Engine/Core2D/Sprite'
import {Tween} from '../Engine/Animation/Tween'
import {QuadrangleSprite} from "../Engine/Core2D/QuadrangleSprite";
import {Settings} from './settings'


let noteSpritePool: Array<Note> = [];

function init() {
}

class Note extends Sprite {
    parallelSpr: Sprite;
    noteSpr: Sprite;
    longNoteSpr: QuadrangleSprite;
    tailSprite: Sprite;
    random = Math.random();

    set parallel(v) {
        this.parallelSpr.opacity = v ? 1 : 0;
    }

    set tail(v) {
        this.tailSprite.opacity = v ? 1 : 0;
    }

    set long(v) {
        this.longNoteSpr.opacity = v ? Settings.longNoteInitialState.opacity : 0
    }

    set note(v) {
        this.noteSpr.opacity = v ? 1 : 0;
    }

    destroy() {
        noteSpritePool.push(this);
        this.opacity = 0;
        this.tail = false;
        this.long = false;
        return this
    }

    clearLongNoteAnimation() {
        Tween(this.longNoteSpr).endAll();
        return this
    }

}

export function noteSpriteFactory(parallel = false) {
    if (noteSpritePool.length > 0) {
        let note = noteSpritePool.pop();
        note.opacity = 1;
        note.parallel = parallel;
        note.long = false;
        note.tail = false;
        note.note = true;
        return note
    } else {
        let uiTexture = Engine.resourceCtl.getItem('uiAssets');
        let newNote = new Note(null, 0, 0, 1, 1, {});
        let noteSpr = new Sprite(uiTexture, 0, 0, 1, 1, Settings.sprites.noteSpr);
        let parallelSpr = new Sprite(uiTexture, 0, 0, 1, Settings.sprites.parallelSpr.sh / Settings.sprites.parallelSpr.sw, Settings.sprites.parallelSpr);
        let tailSpr = new Sprite(uiTexture, 0, 0, 1, 1, Settings.sprites.tailSpr);
        let longNoteSpr = new QuadrangleSprite(uiTexture, Settings.sprites.longNoteSpr.sx, Settings.sprites.longNoteSpr.sy, Settings.sprites.longNoteSpr.sw, Settings.sprites.longNoteSpr.sh);
        newNote.appendChild(parallelSpr);
        newNote.appendChild(noteSpr);
        newNote.noteSpr = noteSpr;
        newNote.parallelSpr = parallelSpr;
        newNote.tailSprite = tailSpr;
        newNote.longNoteSpr = longNoteSpr;
        newNote.parallel = parallel;
        newNote.opacity = 1;
        uiLayer.appendChild(longNoteSpr);
        uiLayer.appendChild(tailSpr);
        uiLayer.appendChild(newNote);
        newNote.long = false;
        newNote.tail = false;
        return newNote
    }
}
