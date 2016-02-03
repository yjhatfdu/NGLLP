/**
 * Created by yjh on 15/12/19.
 */
    ///<reference path='../Base.ts'/>
namespace Events{
    export var TouchEvents={
        'OnTouchStart':'OnTouchStart',
        'touchEnd':'touchEnd',

        };
    export class TouchCtl extends Base.EventBase{
        canvas;
        itemList={};
        figureState={};
        constructor(){
            super();
            this.canvas=Engine.render.canvas;
            if(document.createTouch){
                this.canvas.addEventListener("touchstart",this.onTouchStart.bind(this),true);
                this.canvas.addEventListener("touchend",this.onTouchEnd.bind(this),true);
            }else{
                this.canvas.addEventListener("mousedown",this.onMouseDown.bind(this),true);
                this.canvas.addEventListener("mouseup",this.onMouseUp.bind(this),true);
            }
        }

        onTouchStart(e){
            e.stopPropagation();
            e.preventDefault();
            //this.dispatchEvent("OnTouchStart")
            for(var i=0;i<e.changedTouches.length;i++){
                var touch=e.changedTouches[i];
                this.figureState[touch.identifier]={x:touch.pageX,y:touch.pageY};

            }
        }
        onTouchMove(e){

        }
        onTouchEnd(e){
            e.stopPropagation();
            e.preventDefault();
            this.dispatchEvent("OnTouch")
        }
        onMouseDown(e){
            e.stopPropagation();
            e.preventDefault();
            this.findAndDispatchEvent('OnTouchStart',e.pageX,e.pageY);
            this.dispatchEvent("OnTouchStart")
        }
        onMouseMove(e){

        }
        onMouseUp(e){
            e.stopPropagation();
            e.preventDefault();
            this.dispatchEvent("OnTouch")
        }
        addTouchItem(item,event){
            var level=item.level;
            if(!this.itemList[event]){
                this.itemList[event]=[]
            }
            if(!this.itemList[event][level]){
                this.itemList[event][level]=[]
            }
            this.itemList[event][level].push(item);
            this.itemList[event].sort(function(x,y){
                return y.zIndex-x.zIndex
            });
            item.addEventListener('levelchange',function(){

            }.bind(this))
        }
        removeTouchItem(item,event){
            var level=item.level;
            var list=this.itemList[event][level];
            if(!list){
                return
            }
            var index=list.indexOf(item);
            if(index>=0){
                list.splice(index,1)
            }
        }
        findAndDispatchEvent(event,pageX,pageY){
            if(!this.itemList[event]){
                return
            }
            var x=2*pageX/Engine.render.width-1;
            var y=(2*pageY/Engine.render.height-1)*Engine.render.aspect;
            //handle capture
            for(var l=0;l<this.itemList[event].length;l++){
                var list=this.itemList[event][l];
                if(list){
                    for(var i=0;i<list.length;i++){
                        var item=list[i];
                        if(!item){
                            continue
                        }
                        if(x>item.rx-0.5*item.rw  && x<item.rx+0.5*item.rw && y>item.ry-0.5*item.rh && y<item.ry+0.5*item.rh){
                            if(item.dispatchEvent(event,null,true)){
                                return
                            }else{
                                item.hit=true;
                            }
                        }
                    }
                }
            }
            for(var l=this.itemList[event].length-1;l>=0;l--){
                var list=this.itemList[event][l];
                if(list){
                    for(var j=list.length-1;j>=0;j--){
                        if(list[j].hit==true){
                           list[j].dispatchEvent(event);
                            list[j].hit=false
                        }
                    }
                }
            }
        }
    }
}