/**
 * Created by yjh on 16/8/7.
 */
import * as Request from '../Engine/Network/Request'
// const uploadPath = 'https://ll.iia.pw/upload/';
const uploadPath = '/upload/';
// const resourcePath = 'https://ll.iia.pw/llplayer/assets/';
const resourcePath = '/llplayer/assets/';
import {sign} from './sign'
export let liveinfo;
function getId(id) {
    if (id) {
        return Promise.resolve(id)
    } else {
        return Request.GET('/API/getRandomLive')
            .then(resp=>resp['content']['live_id'])
    }
}
export function load(id) {

    return getId(id)
        .then(id=> {
            let url = `/API/getlive?live_id=${id}`;
            let sig;
            [url, sig] = sign(url);
            return Request.GET(url, {headers: {"X-sign": sig}, params: {}})
        })
        .then(resp=> {
            Request.GET('/API/startplay?live_id=' + resp['content']['live_id']);
            liveinfo = {
                bgimg: uploadPath + resp['content']['bgimg_path'],
                bgm: uploadPath + resp['content']['bgm_path']+'.js',
                bad: uploadPath + resp['content']['map_path'].replace('.json','.map'),
                perfect: resourcePath + 'fx/perfect.mp3.js',
                great: resourcePath + 'fx/great.mp3.js',
                good: resourcePath + 'fx/good.mp3.js',
                uiAssets: resp['content']['assets_path']?uploadPath + resp['content']['assets_path'] : 'assets/uiAssets.png',
                title: resp['content']['live_name'],
                coverImg: uploadPath + resp['content']['cover_path'],
                customize: resp['content']['customize_path']? uploadPath + resp['content']['customize_path']:null
            }
        })
}
