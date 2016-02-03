/**
 * Created by yjh on 15/12/21.
 */
    ///<reference path='Sprite.ts'/>
namespace Core2D{
    class QuadrangleSprite extends Base.NodeBase implements SpriteProtocol{
        batchNode;
        isRootSprite;
        opacity;
        zIndex;
        p0;p1;p2;p3;
        texture;
        constructor(imgItem,point0,point1,point2,point3){
            super();
            this.texture=imgItem.texture;
            [this.p0,this.p1,this.p2,this.p3]=[point0,point1,point2,point3]

        }
    }
}