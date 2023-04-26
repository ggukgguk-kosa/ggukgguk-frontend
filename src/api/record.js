import apiFactory from "./apiFactory"
import store from '../store'

const axios = apiFactory.getInstance();

export default {
    getRecordList( memberId, startDateStr, keyword ) {
        return axios.get('/record',
        {
            params: { memberId, startDateStr, keyword },
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    },

    postRecord(formData) {
        return axios.post('/record', formData);
    }
}