/**
 * Created by yjh on 15/12/19.
 */
///<reference path='../Resource/ResourceItem.ts'/>

import * as Base from '../Base'
import * as Engine from '../Engine'
export class AudioCtl extends Base.EventBase {
    ctx;
    bgmBuffer;
    duration;
    isPlaying = false;
    currentTime = 0;
    startTime = 0;
    bgmSource;
    useDate = true;

    constructor() {
        super();
        this.ctx = new (window['AudioContext'] || window['webkitAudioContext'])();
        Engine.eventBus.addEventListener('beforeupdate',this.update.bind(this))
    }

    startSession() {
        this.ctx.resume();
    }

    getTime() {
        return this.useDate ? Date.now() * 0.001 : this.ctx.currentTime
    }

    loadBgm(item) {
        this.bgmBuffer = item.audioBuffer;
        this.duration = item.bgmDuration;
    }

    playAudioItem(item) {
        let bufferSource = this.ctx.createBufferSource();
        bufferSource.buffer = item.audioBuffer;
        bufferSource.connect(this.ctx.destination);
        bufferSource.start(this.ctx.currentTime);
    }

    play(delay = 0) {
        if (!this.bgmBuffer || this.isPlaying) {
            return
        }
        this.bgmSource = this.ctx.createBufferSource();
        this.bgmSource.buffer = this.bgmBuffer;
        this.bgmSource.connect(this.ctx.destination);
        if (this.ctx.resume) {
            if (delay > 0) {
                setTimeout(this.playNow.bind(this), delay * 1000);
            }
            this.ctx.resume();
        } else {
            if (delay > 0) {
                this.bgmSource.start(this.ctx.currentTime + delay, this.currentTime, this.duration);

                this.isPlaying = true;
            }
        }
        this.startTime = this.getTime()- this.currentTime + delay;
        this.isPlaying = true;
        if (delay == 0) {
            this.playNow()
        }
    }

    playNow() {
        this.bgmSource.start(this.ctx.currentTime, this.currentTime, this.duration);
        this.startTime = this.getTime() - this.currentTime;
        this.isPlaying = true;
    }

    pause() {
        if (!this.isPlaying) {
            return
        }
        this.bgmSource.stop();
        this.currentTime = this.getTime() - this.startTime;
        this.isPlaying = false;

    }

    seek(time) {
        this.currentTime = time;
        this.play(0)
    }

    getBgmTime() {
        return this.isPlaying ? this.getTime() - this.startTime : this.currentTime - this.startTime
    }

    update() {
        if (this.isPlaying) {
            if (this.getBgmTime() > 5) {
                this.pause();
                Engine.eventBus.dispatchEvent("bgmEnd");

            }
        }
    }
}
