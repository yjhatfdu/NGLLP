package m.tianyi9.com.ngllp.core.Transformation;

import m.tianyi9.com.ngllp.Base.IEventListener;
import m.tianyi9.com.ngllp.Base.NodeBase;
import m.tianyi9.com.ngllp.core.Core2D.Vec2;
import m.tianyi9.com.ngllp.core.core3D.Vec3;

/**
 * Created by lyt on 2016/4/20 0020.
 */
public class SpinTo extends Action{
    private Vec3 mTarget;
    private long mTimeCost;
    private long mPastTime = 0;
    protected Vec3 initSpin;
    protected Vec3 deltaSpin;

    public SpinTo(IEventListener eventlistener, Vec3 TargetPoint, long time) {
        super(eventlistener);
        mTarget = TargetPoint;
        mTimeCost = time;
    }
    public SpinTo(IEventListener eventlistener, Vec2 TargetPoint, long time) {
        super(eventlistener);
        mTarget = new Vec3(TargetPoint.x,TargetPoint.y,0);
        mTimeCost = time;
    }
    @Override
    public void doAction(long millis) {
        mPastTime += millis;
        if(mPastTime <= mTimeCost)
        {
            nodetorun.Rotate(deltaSpin.mulnum(millis, false));
        }
        else
        {
            mStarted = false;
            nodetorun.Rotate(mTarget);
            if(mEvent != null) {
                mEvent.handleEvent(nodetorun);
            }
        }
    }

    @Override
    public void runAction(NodeBase node) {
        initSpin = node.getRot();
        deltaSpin = mTarget.minus(initSpin,false).mulnum(1 / (float)mTimeCost, false);
        nodetorun = node;
    }
}
