package m.tianyi9.com.ngllp.Core2D;


import android.opengl.GLES20;
import android.opengl.Matrix;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Random;

import m.tianyi9.com.ngllp.Base.IEventBase;
import m.tianyi9.com.ngllp.Base.IEventListener;
import m.tianyi9.com.ngllp.Event.TouchItem;
import m.tianyi9.com.ngllp.GL.Basic2DTextureShader;
import m.tianyi9.com.ngllp.GL.GLHelper;
import m.tianyi9.com.ngllp.core.Object3D;
import m.tianyi9.com.ngllp.core.Render;

import static m.tianyi9.com.ngllp.GL.GLHelper.CheckError;
import static m.tianyi9.com.ngllp.GL.GLHelper.CreateGLProgram;

/**
 * Created by lyt on 16-2-11.
 */
public class Sprite2D extends Object3D implements TouchItem {
    private GLHelper.Texture mTexture = null;
    private float[] TexCoord = null;
    private Vec2 size = null;
    private float[] vertices = null;
    private String texturekey = null;
    private Vec2 calcSize()
    {
        int h1 = (int)(mTexture.height * (TexCoord[7] - TexCoord[1]));
        int h2 = (int)(mTexture.height * (TexCoord[5] - TexCoord[3]));
        int w1 = (int)(mTexture.width * (TexCoord[2] - TexCoord[0]));
        int w2 = (int)(mTexture.width * (TexCoord[4] - TexCoord[6]));
        int height = (h1 > h2) ? h1 : h2;
        int width = (w1 > w2) ? w1 : w2;
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
            float aspectratio = (float)mTexture.width / (float)mTexture.height;
            float h = size.y / Render.getInstance().getdesign_res().y;
            vertices = new float[]{
                    - h * aspectratio , -h ,
                    h * aspectratio , -h ,
                    -h * aspectratio , h ,
                    h * aspectratio , -h ,
                    h * aspectratio , h ,
                    -h * aspectratio , h
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


    private HashMap<String, LinkedHashMap<Integer, HashMap<String,Object>>> listeners = new HashMap<String, LinkedHashMap<Integer, HashMap<String,Object>>>();
    private static final Random mrandom = new Random();
    private static final int End = (int)Math.pow(2, 31);

    public boolean checkId(Integer id)
    {
        for(String Key : listeners.keySet())
        {
            if(listeners.get(Key).containsKey(id)) {
                return false;
            }
        }
        return true;
    }
    /**
     * method addEventListener
     * @param  EventKey Name tag of event
     * @param  Listener the fucntion being called by the event
     * @param Capture Should be the event be dispatched to sub nodes
     * @return the id entry of this event
     */
    public int addEventListener(String EventKey, IEventListener Listener, boolean Capture)
    {
        LinkedHashMap<Integer, HashMap<String, Object>> collection = listeners.get(EventKey);
        HashMap<String,Object> ls = new HashMap<String, Object>();
        ls.put("Listener",Listener);
        ls.put("Capture", Capture);
        Integer id;
        do{
            id = mrandom.nextInt(End);
        }
        while (!checkId(id));
        if(collection != null)
        {
            collection.put(id,ls);
        }
        else
        {
            collection = new LinkedHashMap<Integer, HashMap<String, Object>>();
            collection.put(id, ls);
            listeners.put(EventKey,collection);
        }
        return id;
    }
    public int addEventListenerOnce(String EventKey, IEventListener Listener, boolean Capture)
    {
        LinkedHashMap<Integer, HashMap<String, Object>> collection = listeners.get(EventKey);
        HashMap<String,Object> ls = new HashMap<String, Object>();
        ls.put("Listener",Listener);
        ls.put("once", true);
        ls.put("Capture", Capture);
        Integer id;
        do{
            id = mrandom.nextInt(End);
        }
        while (!checkId(id));
        if(collection != null)
        {
            collection.put(id,ls);
        }
        else
        {
            collection = new LinkedHashMap<Integer, HashMap<String, Object>>();
            collection.put(id, ls);
            listeners.put(EventKey,collection);
        }
        return id;
    }
    /**
     *@param EventKey Name tag of event
     *@param args   args passed to listener
     *@param CaptureOnly Should be the event be dispatched to sub nodes
     */
    public void dispatchEvent(String EventKey, Object[] args, boolean CaptureOnly)
    {
        if(!listeners.keySet().contains(EventKey))
        {
            return;
        }
        LinkedHashMap<Integer, HashMap<String, Object>> collection = listeners.get(EventKey);
        for(Integer key : collection.keySet())
        {
            HashMap<String, Object> event = collection.get(key);
            if((Boolean)event.get("Capture") && CaptureOnly)
            {
                continue;
            }
            ((IEventListener)event.get("Listener")).handleEvent(this, args);
            if(event.get("once") != null)
            {
                collection.remove(key);
            }
        }
    }
    /**
     *@param  EventKey Name tag of event
     *@param Id Id of event
     */
    public void removeListenerById(String EventKey, Integer Id)
    {
        for(String Key : listeners.keySet())
        {
            LinkedHashMap<Integer, HashMap<String, Object>> collection = listeners.get(Key);
            if(collection.keySet().contains(Id)) {
                collection.remove(Id);
            }
        }
    }
}
