import apiFactory from "./apiFactory"
import store from '../store'

const axios = apiFactory.getInstance();

export default {
    addNotice ({ noticeTitle, noticeContent }) {
        return axios.post('/admin/notice', {
            noticeTitle, noticeContent
        },
        {
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    },
    getNoticeList({ page, size }) {
        return axios.get('/admin/notice',
        {
            params: { page, size },
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    },
    getDailyReportAll() {
        return axios.get('/admin/report/daily');
    }
}