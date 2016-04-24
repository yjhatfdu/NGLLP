package m.tianyi9.com.ngllp.core.Transformation;

import java.util.ArrayList;

import m.tianyi9.com.ngllp.Base.IEventListener;
import m.tianyi9.com.ngllp.Base.NodeBase;

/**
 * Created by lyt on 2016/4/20 0020.
 */
public  class SimutaniousAct extends Action {
    private ArrayList<Action> mSubActs = new ArrayList<Action>();
    public SimutaniousAct(Action [] subActs){
        for( Action act : subActs)
            mSubActs.add(act);
    }
    @Override
    public void doAction(long millis) {
        if(mSubActs.size() > 0)
        {
            for (Action act : mSubActs)
            {
                if(act.mStarted)
                   act.doAction(millis);
                else {
                    act.mStarted = false;
                }
            }
        }
        else
        {
            mStarted = false;
            mSubActs.clear();
        }
    }

    @Override
    public void runAction(NodeBase node) {
        nodetorun = node;
        for( Action act : mSubActs)
            act.runAction(node);
    }
}
