/**
 * Created by yjh on 16/8/8.
 */
import * as Engine from '../Engine/Engine'
import {noteSpriteFactory} from './sprites'

import * as ranking from './ranking'
import {rank, rankTiming} from './ranking'
import {Tween} from '../Engine/Animation/Tween'
import {delay, Settings, userSpeed} from './settings'
import * as m from './beatMap'
import * as lzma from '../../lib/lzma'
import {build} from "llp-script";

export let channels = [];
let speed = 160;
let initialized = false;
let currentNotes;
let touchState = [];
let releaseState = [];
const centerY = 0.501466;
const channelLength = 1.246334;
export let posXexpression, posYexpression, scaleExpression, rotationExpression, opacityExpression,
    identifyChannelExpression,
    frameExpression;

// support ios 10-
if (!Int8Array.prototype.reverse) {
    Int8Array.prototype.reverse = function () {
        let length = this.length;
        let newArray = new Int8Array(length);
        for (let i = 0; i < length; i++) {
            newArray[length - i - 1] = this[i]
        }
        return newArray
    };
    Uint8Array.prototype.reverse = function () {
        let length = this.length;
        let newArray = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            newArray[length - i - 1] = this[i]
        }
        return newArray
    };
}

export function init(rawmap) {
    posXexpression = build(Settings.channelSetting.posX, 'channel', 'progress');
    posYexpression = build(Settings.channelSetting.posY, 'channel', 'progress');
    scaleExpression = build(Settings.channelSetting.scale, 'channel', 'progress');
    opacityExpression = build(Settings.channelSetting.opacity, 'channel', 'progress');
    rotationExpression = build(Settings.channelSetting.rotation, 'channel', 'progress');
    identifyChannelExpression = build(Settings.channelSetting.identifyChannel, 'x', 'y');
    frameExpression = build(Settings.channelSetting.frame);
    let data = new Int8Array(rawmap).reverse();
    let d = lzma.decompress(data);
    let decompressed = new Uint8Array(new Int8Array(d).buffer).reverse();
    let map = (<any>m).M.decode(decompressed);
    speed = userSpeed || map.speed;
    channels = map.channels.slice(0, Settings.channelSetting.count).map((x, i) => {
        x.notes.forEach(n => n.lane = i);
        return x.notes
    });
    currentNotes = channels.map(x => []);
    for (let i = 0; i < channels.length; i++) {
        releaseState[i] = touchState[i] = 0
    }
    ranking.init(channels.reduce((c, x) => c + x.reduce((cc, xx) => cc + (xx.longnote ? 2 : 1), 0), 0));
    initialized = true;
    Engine.touchCtl.addEventListener('touchstart', onTouch);
    Engine.touchCtl.addEventListener('touchend', onTouchEnd);
    Engine.keyboard.addEventListener('keydown', onKeyDown);
    Engine.keyboard.addEventListener('keyup', onKeyUp);
    Engine.eventBus.addEventListener('beforeupdate', () => {
        if (!initialized) {
            return
        }
        let currentTime = Engine.audioCtl.getBgmTime() * 1000;
        for (let channelIndex = 0; channelIndex < channels.length; channelIndex++) {
            let channel = channels[channelIndex];
            let currentChannel = currentNotes[channelIndex];
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
                theNote.holdCount = 0;
                currentChannel.push(theNote);
                touchState[channelIndex] = 0;
            }
            while (true) {
                if (currentChannel.length == 0) {
                    break
                }
                let firstNote = currentChannel[0];
                if (firstNote.starttime > (currentTime - rankTiming.miss)) {
                    break
                }
                if (firstNote.longnote && firstNote.hold) {
                    if (firstNote.endtime < (currentTime - rankTiming.miss)) {
                        currentChannel.shift().sprite.clearLongNoteAnimation().destroy();
                        rank(null);
                    } else {
                        break
                    }
                } else {
                    if (firstNote.longnote) {
                        rank(null)
                    }
                    currentChannel.shift().sprite.destroy();
                    rank(null)
                }
            }
            for (let note of currentChannel) {
                let currentSpr = note.sprite;
                let percentage = Math.max(0, 1 - (note.starttime - currentTime) / 128000 * speed);
                currentSpr.w = currentSpr.h = scaleExpression(channelIndex, percentage, 0, 0);//2*128px/768px
                // let length = channelLength * percentage;
                // let alpha = note.lane * 0.125 * Math.PI;
                // let ca = Math.cos(alpha);
                // let sa = Math.sin(alpha);
                currentSpr.y = posYexpression(channelIndex, percentage, 0, 0);
                currentSpr.x = posXexpression(channelIndex, percentage, 0, 0);
                currentSpr.opacity = opacityExpression(channelIndex, percentage, 0, 0);
                currentSpr.roration = rotationExpression(channelIndex, percentage, 0, 0);
                if (note.longnote) {
                    let headPercentage = 1;
                    let tailPercentage = Math.max(1 - (note.endtime - currentTime) / 128000 * speed, 0);
                    let longSpr = note.sprite.longNoteSpr;
                    if (note.hold) {
                        headPercentage = 1
                    } else {
                        headPercentage = percentage;
                    }
                    let headSize = scaleExpression(channelIndex, headPercentage, 0, 0);
                    let tailSize = scaleExpression(channelIndex, tailPercentage, 0, 0);
                    let headX = posXexpression(channelIndex, headPercentage, 0, 0),
                        headY = posYexpression(channelIndex, headPercentage, 0, 0),
                        tailY = posYexpression(channelIndex, tailPercentage, 0, 0),
                        tailX = posXexpression(channelIndex, tailPercentage, 0, 0);
                    let deltaX = headX - tailX;
                    let deltaY = headY - tailY;
                    let edge = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    let sa = deltaX / edge * 0.5;
                    let ca = deltaY / edge * 0.5;
                    longSpr.p0[0] = headX + headSize * ca;
                    longSpr.p0[1] = headY - headSize * sa;
                    longSpr.p2[0] = headX - headSize * ca;
                    longSpr.p2[1] = headY + headSize * sa;

                    longSpr.p1[0] = tailX - tailSize * ca;
                    longSpr.p1[1] = tailY + tailSize * sa;
                    longSpr.p3[0] = tailX + tailSize * ca;
                    longSpr.p3[1] = tailY - tailSize * sa;


                    if (tailPercentage > 0) {
                        let tailSpr = currentSpr.tailSprite;
                        currentSpr.tail = true;
                        tailSpr.x = tailX;
                        tailSpr.y = tailY;
                        tailSpr.w = tailSpr.h = tailSize
                    } else {
                        currentSpr.tail = false;
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
    let channel = Math.round(identifyChannelExpression(0, 0, x, y));
    if (channel < 0 || channel >= channels.length) {
        return
    }
    touchChannel(channel);
}

function onTouchEnd(e) {
    if (!running) {
        return
    }
    let x = e.x, y = e.y;
    let channel = Math.round(identifyChannelExpression(0, 0, x, y));
    if (channel < 0 || channel >= channels.length) {
        return
    }
    releaseChannel(channel);
}

let keyCodeMap: any = {
    'a': 0,
    's': 1,
    'd': 2,
    'f': 3,
    ' ': 4,
    'j': 5,
    'k': 6,
    'l': 7,
    ';': 8
};

function onKeyDown(key) {
    if (keyCodeMap[key] > -1) {
        touchChannel(keyCodeMap[key])
    }
}

function onKeyUp(key) {
    if (keyCodeMap[key] > -1) {
        releaseChannel(keyCodeMap[key])
    }
}

function touchChannel(ch) {
    touchState[ch]++;
    if (touchState[ch] > 1) {
        return
    }
    let note = currentNotes[ch][0];
    if (!note) {
        return
    }
    if (note.hold) {
        note.holdCount++;
        return
    }
    let currentTime = Engine.audioCtl.getBgmTime() * 1000 + delay;
    let offset = currentTime - note.starttime;
    if (Math.abs(offset) > rankTiming.miss) {
        return
    }
    rank(offset, ch);
    if (note.longnote) {
        note.sprite.note = false;
        note.sprite.parallel = false;
        Tween(note.sprite.longNoteSpr).playAction(Settings.longNotePressAction);
        note.hold = true;
        note.holdCount++;
    } else {
        currentNotes[ch].shift().sprite.destroy();
    }
}

function releaseChannel(ch) {
    touchState[ch]--;
    touchState[ch] = Math.max(0, touchState[ch]);
    if (touchState[ch] >= 1) {
        return
    }

    let note = currentNotes[ch][0];
    if (!note) {
        return
    }
    let currentTime = Engine.audioCtl.getBgmTime() * 1000 + delay;
    let offset = currentTime - note.endtime;
    if (note.longnote && note.hold) {
        if (note.holdCount == 1) {
            rank(offset, ch);
            currentNotes[ch].shift().sprite.destroy().clearLongNoteAnimation()
        } else {
            note.holdCount--;
        }
    }
}


