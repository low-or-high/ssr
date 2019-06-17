import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      items:{}
    },
    mutations: {
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    },
    actions: {
      fetchItem ({ commit }, id = 123) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        // return fetchItem(id).then(item => {
          commit('setItem', id, {title:456} )
        // })
      }
    }
  })
}
