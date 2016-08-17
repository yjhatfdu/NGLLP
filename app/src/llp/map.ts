/**
 * Created by yjh on 16/8/8.
 */
import * as Engine from '../Engine/Engine'
import {noteSpriteFactory} from './sprites'

import {rankTiming,rank} from './ranking'
import * as ranking from './ranking'
import {Tween} from '../Engine/Animation/Tween'
let channels = [];
let speed = 160;
let initialized = false;
let currentNotes;

const centerY = 0.501466;
const channelLength = 1.246334;


export function init(map) {
    speed = parseInt(localStorage.getItem('userSpeed') || '0') || map['speed'];
    channels = map['lane'];
    currentNotes = channels.map(x=>[]);
    ranking.init(channels.reduce((c,x)=>c+x.length,0));
    initialized = true;
    Engine.touchCtl.addEventListener('touchstart', onTouch);
    Engine.touchCtl.addEventListener('touchend', onTouchEnd);

    Engine.eventBus.addEventListener('beforeupdate', ()=> {
        if (!initialized) {
            return
        }
        let currentTime = Engine.audioCtl.getBgmTime() * 1000;
        let noteWidth = 0.37537 ;
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
                let firstNote=currentChannel[0];
                if (firstNote.starttime > (currentTime - rankTiming.miss)) {
                    break
                }
                if(firstNote.longnote&&firstNote.hold){
                    if(firstNote.endtime < (currentTime-rankTiming.miss)){
                        currentChannel.shift().sprite.clearLongNoteAnimation().destroy();
                        rank(null);
                    }else{
                        break
                    }
                }else{
                    if(firstNote.longnote){
                        rank(null)
                    }
                    currentChannel.shift().sprite.destroy();
                    rank(null)
                }
            }
            for (let note of currentChannel) {
                let currentSpr = note.sprite;
                let percentage = Math.max(0,1 - (note.starttime - currentTime) / 128000 * speed);
                currentSpr.w = currentSpr.h = noteWidth * percentage;//2*128px/768px
                let length = channelLength * percentage;
                let alpha = note.lane * 0.125 * Math.PI;
                let ca = Math.cos(alpha);
                let sa = Math.sin(alpha);
                currentSpr.y = (centerY - length * sa) ;
                currentSpr.x = -length * ca ;
                if (note.longnote) {
                    let headPercentage=1;
                    let tailPercentage = Math.max(1 - (note.endtime - currentTime) / 128000 * speed, 0);
                    let longSpr = note.sprite.longNoteSpr;
                    let headX=0,headY=0;
                    if(note.hold){
                        headX=-channelLength*ca;
                        headY=(centerY-channelLength*sa)
                    }else{
                        headPercentage=percentage;
                        headX=currentSpr.x;
                        headY=currentSpr.y
                    }
                    longSpr.p0[0] = headX + noteWidth * headPercentage * sa * 0.5;
                    longSpr.p0[1] = headY- noteWidth * headPercentage * ca * 0.5;
                    longSpr.p2[0] = headX - noteWidth * headPercentage * sa * 0.5;
                    longSpr.p2[1] = headY + noteWidth * headPercentage * ca * 0.5;

                    let tailY = (centerY - channelLength * tailPercentage * sa) ;
                    let tailX = -channelLength * tailPercentage * ca ;

                    longSpr.p1[0] = tailX - noteWidth * tailPercentage * sa * 0.5;
                    longSpr.p1[1] = tailY + noteWidth * tailPercentage * ca * 0.5;
                    longSpr.p3[0] = tailX + noteWidth * tailPercentage * sa * 0.5;
                    longSpr.p3[1] = tailY - noteWidth * tailPercentage * ca * 0.5;

                    if (tailPercentage > 0) {
                        let tailSpr = currentSpr.tailSprite;
                        currentSpr.tail = true;
                        tailSpr.x = tailX;
                        tailSpr.y = tailY;
                        tailSpr.w = tailSpr.h = noteWidth * tailPercentage
                    }
                }
            }

        }
    });
}

export let running = false;

export function enableTouch() {
    running = true;
}

export function disableTouch() {
    running = false;
}

function onTouch(e) {
    if (!running) {
        return
    }
    let x = e.x, y = e.y;
    if (y > (centerY + 0.5 * 0.37537) ) {
        return
    }
    let r = Math.sqrt(x * x + (centerY - y) * (centerY - y));
    let alpha = Math.acos(-x / r);
    let channel = Math.round(alpha / Math.PI * 8);
    touchChannel(channel)
}
function onTouchEnd(e) {
    if (!running) {
        return
    }
    let x = e.x, y = e.y;
    if (y > (centerY + 0.5 * 0.37537) ) {
        return
    }
    let r = Math.sqrt(x * x + (centerY - y) * (centerY - y));
    let alpha = Math.acos(-x / r);
    let channel = Math.round(alpha / Math.PI * 8);
    releaseChannel(channel)
}

function touchChannel(ch){
    let note=currentNotes[ch][0];
    if (!note){
        return
    }
    let currentTime=Engine.audioCtl.getBgmTime()*1000;
    let offset=currentTime-note.starttime;
    if(Math.abs(offset)>rankTiming.miss){
        return
    }
    rank(offset,ch);
    if(note.longnote){
        note.sprite.note=false;
        note.sprite.parallel=false;
        Tween(note.sprite.longNoteSpr,'opacity').translateTo(0.2,1000).translateTo(0.5,1000).loop();
        note.hold=true;
    }else{
        currentNotes[ch].shift().sprite.destroy();
    }
}

function releaseChannel(ch){
    let note=currentNotes[ch][0];
    if (!note){
        return
    }
    let currentTime=Engine.audioCtl.getBgmTime()*1000;
    let offset=currentTime-note.endtime;
    if(note.longnote&&note.hold){
        rank(offset,ch);
        currentNotes[ch].shift().sprite.destroy().clearLongNoteAnimation()
    }
}


