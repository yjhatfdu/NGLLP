/**
 * Created by yjh on 16/1/29.
 */
    ///<reference path='../../../Native API.d.ts'/>
    ///<reference path='../../../Engine_web/lib/gl-matrix.d.ts'/>
    ///<reference path='../../lib/Promise.d.ts'/>

namespace Network{
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



    export function HTTP(url,method='GET',config={headers:{},params:{}},postObject=null,onprogress?){
        return new Promise(function(resolve,reject){
            var request=new Network.Request();
            request.open(url,method,config.params,config.headers,postObject,
                function(content){
                    resolve(content)
                },function(err){
                    reject(err)
                },onprogress
            )
        });
    }

    export function GET(url, config={headers:{},params:{}},onprogress?){

        return HTTP(url,'GET',config,null,onprogress)
    }
    export function POST(url,config={headers:{},params:{}},postObject=null,onprogress?){
        return HTTP(url,'POST',config,postObject,onprogress)
    }

    /**
     * example:
     * Network.GET('/index.html')
     *  .then(function(res){
     *      console.log(res)
     *      })
     *  .catch(function(err){
     *  console.log(err)
     *      })
     */
}