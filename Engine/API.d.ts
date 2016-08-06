/**
 * Created by yjh on 16/2/10.
 */
/**
 * Created by yjh on 15/12/15.
 */
    ///<reference path='./Native API.d.ts'/>
    ///<reference path='./lib/Promise.d.ts'/>
    //todo finish all the API definition

declare module 'NGLLP/Base' {
    /**
     * 基类,初始化时生成随机的标示
     */
    export class ObjectBase {
        uuid:string;
        /**
         * 释放时调用 可能需要override
         */
        destroy()
    }

    /**
     * 提供事件处理模型
     */
    export class EventBase extends ObjectBase {
        /**
         * 添加事件监听器
         * @param event
         * @param listener
         * @param useCapture 表示是否捕捉事件,如果捕捉则不再继续查找事件
         * @return 返回event的id,可以用于注销事件监听
         */
        addEventListener(event:string, listener:Function, useCapture?:boolean):number
        /**
         * 一次性的监听器
         * @param event
         * @param lisener
         */
        addOneTimeListener(event:string, lisener:Function)

        /**
         *  触发事件
         * @param event
         * @param args 可选参数,会作为listener的参数传入
         */
        dispatchEvent(event:string, args?:any)

        /**
         * 注销指定的listener
         * @param event
         * @param id
         */
        removeListenerById(event:string, id:number)

        /**
         * 注销所有listener
         */
        removeAllListeners()
    }

    /**
     * 提供节点模型
     */
    export class NodeBase extends EventBase {
        children:Array<NodeBase>;
        parent:NodeBase;
        //所有绘图节点的root都是一个render
        root:NodeBase;
        visible:Boolean;
        /**
         * 在列表末尾添加child
         * @param child
         */
        appendChild(child:NodeBase)

        /**
         * 返回指定child的索引,没有的话返回-1
         * @param child
         */
        indexOfChild(child:NodeBase):number

        /**
         * 在指定位置插入child
         * @param child
         * @param index
         */
        insertChild(child:NodeBase, index?:number)

        /**
         * 移除指定的child
         * @param child
         */
        removeChild(child:NodeBase)

        /**
         * 遍内部节点,并调用自节点的update()
         * @param current 当前时间
         */
        update(current:number)

        //在append的时候执行
        setNode()

        getChildrenCount():number
    }

}


//namespace Materials{
//    interface SpriteMaterial{
//
//    }
//    interface BackgroundMaterial{
//
//    }
//
//
//}

declare module 'NGLLP/Resource' {
    import * as Base from 'Base'
    export class ResourceItem {
        constructor(controller, name)
        prepare()
    }
    export interface ImageItem extends ResourceItem {
        width:number
        height:number
        texture;
    }
    export interface AudioItem extends ResourceItem {
        bgmDuration:number
    }
    export class ResourceCtl extends Base.EventBase {

        loadResource(list, progressCallBack?):Promise<ResourceCtl>
        /**
         *
         * @param list 每个item是{name:"foo",url:"bar",cache:"false"} cache表示是否缓存到本地,部分平台可用
         * @param callBack
         * @param failCallBack
         */
        loadResources_raw(list, callBack, failCallBack?, progressCallBack?)
        getItem(resourceName:string):ResourceItem
        checkCacheState(url:string):boolean
    }


}

declare module 'NGLLP/Util' {
    //封装系统获取timestamp的API
    function getTime()

    //可以暂停和获取时间的API
    interface Time {
        start();
        pause();
        now();
    }

    interface KVStorage {

    }

    var Response:{
        error:string
        status:number
        data:string
    };

    //export interface Requests extends Base.EventBase{
    //    get(url:string,callback,queries?:Object,headers?:Object)
    //    post(url:string,callback,postbody?:Object,headers?:Object)
    //}


}


declare module 'NGLLP/Network' {
    export class Request {
        open(url, method?, params?, headers?, postObject?, onload?, onerror?, onprogress?)
    }
    export function GET()
    export function POST()
    export function HTTP()
}
declare module 'NGLLP/Engine' {
    import * as Base from 'NGLLP/Base'
    import {Render} from 'NGLLP/Core'
    import {AudioCtl} from 'NGLLP/Core'
    import {ResourceCtl} from 'NGLLP/Resource'
    export module Engine {
        export var render:Render;
        export var audioCtl:AudioCtl;
        export var resourceCtl:ResourceCtl;
        export var eventBus:Base.EventBase;
    }
}

//
//module console{
//    declare function log(message:string)
//}

declare module "NGLLP/Core"{
    import * as Base from 'Base'
    export class Object3D extends Base.NodeBase {
        /**
         * default 0.0
         */
        posX;
        posY;
        posZ;
        rotateX;
        rotateY;
        rotateZ;

        /**
         * default 1.0
         */
        scaleX;
        scaleY;
        scaleZ;

        translate(x:number, y:number, z:number)

        rotate(x:number, y:number, z:number)

        scale(x:number, y:number, z:number)

        /**
         *
         * 内部实现
         * worldMatrix
         * modelMatrix
         * mvMatrix
         * 每次update重新计算
         *
         */
    }
    /**
     * 在创建引擎实例时分平台实现各自的画布初始化
     * 只能使用共享的实例 Engine.render
     *  设计分辨率 默认为 [1024,768]
     */
    export class Render extends Object3D {
        designResolution:Array<number>;
        width:number;
        height:number;
        hiDPI:boolean;
    }
    import {AudioItem} from 'Resource'
    /**
     * 使用Engine.audioCtl的实例,不能直接构造
     */
    export class AudioCtl extends Base.EventBase {
        loadBgm(item:AudioItem)
        play()
        pause()
        playAudioItem(item:AudioItem)
        seek(time:number)
        getBgmTime():number
    }
    export class Material{
        enableBlend;
        enableDepthTest;
        enableDepthWrite;
        IBO;
        mvpMat;
        autoBindAttrib;
        constructor(uniformList?,attributeList?);
        initProgram(vst,fst,flags?)
        uniformData(name,data)
        bindVBO(name,vbo)
        bindIBO(IBO)
        bindTexture(texture,index)
        active(push?)

    }

}
declare module 'NGLLP/Core2D'{
    import {Object3D} from 'Core'
    import {TouchItem} from 'Events'
    export class Sprite extends TouchItem {

    }
    export class SpriteBatchNode extends Object3D {
    }
}


declare module 'NGLLP/Core3D' {
    import {Object3D} from 'Core'
    class Camera extends Object3D {

    }
    export * from 'Core3D'
}

declare module 'NGLLP/Events'{
    import * as Base from 'Base'
    export class TouchItem extends Base.EventBase {

    }
    export class TouchCtl extends Base.EventBase {

    }

}
declare module 'MMD/PMDLoader'{

       export class PMDLoader{
           constructor();
           load(url)
       }

}

