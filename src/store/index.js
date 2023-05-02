import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist';
import record from './record'
import diary from './diary'
import auth from './auth'
import admin from './admin'
import friend from './friend'
import member from './member';

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
    auth, admin, record, diary, friend, member
  },
  plugins: [vuexLocal.plugin]
})
