/**
 * Created by yjh on 16/2/2.
// */
var UI = new Core2D.SpriteBatchNode();
Engine.render.appendChild(UI);
//    var d1;
//    var ind=new Core2D.TextSprite(100,50);
//    ind.zIndex=100;
//    ind.x=-1.2;
//    ind.y=-0.8;
//    UI.appendChild(ind);
//    Engine.render.addEventListener('BeforeUpdate', function () {
//        d1 = Date.now()
//    });
//    Engine.render.addEventListener('AfterUpdate', function () {
//        ind.text = (Date.now() - d1).toFixed(5);
//    });

//Engine.resourceCtl.loadResources([
//    {name: 'img', url: 'resources/test.jpg'},
//    {name: 'img2', url: 'resources/test2.png'},
//    {name: 'perfect', url: 'resources/perfect.mp3'}
//], function () {
//    Engine.touchCtl.addOneTimeListener('OnTouch', function () {
//        Engine.audioCtl.startSession();
//        loaded();
//    });
//});

Engine.resourceCtl.loadResources([
    {name: 'img', url: 'resources/test.jpg'},
    {name: 'img2', url: 'resources/test2.png'},
    {name: 'perfect', url: 'resources/perfect.mp3'}
]).then(function(){

    window.text=new Core2D.TextSprite(400,100,23333);
    text.fontSize=40;
    text.zIndex=100;
    UI.appendChild(text);
    Tween(text,'rotation').translate(10,10000);
    //for (var i = 0; i < 1; i++) {
    //    var spr = new Core2D.Sprite(Engine.resourceCtl.getItem('img'));
    //    spr.x = Math.random() * 2 - 1;
    //    spr.y = Math.random() * 2 - 1;
    //    //var spr2=new Core2D.Sprite(Engine.resourceCtl.getItem('img2'));
    //    //spr2.x=Math.random()*2-1;
    //    //spr2.y=Math.random()*2-1;
    //    UI.appendChild(spr);
    //    //batchNode.appendChild(spr2)
    //
    //}
});
