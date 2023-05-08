import apiFactory from "./apiFactory"
import store from '../store'

const axios = apiFactory.getInstance();

export default {
    adminMain () {
        return axios.get('/admin', {
            
        },
        {
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    },

    addNotice ({ noticeTitle, noticeContent }) {
        return axios.post('/admin/notice/list', {
            noticeTitle, noticeContent
        },
        {
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    },
    
    getNoticeList({ page, size }) {
        return axios.get('/admin/notice/list',
        {
            params: { page, size }
        });
    },

    getAnalysisData() {
        return axios.get('/admin');
    },

    getContentList({ page, size }) { 
        return axios.get('/admin/content',
        {
            params: { page, size }
        });
    },
}

// 백엔드 API 호출을 수행하는 코드를 포함하는 위치 이 폴더는 API 호출을 추상화하고 모듈화하여 코드의 재사용성과 유지 보수성을 높이는 데 도움됨
// 이 폴더에는 백엔드 API와 상호작용하는 HTTP 클라이언트 코드 또는 Axios와 같은 라이브러리를 사용하여 데이터를 가져오는 코드가 포함
