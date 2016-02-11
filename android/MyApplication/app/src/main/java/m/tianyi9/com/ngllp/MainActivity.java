package m.tianyi9.com.ngllp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {
    private mGLSurfaceView surface;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        surface = new mGLSurfaceView(this);
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
}
