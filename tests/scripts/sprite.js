/**
 * Created by yjh on 16/2/2.
 */
Engine.resourceCtl.loadResources([
    {name:'img',url:'resources/test.jpg'},
    {name:'perfect',url:'resources/perfect.mp3'}
],loaded);
function loaded (){
    var spr=new Core2D.Sprite(Engine.resourceCtl.getItem('img'));
    var batchNode=new Core2D.SpriteBatchNode();
    batchNode.appendChild(spr);
    Engine.render.appendChild(batchNode);
    var perfectSE=Engine.resourceCtl.getItem('perfect');
    spr.addEventListener('OnTouchStart',function(){
        Engine.audioCtl.playAudioItem(perfectSE)
    })
}