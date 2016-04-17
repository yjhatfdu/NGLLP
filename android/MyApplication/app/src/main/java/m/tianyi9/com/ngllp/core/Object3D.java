package m.tianyi9.com.ngllp.core;

import android.opengl.Matrix;

import m.tianyi9.com.ngllp.Base.NodeBase;
import m.tianyi9.com.ngllp.Core2D.Vec2;
import m.tianyi9.com.ngllp.Core2D.Vec3;

/**
 * Created by lyt on 16-2-13.
 */
public abstract class Object3D extends NodeBase {
    protected int Program;
    protected int vshader;
    protected int fshader;
    protected float[] mVPMatrix = new float[16];
    protected float[] PVM = new float[16];
    protected float[] mViewMatrix = new float[16];
    protected float[] mPMatrix = new float[16];
    protected float[] mMMatrix = new float[16];
    protected Vec3 posXYZ = new Vec3(0.0f,0.0f,0.0f);
    protected Vec3 RotXYZ = new Vec3(0.0f,0.0f,0.0f);
    protected Vec3 ScaleXYZ = new Vec3(1.0f,1.0f,1.0f);
    protected Vec3 Anchor = new Vec3(0.0f,0.0f,0.0f);
    public Object3D()
    {
        super();
        Matrix.setIdentityM(mMMatrix, 0);
        Matrix.setIdentityM(mViewMatrix, 0);
        Matrix.setIdentityM(mPMatrix, 0);
        Matrix.setIdentityM(mVPMatrix, 0);
    }

    @Override
    public void Rotate(Vec3 deg) {
        this.RotXYZ.x = deg.x;
        this.RotXYZ.y = deg.y;
        this.RotXYZ.z = deg.z;
    }

    @Override
    public void RotateX(float deg) {
        this.RotXYZ.x = deg;
    }

    @Override
    public void RotateY(float deg) {
        this.RotXYZ.y =deg;
    }

    @Override
    public void RotateZ(float deg) {
        this.RotXYZ.z = deg;
    }


    @Override
    public void Move(Vec2 move) {

        this.posXYZ.x = move.x;
        this.posXYZ.y = move.y;
    }

    @Override
    public void Move(Vec3 move) {
        this.posXYZ.x = move.x;
        this.posXYZ.y = move.y;
        this.posXYZ.z = move.z;
    }

    @Override
    public void Scale(Vec2 scale) {
        this.ScaleXYZ.x = scale.x;
        this.ScaleXYZ.y = scale.y;
    }

    @Override
    public void Scale(Vec3 scale) {
        this.ScaleXYZ = scale;
    }

    @Override
    public void SetAnchorPoint(Vec2 point) {

    }

    @Override
    public void SetAnchorPoint(Vec3 point) {

    }
    public Vec3 getPos()
    {
        return posXYZ;

    }
    @Override
    public void update(long current)
    {
        if(!minited)
        {
            init();
        }
        Vec2 Resolu = Render.getInstance().getdesign_res();
        Matrix.setIdentityM(mMMatrix, 0);
        Matrix.setIdentityM(mVPMatrix,0);
        Matrix.translateM(mMMatrix, 0,  (float)posXYZ.x / (0.5f * Resolu.x),  (float)posXYZ.y / (0.5f * Resolu.y), (float)posXYZ.z / (0.5f * Resolu.x));
        Matrix.scaleM(mMMatrix, 0, ScaleXYZ.x,ScaleXYZ.y,ScaleXYZ.z);
        Matrix.rotateM(mMMatrix,0,RotXYZ.x, 1, 0 ,0);
        Matrix.rotateM(mMMatrix, 0, RotXYZ.y, 0, 1, 0);
        Matrix.rotateM(mMMatrix, 0, RotXYZ.z, 0, 0, 1);
        super.update(current);
    }

    @Override
    public void init() {
        minited = true;
    }
}
