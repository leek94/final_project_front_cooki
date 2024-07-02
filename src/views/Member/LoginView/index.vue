<template>
    <div class="d-grid">
        <form @submit.prevent="handleLogin">
            <div class="d-flex" style="justify-content: center;">
                <div class="row mx-5 p-5 " style="width: 500px; justify-content: center;">
                    <h3 class="mb-5" style="font-weight: bold; text-align: center">로그인</h3>
                    <input class="p-2 mb-3 border" v-model="member.mid" placeholder="이메일 형식의 아이디"/>
                    <input class="p-2 mb-4 border" v-model="member.mpassword" placeholder="비밀번호"/>
                    <button type="submit" class="btn p-2 w-100 rounded">로그인</button>
                </div>
            </div>
        </form>
         <div class="d-flex row mb-5" style="justify-content: center;">
            <RouterLink class="linkJoin" to="/Member/JoinView" style="text-align: center; text-decoration: none;font-size: 17px">회원가입</RouterLink>
        </div>
    </div>
</template>

<script setup>
import memberAPI from '@/apis/memberAPI';
import store from '@/store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const member = ref({
    mid:"",
    mpassword:""
});

const router = useRouter()

async function handleLogin(){
    try{
        const data = JSON.parse(JSON.stringify(member.value));
        //아이디와 토큰을 return받음
        const response = await memberAPI.login(data);
        console.log(response.data.mid)
        if(response.data.result==="success"){
            //store에서 saveAuth action을 실행시키기 위한 payload값 세팅
            const payload={
                userId:response.data.mid,
                accessToken:response.data.accessToken,
                mrole:response.data.mrole
            };

            store.dispatch("saveAuth",payload);
            router.push("/")
        }
    }catch(error){
        console.log(error);
    }
   
    
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
    color: #D9EDBF;
}

.linkJoin:active {
    color: #D9EDBF;
} 
</style>