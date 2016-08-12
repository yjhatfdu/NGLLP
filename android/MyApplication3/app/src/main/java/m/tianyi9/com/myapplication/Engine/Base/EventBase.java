package m.tianyi9.com.myapplication.Engine.Base;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.InputMismatchException;

/**
 * Created by lyt on 16-8-11.
 */

public abstract class EventBase extends ObjectBase {
    private HashMap<String,Object> listeners = new HashMap<String, Object>();
    public boolean dispatchEvent(String EventType, Object[] args,boolean captureonly)
    {
        boolean state = false;
        if(listeners.get(EventType) == null)
        {
            return false;
        }

        HashMap<Integer,Object> Elisteners =(HashMap<Integer,Object>)listeners.get(EventType);

        for(Integer ID : Elisteners.keySet()) {
            HashMap<String, Object> event = (HashMap<String, Object>) Elisteners.get(ID);
            IEvent body = (IEvent) event.get("listener");
            boolean useCapture = (boolean) event.get("useCapture");
            boolean oneTime = (boolean) event.get("oneTime");
            if (!useCapture && captureonly) {
                continue;
            } else {
                body.handleEvent(args, this);
            }
            if (oneTime) {
                Elisteners.remove(ID);
                state = true;
            }
        }
        return  state;
    }
    public int addEventListener(String EventType, IEvent event,boolean useCapture)
    {
        HashMap<Integer,Object> Elisteners;


        if(listeners.get(EventType)  == null)
        {
            Elisteners = new HashMap<Integer, Object>();
            listeners.put(EventType,Elisteners);
        }
        else {
            Elisteners = (HashMap<Integer, Object>) listeners.get(EventType);

        }
        do {
            id = random.nextInt(Integer.MAX_VALUE);
        }while (Elisteners.get(id) != null);
        HashMap<String,Object> Listener = new HashMap<String, Object>();
        Listener.put("listener", event);
        Listener.put("useCapture", useCapture);
        Listener.put("oneTime",false);
        Elisteners.put(id,Listener);
        return id;
    }
    public int addOneTimeEventListener(String EventType, IEvent event)
    {
        HashMap<Integer,Object> Elisteners;
        int id;
        if(listeners.get(EventType)  == null)
        {
            Elisteners = new HashMap<Integer, Object>();
            listeners.put(EventType,Elisteners);
        }
        else {
            Elisteners = (HashMap<Integer, Object>) listeners.get(EventType);
        }

        do {
            id = random.nextInt(Integer.MAX_VALUE);
        }while (Elisteners.get(id) != null);
        HashMap<String,Object> Listener = new HashMap<String, Object>();
        Listener.put("listener", event);
        Listener.put("useCapture", true);
        Listener.put("oneTime",true);
        Elisteners.put(id,Listener);
        return id;
    }
    public void removeAllListenersOfEvent(String EventType)
    {
        listeners.remove(EventType);
    }
    public void removeListenerById(int id)
    {
        for(String Key : listeners.keySet())
        {
            HashMap<Integer,Object> MListeners = (HashMap<Integer, Object>) listeners.get(Key);
            for(Integer ID : MListeners.keySet())
            {
                if(ID == id)
                {
                    MListeners.remove(ID);
                }
            }
            return;
        }
    }
    public void removeAllListeners()
    {
        listeners.clear();
    }
}

interface IEvent
{
    public void handleEvent(Object[] args,EventBase Base);
}
