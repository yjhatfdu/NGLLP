/**
 * Created by yjh on 16/8/7.
 */
import * as Request from '../Engine/Network/Request'
const uploadPath = '/upload/';
const resourcePath = '/llplayer/assets/';

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
        .then(id=>Request.GET('/API/getlive?live_id=' + id))
        .then(resp=> {
            return {
                bgimg: uploadPath + resp['content']['bgimg_path'],
                bgm: uploadPath + resp['content']['bgm_path'],
                map: uploadPath + resp['content']['map_path'],
                perfect: resourcePath + 'fx/perfect.mp3',
                great: resourcePath + 'fx/great.mp3',
                good: resourcePath + 'fx/good.mp3',
                uiAssets: 'assets/uiAssets.png',
                title: resp['content']['live_name'],
                coverImg: uploadPath + resp['content']['cover_path']
            }
        })
}