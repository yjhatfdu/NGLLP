/**
 * Created by yjh on 15/12/15.
 */

namespace Base{
    export class ObjectBase{
        uuid:string;
        constructor(){
            this.uuid=Math.random()+''
        }
    }
    export class EventBase extends ObjectBase{
        //提供事件处理功能
        private listeners = {};
        constructor(){
            super();
        }

        dispatchEvent(event:string, args?:any) {
            if (!this.listeners[event]) {
                return true
            }
            for (var i in this.listeners[event]) {
                var l = this.listeners[event][i];
                l.listener( args,this);
                if(l.oneTime){
                    delete this.listeners[event][i];
                    return
                }
                if (l.useCapture) {
                    return false
                }
            }
            return true
        }

        addEventListener(event:string, listener:Function, useCapture:boolean = false):number {
            if (!this.listeners[event]) {
                this.listeners[event] = []
            }
            var id=Math.random();
            this.listeners[event].push({listener: listener, useCapture: useCapture,id:id});
            return id
        }
        addOnetimeListener(event:string,listener:Function):number{
            if (!this.listeners[event]) {
                this.listeners[event] = []
            }
            var id=Math.random();
            this.listeners[event].push({listener: listener, useCapture: true,id:id,oneTime:true});
            return id
        }


        private removeAllEventListenersOfEvent(event:string) {
            this.listeners[event] = [];
        }
        removeListenerById(event:string,id:number){
            var list=this.listeners[event];
            for(var i=0;i<list.length;i++){
                if(list[i].id==id){
                    list.splice(i,1);
                    return
                }
            }
        }
        removeAllListeners(){
            this.listeners={}
        }
    }
    export class NodeBase extends EventBase{
        root:Core.Render;
        children:Array<any>=[];
        parent;
        visible:boolean;
        constructor(){
            super()
        }
        setNode(){

        }

        update(currentTime?){
            for (var i=0;i<this.children.length;i++){
                var node=this.children[i];
                if(node.visible){
                    node.update(currentTime)
                }
            }
        }
        appendChild(child:NodeBase){
            child.root=this.root;
            child.parent=this;
            child.setNode();
            this.children.push(child);
        }
        insertChild(child:NodeBase,index=0){
            child.root=this.root;
            child.parent=this;
            child.setNode();
            this.children.splice(index,0,child)
        }
        indexOfChild(child:NodeBase):number{
            return this.children.indexOf(child)
        }
        removeChild(child:NodeBase){
             this.children.splice(this.children.indexOf(child),1)
        }
        getChildrenCount(){
            var count=this.children.length;
            for(var i=0,il=count;i<il;i++){
                count+=this.children[i].getChildrenCount()
            }
            return count
        }
    }
}