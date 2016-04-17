package m.tianyi9.com.ngllp;

import android.opengl.Matrix;
import android.opengl.GLES20;
import java.util.HashMap;

import m.tianyi9.com.ngllp.GL.ExampleShaders;
import m.tianyi9.com.ngllp.GL.GLHelper;
import m.tianyi9.com.ngllp.core.Object3D;
import m.tianyi9.com.ngllp.core.Vec2;

import static m.tianyi9.com.ngllp.GL.GLHelper.CheckError;
import static m.tianyi9.com.ngllp.GL.GLHelper.CreateGLProgram;

/**
 * Created by lyt on 16-2-5.
 */
public class testTriangle extends Object3D {
    private float[] vertices;
    private float time = 0;
    public float[] color = new float[]{1.0f, 1.0f, 0.0f};
    public testTriangle(float[] vertices)
    {
        super();
        if(vertices.length < 6)
        {
            throw new IllegalArgumentException("Must have at least 3 vertices");
        }
        this.vertices = vertices;

     //   int Program1 = (int)CreateGLProgram(ExampleShaders.MVP_VShader, ExampleShaders.Simple_Fshader).get("program");
    }
    @Override
    public void update(long current)
    {
        super.update(current);
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

        GLHelper.glVertexAttribPointer(Program, "position", vertices.length / 2, GLES20.GL_FLOAT, false, 4 * 2, vertices);
        Matrix.frustumM(mPMatrix, 0, GLHelper.viewportW / -GLHelper.viewportH, GLHelper.viewportW / GLHelper.viewportH, -1, 1, 3, 7);
        Matrix.setLookAtM(mViewMatrix, 0, 0, 0, 3, 0f, 0f, 0f, 0f, 1.0f, 0.0f);
        Matrix.multiplyMM(mViewMatrix, 0, mPMatrix, 0, mViewMatrix, 0);
        Matrix.multiplyMM(mVPMatrix,0,mViewMatrix,0,mMMatrix,0);
        GLHelper.glUniformMatrix4fv(Program, "mVPMatrix", mVPMatrix);
        GLHelper.glUniform3fv(Program, "Color", color);
        GLES20.glDrawArrays(GLES20.GL_TRIANGLES, 0, vertices.length / 2);
        GLES20.glDisableVertexAttribArray(GLHelper.glGetAttribLocation(Program, "position"));
        super.onDraw();
    }
    @Override
    public void init()
    {
        HashMap<String, Object> result = CreateGLProgram(ExampleShaders.MVP_VShader, ExampleShaders.Simple_Fshader);
        Program = (int)result.get("program");
        vshader = (int)result.get("vshader");
        fshader = (int)result.get("fshader");
        super.init();
    }

}
