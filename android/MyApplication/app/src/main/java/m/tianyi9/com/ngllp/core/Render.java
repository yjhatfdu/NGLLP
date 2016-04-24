package m.tianyi9.com.ngllp.core;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Random;

import m.tianyi9.com.ngllp.Base.IEventListener;
import m.tianyi9.com.ngllp.Base.NodeBase;
import m.tianyi9.com.ngllp.GL.GLHelper;
import m.tianyi9.com.ngllp.core.Core2D.Scene;
import m.tianyi9.com.ngllp.core.Core2D.Vec2;
import m.tianyi9.com.ngllp.core.core3D.Vec3;

/**
 * Created by lyt on 16-2-14.
 */
public class Render extends NodeBase {
    //Director
    private Vec2 design_resolution;
    private static Render mInstance;
    private ArrayList<Scene> scenes = new ArrayList<Scene>();
    public static long globaltimemills = 0;
    public static boolean EGLContextAvail = false;
    public void setdesign_res(Vec2 resolution) {
        design_resolution = resolution;
    }

    public Vec2 getdesign_res() {
        return design_resolution;
    }

    private Render() {
        super();
    }
    public Scene getSceneOnTheTop()
    {
        return scenes.get(scenes.size() - 1);
    }
    public void popScene()
    {
        removeChild(scenes.get(scenes.size() - 1));
        scenes.remove(scenes.size() - 1);
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
        globaltimemills += millis;
        super.update(millis);
    }

    @Override
    public void init() {

    }

    @Override
    public void Rotate(Vec3 deg) {

    }

    @Override
    public void RotateX(float deg) {

    }

    @Override
    public void RotateY(float deg) {

    }

    @Override
    public void RotateZ(float deg) {

    }

    @Override
    public void Move(Vec2 move) {

    }

    @Override
    public void Move(Vec3 move) {

    }

    @Override
    public void Move_d(Vec2 d) {

    }

    @Override
    public void Move_d(Vec3 d) {

    }

    @Override
    public void Scale_d(Vec3 d) {

    }

    @Override
    public void Scale(Vec2 scale) {

    }

    @Override
    public void Scale(Vec3 scale) {

    }

    @Override
    public void SetAnchorPoint(Vec2 point) {

    }

    @Override
    public void SetAnchorPoint(Vec3 point) {

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
            ((IEventListener)event.get("Listener")).handleEvent(this);
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
    @Override
    public void invalidate()
    {
        GLHelper.clearLocations();
        super.invalidate();
    }
}
