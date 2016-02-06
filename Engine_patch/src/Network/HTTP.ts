/**
 * Created by yjh on 16/1/29.
 */
    ///<reference path='../../../Native API.d.ts'/>
    ///<reference path='../../../Engine_web/lib/gl-matrix.d.ts'/>
    ///<reference path='../../lib/Promise.d.ts'/>

namespace Network {
    export function HTTP(url, method = 'GET', config = {headers: {}, params: {}}, postObject = null, onprogress?) {
        return new Promise(function (resolve, reject) {
            var request = new Network.Request();
            request.open(url, method, config.params, config.headers, postObject,
                function (content) {
                    resolve(content)
                }, function (err) {
                    reject(err)
                }, onprogress
            )
        });
    }

    export function GET(url, config = {headers: {}, params: {}}, onprogress?) {
        return HTTP(url, 'GET', config, null, onprogress)
    }

    export function POST(url, config = {headers: {}, params: {}}, postObject = null, onprogress?) {
        return HTTP(url, 'POST', config, postObject, onprogress)
    }
}

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