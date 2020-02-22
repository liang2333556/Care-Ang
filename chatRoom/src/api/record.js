/**
 * Created by wyw on 2019/1/9.
 */
import fetch from './fetch';

export default {
    getRecord(params) { // 查找日志
        return fetch.post('v/record/getRecord', params);
    },
    addRecord(params) { // 添加日志
        return fetch.post('v/record/addRecord', params);
    },
    upRecord(params) { // 更新日志
        return fetch.post('v/record/upRecord', params);
    },
    delRecord(params) { // 删除日志
        return fetch.post('v/record/delRecord', params);
    }
}
