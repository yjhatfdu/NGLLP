/**
 * Created by yjh on 16/8/8.
 */
import * as Engine from '../Engine/Engine'
import {noteSpriteFactory} from './sprites'
import {bgScale} from './game'
let channels = [];
let speed = 160;
let initialized = false;
let currentNotes;

const rankTiming = {
    miss: 200
};

export function init(map) {
    speed = parseInt(localStorage.getItem('userSpeed') || '0') || map['speed'];
    channels = map['lane'];
    currentNotes = channels.map(x=>[]);
    initialized = true;
    Engine.eventBus.addEventListener('beforeupdate', ()=> {
        if (!initialized) {
            return
        }
        let currentTime = Engine.audioCtl.getBgmTime() * 1000;
        for (let i = 0; i < channels.length; i++) {
            let channel = channels[i];
            let currentChannel = currentNotes[i];
            while (true) {
                if (channel.length == 0) {
                    break
                }
                if (channel[0].starttime > currentTime + 128000 / speed) {
                    break
                }
                let theNote = channel.shift();
                theNote.sprite = noteSpriteFactory(theNote.parallel);
                currentChannel.push(theNote)
            }
            while (true) {
                if (currentChannel.length == 0) {
                    break
                }
                if (currentChannel[0].starttime > (currentTime - rankTiming.miss)) {
                    break
                }
                currentChannel.shift().sprite.destroy();
                //todo miss and longnote
            }
            for (let note of currentChannel) {
                let currentSpr = note.sprite;
                let percentage = 1 - (note.starttime - currentTime) / 128000 * speed;
                currentSpr.w = currentSpr.h = 0.37537 * percentage / bgScale;//2*128px/768px
                let length = 1.246334 * percentage;
                currentSpr.y = (0.501466 - length * Math.sin(note.lane * 0.125 * Math.PI)) / bgScale;
                currentSpr.x = -length * Math.cos(note.lane * 0.125 * Math.PI) / bgScale;
            }

        }
    });
}



