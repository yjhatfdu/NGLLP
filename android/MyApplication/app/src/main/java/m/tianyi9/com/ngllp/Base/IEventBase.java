package m.tianyi9.com.ngllp.Base;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Random;
//触摸的处理：由scene开始层层下发，对每个node要定义层级，层级高的将先辈分发到事件，captured属性决定了当前节点是否会继续往下传递事件信息
//因此：Render接受所有的触摸事件，然后将触摸事件丢到顶层scene，然后沿着node树往下递归发送
//sprite添加eventlistener：一般处理根据自己的触摸位置，根据自己纹理组成的Vertices算出触摸边界，如果触摸的点位于边界之内则handleeventlistener触发
//处理逻辑
public interface IEventBase extends Base{
    //hash map : Get a list of events with a specified key ,and we can watch all events in the list

    /**
    * @interface IEventListener
    * represents a function being called on dispatching the event
    * */


    public boolean checkId(Integer id);
    /**
     * method addEventListener
     * @param  EventKey Name tag of event
     * @param  Listener the fucntion being called by the event
     * @param Capture Should be the event be dispatched to sub nodes
     * @return the id entry of this event
     */
    public int addEventListener(String EventKey, IEventListener Listener, boolean Capture);
    public int addEventListenerOnce(String EventKey, IEventListener Listener, boolean Capture);
    /**
     *@param EventKey Name tag of event
     *@param args   args passed to listener
     *@param CaptureOnly Should be the event be dispatched to sub nodes
     */
    public void dispatchEvent(String EventKey, Object[] args, boolean CaptureOnly);
    /**
     *@param  EventKey Name tag of event
     *@param Id Id of event
     */
    public void removeListenerById(String EventKey, Integer Id);
}
