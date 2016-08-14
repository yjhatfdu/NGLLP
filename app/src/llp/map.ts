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

const centerY = 0.501466;
const channelLength = 1.246334;
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
        let noteWidth = 0.37537 / bgScale;
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
                if (theNote.longnote) {
                    theNote.sprite.long = true;
                }
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
                currentSpr.w = currentSpr.h = noteWidth * percentage;//2*128px/768px
                let length = channelLength * percentage;
                let alpha = note.lane * 0.125 * Math.PI;
                let ca = Math.cos(alpha);
                let sa = Math.sin(alpha);
                currentSpr.y = (centerY - length * sa) / bgScale;
                currentSpr.x = -length * ca / bgScale;
                if (note.longnote) {
                    let tailPercentage = Math.max(1 - (note.endtime - currentTime) / 128000 * speed, 0);
                    let longSpr = note.sprite.longNoteSpr;
                    longSpr.p0[0] = currentSpr.x + noteWidth * percentage * sa * 0.5;
                    longSpr.p0[1] = currentSpr.y - noteWidth * percentage * ca * 0.5;
                    longSpr.p2[0] = currentSpr.x - noteWidth * percentage * sa * 0.5;
                    longSpr.p2[1] = currentSpr.y + noteWidth * percentage * ca * 0.5;

                    let tailY = (centerY - channelLength * tailPercentage * sa) / bgScale;
                    let tailX = -channelLength * tailPercentage * ca / bgScale;

                    longSpr.p1[0] = tailX - noteWidth * tailPercentage * sa * 0.5;
                    longSpr.p1[1] = tailY + noteWidth * tailPercentage * ca * 0.5;
                    longSpr.p3[0] = tailX + noteWidth * tailPercentage * sa * 0.5;
                    longSpr.p3[1] = tailY - noteWidth * tailPercentage * ca * 0.5;

                    if(tailPercentage>0){
                        let tailSpr=currentSpr.tailSprite;
                        currentSpr.tail=true;
                        tailSpr.x=tailX;
                        tailSpr.y=tailY;
                        tailSpr.w=tailSpr.h=noteWidth*tailPercentage
                    }
                }
            }

        }
    });
}



