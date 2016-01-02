/**
 * Created by yjh on 15/12/21.
 */
namespace Events{
    export class TouchItem extends Base.NodeBase{
        x;y;w;h;scale=1;
        constructor(x,y,w,h){
            super();
            [this.x,this.y,this.w,this.h]=[x,y,w,h]
        }
    }
}