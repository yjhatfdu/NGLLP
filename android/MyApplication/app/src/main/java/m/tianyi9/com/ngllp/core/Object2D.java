package m.tianyi9.com.ngllp.core;

import android.opengl.Matrix;

import m.tianyi9.com.ngllp.Base.NodeBase;
import m.tianyi9.com.ngllp.core.Core2D.Vec2;
import m.tianyi9.com.ngllp.core.core3D.Vec3;
import m.tianyi9.com.ngllp.core.Transformation.Action;

/**
 * Created by lyt on 16-4-18.
 */
public class Object2D extends NodeBase
{
    protected int Program;
    protected int vshader;
    protected int fshader;
    protected float[] mVPMatrix = new float[16];
    protected float[] PVM = new float[16];
    protected float[] mViewMatrix = new float[16];
    protected float[] mPMatrix = new float[16];
    protected float[] mMMatrix = new float[16];
    protected Action mAction = null;
    public Object2D()
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
    public void Move_d(Vec2 d) {

        this.posXYZ.x += d.x;
        this.posXYZ.y += d.y;
    }

    @Override
    public void Move_d(Vec3 d) {
        this.posXYZ.x += d.x;
        this.posXYZ.y += d.y;
        this.posXYZ.z += d.z;
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
    public void update(long delta)
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
        super.update(delta);
        if(mAction != null)
        {
            if(mAction.mStarted)
                mAction.doAction(delta);
            else
                mAction = null;
        }

    }

    @Override
    public void init() {
        minited = true;
    }
    @Override
    public void runAction(NodeBase node, Action act)
    {
        mAction = act;
        mAction.runAction(node);
    }
}