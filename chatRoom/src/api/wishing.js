/**
 * Created by wyw on 2019/1/9.
 */
import fetch from './fetch';

export default {
    getWishing(params) { // 查找许愿墙
        return fetch.post('v/wishing/getWishing', params);
    },
    addWishing(params) { // 添加愿望
        return fetch.post('v/wishing/addWishing', params);
    }
}
