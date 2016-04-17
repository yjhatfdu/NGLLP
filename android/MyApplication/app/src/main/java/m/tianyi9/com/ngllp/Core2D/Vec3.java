package m.tianyi9.com.ngllp.Core2D;

/**
 * Created by lyt on 16-2-11.
 */
public class Vec3 {
    public float x = 0;
    public float y = 0;
    public float z = 0;
    public Vec3(float x, float y, float z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    public float mag()
    {
        return (float)Math.sqrt(x * x + y * y + z*z);
    }
    public Vec3 plus(Vec3 another)
    {
        return new Vec3(x + another.x, y + another.y, z + another.z);
    }
    public Vec3 minus(Vec3 another)
    {
        return new Vec3(x - another.x, y - another.y, z-another.z);
    }
    public float angle(Vec3 another)
    {
        double aXb = x * another.x + y * another.y + z*another.z;
        double maXmb = Math.sqrt((x * x + y * y + z*z) * (another.x * another.x + another.y * another.y + another.z * another.z));
        return (float)(Math.acos(aXb / maXmb) * 180 / Math.PI);
    }
}
