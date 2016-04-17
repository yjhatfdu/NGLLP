package m.tianyi9.com.ngllp.core;


import android.opengl.GLES20;
import android.opengl.Matrix;

import java.lang.ref.PhantomReference;
import java.util.HashMap;
import m.tianyi9.com.ngllp.GL.Basic2DTextureShader;
import m.tianyi9.com.ngllp.GL.GLHelper;

import static m.tianyi9.com.ngllp.GL.GLHelper.CheckError;
import static m.tianyi9.com.ngllp.GL.GLHelper.CreateGLProgram;

/**
 * Created by lyt on 16-2-11.
 */
public class Sprite2D extends Object3D {
    private GLHelper.Texture mTexture = null;
    private float[] TexCoord = null;
    private Vec2 size = null;
    private float[] vertices = null;
    private String texturekey = null;
    private Vec2 calcSize()
    {
        int height = (int)(mTexture.height * (TexCoord[2] - TexCoord[0]));
        int width = (int)(mTexture.height * (TexCoord[6] - TexCoord[1]));
        return new Vec2(width,height);
    }
    private Sprite2D(String Key, float[] texCoord) {
        texturekey = Key;
        TexCoord = texCoord;
    }
    //create Sprite: we should only create the sprite without loading texture before gl runs
    //so we put texture init in init() function
    public static Sprite2D createFromFile(String Path, float[] texCoord)
    {
        if (Path != null)
            return new Sprite2D(Path,texCoord);
        else
            return null;
    }
    public static Sprite2D createFromFile(String Path) {

        return Sprite2D.createFromFile(Path, new float[]{0, 0, 1, 0, 0, 1, 1, 1});
    }
    @Override
    public void invalidate()
    {
        if(mTexture != null) {
            mTexture.validity = false;
            mTexture.Destroy();
        }
        super.invalidate();
    }
    @Override
    public void init() {
        //Re load texture due to
        if(mTexture == null)
        {
            mTexture = GLHelper.glLoadTexture(texturekey);
        }
        else if(mTexture.validity == false)
        {
            mTexture = GLHelper.glRevalidateTexture(mTexture);
        }
        HashMap<String, Object> result = CreateGLProgram(Basic2DTextureShader.vshader, Basic2DTextureShader.fshader);
        Program = (int)result.get("program");
        vshader = (int)result.get("vshader");
        fshader = (int)result.get("fshader");
        minited = true;
        size = calcSize();
        if(vertices == null)
        {
            //0 1 3 1 2 3
            vertices = new float[]{
                    -size.x / (2 * size.x), -size.y / (2 * size.y),
                    size.x / (2 * size.x), -size.y / (2 * size.y),
                    -size.x / (2 * size.x), size.y / (2 * size.y),
                    size.x / (2 * size.x), -size.y / (2 * size.y),
                    size.x / (2 * size.x), size.y /(2 * size.y),
                    -size.x / (2 * size.x), size.y / (2 * size.y)
            };
        }
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
        //after init procedure we got a Handler of loader texture and texture coords we are going to use
        //vertices vbo
        GLHelper.glVertexAttribPointer(Program, "position", 2, GLES20.GL_FLOAT, false, 4 * 2, vertices); //sizeof(int) * 2
        //mVP vbo
        Matrix.frustumM(mPMatrix, 0, GLHelper.viewportW / -GLHelper.viewportH, GLHelper.viewportW / GLHelper.viewportH, -1, 1, 3, 7);
        Matrix.setLookAtM(mViewMatrix, 0, 0, 0, 3, 0f, 0f, 0f, 0f, 1.0f, 0.0f);
        Matrix.multiplyMM(mViewMatrix, 0, mPMatrix, 0, mViewMatrix, 0);
        Matrix.multiplyMM(mVPMatrix, 0, mViewMatrix, 0, mMMatrix, 0);
        GLHelper.glUniformMatrix4fv(Program, "mVPMatrix", mVPMatrix);
        //assign the texture
        //bind texture coord uniform vbo to program
        GLHelper.glVertexAttribPointer(Program, "a_Tex", TexCoord.length / 2, GLES20.GL_FLOAT, false, 4 * 2, new float[]
                {
                        TexCoord[0],TexCoord[1],
                        TexCoord[2],TexCoord[3],
                        TexCoord[4],TexCoord[5],
                        TexCoord[2],TexCoord[3],
                        TexCoord[6],TexCoord[7],
                        TexCoord[4],TexCoord[5]
                }
        );
        //enable texture and put texture into Sampler2D var

        GLES20.glActiveTexture(GLES20.GL_TEXTURE0);
        GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, mTexture.textureObjectids[0]);
        GLES20.glUniform1i(GLHelper.glGetUniformLocation(Program, "u_TextureUnit"), 0);
        //GLHelper.glUniform3fv(Program, "Color", color);
        GLES20.glDrawArrays(GLES20.GL_TRIANGLES, 0, vertices.length / 2);
        GLES20.glDisableVertexAttribArray(GLHelper.glGetAttribLocation(Program, "position"));
        GLES20.glDisableVertexAttribArray(GLHelper.glGetAttribLocation(Program, "a_Tex"));
        GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, 0);

        super.onDraw();
    }
}
