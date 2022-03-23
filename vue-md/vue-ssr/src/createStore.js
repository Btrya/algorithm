import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
  let store = new Vuex.Store({
    state: {
      name: 'Btrya',
      age: 18
    },
    mutations: {
      changeName(state) {
        state.name = 'Asaki'
      },
      changeAge(state) {
        state.age = 20
      }
    },
    actions: {
      changeAll({commit}) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('changeName')
            commit('changeAge')
            resolve()
          }, 1000)
        })
      }
    }
  })
  if (typeof window != 'undefined' && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }
  return store
}