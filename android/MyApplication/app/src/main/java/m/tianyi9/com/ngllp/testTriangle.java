package m.tianyi9.com.ngllp;

import android.graphics.Point;

/**
 * Created by lyt on 16-2-5.
 */
public class testTriangle extends NodeBase{
    private float[] vertices;
    public testTriangle(Point[] vertices)
    {
        if(vertices.length < 3)
        {
            throw new IllegalArgumentException("Must have at least 3 vertices");
        }
        this.vertices = new float[6];
        for(int i = 0;i < 3;i++)
        {

        }
    }
}
