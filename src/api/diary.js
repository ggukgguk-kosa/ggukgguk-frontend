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
    },
    getColorList( diaryId ) {
        return axios.get(`/diary/${diaryId}`,
        {
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    },
    updateMainColor( diaryId, mainColor ) {
        return axios.put(`/diary/${diaryId}`,
        {
            diaryId: diaryId,
            mainColor : mainColor
        },
        {
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    }
}