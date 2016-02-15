package m.tianyi9.com.ngllp.GL;

/**
 * Created by lyt on 16-2-11.
 */
public class ExampleShaders {
    public static final String Simple_Vshader = "attribute vec2 position;\n" +
           // "attribute mat4 mVPMatrix;\n" +
            "void main()\n" +
            "{\n" +
           // "gl_Position = mVPMatrix * vec4(position,0.0,1.0);\n" +
            "gl_Position = vec4(position,0.0,1.0);\n" +
            "}\n";
    public static final String MVP_VShader = " attribute vec2 position;\n" +
                 "uniform mat4 mVPMatrix;\n" +
                "void main()\n" +
                "{\n" +
                 "gl_Position = mVPMatrix * vec4(position,0.0,1.0);\n" +
                "}\n";
    public static final String Simple_Fshader = "precision mediump float;\n" +
            "uniform vec3 Color;\n" +
            "void main()\n" +
            "{\n" +
            "gl_FragColor = vec4(Color, 1.0);\n" +
            "}\n";
    //public static final String VShader = "attribute "
}
