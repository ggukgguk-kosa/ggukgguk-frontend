import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist';
import diary from './diary'
import auth from './auth'
import admin from './admin'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth'],
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
    auth, admin, diary
  },
  plugins: [vuexLocal.plugin]
})
