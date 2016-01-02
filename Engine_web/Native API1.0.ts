
/**
 * Created by yjh on 15/12/15.
 */


    namespace Base{
        /**
         * 基类,初始化时生成随机的标示
         */
        export interface ObjectBase{
            uuid:string
            /**
             * 释放时调用 可能需要override
             */
            destroy()
        }

        /**
         * 提供事件处理模型
         */
        export interface EventBase extends ObjectBase{
            /**
             * 添加事件监听器
             * @param event
             * @param listener
             * @param useCapture 表示是否捕捉事件,如果捕捉则不再继续查找事件
             * @return 返回event的id,可以用于注销事件监听
             */
            addEventListener(event:string,listener:Function,useCapture:boolean=false):number
            /**
             * 一次性的监听器
             * @param event
             * @param lisener
             */
            addOneTimeListener(event:string,lisener:Function)

            /**
             *  触发事件
             * @param event
             * @param args 可选参数,会作为listener的参数传入
             */
            dispatchEvent(event:string,args?:any)

            /**
             * 注销指定的listener
             * @param event
             * @param id
             */
            removeListenerById(event:string,id:number)

            /**
             * 注销所有listener
             */
            removeAllListeners()
        }

        /**
         * 提供节点模型
         */
        export interface NodeBase extends EventBase{
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
            insertChildAt(child:NodeBase,index?:number)

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



    namespace Core {
        export interface Object3D extends Base.NodeBase {
            /**
             * default 0.0
             */
            posX,
            posY,
            posZ;
            rotateX,
            rotateY,
            rotateZ;

            /**
             * default 1.0
             */
            scaleX,
            scaleY,
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

        enum RenderEvent{
            InitFinished="InitFinished",
            BeforeUpdate="BeforeUpdate",
            AfterUpdate="AfterUpdate"
        }

        /**
         * 在创建引擎实例时分平台实现各自的画布初始化
         * 只能使用共享的实例 Engine.render
         *  设计分辨率 默认为 [1024,768]
         */
        export interface Render extends Base.EventBase {
            designResolution:Array;
            width:number;
            height:number;
            hiDPI:boolean;
        }

        ///**
        // * 目前用的不多
        // */
        //interface Texture{
        //
        //}

        //interface Material{
        //
        //}

        /**
         * 使用Engine.audioCtl的实例,不能直接构造
         */
        export interface AudioCtl extends Base.EventBase{
            loadBgm(item:Resource.AudioItem)
            play()
            pause()
            playAudioItem(item:Resource.AudioItem)
            seek(time:number)
            getBgmTime():number
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

    namespace Core2D{

        interface Sprite extends Event.TouchItem{

        }
        interface QuadrangleSprite extends Sprite{

        }
        interface SpriteBatchNode extends Core.Object3D{

        }
        interface BackGroundNode extends Core.Object3D{

        }
        interface PostEffect extends Base.NodeBase{

        }
    }
    namespace Core3D{
        interface Camera extends Core.Object3D{

        }
    }
    namespace Event{
        export interface TouchItem extends Base.EventBase{

        }
        interface TOuchCtl extends Base.EventBase{

        }
    }
    namespace Resource{
        /**
         * 不能直接构建,只能从Engine.resourceCtl.getItem(name)获取
         */
        export interface ResourceItem{
            prepare()
        }
        export interface ImageItem extends ResourceItem{
            width:number
            height:number
        }
        export interface AudioItem extends ResourceItem{
            bgmDuration:number
        }

        /**
         * 使用Engine.resourceCtl的实例,不能直接构造
         */
        export interface ResourceCtl extends Base.EventBase{
            /**
             *
             * @param list 每个item是{name:"foo",url:"bar",cache:"false"} cache表示是否缓存到本地,部分平台可用
             * @param callBack
             * @param failCallBack
             */
            loadResources(list:Array,callBack,failCallBack?,progressCallBack?)
            getItem(resourceName:string):ResourceItem
            checkCacheState(url:string):boolean
        }
    }
    namespace Util{
        declare function getTime()
        export interface KVStorage{

        }

        export interface Response{
            error:string
            status:number
            data:string
        }
        export interface Requests extends Base.EventBase{
            get(url:string,callback,queries?:Object,headers?:Object)
            post(url:string,callback,postbody?:Object,headers?:Object)
        }

    }


module Engine{
    export var render:Core.Render;
    export var audioCtl:Core.AudioCtl;
    export var resourceCtl:Resource.ResourceCtl
}

module console{
    declare function log(message:string)
}
