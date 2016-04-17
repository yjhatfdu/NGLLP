package m.tianyi9.com.ngllp.Base;
/**
 * @interface IEventListener
 * represents a function being called on dispatching the event
 * */
public interface IEventListener
{
    public void handleEvent(IEventBase event, Object[] args);
}
