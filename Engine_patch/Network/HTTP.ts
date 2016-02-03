/**
 * Created by yjh on 16/1/29.
 */
///<reference path='../../Native API.d.ts'/>
    ///<reference path='../../Engine_web/lib/gl-matrix.d.ts'/>

namespace Network{
    class HTTPPromise{
        request:Request;
        onload;
        onerror;
        onprogress;
        constructor(url,method,headers,params,postObject?){
            this.request =new Network.Request();
            this.request.open(url,method,params,headers,postObject,function(response,status){
                if(this.onload){
                    this.onload(response,status)
                }
            }.bind(this),function(message,status){
                if(this.onerror){
                    this.onerror(message,status)
                }
            }.bind(this),function(progress){
                if(this.onprogress){
                    this.onprogress(progress)
                }
            }.bind(this))
        }
        then(onload){
            this.onload=onload
        }
        error(onerror){
            this.onerror=onerror
        }
        progress(onprogress){
            this.onprogress=onprogress
        }
    }

    export function GET(url,config={headers:{},params:{}}){
        return new HTTPPromise(url,'GET',config.headers,config.params,null)
    }
    export function POST(url,config={headers:{},params:{}},postObject){
        if(typeof postObject != 'string'){
            try{
                postObject=JSON.stringify(postObject)
            }catch (e){

            }
        }
        return new HTTPPromise(url,'POST',config.headers,config.params,postObject)
    }

    /**
     * example:
     * Network.GET('/index.html')
     *  .then(function(res){
     *      console.log(res)
     *      })
     *  .error(function(err){
     *  console.log(err)
     *      })
     */
}