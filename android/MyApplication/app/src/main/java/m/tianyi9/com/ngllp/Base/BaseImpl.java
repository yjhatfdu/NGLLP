package m.tianyi9.com.ngllp.Base;

import java.util.Random;

/**
 * Created by lyt on 2016/4/17 0017.
 */
public class BaseImpl implements Base {
    private int mID;
    public BaseImpl() {
        {
            mID = new Random().nextInt();
        }
    }
}
