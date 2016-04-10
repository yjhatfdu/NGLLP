package m.tianyi9.com.ngllp.core;

import java.util.ArrayList;

import m.tianyi9.com.ngllp.Base.NodeBase;

/**
 * Created by lyt on 16-2-14.
 */
public class Render extends Object3D {
    private Vec2 design_resolution;
    private static Render mInstance;
    private ArrayList<Scene> scenes = new ArrayList<Scene>();

    public void setdesign_res(Vec2 resolution) {
        design_resolution = resolution;
    }

    public Vec2 getdesign_res() {
        return design_resolution;
    }

    private Render() {

    }

    public static Render getInstance() {
        if (mInstance == null) {
            mInstance = new Render();
        }
        return mInstance;
    }

    @Override
    public void update(long millis) {
        if (scenes.size() <= 0) {
            exit();
        }
        super.update(millis);
    }
    @Override
    public int appendChild(NodeBase child) {
        init();
        if (child instanceof Scene) {
            scenes.add((Scene) child);
            return super.appendChild(child);
        } else
            throw new UnsupportedOperationException("Appending Non-scene child to Render is not allowed");
    }
    private void exit()
    {
        //to be implemented
    }
}
