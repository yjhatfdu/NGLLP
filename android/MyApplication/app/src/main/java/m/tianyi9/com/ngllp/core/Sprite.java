package m.tianyi9.com.ngllp.core;


import android.opengl.GLES20;
import android.opengl.Matrix;

import java.util.HashMap;

import m.tianyi9.com.ngllp.Base.NodeBase;
import m.tianyi9.com.ngllp.GL.Basic2DTextureShader;
import m.tianyi9.com.ngllp.GL.GLHelper;

import static m.tianyi9.com.ngllp.GL.GLHelper.CheckError;
import static m.tianyi9.com.ngllp.GL.GLHelper.CreateGLProgram;

/**
 * Created by lyt on 16-2-11.
 */
public class Sprite2D extends NodeBase {
    private GLHelper.Texture mTexture;
    private int Program;
    private int vshader;
    private int fshader;
    private float[] TexCoord;
    private Vec2 size;
    private float[] vertices;
    private Vec2 calcSize()
    {
        int height = (int)(mTexture.height * (TexCoord[2] - TexCoord[0]));
        int width = (int)(mTexture.height * (TexCoord[6] - TexCoord[1]));
        return new Vec2(width,height);
    }
    private Sprite2D(GLHelper.Texture txt, float[] texCoord) {
        mTexture = txt;
        size = calcSize();
    }
    public static Sprite2D createFromFile(String Path, float[] texCoord)
    {
        GLHelper.Texture text = GLHelper.glLoadTexture(Path);
        if (text != null)
            return new Sprite2D(text,texCoord);
        else
            return null;
    }
    public static Sprite2D createFromFile(String Path) {

        return Sprite2D.createFromFile(Path, new float[]{0, 0, 1, 0, 0, 1, 1, 1});
    }
    @Override
    public void invalidate()
    {
        mTexture.validity = false;
        mTexture.Destroy();
        super.invalidate();
    }
    @Override
    public void init() {
        //Re load texture due to
        if(mTexture.validity == false)
        {
            mTexture = GLHelper.glRevalidateTexture(mTexture);
        }
        HashMap<String, Object> result = CreateGLProgram(Basic2DTextureShader.vshader, Basic2DTextureShader.fshader);
        Program = (int)result.get("program");
        vshader = (int)result.get("vshader");
        fshader = (int)result.get("fshader");
        minited = true;
    }

    @Override
    public void Rotate(Vec3 deg) {
    }

    @Override
    public void RotateX(float deg) {

    }

    @Override
    public void RotateY(float deg) {

    }

    @Override
    public void RotateZ(float deg) {

    }

    @Override
    public void SetAnchorPoint(Vec3 point) {

    }

    @Override
    public void SetAnchorPoint(Vec2 point) {

    }

    @Override
    public void Scale(Vec3 scale) {

    }

    @Override
    public void Scale(Vec2 scale) {

    }

    @Override
    public void Move(Vec3 move) {

    }

    @Override
    public void Move(Vec2 move) {

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
}
