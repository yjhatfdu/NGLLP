/**
 * Created by yjh on 16/1/29.
 */

export class Request {
    open(url, method = 'GET', params = {}, headers = {}, postObject = null, type?, onload = function (content) {
    }, onerror = function (err) {
    }, onprogress = function (progress, e) {
    }) {
        let x = new XMLHttpRequest();
        let query = [];
        for (var i in params) {
            if (params.hasOwnProperty(i)) {
                query.push(`${i}=${params[i]}`)
            }
        }
        let queryStr = '';
        if (query.length > 0) {
            queryStr = '?' + query.join('&')
        }
        x.open(method, url + queryStr);
        for (var i in headers) {
            if (headers.hasOwnProperty(i)) {
                x.setRequestHeader(i, headers[i])
            }
        }
        if (type) {
            x.responseType = type;
        }
        x.onload = function () {
            if (x.status >= 400) {
                onerror(x.statusText)
            } else {
                if(x.responseType=='arraybuffer'){
                    onload(x.response);
                    return
                }
                if (x.getResponseHeader('Content-Type') == 'application/json') {
                    onload(JSON.parse(x.responseText))
                } else {
                    onload(x.response)
                }
            }
        };
        x.onerror = function (e) {
            onerror(x.statusText)
        };
        x.onprogress = function (e) {
            onprogress(e.loaded / e.total, e)
        };
        x.send(postObject)
    }

}
export function HTTP(url, method = 'GET', config = {headers: {}, params: {}}, postObject = null, type, onprogress?):Promise<any> {
    return new Promise(function (resolve, reject) {
        config = config || {headers: {}, params: {}};
        var request = new Request();
        request.open(url, method, config.params, config.headers, postObject, type,
            function (content: any) {
                resolve(content as any)
            }, function (err) {
                reject(err)
            }, onprogress
        )
    });
}

export function GET(url, config = {headers: {}, params: {}}, type?, onprogress?):Promise<any> {
    return HTTP(url, 'GET', config, null, type, onprogress)
}

export function POST(url, config = {headers: {}, params: {}}, postObject = null, onprogress?):Promise<any> {
    return HTTP(url, 'POST', config, postObject, onprogress)
}