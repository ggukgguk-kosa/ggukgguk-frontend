import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist';
import auth from './auth'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth', 'common'],
});

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth
  },
  plugins: [vuexLocal.plugin]
})
