/**
 * Created by yjh on 16/1/29.
 */
var Network;
(function (Network) {
    var Request = (function () {
        function Request() {
        }
        Request.prototype.open = function (url, method, params, headers, postObject, onload, onerror, onprogress) {
            if (method === void 0) { method = 'GET'; }
            if (params === void 0) { params = {}; }
            if (headers === void 0) { headers = {}; }
            if (postObject === void 0) { postObject = null; }
            if (onload === void 0) { onload = function (content, status) { }; }
            if (onerror === void 0) { onerror = function (message, status) { }; }
            if (onprogress === void 0) { onprogress = function (progress) { }; }
            var x = new XMLHttpRequest();
            var query = [];
            for (var i in params) {
                if (params.hasOwnProperty(i)) {
                    query.push(i + "=" + params[i]);
                }
            }
            var queryStr = '';
            if (query.length > 0) {
                queryStr = '?' + query.join('&');
            }
            x.open(method, url + queryStr);
            for (var i in headers) {
                if (headers.hasOwnProperty(i)) {
                    x.setRequestHeader(i, headers[i]);
                }
            }
            x.onload = function () {
                if (x.status >= 400) {
                    onerror('http err code:' + x.status, x.status);
                }
                else {
                    if (x.getResponseHeader('Content-Type') == 'application/json') {
                        onload(JSON.parse(x.responseText), x.status);
                    }
                }
            };
            x.onerror = function (e) {
                onerror(e.toString(), x.status);
            };
            x.onprogress = function (e) {
                onprogress(e.loaded / e.total);
            };
            x.send(postObject);
        };
        return Request;
    })();
    Network.Request = Request;
})(Network || (Network = {}));
