package m.tianyi9.com.ngllp.Base;

import java.util.Random;
import java.util.UUID;

/**
 * Created by lyt on 16-2-5.
 */
//Native API Export : export interface ObjectBase
//Base -> EventBase -> NodeBase -> Object2D -> TouchItem -> Sprite
public class Base {
    private int mID;
    public Base() {
        {
            mID = new Random().nextInt();
        }
    }
}
