/**
 * Created by yjh on 15/12/19.
 */
namespace Events{
    export class TouchCtl extends Base.EventBase{
        canvas;
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
            this.dispatchEvent("OnTouchStart")
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
            this.dispatchEvent("OnTouchStart")
        }
        onMouseMove(e){

        }
        onMouseUp(e){
            e.stopPropagation();
            e.preventDefault();
            this.dispatchEvent("OnTouch")
        }
    }
}