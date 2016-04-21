package m.tianyi9.com.ngllp.Base;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Random;

/**
 * Created by lyt on 16-4-18.
 */
//Base -> EventBase -> NodeBase -> Object2D -> TouchItem -> Sprite
public class EventBase extends Base {
    //hash map : Get a list of events with a specified key ,and we can watch all events in the list
    private HashMap<String, LinkedHashMap<Integer, HashMap<String,Object>>> listeners = new HashMap<String, LinkedHashMap<Integer, HashMap<String,Object>>>();
    private static final Random mrandom = new Random();
    private static final int End = (int)Math.pow(2, 31);
    /**
     * @interface IEventListener
     * represents a function being called on dispatching the event
     * */


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
}
