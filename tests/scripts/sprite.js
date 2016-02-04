/**
 * Created by yjh on 16/2/2.
 */
var d1;
var ind=document.querySelector('#ind');
Engine.render.addEventListener('BeforeUpdate',function(){
    d1=Date.now()
});
Engine.render.addEventListener('AfterUpdate',function(){
    ind.innerHTML=Date.now()-d1
});

Engine.resourceCtl.loadResources([
    {name:'img',url:'resources/test.jpg'},
    {name:'img2',url:'resources/test2.png'},
    {name:'perfect',url:'resources/perfect.mp3'}
],function(){
    Engine.touchCtl.addOneTimeListener('OnTouch',function(){
        Engine.audioCtl.startSession();
        loaded();
    });
});

function loaded (){

    var batchNode=new Core2D.SpriteBatchNode();
    Engine.render.appendChild(batchNode);
    for(var i=0;i<128;i++){
        var spr=new Core2D.Sprite(Engine.resourceCtl.getItem('img'));
        spr.x=Math.random()*2-1;
        spr.y=Math.random()*2-1;
        //var spr2=new Core2D.Sprite(Engine.resourceCtl.getItem('img2'));
        //spr2.x=Math.random()*2-1;
        //spr2.y=Math.random()*2-1;
        batchNode.appendChild(spr);
        //batchNode.appendChild(spr2)

    }

}