package m.tianyi9.com.ngllp;

import android.opengl.GLES20;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.nio.IntBuffer;
import java.nio.ShortBuffer;
import java.util.HashMap;

/**
 * Created by lyt on 16-2-10.
 */
public class GLHelper {
    public static HashMap<String, Object> CreateGLProgram(String Vertex,String Fragment)
    {

        HashMap<String, Object> result = new HashMap<String, Object>();
        int Vshader = GLES20.glCreateShader(GLES20.GL_VERTEX_SHADER);
        int Fshader = GLES20.glCreateShader(GLES20.GL_FRAGMENT_SHADER);
        int Program = GLES20.glCreateProgram();
        GLES20.glShaderSource(Vshader, Vertex);
        GLES20.glShaderSource(Fshader, Fragment);
        GLES20.glCompileShader(Vshader);
        if(!CheckError())
        {
            String Message = GLES20.glGetShaderInfoLog(Vshader);
            throw new RuntimeException("Message From Vertex shader :" + Message);
        }
        GLES20.glAttachShader(Program, Vshader);
        GLES20.glCompileShader(Fshader);
        if(!CheckError())
        {
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
    public static boolean CheckError()
    {
        if(GLES20.glGetError() != GLES20.GL_NO_ERROR)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    public static FloatBuffer newFloat32Array(float[] in)
    {
        ByteBuffer buf= ByteBuffer.allocateDirect(4 * in.length);
        buf.order(ByteOrder.nativeOrder());
        FloatBuffer fbuffer = buf.asFloatBuffer();
        fbuffer.put(in);
        fbuffer.position(0);
        return fbuffer;
    }
    public static ShortBuffer newInt16Array(short[] in)
    {
        ByteBuffer buf= ByteBuffer.allocateDirect(2 * in.length);
        buf.order(ByteOrder.nativeOrder());
        ShortBuffer sbuffer = buf.asShortBuffer();
        sbuffer.put(in);
        sbuffer.position(0);
        return sbuffer;
    }
    public static IntBuffer newInt32Array(int[] in)
    {
        ByteBuffer buf= ByteBuffer.allocateDirect(4 * in.length);
        buf.order(ByteOrder.nativeOrder());
        IntBuffer ibuffer = buf.asIntBuffer();
        ibuffer.put(in);
        ibuffer.position(0);
        return ibuffer;
    }
}
