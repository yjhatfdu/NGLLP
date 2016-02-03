/**
 * Created by yjh on 15/12/21.
 */
    ///<reference path='../Base.ts'/>
    ///<reference path='../../../lib/gl-matrix.d.ts'/>
    namespace Core {
    export class Object3D extends Base.NodeBase {
        isRoot = false;
        position = vec3.create();
        rotate = vec3.create();
        scaleV = vec3.clone(new Float32Array([1, 1, 1]));
        worldMat = mat4.create();
        modelMat = mat4.create();
        mvpMat = mat4.create();
        material;
        parent:Object3D;

        update() {
            if (!this.isRoot) {
                mat4.identity(this.modelMat);
                mat4.rotate(this.modelMat, this.modelMat, 1, this.rotate);
                mat4.scale(this.modelMat, this.modelMat, this.scaleV);
                mat4.translate(this.modelMat, this.modelMat, this.position);
                mat4.mul(this.worldMat, this.modelMat, this.parent.worldMat);
                mat4.mul(this.mvpMat, this.root.vpMat, this.worldMat);
            }
            if (this.material) {
                this.material.mvpMat = this.mvpMat;
                this.material.active();
            }
            super.update()
        }

        set posX(v) {
            this.position[0] = v
        }

        set posY(v) {
            this.position[1] = v
        }

        set posZ(v) {
            this.position[2] = v
        }

        get posX() {
            return this.position[0]
        }

        get posY() {
            return this.position[1]
        }

        get posZ() {
            return this.position[2]
        }

        translate(x, y, z) {
            this.position[0] += x;
            this.position[1] += y;
            this.position[2] += z;
        }

        set scale(v) {
            this.scaleV[0] = v;
            this.scaleV[1] = v;
            this.scaleV[2] = v;
        }

        rotateBy(x, y, z) {
            this.rotate[0] += x;
            this.rotate[1] += y;
            this.rotate[2] += z;
        }

        rotateTo(x, y, z) {
            this.rotate[0] = x;
            this.rotate[1] = y;
            this.rotate[2] = z;
        }


    }
}