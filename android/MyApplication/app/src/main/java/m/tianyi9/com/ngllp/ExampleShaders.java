package m.tianyi9.com.ngllp;

/**
 * Created by lyt on 16-2-11.
 */
public class ExampleShaders {
    public static final String Simple_Vshader = "attribute vec2 position;\n" +
            "void main()\n" +
            "{\n" +
            "gl_Position = vec4(position,0.0,1.0);\n" +
            "}\n";
    public static final String Simple_Fshader = "precision mediump float;\n" +
            "uniform vec3 Color;\n" +
            "void main()\n" +
            "{\n" +
            "gl_FragColor = vec4(Color, 1.0);\n" +
            "}\n";
}
