/**
 * Created by yjh on 16/1/29.
 */
///<reference path='../../Native API.d.ts'/>
///<reference path='../../Engine_web/lib/gl-matrix.d.ts'/>
var Network;
(function (Network) {
    var HTTPPromise = (function () {
        function HTTPPromise(url, method, headers, params, postObject) {
            this.request = new Network.Request();
            this.request.open(url, method, params, headers, postObject, function (response, status) {
                if (this.onload) {
                    this.onload(response, status);
                }
            }.bind(this), function (message, status) {
                if (this.onerror) {
                    this.onerror(message, status);
                }
            }.bind(this), function (progress) {
                if (this.onprogress) {
                    this.onprogress(progress);
                }
            }.bind(this));
        }
        HTTPPromise.prototype.then = function (onload) {
            this.onload = onload;
        };
        HTTPPromise.prototype.error = function (onerror) {
            this.onerror = onerror;
        };
        HTTPPromise.prototype.progress = function (onprogress) {
            this.onprogress = onprogress;
        };
        return HTTPPromise;
    })();
    function GET(url, config) {
        if (config === void 0) { config = { headers: {}, params: {} }; }
        return new HTTPPromise(url, 'GET', config.headers, config.params, null);
    }
    Network.GET = GET;
    function POST(url, config, postObject) {
        if (config === void 0) { config = { headers: {}, params: {} }; }
        if (typeof postObject != 'string') {
            try {
                postObject = JSON.stringify(postObject);
            }
            catch (e) {
            }
        }
        return new HTTPPromise(url, 'POST', config.headers, config.params, postObject);
    }
    Network.POST = POST;
})(Network || (Network = {}));
