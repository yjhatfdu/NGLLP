package m.tianyi9.com.ngllp.core.Transformation;

import m.tianyi9.com.ngllp.Base.IEventListener;
import m.tianyi9.com.ngllp.Base.NodeBase;
import m.tianyi9.com.ngllp.core.Core2D.Vec2;
import m.tianyi9.com.ngllp.core.core3D.Vec3;

/**
 * Created by lyt on 2016/4/20 0020.
 */
public class ScaleTo extends Action  {
    private Vec3 mTarget;
    private long mTimeCost;
    private long mPastTime = 0;
    protected Vec3 initScale;
    protected Vec3 deltaScale;

    public ScaleTo(IEventListener eventlistener, Vec3 TargetScale, long time) {
        super(eventlistener);
        mTarget = TargetScale;
        mTimeCost = time;
    }
    public ScaleTo(IEventListener eventlistener, Vec2 TargetScale, long time) {
        super(eventlistener);
        mTarget = new Vec3(TargetScale.x,TargetScale.y,0);
        mTimeCost = time;
    }
    @Override
    public void doAction(long millis) {
        mPastTime += millis;
        if(mPastTime <= mTimeCost)
        {
            nodetorun.Scale_d(deltaScale.mulnum(millis, false));
        }
        else
        {
            mStarted = false;
            nodetorun.Scale(mTarget);
            if(mEvent != null) {
                mEvent.handleEvent(nodetorun);
            }
        }
    }

    @Override
    public void runAction(NodeBase node) {
        initScale = node.getScale();
        deltaScale = mTarget.minus(initScale,false).mulnum(1 / (float)mTimeCost, false);
        nodetorun = node;
    }
}
