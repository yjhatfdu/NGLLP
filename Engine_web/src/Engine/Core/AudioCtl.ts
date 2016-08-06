/**
 * Created by yjh on 15/12/19.
 */
    ///<reference path='../Resource/ResourceItem.ts'/>

import * as Base from '../Base'
    export class AudioCtl extends Base.EventBase{
        ctx;
        bgmBuffer;
        duration;
        isPlaying=false;
        currentTime=0;
        startTime=0;
        bgmSource;

        constructor(){
            super();
            this.ctx=new (window['AudioContext']||window['webkitAudioContext'])();
        }
        startSession(){
            this.ctx.resume();
        }
        loadBgm(item){
            this.bgmBuffer=item.audioBuffer;
            this.duration=item.bgmDuration;
        }
        playAudioItem(item){
            let bufferSource=this.ctx.createBufferSource();
            bufferSource.buffer=item.audioBuffer;
            bufferSource.connect(this.ctx.destination);
            bufferSource.start(this.ctx.currentTime);
        }
        play(delay){
            if(!this.bgmBuffer||this.isPlaying){
                return
            }
            delay=delay||0;
            if(delay>0) {
                setTimeout(this.playNow.bind(this), delay * 1000);
            }
            this.ctx.resume();
            this.bgmSource=this.ctx.createBufferSource();
            this.bgmSource.buffer=this.bgmBuffer;
            this.bgmSource.connect(this.ctx.destination);
            if(delay==0) {
                this.playNow()
            }
        }
        playNow(){
            this.bgmSource.start(this.ctx.currentTime,this.currentTime,this.duration);
            this.startTime=this.ctx.currentTime-this.currentTime;
            this.isPlaying=true;
        }
        pause(){
            if(!this.isPlaying){
                return
            }
            this.bgmSource.stop();
            this.currentTime=this.ctx.currentTime-this.startTime;
            this.isPlaying=false;

        }
        seek(time){
            this.currentTime=time;
            this.play(0)
        }
        getBgmTime(){
            return this.ctx.currentTime-this.startTime
        }
        update(){
            if(this.isPlaying){
                if(this.ctx.currentTime-this.startTime>this.duration){
                    this.pause();
                    this.dispatchEvent("BgmEnd")
                }
            }
        }
    }
