package m.tianyi9.com.ngllp.Base;

import java.util.Random;
import java.util.UUID;

/**
 * Created by lyt on 16-2-5.
 */
public class Base {
    int mID;
    public Base()
    {
        mID = new Random().nextInt();
    }
}
