/**
 * Created by yjh on 16/1/19.
 */
    ///<reference path='../Core/Object3D.ts'/>
    ///<reference path='../Core/Material.ts'/>
    ///<reference path='Geometry.ts'/>
namespace Core3D{
    export class Mesh extends Core.Object3D{
        material:Core.Material;
        geometry:Core3D.Geometry;
        drawRange=[0,1];
        gl;
        constructor(material?,geometry?){
           super();
            this.material=material;
            this.geometry=geometry;
            this.gl=Engine.render.gl
        }
        update(draw=true){
            super.update();
            this.material.active(false);
            this.material.bindVBO('position',this.geometry.positionVBO);
            this.material.bindVBO('uv',this.geometry.uvVBO);
            this.material.bindVBO('normal',this.geometry.normalVBO);
            this.material.bindIBO(this.geometry.IBO);
            this.material.mvpMat=this.mvpMat;
            if(draw){
                var drawCount=Math.floor((this.drawRange[1]-this.drawRange[0])*this.geometry.elementsCount/3)*3;
                var drawOffset=Math.floor(this.drawRange[0]*this.geometry.elementsCount/3)*3;
                this.gl.drawElements(this.gl.TRIANGLES,drawCount,this.gl.UNSIGNED_SHORT,drawOffset)
            }
        }
    }
}