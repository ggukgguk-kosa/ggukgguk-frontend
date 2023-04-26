import apiFactory from "./apiFactory"
import store from '../store'

const axios = apiFactory.getInstance();

export default {
    getDiaryList( memberId, diaryYear, diaryMonth ) {
        console.log(diaryYear);
        return axios.get('/diary',
        {
            params: { memberId, diaryYear, diaryMonth },
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    }
}