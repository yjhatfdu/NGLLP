package m.tianyi9.com.ngllp.Base;

import android.util.Log;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

import m.tianyi9.com.ngllp.core.Core2D.Vec2;
import m.tianyi9.com.ngllp.core.core3D.Vec3;
import m.tianyi9.com.ngllp.core.Transformation.Action;

/**
 * Created by lyt on 16-2-5.
 */
//export interface NodeBase extends EventBase
//Base -> EventBase -> NodeBase -> Object2D -> TouchItem -> Sprite
public abstract class NodeBase extends EventBase {
    protected ArrayList<NodeBase> mChildren = null;
    protected NodeBase Parent;
    protected static NodeBase Root = null;
    protected boolean mVisible = true;
    protected int mid;
    protected boolean minited = false;
    protected static HashMap<Integer,NodeBase> id_Node = new HashMap<Integer,NodeBase>();
    protected static final Random mrandom = new Random();
    protected static final int End = (int)Math.pow(2,31);
    protected int level = 0;
    protected Vec3 posXYZ = new Vec3(0.0f,0.0f,0.0f);
    protected Vec3 RotXYZ = new Vec3(0.0f,0.0f,0.0f);
    protected Vec3 ScaleXYZ = new Vec3(1.0f,1.0f,1.0f);
    protected Vec3 Anchor = new Vec3(0.0f,0.0f,0.0f);
    public NodeBase()
    {
        super();
        if(Root == null)
        {
            Root = this;
        }
    }
    public Vec3 getPos()
    {
        return posXYZ;
    }
    public Vec3 getScale()
    {
        return ScaleXYZ;
    }
    public Vec3 getRot()
    {
        return RotXYZ;
    }
    public Vec3 getAnchor()
    {
        return Anchor;
    }
    public static NodeBase getRoot()
    {
        return Root;
    }
    public void setid(int id)
    {
        mid = id;
    }
    public int getid()
    {
        return mid;
    }
    /**
     * 在列表末尾添加child
     * @param child
     * @return id of child
     */
    public int appendChild(NodeBase child)
    {
        Integer id;
        do{
            id = mrandom.nextInt(End);
        }
        while(id_Node.keySet().contains(id));
        id_Node.put(id, child);
        if(mChildren == null)
        {
            mChildren = new ArrayList<NodeBase>();
        }
        mChildren.add(child);
        child.setNode();
        child.setid(id);
        child.Parent = this;
        return id;
    }
    public int appendToRoot(NodeBase child)
    {
        return Root.appendChild(child);
    }
    /**
     * 返回指定child的索引,没有的话返回-1
     * @param child
     */
    public int indexOfChild(NodeBase child){
        return mChildren.indexOf(child);
    }

    /**
     * 在指定位置插入child
     * @param child
     * @param index
     */
    public int insertChild(NodeBase child ,int index)
    {
        Integer id;
        do{
            id = mrandom.nextInt(End);
        }
        while(id_Node.keySet().contains(id));
        id_Node.put(id, child);
        if(mChildren == null)
        {
            mChildren = new ArrayList<NodeBase>();
        }
        mChildren.add(index, child);
        child.setNode();
        child.setid(id);
        child.Parent = this;
        return id;
    }
    /**
     * 移除指定的child
     * @param child
     */
    public void removeChild(NodeBase child)
    {
        if(mChildren != null) {
            mChildren.remove(child);
            id_Node.remove(child.getid());
        }
    }
    public void removeAllChildren()
    {
        if(mChildren != null) {
            for (NodeBase child : mChildren) {
                removeChild(child);
            }
            mChildren = null;
        }
    }
    /**
     *
     * 遍内部节点,并调用自节点的update()
     * @param current 当前时间
     */
    public void update(long current)
    {
        if(mChildren != null) {
            for (NodeBase child : mChildren) {
                child.update(current);
            }
        }
    }
    public void onDraw()
    {
        if(mChildren != null)
        {
            for (NodeBase child : mChildren)
            {
                child.onDraw();
            }
        }
    }
    //在append的时候执行
    public void setNode()
    {
        if(Parent == null)
        {
            //is root
            level = 0;
        }
        else {
            level = Parent.level + 1;

        }
        if(mChildren != null) {
            for (NodeBase child : mChildren) {
                child.setNode();
            }
        }
    }

    public int getChildrenCount()
    {
        if(mChildren != null) {
            int childrensize = 0;
            int subcount = 0;
            for(NodeBase child : mChildren)
            {
                subcount = child.getChildrenCount();
                if(subcount != 0) {
                    childrensize += subcount;
                }
                else
                {
                    childrensize += 1;
                }
            }
            return childrensize;
        }
        else {
            return 0;
        }
    }
    public void invalidate() //do on surface change
    {
        minited = false;
        if(mChildren == null)
            return;
        for(NodeBase child : mChildren)
        {
             child.invalidate();
        }
    }
    public abstract void init();
    public abstract void Rotate(Vec3 deg);
    public abstract void RotateX(float deg);
    public abstract void RotateY(float deg);
    public abstract void RotateZ(float deg);
    public abstract void Move(Vec2 move);
    public abstract void Move(Vec3 move);
    public abstract void Move_d(Vec2 d);
    public abstract void Move_d(Vec3 d);
    public abstract void Scale(Vec2 scale);
    public abstract void Scale(Vec3 scale);
    public abstract void SetAnchorPoint(Vec2 point);
    public abstract void SetAnchorPoint(Vec3 point);
    @Override
    protected void finalize()
    {
        Log.d("NodeBase", "Removing Child with id " + mid);
        removeAllChildren();
    }
    public void runAction(NodeBase node, Action act)
    {

    }
}
