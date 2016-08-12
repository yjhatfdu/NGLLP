package m.tianyi9.com.myapplication.Engine.Base;

import java.util.ArrayList;
import java.util.HashMap;

import lombok.Data;

/**
 * Created by lyt on 16-8-11.
 */
@Data
public abstract class NodeBase extends EventBase {
    protected static HashMap<Integer, NodeBase> list = new HashMap<Integer,NodeBase>();
    protected static NodeBase root;
    protected NodeBase parent;
    protected boolean isVisible = true;
    protected int level;
    protected HashMap<Integer, NodeBase> mChildren = new HashMap<Integer,NodeBase>();
    public static NodeBase getNodeById(int id)
    {
        return list.get(id);
    }
    public void setNode()
    {
        level++;
        for(Integer key : mChildren.keySet())
        {
            mChildren.get(key).setNode();
        }
    }

    public void update()
    {
        for(Integer key : mChildren.keySet())
        {
            mChildren.get(key).update();
        }
    }

    public void appendChild(NodeBase child)
    {
        child.root = root;
        child.parent = this;
        child.setNode();
        do {
            id = random.nextInt(Integer.MAX_VALUE);
        }while (list.get(id) != null);
        list.put(id,child);
        mChildren.put(id,child);
    }
    public void destroy()
    {
        list.remove(id);
    }
}
