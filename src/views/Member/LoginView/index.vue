<template>
    <div class="d-grid">
        <form @submit.prevent="handleLogin">
            <div class="d-flex" style="justify-content: center;">
                <div class="row mx-5 p-5 " style="width: 500px; justify-content: center;">
                    <h3 class="mb-5" style="font-weight: bold; text-align: center">로그인</h3>
                    <input class="p-2 mb-3 border" v-model="member.mid" placeholder="이메일 형식의 아이디" @keyup="midCheck"/>
                    <div class="checkError mb-3" v-if="midResultError" style="color:red;">올바른 형식의 아이디를 입력해주세요</div>
                    
                    <div class=" p-0 mb-4" style="position: relative; display: flex;" v-if="!showPassword" >
                        <input class="p-2 border" type="password" style="width: 100%;" v-model="member.mpassword" placeholder="비밀번호" />
                        <button type="button" class="border-0 bg-white" style="position: absolute; top: 5px; bottom: 5px; right: 5px;" @click.prevent="showPasswordBtn">
                            <i class="fa-regular fa-eye border-0"></i>
                        </button>
                    </div>
                    <div class=" p-0 mb-4" style="position: relative; display: flex;" v-if="showPassword" >
                        <input class="p-2 border" style="width: 100%;" v-model="member.mpassword" placeholder="비밀번호"/>
                        <button type="button" class="border-0 bg-white" style="position: absolute; top: 5px; bottom: 5px; right: 5px;" @click.prevent="showPasswordBtn">
                            <i class="fa-regular fa-eye-slash border-0"></i>
                        </button>
                    </div>
                    <button type="submit" class="btn p-2 w-100 rounded">로그인</button>
                </div>
            </div>
        </form>
        <LoginModal id="loginModal"></LoginModal>
         <div class="d-flex mb-5" style="justify-content: center;">
            <RouterLink class="linkJoin" to="/Member/JoinView" style="text-align: center; text-decoration: none;font-size: 17px">회원가입</RouterLink>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <RouterLink class="linkJoin" to="/Member/FindIdView" style="text-align: center; text-decoration: none;font-size: 17px">아이디 찾기</RouterLink>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <RouterLink class="linkJoin" to="/Member/FindPasswordView" style="text-align: center; text-decoration: none;font-size: 17px">비밀번호 찾기</RouterLink>
        </div>
    </div>
</template>

<script setup>
import memberAPI from '@/apis/memberAPI';
import store from '@/store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginModal from './LoginModal.vue';
import { Modal } from 'bootstrap';

let loginModal=null;
onMounted(() =>{
    loginModal = new Modal(document.querySelector("#loginModal"));
});


const member = ref({
    mid:"",
    mpassword:""
});

const showPassword = ref(false);

const midResultError = ref(false);

const router = useRouter()

async function handleLogin(){
    console.log("로그인 실행")
    // 아무 값도 넣지 않았을 경우
    if(member.value.mid === "" || member.value.mpassword === ""){
        console.log("아이디 또는 비밀번호가 없습니다.");
        loginModal.show();
        // 정규화 형식이 맞을 경우 타는 if문
    } else if(midResultError.value !== true){
        console.log("정규화 통과")
        try{
            const data = JSON.parse(JSON.stringify(member.value));
            //아이디와 토큰을 return받음
            console.log("정규화 통과1")
            const response = await memberAPI.login(data);
            console.log(response.data.mid)
            console.log("정규화 통과2")
            if(response.data.result==="success"){
                //store에서 saveAuth action을 실행시키기 위한 payload값 세팅
                const payload={
                    userId:response.data.mid,
                    accessToken:response.data.accessToken,
                    mrole:response.data.mrole
                };
                store.dispatch("saveAuth",payload);
                router.push("/")
            } else { // 받아온 값이 success가 아닐경우 - 아이디와 비밀번호가 틀린 경우
                console.log("로그인 실패");
                loginModal.show();
            }
        }catch(error){
            console.log(error);
        }
    } else { // 정규화 형식이 틀린 경우 타는 if문
        console.log("로그인 실패 - 정규화 틀림");
        loginModal.show();
    }
}

// 이메일 형식 확인
function midCheck() {
  const midPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const midResult = midPattern.test(member.value.mid);
  midResultError.value = !midResult;
  return midResult;
}

function showPasswordBtn() {
    showPassword.value = ! showPassword.value;
}

</script>



<style scoped>
.btn {
    font-weight: bold; 
    background-color: #15a775;
    color: white;
}

.btn:hover {
    background-color: #D9EDBF;
    color: black;
}

.btn:active {
    background-color: #D9EDBF;
    color: black;
}

.linkJoin:link {
    color: #15a775;
}

.linkJoin:visited {
    color: #15a775;
}

.linkJoin:hover {
    color: #000;
}

.linkJoin:active {
    color: #000;
} 
</style>