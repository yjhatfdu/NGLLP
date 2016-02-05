package m.tianyi9.com.ngllp;

import java.util.HashMap;
import java.util.Objects;

/**
 * Created by lyt on 16-2-5.
 */
public class EventBase {
    private HashMap<String, EventBase> listeners = new HashMap<String, EventBase>();
    interface IEventListener
    {
        public void handleEvent(EventBase event, Object[] args);
    }
    public int addEventListener(String EventName, IEventListener Listener, boolean CaptureOnly)
    {
        return 0;
    }
    public void dispatchEvent(String EventKey, Object[] args, boolean CaptureOnly)
    {

    }
    public void removeListenerById()
}
