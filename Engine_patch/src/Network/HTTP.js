/**
 * Created by yjh on 16/1/29.
 */
///<reference path='../../../Native API.d.ts'/>
///<reference path='../../../Engine_web/lib/gl-matrix.d.ts'/>
///<reference path='../../lib/Promise.d.ts'/>
var Network;
(function (Network) {
    function HTTP(url, method, config, postObject, onprogress) {
        if (method === void 0) { method = 'GET'; }
        if (config === void 0) { config = { headers: {}, params: {} }; }
        if (postObject === void 0) { postObject = null; }
        return new Promise(function (resolve, reject) {
            var request = new Network.Request();
            request.open(url, method, config.params, config.headers, postObject, function (content) {
                resolve(content);
            }, function (err) {
                reject(err);
            }, onprogress);
        });
    }
    Network.HTTP = HTTP;
    function GET(url, config, onprogress) {
        if (config === void 0) { config = { headers: {}, params: {} }; }
        return HTTP(url, 'GET', config, null, onprogress);
    }
    Network.GET = GET;
    function POST(url, config, postObject, onprogress) {
        if (config === void 0) { config = { headers: {}, params: {} }; }
        if (postObject === void 0) { postObject = null; }
        return HTTP(url, 'POST', config, postObject, onprogress);
    }
    Network.POST = POST;
})(Network || (Network = {}));
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