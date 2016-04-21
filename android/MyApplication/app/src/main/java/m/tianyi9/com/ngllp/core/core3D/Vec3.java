package m.tianyi9.com.ngllp.core.core3D;

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
    public Vec3 plus(Vec3 another, boolean changeme)
    {
        if(!changeme)
            return new Vec3(x + another.x, y + another.y, z + another.z);
        else
        {
            this.x = this.x + another.x;
            this.y = this.y + another.y;
            this.z = this.z + another.z;
            return this;
        }
    }
    public Vec3 minus(Vec3 another, boolean changeme)
    {
        if(!changeme)
            return new Vec3(x - another.x, y - another.y, z-another.z);
        else
        {
            this.x = this.x - another.x;
            this.y = this.y - another.y;
            this.z = this.z - another.z;
            return this;
        }
    }
    public float angle(Vec3 another)
    {
        double aXb = x * another.x + y * another.y + z*another.z;
        double maXmb = Math.sqrt((x * x + y * y + z*z) * (another.x * another.x + another.y * another.y + another.z * another.z));
        return (float)(Math.acos(aXb / maXmb) * 180 / Math.PI);
    }
    public Vec3 mulnum(float num, boolean changeme)
    {
        if(!changeme)
        {
            return new Vec3(this.x * num, this.y * num, this.z *num);
        }
        this.x *= num;
        this.y *= num;
        this.z *= num;
        return this;
    }
}
