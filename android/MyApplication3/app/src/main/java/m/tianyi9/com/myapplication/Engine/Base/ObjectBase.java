package m.tianyi9.com.myapplication.Engine.Base;

import java.util.Random;

/**
 * Created by lyt on 16-8-11.
 */

public abstract class ObjectBase {
    public static Random random = new Random();
    protected int id;
    public ObjectBase()
    {
        id = random.nextInt(Integer.MAX_VALUE);
    }
}
