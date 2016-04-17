package m.tianyi9.com.ngllp.GL;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.opengl.GLES20;
import android.opengl.GLUtils;
import android.opengl.Matrix;
import android.util.Log;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.nio.IntBuffer;
import java.nio.ShortBuffer;
import java.util.HashMap;

import javax.microedition.khronos.opengles.GL10;

/**
 * Created by lyt on 16-2-10.
 */
public class GLHelper {
    private static HashMap<Integer, HashMap<String, Integer>> AttribLocations = new HashMap<Integer, HashMap<String, Integer>>();
    private static HashMap<Integer, HashMap<String, Integer>> UniformLocations = new HashMap<Integer, HashMap<String, Integer>>();
    private static HashMap<String, Texture> TextureCache = new HashMap<String, Texture>();
    public static float viewportW = 0;
    public static float viewportH = 0;

    public static class Texture {
        String name;
        public final int[] textureObjectids = new int[1];
        private int refs = 0;
        public int width = 0;
        public int height = 0;
        public boolean validity = false;
        public void Use() {
            refs++;
        }
        public void Unuse() {
            refs--;
        }
        public void Destroy()
        {
            if(refs <= 0 )
                GLES20.glDeleteTextures(1,textureObjectids,0);
        }
    }

    public static HashMap<String, Object> CreateGLProgram(String Vertex, String Fragment) {

        HashMap<String, Object> result = new HashMap<String, Object>();
        int Vshader = GLES20.glCreateShader(GLES20.GL_VERTEX_SHADER);
        int Fshader = GLES20.glCreateShader(GLES20.GL_FRAGMENT_SHADER);
        int Program = GLES20.glCreateProgram();
        GLES20.glShaderSource(Vshader, Vertex);
        GLES20.glShaderSource(Fshader, Fragment);
        GLES20.glCompileShader(Vshader);
        if (!CheckError()) {
            String Message = GLES20.glGetShaderInfoLog(Vshader);
            throw new RuntimeException("Message From Vertex shader :" + Message);
        }
        GLES20.glAttachShader(Program, Vshader);
        GLES20.glCompileShader(Fshader);
        if (!CheckError()) {
            String Message = GLES20.glGetShaderInfoLog(Vshader);
            throw new RuntimeException("Message From Fragment shader :" + Message);
        }
        GLES20.glAttachShader(Program, Fshader);
        GLES20.glLinkProgram(Program);
        result.put("program", Program);
        result.put("vshader", Vshader);
        result.put("fshader", Fshader);
        return result;
    }

    public static boolean CheckError() {
        int errcode =GLES20.glGetError();
        if (errcode != GLES20.GL_NO_ERROR) {
            Log.d("ERROR", GLUtils.getEGLErrorString(errcode));
            return false;
        } else {
            return true;
        }
    }

    public static FloatBuffer newFloat32Array(float[] in) {
        ByteBuffer buf = ByteBuffer.allocateDirect(4 * in.length);
        buf.order(ByteOrder.nativeOrder());
        FloatBuffer fbuffer = buf.asFloatBuffer();
        fbuffer.put(in);
        fbuffer.position(0);
        return fbuffer;
    }

    public static ShortBuffer newInt16Array(short[] in) {
        ByteBuffer buf = ByteBuffer.allocateDirect(2 * in.length);
        buf.order(ByteOrder.nativeOrder());
        ShortBuffer sbuffer = buf.asShortBuffer();
        sbuffer.put(in);
        sbuffer.position(0);
        return sbuffer;
    }

    public static IntBuffer newInt32Array(int[] in) {
        ByteBuffer buf = ByteBuffer.allocateDirect(4 * in.length);
        buf.order(ByteOrder.nativeOrder());
        IntBuffer ibuffer = buf.asIntBuffer();
        ibuffer.put(in);
        ibuffer.position(0);
        return ibuffer;
    }

    public static int glGetUniformLocation(int Program, String Location) {
        HashMap<String, Integer> UniformLocs = UniformLocations.get(Program);
        Integer mLocation = null;
        if (UniformLocs == null) {
            UniformLocs = new HashMap<String, Integer>();
            UniformLocations.put(Program, UniformLocs);
        }
        mLocation = UniformLocs.get(Location);
        if (mLocation == null) {
            mLocation = GLES20.glGetUniformLocation(Program, Location);
            if (mLocation == -1) {
                throw new IllegalArgumentException("No such Uniform Location " + Location + "!");
            }
            UniformLocs.put(Location, mLocation);
        }
        return mLocation;
    }

