/**
 * Created by wyw on 2018/8/4.
 */
import api from '../api';
export default {
  appStatus ({commit}, appStatus) {
    commit('setAppStatus', appStatus)
  },

  coordinates ({commit}, coordinates) {
    commit('setCoordinates', coordinates)
  },

  geocode ({commit, state}, type) {
    return new Promise((resolve, reject) => {
      let query

      (type === 'default')
        ? query = `latlng=${state.coordinates.latitude},${state.coordinates.longitude}`
        : query = `address=${encodeURIComponent(state.inputQuery)}`

      fetch(`${process.env.API_URL.geocode}${query}`)
        .then(response => {
          if (response.status !== 200) {
            commit('setAppStatus', {
              state: 'error',
              message: 'Uh oh, the geolocation API is not responding. Please try again.'
            })
            return
          }
          response.json().then(data => {
            if (!data.length) {
              commit('setAppStatus', {
                state: 'error',
                message: 'No results found. Please try another search.'
              })
              return
            }
            commit('setGeocode', data[0])
            resolve(response)
          })
        })
        .catch(() => {
          commit('setAppStatus', {
            state: 'error',
            message: 'Uh oh, the geolocation API is not responding.'
          })
        })
    })
  },

  googleMapsLoaded ({commit}, googleMapsLoaded) {
    commit('setGoogleMapsLoaded', googleMapsLoaded)
  },

  inputQuery ({commit}, inputQuery) {
    commit('setInputQuery', inputQuery)
  },

  locationIcon ({commit}, locationIcon) {
    commit('setLocationIcon', locationIcon)
  },

  units ({commit}, units) {
    commit('setUnits', units)
  },

  weather ({commit, state}) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.API_URL.weather}lat=${state.coordinates.latitude}&lon=${state.coordinates.longitude}&units=${state.units}`)
        .then(response => {
          if (response.status !== 200) {
            commit('setAppStatus', {
              state: 'error',
              message: 'Uh oh, the geolocation API is not responding. Please try again.'
            })
            return
          }
          response.json().then(data => {
            if (!data) {
              commit('setAppStatus', {
                state: 'error',
                message: 'No results found. Please try another search.'
              })
              return
            }
            commit('setWeather', data)
            resolve(response)
          })
        })
        .catch(() => {
          commit('setAppStatus', {
            state: 'error',
            message: 'Uh oh, the geolocation API is not responding.'
          })
        })
    })
  },

    getUserInfo({commit, state, dispatch}, that) { // 获取用户登录信息
        api.getUserInfo().then(r => {
            if (r.code === 0) {
                commit('setUser', r.data);
                commit('setConversationsList', r.data.conversationsList);
                document.body.id = 'theme-' + r.data.projectTheme;
                dispatch('getVchatInfo');
                if (that) {
                    that.loading = false;
                    that.$router.replace('/main/personalMain');
                }
            } else {
                commit('setUser', '');
            }
        });
    },
    setTheme({state}) { // 设置主题
        document.body.id = 'theme-' + state.user.projectTheme;
    },
    setTransitionName({state}) { // 设置页面过渡动画类型
        state.transitionName = 'moveOut';
        setTimeout(_ => {
            state.transitionName = '';
        }, 500)
    },
    getVchatInfo({commit, state}) { // 获取官方账号信息
        api.getVchatInfo().then(r => {
            if (r.code === 0) {
                let id = state.user.id + '-' + r.data.id;
                state.Vchat = Object.assign({}, r.data, {type: 'vchat'}, {id});
                commit('setConversationsList', state.Vchat);
            }
        })
    }
}
