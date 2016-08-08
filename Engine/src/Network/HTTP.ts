/**
 * Created by yjh on 16/1/29.
 */
///<reference path='../../Native API.d.ts'/>
///<reference path='../../lib/Promise.d.ts'/>


import {Request} from 'Network/Request'

export function HTTP(url, method = 'GET', config = {headers: {}, params: {}}, postObject = null, type, onprogress?) {
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

export function GET(url, config = {headers: {}, params: {}}, type?, onprogress?) {
    return HTTP(url, 'GET', config, null, type, onprogress)
}

export function POST(url, config = {headers: {}, params: {}}, postObject = null, onprogress?) {
    return HTTP(url, 'POST', config, postObject, onprogress)
}

