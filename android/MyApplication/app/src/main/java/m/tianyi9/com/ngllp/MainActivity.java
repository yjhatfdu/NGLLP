package m.tianyi9.com.ngllp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import m.tianyi9.com.ngllp.core.Render;
import m.tianyi9.com.ngllp.core.Vec2;
//BUG : crash when rotating screen
public class MainActivity extends AppCompatActivity {
    private mGLSurfaceView surface;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        surface = new mGLSurfaceView(this);
        surface.setDesignedResolution(new Vec2(1024, 768));

        setContentView(surface);
    }
    @Override
    protected void onPause()
    {
        super.onPause();
        surface.onPause();
    }
    @Override
    protected void onResume()
    {
        super.onResume();
        surface.onResume();
    }
    @Override
    protected void onDestroy()
    {

        super.onDestroy();
    }
}
