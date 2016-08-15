/**
 * Created by yjh on 15/12/15.
 */


export class ObjectBase {
    uuid: string;

    constructor() {
        this.uuid = Math.random() + ''
    }

    destroy() {

    }
}
export class EventBase extends ObjectBase {
    //提供事件处理功能
    private listeners = {};

    constructor() {
        super();
    }

    dispatchEvent(event: string, args?: any, captureOnly = false) {
        if (!this.listeners[event]) {
            return false
        }
        let state=false;
        for (let i in this.listeners[event]) {
            let l = this.listeners[event][i];
            if (l.useCapture == false && captureOnly == true) {
                continue
            }
            l.listener(args, this);

            if (l.oneTime) {
                delete this.listeners[event][i];
                state=true
            }
        }
        return state
    }

    addEventListener(event: string, listener: Function, useCapture: boolean = false): number {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        let id = Math.random();
        this.listeners[event].push({listener: listener, useCapture: useCapture, id: id});
        return id
    }

    addOneTimeListener(event: string, listener: Function): number {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        let id = Math.random();
        this.listeners[event].push({listener: listener, useCapture: true, id: id, oneTime: true});
        return id
    }

    private removeAllEventListenersOfEvent(event: string) {
        this.listeners[event] = [];
    }

    removeListenerById(event: string, id: number) {
        let list = this.listeners[event];
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                list.splice(i, 1);
                return
            }
        }
    }

    removeAllListeners() {
        this.listeners = {}
    }
}
export class NodeBase extends EventBase {
    protected static nodeList = {};

    static getNodeById(id) {
        return NodeBase.nodeList[id]
    }

    root;
    children: Array<any> = [];
    parent;
    visible: boolean = true;
    level = 0;
    _id = null;
    set id(value) {
        if (NodeBase.nodeList[value]) {
            throw "Duplicated id for node"
        } else {
            if (NodeBase.nodeList[this._id]) {
                delete NodeBase.nodeList[this._id]
            }
            NodeBase.nodeList[value] = this
        }

    }

    get id() {
        return this._id
    }

    constructor() {
        super()
    }

    setNode() {
        this.level = this.parent.level + 1;
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].setNode();
        }
    }

    update(flag?) {
        for (let i = 0; i < this.children.length; i++) {
            let node = this.children[i];
            if (node.visible) {
                node.update()
            }
        }
    }

    appendChild(child: NodeBase) {
        child.root = this.root;
        child.parent = this;
        //child.setNode();
        this.children.push(child);
        child.setNode();
    }
    appendChildren(children:Array<NodeBase>){
        for(let c of children){
            this.appendChild(c)
        }
    }

    insertChild(child: NodeBase, index = 0) {
        child.root = this.root;
        child.parent = this;
        //child.setNode();
        this.children.splice(index, 0, child);
        child.setNode();

    }


    indexOfChild(child: NodeBase): number {
        return this.children.indexOf(child)
    }

    removeChild(child: NodeBase) {
        this.children.splice(this.children.indexOf(child), 1)
    }

    getChildrenCount() {
        let count = this.children.length;
        for (let i = 0, il = count; i < il; i++) {
            count += this.children[i].getChildrenCount()
        }
        return count
    }

    destroy() {
        delete NodeBase.nodeList[this._id]

    }
}
