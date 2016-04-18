package m.tianyi9.com.ngllp;

import m.tianyi9.com.ngllp.Core2D.Scene;
import m.tianyi9.com.ngllp.Core2D.Sprite2D;
import m.tianyi9.com.ngllp.Core2D.Vec2;

/**
 * Created by lyt on 16-2-14.
 */
public class testScene extends Scene {
    private Sprite2D  tri1;
    private Sprite2D tri2;
    private Sprite2D spr;
    float time = 0;

    public testScene()
    {
        tri1 = Sprite2D.createFromFile("/sdcard/test.png",new float[]{0, 0, 0.5f, 0,0.0f , 0.5f, 0.5f, 0.5f});
        tri2 = Sprite2D.createFromFile("/sdcard/test.png");
        tri2.Scale(new Vec2(0.2f,0.2f));
        appendChild(tri1);

        appendChild(tri2);
        spr = Sprite2D.createFromFile("/sdcard/ngllp.png");
        spr.Move(new Vec2(0,0));
        appendChild(spr);
    }
    @Override
    public void update(long millis)
    {
        time += ((float)millis / 1000);
        tri1.Move(new Vec2(-200 * (float)Math.sin(3 * time),200 * (float)Math.cos(3 * time)));
        //Log.d("coord", "X " + tri1.getPos().x + " Y " + tri1.getPos().y);
        tri2.Move(new Vec2(-100*(float)Math.sin(-2 * time) - 200, 200 + 100 * (float)Math.cos(-2 * time)));
        spr.Move(new Vec2(-400 * (float)Math.sin(3 * time) - 300f, 200f + 200*(float) Math.cos(3 * time)));
        //tri1.RotateX(45 * time / 1000);
        //tri1.RotateY(45 * time / 1000);
        //tri1.RotateZ(45 * time / 1000);
        super.update(millis);
    }
}
