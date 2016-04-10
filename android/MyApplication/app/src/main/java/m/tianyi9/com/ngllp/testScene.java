package m.tianyi9.com.ngllp;

import android.util.Log;

import m.tianyi9.com.ngllp.Base.NodeBase;
import m.tianyi9.com.ngllp.core.Object3D;
import m.tianyi9.com.ngllp.core.Scene;
import m.tianyi9.com.ngllp.core.Vec2;

/**
 * Created by lyt on 16-2-14.
 */
public class testScene extends Scene {
    private testTriangle tri1;
    private testTriangle tri2;
    int time = 0;

    public testScene()
    {
        tri1 = new testTriangle(new float[]{-0.5f, -0.5f, 0.5f, 0.0f, -0.5f, 0.5f});
        tri2 = new testTriangle(new float[]{-0.25f, 0f, 0.25f, 0.25f, 0.25f, -0.25f});
        tri2.color[0] = 0;
        appendChild(tri1);
        appendChild(tri2);
    }
    @Override
    public void update(long millis)
    {
        time += millis;
        tri1.Move(new Vec2((float) -Math.sin(3 * time / 1000), (float) Math.cos(3 * time / 1000)));
        //Log.d("coord", "X " + tri1.getPos().x + " Y " + tri1.getPos().y);
        tri2.Move(new Vec2((float) -Math.sin(-3 * time / 1000), (float) Math.cos(-3 * time / 1000)));
        //tri1.RotateX(45 * time / 1000);
        //tri1.RotateY(45 * time / 1000);
        //tri1.RotateZ(45 * time / 1000);
        super.update(millis);
    }
}
