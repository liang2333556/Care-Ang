/**
 * Created by wyw on 2019/1/9.
 */
import fetch from './fetch';

export default {
    getCaring(params) { // 查找爱心
        return fetch.post('v/caring/getCaring', params);
    },
    addCaring(params) { // 添加爱心
        return fetch.post('v/caring/addCaring', params);
    },
    upCaring(params) { // 更新爱心
        return fetch.post('v/caring/upCaring', params);
    }
}
