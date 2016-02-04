/**
 * Created by yjh on 16/1/29.
 */
namespace Network{
    export class Request{
        open(url,method='GET',params={},headers={},postObject=null,onload=function(content){},onerror=function(err){},onprogress=function(progress){}){
            var x=new XMLHttpRequest();
            var query=[];
            for(var i in params){
                if(params.hasOwnProperty(i)){
                    query.push(`${i}=${params[i]}`)
                }
            }
            var queryStr='';
            if(query.length>0){
                queryStr='?'+query.join('&')
            }
            x.open(method,url+queryStr);
            for(var i in headers){
                if(headers.hasOwnProperty(i)){
                    x.setRequestHeader(i,headers[i])
                }
            }
            x.onload=function(){
                if(x.status>=400){
                    onerror(x.statusText)
                }else{
                    if(x.getResponseHeader('Content-Type')=='application/json'){
                        onload(JSON.parse(x.responseText))
                    }else{
                        onload(x.responseText)
                    }
                }
            };
            x.onerror=function(e){
                onerror(x.statusText)
            };
            x.onprogress=function(e){
                onprogress(e.loaded/e.total)
            };
            x.send(postObject)
        }
    }
}