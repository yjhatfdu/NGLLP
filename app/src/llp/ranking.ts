/**
 * Created by yjh on 16/8/15.
 */
import * as Engine from '../Engine/Engine'

export const rankTiming={
    miss:200,
    bad:100,
    good:70,
    great:50,
    perfect:30
};

let perfectSe,greatSe,goodSe;

export function init(){
    perfectSe=Engine.resourceCtl.getItem('perfect');
    greatSe=Engine.resourceCtl.getItem('great');
    goodSe=Engine.resourceCtl.getItem('good');
}

export function rank(offset,ch?){
    if (offset==null){
        //todo miss
        return
    }
    let offsetTime=Math.abs(offset);
    if(offsetTime<=rankTiming.perfect){
        Engine.audioCtl.playAudioItem(perfectSe)
    }else if(offsetTime<=rankTiming.great){
        Engine.audioCtl.playAudioItem(greatSe)
    }else if(offsetTime<=rankTiming.good){
        Engine.audioCtl.playAudioItem(goodSe)
    }else if(offsetTime<=rankTiming.bad){

    }else{

    }
}