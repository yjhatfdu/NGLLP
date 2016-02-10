package m.tianyi9.com.ngllp;

import android.util.Log;

import org.w3c.dom.Node;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Random;

/**
 * Created by lyt on 16-2-5.
 */
public class NodeBase extends EventBase {
    private ArrayList<NodeBase> mChildren;
    private NodeBase Parent;
    private NodeBase Root;
    private boolean mVisible = true;
    private int mid;
    private static HashMap<Integer,NodeBase> id_Node;
    private static final Random mrandom = new Random();
    private static final int End = (int)Math.pow(2,31);
    private int level = 0;
    public NodeBase()
    {
        super();
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
        mChildren.add(child);
        child.setNode();
        child.setid(id);
        child.Parent = this;
        child.Root = Root;
        return id;
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
        id_Node.put(id,child);
        mChildren.add(index, child);
        child.setNode();
        child.setid(id);
        child.Parent = this;
        child.Root = Root;
        return id;
    }
    /**
     * 移除指定的child
     * @param child
     */
    public void removeChild(NodeBase child)
    {
        mChildren.remove(child);
        id_Node.remove(child.getid());
    }
    public void removeAllChildren()
    {
        for(NodeBase child : mChildren)
        {
            removeChild(child);
        }
    }
    /**
     *
     * 遍内部节点,并调用自节点的update()
     * @param current 当前时间
     */
    public void update(int current)
    {
        for(NodeBase child : mChildren)
        {
            child.update(current);
        }
    }

    //在append的时候执行
    public void setNode()
    {
        level = Parent.level + 1;
        for(NodeBase child : mChildren)
        {
            child.setNode();
        }
    }

    public int getChildrenCount()
    {
        return mChildren.size();
    }

    @Override
    protected void finalize()
    {
        Log.d("NodeBase", "Removing Child with id " + mid);
        removeAllChildren();
    }
}
