/**
 * Created by yjh on 16/8/7.
 */
import * as Request from '../Engine/Network/Request'
const uploadPath = '/upload/';
const resourcePath = '/llplayer/assets/';
export function load(id) {
    return Request.GET('/API/getlive?live_id=' + id)
        .then(resp=> {
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
            }
        })
}