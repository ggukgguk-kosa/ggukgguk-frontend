import apiFactory from "./apiFactory"

const axios = apiFactory.getInstance();

export default {
    // 로그인
    login({ memberId, memberPw }) {
        return axios.post('/auth/login', {
            memberId, memberPw
        })
    },
    // 회원 가입
    addMember({ memberId, memberPw, memberName, memberNickname,
        memberEmail, memberPhone, memberBirth, memberAuthority }) {

        return axios.post('/auth/register',
            { memberId, memberPw, memberName, memberNickname, memberEmail, memberPhone, memberBirth, memberAuthority }
        );
    },
    // 아이디 중복 조회
    duplicateId(memberId) {
        console.log(memberId);
        return axios.get(`/auth/exist/${memberId}`,
        {
            memberId
        });
    },
    // 구글로그인 인가코드 전달
    handleGoogleAuth(code){
        console.log(code);
        return axios.post(`/auth/social/google`, null, {
            params: { code },
        });
    }
}