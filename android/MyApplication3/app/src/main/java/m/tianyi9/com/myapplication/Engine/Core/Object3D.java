package m.tianyi9.com.myapplication.Engine.Core;

import m.tianyi9.com.myapplication.Engine.Base.NodeBase;
import m.tianyi9.com.myapplication.Engine.Utils.Vec3;

/**
 * Created by lyt on 16-8-11.
 */

public abstract class Object3D extends NodeBase{
    protected boolean isRoot = false;
    protected Vec3 mPosition = new Vec3(0,0,0);
    protected Vec3 mRotation = new Vec3(0,0,0);
    protected Vec3 mScale = new Vec3(1,1,1);
    public void setX(double X)
    {
        mPosition.setX(X);
    }
    public void setY(double Y)
    {
        mPosition.setY(Y);
    }
    public void setZ(double Z)
    {
        mPosition.setZ(Z);
    }
    public void setPosition(double X,double Y, double Z)
    {
        setX(X);
        setY(Y);
        setZ(Z);
    }
    public void setPosition(Vec3 newPos)
    {
        mPosition = newPos;
    }
    public void moveBy(double X,double Y,double Z)
    {
        setPosition(mPosition.getX() + X, mPosition.getY() + Y,mPosition.getZ() + Z);
    }
    public void moveBy(Vec3 dPos)
    {
        setPosition(mPosition.getX() + dPos.getX(), mPosition.getY() + dPos.getY(), mPosition.getX() + dPos.getZ());
    }
    public void setRotateX(double radX)
    {
        mRotation.setX(radX);
    }
    public void setRotateY(double radY)
    {
        mRotation.setY(radY);
    }
    public void setRotateZ(double radZ)
    {
        mRotation.setZ(radZ);
    }
    public void setRotation(double radX,double radY,double radZ)
    {
        setRotateX(radX);
        setRotateY(radY);
        setRotateZ(radZ);
    }
    public void setRotation(Vec3 radXYZ)
    {
        mPosition = radXYZ;
    }
    public void RotateBy(double dradX,double dradY,double dradZ)
    {
        setRotation(mRotation.getX() + dradX,mRotation.getZ() + dradY, mRotation.getZ() + dradZ);
    }
    public void setScaleX(double scX)
    {
        mScale.setX(scX);
    }
    public void setScaleY(double scY)
    {
        mScale.setY(scY);
    }
    public void setScaleZ(double scZ)
    {
        mScale.setZ(scZ);
    }
    public void setScale(double scX,double scY,double scZ)
    {
        setScaleX(scX);
        setScaleY(scY);
        setScaleZ(scZ);
    }
    public void setScale(Vec3 scXYZ)
    {
        mScale = scXYZ;
    }
    public void scaleBy(double dscX, double dscY, double dscZ)
    {
        setRotation(mScale.getX() + dscX,mScale.getY() + dscY, mScale.getZ() + dscZ);
    }
}







