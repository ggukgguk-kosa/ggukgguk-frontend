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
    // 카카오 로그인 권한 토큰 전달.
    directKakaoAuth(AccessToken) {
        console.log("axios: " + AccessToken);
        return axios.get(`/auth/social/kakao`, {
            params: { AccessToken },
        });
    },
    // 구글로그인 인가코드 전달
    directGoogleUrl(token) {
        console.log(token);
        return axios.get(`/auth/social/google`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            params: { token },
        });
    },

    // 아이디 찾기 (이메일로)
    findIdByEmail(memberEmail) {
        console.log(memberEmail);
        return axios.get(`/auth/${memberEmail}`, {
            params: { memberEmail },

        });
    },

    // 비밀번호 찾기
    findPwByIdEmail({memberEmail, memberId}) {
        console.log(memberEmail );
        console.log(memberId);
        return axios.get(`/auth`, {
            params: { memberEmail, memberId },

        });
    },


}