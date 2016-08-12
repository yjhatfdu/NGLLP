package m.tianyi9.com.myapplication.Engine.Utils;

import lombok.Data;

/**
 * Created by lyt on 16-8-11.
 */
@Data
public class Vec3 {
    private double X;
    private double Y;
    private double Z;
    public Vec3(double X, double Y, double Z)
    {
        this.X = X;
        this.Y = Y;
        this.Z = Z;
    }
    public Vec3(Vec3 in)
    {
        this.X = in.X;
        this.Y = in.Y;
        this.Z = in.Z;
    }
    public void add(Vec3 V)
    {
        this.X += V.X;
        this.Y += V.Y;
        this.Z += V.Z;
    }
    public void minus(Vec3 V)
    {
        this.X -= V.X;
        this.Y -= V.Y;
        this.Z -= V.Z;
    }
}
