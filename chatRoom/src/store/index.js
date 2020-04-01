import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import tracks from './modules/tracks'
Vue.use(Vuex);
let units = 'si'
const debug = process.env.NODE_ENV !== 'production'

if (window.navigator.language === 'en-US') {
  units = 'us'
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules:{
    tracks
  },
  strict: debug
});
export default store;

