package m.tianyi9.com.ngllp.core.Transformation;

import java.util.ArrayList;

import m.tianyi9.com.ngllp.Base.NodeBase;

/**
 * Created by lyt on 2016/4/21 0021.
 */
public class OneByOneAct extends Action {
    private ArrayList<Action> mSubActs = new ArrayList<Action>();
    private int mCurrentAction = 0;
    public OneByOneAct(Action [] subActs){
        for( Action act : subActs)
            mSubActs.add(act);
    }
    @Override
    public void doAction(long millis) {
        if(mCurrentAction < mSubActs.size())
        {
           if(mSubActs.get(mCurrentAction).mStarted)
               mSubActs.get(mCurrentAction).doAction(millis);
           else
               mCurrentAction++;
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
