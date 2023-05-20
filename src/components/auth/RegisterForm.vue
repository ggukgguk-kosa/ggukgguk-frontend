<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { auth } from '../../api';
import { useRouter } from "vue-router";
import axios from 'axios'

const store = useStore();
const router = useRouter();

// 변수 초기화
const memberId = ref("");
const memberPw = ref("");
const memberName = ref("");
const memberNickname = ref("");
const memberEmail = ref("");
const memberPhone = ref("");
const memberBirth = ref("");
const memberAuthority = "NORMAL";
const duplicated = ref(false); // 아이디 중복값 확인
const appearCertification = ref(false);  // 인증 번호 창 출력 
const certificationNumber = ref(""); // 인증번호 조회
const memberAllowEmail = ref(false); // 메일 인증 여부

// 각 요소별로 입력 조건 명시
const IdRules = [
  (value) => {
    return (
      (!!value || "아이디를 입력해주세요.") &&
      ((value && value.length <= 16) || "16자 이내로 입력하세요.") &&
      (!duplicated.value || "아이디가 중복되었습니다. 다시 작성해주세요")
    );
  }
];
const EmailRules = [
  (value) => {
    return !!value || "이메일을 입력해주세요.";
  },
];


// watch(memberId, (newVal,oldVal) => {
// })

// 회원 가입 메서드 수행
function register() {
  console.log("form.vue 회원 아이디 : " + memberId.value);
  store
    .dispatch("auth/register", {
      memberId: memberId.value,
      memberPw: memberPw.value,
      memberName: memberName.value,
      memberNickname: memberNickname.value,
      memberEmail: memberEmail.value,
      memberPhone: memberPhone.value,
      memberBirth: memberBirth.value,
      memberAuthority: memberAuthority,
    })
    .then((response) => {
      alert("회원 가입에 성공했습니다.등록한 아이디로 다시 로그인 해주세요.");
      console.log("성공");
      console.log(response);
      router.push({ name: "login" }); // 성공시 로그인 url로 이동.
    })
    .catch((error) => {
      console.error("실패");
      console.error(error);
    });
}

// 아이디 중복 검사.
function checkDuplicateId() {
  store.dispatch("auth/duplicateId", memberId.value).then((response) => {
    console.log("검색 성공");
    console.log(response);
    if (response.data.status == "success") {
      alert("이미 가입된 아이디가 있습니다. 다시 작성해주세요");
      duplicated.value = true;
      memberId.value = "";
    } else {
      alert("가입이 가능합니다.");
      duplicated.value = false;
    }
  });

}
// 메일 인증코드 요청.
function methodToExecuteWhenTemplateAppears() {
  store.dispatch('auth/handleCertification', {
    sendTo: memberEmail.value
  }).then((response) => {
    appearCertification.value = true;
    alert("해당 메일에 인증 코드를 전송하였습니다.")
    console.log("인증번호 전달 완료")
    console.log(response);
  }).catch(() => {
    alert("이미 가입되어 있는 이메일입니다. 다른 이메일을 작성해주세요. ")
    // console.error(error);
  });
}

// 인증번호 확인
function cetificationCheck() {
  return auth.findAuthenticationCode({
    sendTo: memberEmail.value,
    certificationNumber: certificationNumber.value
  }).then((response) => {
    console.log("인증번호 일치")
    console.log(response);
    memberAllowEmail.value = true; // 메일 인증 성공.
    alert('인증번호가 일치하여 계속해서 회원 가입을 진행해 주세요.');
    return response;
  }).catch(() => {
    alert('인증번호가 일치하지 않습니다. 다시 인증해주세요');
  });
}



function showContentDetailDiag() {
  termOfServicetermsDiagVisible.value = true;
}

// 이용서비스 다이어로그 표시여부
const termOfServicetermsDiagVisible = ref(false);
// 이용서비스 본문 내용
const serviceContent = ref('');

// 이용약관 본문 내용 가져오기
const termOfServiceContent = () => {
  axios.get('/subscriptionTerms/register.txt').then((response) => {
    serviceContent.value = response.data
  })
}
const serviceAgree = ref(false);

// 이용약관에 동의한 경우 
function termOfServiceAgreeDiag() {
  termOfServicetermsDiagVisible.value =  false;
  serviceAgree.value = true;
}



onMounted(termOfServiceContent)


</script>
<template>
  <v-card-title class="text-center">회원가입</v-card-title>
  <v-sheet width="300" class="mx-auto">
    <form>
      <v-row>
        <v-col cols="10">
          <v-text-field v-model="memberId" :counter="16" :rules="IdRules" :success="!!memberId" label="id"></v-text-field>
          <!-- <v-container class="duplicate-indicator">
          {{
            dupblicated
              ? `${memberId} ID is not available.` 
              : ""
          }}
        </v-container> -->
        </v-col>
        <v-col cols="2">
          <v-btn class="check-duplicate" @click="checkDuplicateId">
            중복확인
          </v-btn>
        </v-col>
      </v-row>
      <v-text-field type="password" v-model="memberPw" :counter="128" label="비밀번호 입력"></v-text-field>

      <v-text-field v-model="memberName" :counter="16" label="이름"></v-text-field>

      <v-text-field v-model="memberNickname" label="닉네임"></v-text-field>
      <v-row>
        <v-col cols="10">
          <v-text-field v-model="memberEmail" label="이메일" :rules="EmailRules"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn @click="methodToExecuteWhenTemplateAppears">
            인증하기
          </v-btn>
        </v-col>
      </v-row>
      <v-form>
        <v-row v-if="appearCertification">
          <v-col cols="10">
            <v-text-field v-model="certificationNumber" label="인증번호 입력"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn @click="cetificationCheck">
              전송하기
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-text-field v-model="memberPhone" label="휴대번호 입력"></v-text-field>

      <v-text-field v-model="memberBirth" label="생년월일"></v-text-field>
      <v-row>
        <v-col cols="10">
        <v-checkbox
          label="이용약관"
          v-model="serviceAgree"
          disabled
        ></v-checkbox>
      </v-col>
        <v-col cols="2">
          <v-dialog v-model="termOfServicetermsDiagVisible" width="auto">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" @click="showContentDetailDiag" v-bind="props">
               보기
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5" >꾹꾹 서비스의 이용약관</span>
              </v-card-title>
              <v-card-text>
                <pre class="terms-text">{{ serviceContent }}</pre>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green-darken-1" variant="text" @click="termOfServicetermsDiagVisible= false">
                  거절
                </v-btn>
                <v-btn v-model="serviceAgree" color="green-darken-1" variant="text" @click="termOfServiceAgreeDiag">
                  동의
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <!-- <v-checkbox value="1" label="이용약관" @click="showContentDetailDiag"></v-checkbox>
      <v-checkbox value="1" label="개인정보처리" type="checkbox"></v-checkbox> -->
      <v-btn class="me-4"  @click="register">등록</v-btn>
    </form>
  </v-sheet>
</template>
<style scoped>

.terms-text {
  white-space: pre-wrap; /* 텍스트 형식 유지 */
  font-family: monospace; /* 고정폭 글꼴 */
}

</style>