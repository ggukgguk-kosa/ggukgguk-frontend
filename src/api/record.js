import apiFactory from "./apiFactory"
import store from '../store'

const axios = apiFactory.getInstance();

export default {
    getRecordList( memberId, startDateStr, keyword, friendId ) {
        return axios.get('/record',
        {
            params: { memberId, startDateStr, keyword, friendId },
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    },
    
    addReply( memberId, recordId, replyContent ) {
        return axios.post('/record/reply',
        {
            memberId, recordId, replyContent
        },
        {
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    },

    editReply( memberId, recordId, replyId, replyContent ) {
        return axios.put(`/record/reply/${replyId}`,
        {
            memberId, recordId, replyContent
        },
        {
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    },

    deleteReply( recordId, replyId ) {
        return axios.delete(`/record/reply/${replyId}`,
        {
            data: {
                recordId
              },
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    },

    postRecord(formData) {
        return axios.post('/record', formData);
    },

    updateRecord(recordId, recordComment) {
        return axios.put(`/record/${recordId}`, {
            recordId,
            recordComment
        });
    },

    deleteRecord(recordId){
        return axios.delete(`/record/${recordId}`);
    },

    getUnacceptedRecordList(memberId) {
        return axios.get('/record/unaccepted',
        {
            params: { memberId }
        });
    },

    updateUnaccepted(recordId) {
        return axios.put(`/record/unaccepted/${recordId}`)
    }
};