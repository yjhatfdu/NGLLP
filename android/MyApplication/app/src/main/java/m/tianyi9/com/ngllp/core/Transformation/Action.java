package m.tianyi9.com.ngllp.core.Transformation;

import android.util.Log;

import m.tianyi9.com.ngllp.Base.IEventListener;
import m.tianyi9.com.ngllp.Base.NodeBase;

/**
 * Created by lyt on 2016/4/20 0020.
 */
public abstract class Action {
    IEventListener mEvent;
    public boolean mStarted = true;
    NodeBase nodetorun;
    protected Action()
    {

    }
    public Action(IEventListener eventlistener)
    {
        mEvent = eventlistener;
    }
    public abstract void doAction(long millis);
    public abstract void runAction(NodeBase node);
    @Override
    protected void finalize()
    {
        Log.d("Action","Action Destoryed");
    }
}
