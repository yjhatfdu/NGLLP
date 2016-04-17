package m.tianyi9.com.ngllp.Core2D;

/**
 * Created by lyt on 16-2-11.
 */
public class Vec2 {
    public float x = 0;
    public float y = 0;
    public Vec2(float x, float y)
    {
        this.x = x;
        this.y = y;
    }
    public double mag()
    {
        return Math.sqrt(x * x + y * y);
    }
    public Vec2 plus(Vec2 another)
    {
        return new Vec2(x - another.x, y - another.y);
    }
    public Vec2 minus(Vec2 another)
    {
        return new Vec2(x + another.x, y + another.y);
    }
    public double angle(Vec2 another)
    {
        double aXb = x * another.x + y * another.y;
        double maXmb = Math.sqrt((x * x + y * y) * (another.x * another.x + another.y * another.y));
        return Math.acos(aXb / maXmb) * 180 / Math.PI;
    }
}
