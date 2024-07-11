<template>
    <div class="d-flex" style="justify-content: center;">
        <form>
            <div class="row m-5 px-5 " style=" width: 700px; ">
                <h3 style="font-weight: bold; text-align: center">비밀번호 찾기</h3>

                <div class="text-start bg-light p-5 my-5">
                    <div class="row my-3 px-3">
                        <li class="green-point">아이디(이메일)</li>
                        <input class="p-2 border" v-model="member.mid" placeholder="이메일 형식의 아이디를 입력해주세요" @keyup="midCheck"/>
                        <div class="checkError m-1" v-if="midResultError">올바른 형식의 아이디를 입력해주세요</div>
                    </div>
                </div>
                <div class="text-center mb-3" style="font-size: 20px; color: red;" v-if="resultError">정확한 이메일을 입력하세요</div>
                <div>
                    <button class="btn py-2 border rounded w-100" @click.prevent="findPasswordSubmit">비밀번호 찾기</button>
                </div>
            </div>
        </form>
        <FindPWModal id="findPWModal" @close="hideModal" @click="changePw"></FindPWModal>
    </div>
</template>

<script setup>
import memberAPI from '@/apis/memberAPI';
import { Modal } from 'bootstrap';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import FindPWModal from './FindPWModal.vue';
const midResultError = ref(false);
const resultError = ref(false);

const router = useRouter();

let findPWModal = null;

onMounted(() => {
    findPWModal = new Modal(document.querySelector("#findPWModal"))
});

// 멤버 객체 선언
const member = ref({
    mid: "",
    mname: "",
    mphonenum: "",
    mnickname: "",
    mpassword: "",
    mpasswordcheck: "",
    isEditor:false
});

function midCheck() {
  const midPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const midResult = midPattern.test(member.value.mid);
  midResultError.value = !midResult;
  if(midResultError.value == false){
    console.log("비밀번호 정규화형식 통과시 다른 에러 없애줌")
    resultError.value = false;
  }
  
}

async function findPasswordSubmit() {
    midResultError.value = false;
    resultError.value = false;

    console.log("로그 실행")
    // 아무값도 입력하지 않음
    if(member.value.mid === ""){
        console.log("값을 입력하지 않음");
        resultError.value = !resultError.value;
        // 정규화를 통과함
    } else if(midResultError.value === false){
        console.log("데이터 베이스 실행");
        const response = await memberAPI.searchPW(JSON.parse(JSON.stringify(member.value)));

        // 아이디가 있음
        if(response.data.memberSaved !== null){
            // 모달 실행해서 비밀번호 변경해야함
            console.log("백단 값 받아옴: " + response.data.memberSaved);
            member.value = response.data.memberSaved;
            findPWModal.show();
        // 아이디가 없음
        } else {
            console.log("아이디가 없음");
            resultError.value = !resultError.value;
        }
    // 정규화를 통과하지 않음    
    } else {
        console.log("아이디가 없음");
    }

}

async function changePw(password) {
    // 비밀번호를 받아서 여기서 업데이트 해야함
    console.log("비밀번호" + password);
    member.value.mpassword = password
    await memberAPI.updatePassword(JSON.parse(JSON.stringify(member.value)));
    router.push("LoginView")
    findPWModal.hide();
}
</script>

<style scoped>

.green-point::marker {
    color: #15a775;
}

.green-point {
    font-weight: bold;
}

.checkError {
    font-size: 13px;
    color: red;
}

</style>