package m.tianyi9.com.ngllp;

import android.graphics.Point;
import android.opengl.GLES20;
import android.opengl.GLException;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.nio.ShortBuffer;
import java.util.HashMap;

import static m.tianyi9.com.ngllp.GLHelper.*;

/**
 * Created by lyt on 16-2-5.
 */
public class testTriangle extends NodeBase{
    private float[] vertices;
    private FloatBuffer vertexbuffer;
    private int Program;
    private int vshader;
    private int fshader;
    public testTriangle(float[] vertices)
    {
        super();
        if(vertices.length < 6)
        {
            throw new IllegalArgumentException("Must have at least 3 vertices");
        }
        this.vertices = vertices;
        HashMap<String, Object> result = CreateGLProgram(ExampleShaders.Simple_Vshader, ExampleShaders.Simple_Fshader);
        Program = (int)result.get("program");
        vshader = (int)result.get("vshader");
        fshader = (int)result.get("fshader");
    }
    @Override
    public void update(long millisecs)
    {
        super.update(millisecs);
    }
    @Override
    public void onDraw()
    {
        GLES20.glUseProgram(Program);
        if(!CheckError())
        {
            String Message = GLES20.glGetProgramInfoLog(Program);
            throw new RuntimeException("Message From Linker : " + Message);
        }
        vertexbuffer = GLHelper.newFloat32Array(vertices);
        int posLocation = GLES20.glGetAttribLocation(Program, "position");
        GLES20.glEnableVertexAttribArray(posLocation);
        GLES20.glVertexAttribPointer(posLocation, vertices.length / 2, GLES20.GL_FLOAT, false, 4 * 2, vertexbuffer);
        int colorLocation = GLES20.glGetUniformLocation(Program, "Color");
        GLES20.glUniform3fv(colorLocation, 1, GLHelper.newFloat32Array(new float[]{0.5f,0.5f,0.0f}));
        GLES20.glDrawArrays(GLES20.GL_TRIANGLES, 0, vertices.length / 2);
        GLES20.glDisableVertexAttribArray(posLocation);
        super.onDraw();
    }
}
