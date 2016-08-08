System.register(['../Engine/Network/Request'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Request;
    var uploadPath, resourcePath;
    function load(id) {
        return Request.GET('/API/getlive?live_id=' + id)
            .then(function (resp) {
            return {
                bgimg: uploadPath + resp['content']['bgimg_path'],
                bgm: uploadPath + resp['content']['bgm_path'],
                map: uploadPath + resp['content']['map_path'],
                perfect: resourcePath + 'fx/perfect.mp3',
                great: resourcePath + 'fx/great.mp3',
                good: resourcePath + 'fx/good.mp3',
                uiAssets: resourcePath + 'llpui.png',
                digits: resourcePath + 'lldigits.png',
                title: resp['content']['live_name'],
                coverImg: uploadPath + resp['content']['cover_path']
            };
        });
    }
    exports_1("load", load);
    return {
        setters:[
            function (Request_1) {
                Request = Request_1;
            }],
        execute: function() {
            uploadPath = '/upload/';
            resourcePath = '/llplayer/assets/';
        }
    }
});
//# sourceMappingURL=loader.js.map