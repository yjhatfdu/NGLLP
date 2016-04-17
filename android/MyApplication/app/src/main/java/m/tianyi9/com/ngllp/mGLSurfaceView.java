package m.tianyi9.com.ngllp;

import android.app.ActivityManager;
import android.content.Context;
import android.content.pm.ConfigurationInfo;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.util.Log;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import m.tianyi9.com.ngllp.Base.NodeBase;
import m.tianyi9.com.ngllp.GL.GLHelper;
import m.tianyi9.com.ngllp.core.Render;
import m.tianyi9.com.ngllp.Core2D.Vec2;

/**
 * Created by lyt on 16-2-5.
 */
public class mGLSurfaceView extends GLSurfaceView{
    
    class mRenderer implements Renderer {
        public mRenderer() {
            super();
        }

        /**
         * Called when the surface is created or recreated.
         * <p/>
         * Called when the rendering thread
         * starts and whenever the EGL context is lost. The EGL context will typically
         * be lost when the Android device awakes after going to sleep.
         * <p/>
         * Since this method is called at the beginning of rendering, as well as
         * every time the EGL context is lost, this method is a convenient place to put
         * code to create resources that need to be created when the rendering
         * starts, and that need to be recreated when the EGL context is lost.
         * Textures are an example of a resource that you might want to create
         * here.
         * <p/>
         * Note that when the EGL context is lost, all OpenGL resources associated
         * with that context will be automatically deleted. You do not need to call
         * the corresponding "glDelete" methods such as glDeleteTextures to
         * manually delete these lost resources.
         * <p/>
         *
         * @param gl     the GL interface. Use <code>instanceof</code> to
         * test if the interface supports GL11 or higher interfaces.
         * @param config the EGLConfig of the created surface. Can be used
         */
        private long currentabsolutetime = System.currentTimeMillis();
        private long lastabsolutetimee = currentabsolutetime;
        @Override
        public void onSurfaceCreated(GL10 gl, EGLConfig config) {
            GLES20.glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
        }

        /**
         * Called when the surface changed size.
         * <p/>
         * Called after the surface is created and whenever
         * the OpenGL ES surface size changes.
         * <p/>
         * Typically you will set your viewport here. If your camera
         * is fixed then you could also set your projection matrix here:
         * <pre class="prettyprint">
         * void onSurfaceChanged(GL10 gl, int width, int height) {
         * gl.glViewport(0, 0, width, height);
         * // for a fixed camera, set the projection too
         * float ratio = (float) width / height;
         * gl.glMatrixMode(GL10.GL_PROJECTION);
         * gl.glLoadIdentity();
         * gl.glFrustumf(-ratio, ratio, -1, 1, 1, 10);
         * }
         * </pre>
         *
         * @param gl     the GL interface. Use <code>instanceof</code> to
         *               test if the interface supports GL11 or higher interfaces.
         * @param width
         * @param height
         */
        @Override
        public void onSurfaceChanged(GL10 gl, int width, int height) {
            Vec2 resolu = Render.getInstance().getdesign_res();
            float ratio = (float)resolu.x / resolu.y; //x = 1024 , y = 768
            Render.getInstance().init();
            if(width > height)
            {

                GLHelper.viewportH =  height;
                GLHelper.viewportW =  (int)(width * ratio);
                int startx = (int)(width - GLHelper.viewportW) / 2;
                GLES20.glViewport(startx , 0 , (int)(width * ratio), height);

            }
            else
            {
                GLHelper.viewportW = width;
                GLHelper.viewportH = (int)(width / ratio);
                int starty = (int)(height - GLHelper.viewportH)/ 2;
                GLES20.glViewport(0, starty, width, (int)(width / ratio));
            }

        }

        /**
         * Called to draw the current frame.
         * <p/>
         * This method is responsible for drawing the current frame.
         * <p/>
         * The implementation of this method typically looks like this:
         * <pre class="prettyprint">
         * void onDrawFrame(GL10 gl) {
         * gl.glClear(GL10.GL_COLOR_BUFFER_BIT | GL10.GL_DEPTH_BUFFER_BIT);
         * //... other gl calls to render the scene ...
         * }
         * </pre>
         *
         * @param gl the GL interface. Use <code>instanceof</code> to
         *           test if the interface supports GL11 or higher interfaces.
         */
        @Override
        public void onDrawFrame(GL10 gl) {
            //GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT);
            lastabsolutetimee = currentabsolutetime;
            currentabsolutetime = System.currentTimeMillis();
            long delta = currentabsolutetime - lastabsolutetimee;
            float FPS = 1000 /delta;
            NodeBase.getRoot().update(delta);
            NodeBase.getRoot().onDraw();
            Log.d("timereport", "" + FPS);
            //GLES20.glFlush();
        }
    }
    private final mRenderer renderer;
    public void setDesignedResolution(Vec2 resolution)
    {
        Render.getInstance().setdesign_res(resolution);
    }
    @Override
    public void onPause()
    {
        Log.d("State", "onPause");
        Render.getInstance().invalidate();
        super.onPause();
    }
    @Override
    public void onResume()
    {
        Log.d("State", "onResume");
        Render.getInstance().init();
        super.onResume();
    }
    public void setBaseScene(NodeBase scene)
    {
        Render.getInstance().appendChild(scene);
    }
    public mGLSurfaceView(Context context) {
        super(context);
        // Check if the system supports OpenGL ES 2.0.
        final ActivityManager activityManager = (ActivityManager)context.getSystemService(Context.ACTIVITY_SERVICE);
        final ConfigurationInfo configurationInfo = activityManager
                .getDeviceConfigurationInfo();
        final boolean supportsEs2 = configurationInfo.reqGlEsVersion >= 0x20000;

        if (supportsEs2) {
            Log.i("JO", "configurationInfo.reqGlEsVersion:"
                    + configurationInfo.reqGlEsVersion + "supportsEs2:"
                    + supportsEs2);
            // Request an OpenGL ES 2.0 compatible context.
            setEGLContextClientVersion(2);


            // Set the renderer to our demo renderer, defined below.
        } else {
            // This is where you could create an OpenGL ES 1.x compatible
            // renderer if you wanted to support both ES 1 and ES 2.
            setEGLContextClientVersion(1);
        }
        renderer = new mRenderer();
        setRenderer(renderer);
        setBaseScene(new testScene());
        //setRenderMode(GLSurfaceView.RENDERMODE_WHEN_DIRTY);
    }
}