    public static int glGetAttribLocation(int Program, String Location) {
        HashMap<String, Integer> AttribLocs = AttribLocations.get(Program);
        Integer mLocation = null;
        if (AttribLocs == null) {
            AttribLocs = new HashMap<String, Integer>();
            AttribLocations.put(Program, AttribLocs);
        }
        mLocation = AttribLocs.get(Location);
        if (mLocation == null) {
            mLocation = GLES20.glGetAttribLocation(Program, Location);
            if (mLocation == -1) {
                throw new IllegalArgumentException("No such Attrib Location " + Location + "!");
            }
            AttribLocs.put(Location, mLocation);
        }
        return mLocation;
    }

    public static void glUniformMatrix4fv(int Program, String Location, float[] matrix) {
        int mLocation = glGetUniformLocation(Program, Location);
        GLES20.glUniformMatrix4fv(mLocation, 1, false, GLHelper.newFloat32Array(matrix));
    }

    public static void glUniform4fv(int Program, String Location, float[] vector) {
        if (vector.length != 4) {
            throw new IllegalArgumentException("Must give a vector of 4 elements");
        }
        int mLocation = glGetUniformLocation(Program, Location);
        GLES20.glUniform3fv(mLocation, 1, newFloat32Array(vector));
    }

    public static void glUniform3fv(int Program, String Location, float[] vector) {
        if (vector.length != 3) {
            throw new IllegalArgumentException("Must give a vector of 3 elements");
        }
        int mLocation = glGetUniformLocation(Program, Location);
        GLES20.glUniform3fv(mLocation, 1, newFloat32Array(vector));
    }

    public static void glVertexAttribPointer(int Program, String Location, int element_count_per_vertex, int data_type, boolean normalized, int vertex_stride, float[] dataset) {
        int mLocation = glGetAttribLocation(Program, Location);
        GLES20.glEnableVertexAttribArray(mLocation);
        GLES20.glVertexAttribPointer(mLocation, element_count_per_vertex, data_type, normalized, vertex_stride, newFloat32Array(dataset));
    }

    public static Texture glRevalidateTexture(Texture origin)
    {
        TextureCache.remove(origin.name);
        Texture target = glLoadTexture(origin.name);
        target.refs = origin.refs;
        return target;
    }
    public static Texture glLoadTexture(String Pathin) {
        Texture t = null;
        t = TextureCache.get(Pathin);
        if(t == null) {
            t = new Texture();
            GLES20.glGenTextures(1, t.textureObjectids, 0);
            GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, t.textureObjectids[0]);
            BitmapFactory.Options opts = new BitmapFactory.Options();
            opts.inScaled = false;
            final Bitmap bmp = BitmapFactory.decodeFile(Pathin,opts);
            if (bmp == null) {
                Log.d("Error", "Error decoding bitmap " + Pathin);
                GLES20.glDeleteTextures(1, t.textureObjectids, 0);
                return null;
            }
            ///
            android.graphics.Matrix m = new android.graphics.Matrix();
            m.postScale(1f, -1f);
            Bitmap flipped = Bitmap.createBitmap(bmp, 0, 0, bmp.getWidth(), bmp.getHeight(), m, true);
            ///Flipping Bitmap
            GLES20.glTexParameteri(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_MIN_FILTER, GLES20.GL_LINEAR_MIPMAP_LINEAR);
            GLES20.glTexParameteri(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_MAG_FILTER, GLES20.GL_LINEAR);
            GLUtils.texImage2D(GLES20.GL_TEXTURE_2D, 0, GLES20.GL_RGBA, flipped, 0);
            GLES20.glGenerateMipmap(GLES20.GL_TEXTURE_2D);
            GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, 0);
            TextureCache.put(Pathin, t);
            t.name = Pathin;
            t.validity = true;
            t.height = bmp.getHeight();
            t.width = bmp.getWidth();
            bmp.recycle();
            flipped.recycle();
        }
        return t;
    }
}
