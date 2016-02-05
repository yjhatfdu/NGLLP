/**
 * Created by yjh on 16/1/29.
 */
///<reference path='../../../Native API.d.ts'/>
///<reference path='../../../Engine_web/lib/gl-matrix.d.ts'/>
///<reference path='../../lib/Promise.d.ts'/>
var Network;
(function (Network) {
    //class HTTPPromise{
    //    request:Request;
    //    onload;
    //    onerror;
    //    onprogress;
    //    constructor(url,method,headers,params,postObject?){
    //        this.request =new Network.Request();
    //        this.request.open(url,method,params,headers,postObject,function(response,status){
    //            if(this.onload){
    //                this.onload(response,status)
    //            }
    //        }.bind(this),function(message,status){
    //            if(this.onerror){
    //                this.onerror(message,status)
    //            }
    //        }.bind(this),function(progress){
    //            if(this.onprogress){
    //                this.onprogress(progress)
    //            }
    //        }.bind(this))
    //    }
    //    then(onload){
    //        this.onload=onload
    //    }
    //    error(onerror){
    //        this.onerror=onerror
    //    }
    //    progress(onprogress){
    //        this.onprogress=onprogress
    //    }
    //}
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
//# sourceMappingURL=HTTP.js.map