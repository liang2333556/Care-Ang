/**
 * Created by wyw on 2018/8/4.
 */
let units = 'si'

if (window.navigator.language === 'en-US') {
  units = 'us'
}
export default {
    user: {}, // 用户基础信息
    transitionName: '', // 页面过渡动画
    conversationsList: [], // 会话列表
    OnlineUser: {}, // 在线人数
    unRead: [], // 未读消息
    Vchat: {},
  appStatus: {
    message: null,
    state: 'loading'
  },
  weather: {},
  geocode: {},
  googleMapsLoaded: false,
  coordinates: {
    latitude: null,
    longitude: null
  },
  inputQuery: null,
  locationIcon: 'search',
  units: units
}
