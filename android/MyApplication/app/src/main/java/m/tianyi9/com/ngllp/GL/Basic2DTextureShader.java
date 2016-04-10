package m.tianyi9.com.ngllp.GL;

/**
 * Created by lyt on 16-4-9.
 */
public class Basic2DTextureShader {
    public static final String vshader = "attribute vec2 position;\n" +
                                         "attribute vec2 v_Tex;\n" +
                                         "uniform mat4 mVPMatrix;\n" +
                                         "varying vec2 a_Tex;\n" +
                                         "void main()\n" +
                                         "{\n" +
                                         "v_Tex = a_Tex;\n" +
                                         "gl_Position = mVPMatrix * vec4(position,0,1);\n" +
                                         "}\n";
    public static final String fshader = "precision mediump float;\n" +

                                         "varying vec2 v_Tex;\n" +
                                         "uniform vec4 u_Color;\n" +
                                         "uniform sampler2D u_TextureUnit;\n" +
                                         "void main()\n" +
                                         "{\n" +
                                         "    gl_FragColor =  texture2D(u_TextureUnit, v_Tex);\n" +
                                         "}";
}
