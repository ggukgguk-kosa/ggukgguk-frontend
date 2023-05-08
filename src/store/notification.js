import { notification } from '../api';

export default {
    namespaced: true,
    state: {
        notifyList: [],
    },
    getters: {
        notifyList(state) {
            return state.notifyList
        },
    },
    mutations: {
        setNotifyList(state, notifyList) {
            state.notifyList = notifyList;
        }
    },
    actions: {
        getNotifyList({ commit }) {
            return notification.getNotifyList()
            .then((response) => {   
             commit('setNotifyList', response.data.data);
            return response;
            })
        }
    }
};