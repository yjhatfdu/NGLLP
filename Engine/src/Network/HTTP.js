/**
 * Created by yjh on 16/1/29.
 */
///<reference path='../../Native API.d.ts'/>
///<reference path='../../lib/Promise.d.ts'/>
System.register(['Network/Request'], function(exports_1) {
    var Request_1;
    function HTTP(url, method, config, postObject, type, onprogress) {
        if (method === void 0) { method = 'GET'; }
        if (config === void 0) { config = { headers: {}, params: {} }; }
        if (postObject === void 0) { postObject = null; }
        return new Promise(function (resolve, reject) {
            config = config || { headers: {}, params: {} };
            var request = new Request_1.Request();
            request.open(url, method, config.params, config.headers, postObject, type, function (content) {
                resolve(content);
            }, function (err) {
                reject(err);
            }, onprogress);
        });
    }
    exports_1("HTTP", HTTP);
    function GET(url, config, type, onprogress) {
        if (config === void 0) { config = { headers: {}, params: {} }; }
        return HTTP(url, 'GET', config, null, type, onprogress);
    }
    exports_1("GET", GET);
    function POST(url, config, postObject, onprogress) {
        if (config === void 0) { config = { headers: {}, params: {} }; }
        if (postObject === void 0) { postObject = null; }
        return HTTP(url, 'POST', config, postObject, onprogress);
    }
    exports_1("POST", POST);
    return {
        setters:[
            function (Request_1_1) {
                Request_1 = Request_1_1;
            }],
        execute: function() {
        }
    }
});
//before typescript support partial module, we should patch the module like this
//Network['HTTP']=HTTP;
//Network['GET']=GET;
//Network['POST']=POST;
//Network.GET('/index.html')
//    .then(function (res) {
//        console.log(res);
//        return Network.GET('/test.json')
//    }).then(function(res){
//    console.log(res)
//})
//    .catch(function (err) {
//        console.log(err)
//    });
//
//async function load(){
//    try{
//        var res = await Network.GET('index.html');
//        console.log(res);
//        var res2 = await Network.GET('test.json');
//        console.log(res2)
//    }catch (e){
//        console.log(e)
//    }
//} 
//# sourceMappingURL=HTTP.js.map