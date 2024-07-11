<template>
    <div class="d-flex" style="justify-content: center;">
        <form>
            <div class="row m-5 px-5 " style=" width: 700px; ">
                <h3 style="font-weight: bold; text-align: center">아이디 찾기</h3>

                <div class="text-start bg-light p-5 my-5">
                    <div class="row my-3 px-3">
                        <li class="green-point">이름</li>
                        <input class="p-2 border" v-model="member.mname" placeholder="한글 이름 2~5자 이내" @keyup="mnameCheck"/>
                        <div class="checkError m-1" v-if="mnameResultError">올바른 형식의 이름을 입력해주세요</div>
                    </div>

                    <div class="row mt-3 px-3">
                        <li class="green-point">휴대폰 번호</li>
                        <input class="p-2 border" v-model="member.mphonenum" placeholder="하이픈(-)을 넣어서 작성해주세요" @keyup="mphonenumCheck"/>
                        <div class="checkError m-1" v-if="mphonenumResultError">올바른 형식의 휴대폰 번호를 입력해주세요</div>
                    </div>
                </div>
                <div class="text-center mb-3" style="font-size: 20px;" v-if="midResultError">회원님의 정보와 일치하는 아이디</div>
                <div class="text-center mb-3 find_id" style="font-weight: bold; height: 30px;" v-if="midResultError">{{member.mid}}</div>
                <div class="text-center mb-3" style="font-size: 20px; color: red;" v-if="resultError">정확한 이름과 전화번호를 입력하세요</div>
                <div class="text-center mb-3" style="font-size: 20px; color: red;" v-if="noInputError">아무값도 입력하지 않았습니다</div>
                <div>
                    <button class="btn py-2 border rounded w-100" @click.prevent="findIdSubmit">아이디 찾기</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import memberAPI from '@/apis/memberAPI';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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

const mnameResultError = ref(false);
const mphonenumResultError = ref(false);
const midResultError = ref(false);
const resultError = ref(false);
const noInputError = ref(false);

function mnameCheck() {
  const mnamePattern = /^[가-힣]{2,5}$/;	
  const mnameResult = mnamePattern.test(member.value.mname);
  mnameResultError.value = !mnameResult;
  return mnameResult;
}

function mphonenumCheck() {
    const mphonenumPattern = /^(010|011)-\d{3,4}-\d{4}$/;
    const mphonenumResult = mphonenumPattern.test(member.value.mphonenum); //입력 폰번호가 패턴 일치하면 true
    mphonenumResultError.value = !mphonenumResult; //result가 true면  !true->false->v-if 안나옴 / result가 false면 !false->true->v-if 나옴
    return mphonenumResult;
}

async function findIdSubmit() {
    mnameResultError.value = false;
    mphonenumResultError.value = false;
    midResultError.value = false;
    resultError.value = false;
    noInputError.value = false;

    console.log("로그 실행");
    // 이름과 전화번호 정규화를 통과할 경우
    if(member.value.mname === "" || member.value.mphonenum === ""){
        console.log("값을 입력하지 않음");
       
        resultError.value = !resultError.value;

    } else if (mnameResultError.value === false && mphonenumResultError.value === false){
        
        // mid를 받아와서 표시해줌
        const response = await memberAPI.searchId(JSON.parse(JSON.stringify(member.value)));

        if(response.data.memberSaved !== null){
        console.log("로그" + response.data.memberSaved);
        member.value = response.data.memberSaved;
        console.log("멤버 로그 확인" +  member.value.mid);
        midResultError.value = !midResultError.value;
        
        } else {
            console.log("DB에 값이 없음");
            resultError.value = !resultError.value;
        }
    } else {
        console.log("정규화를 틀림");
        resultError.value = !resultError.value;
    }
    

    
    

    // if(response.data.memberSaved === 'fail'){
    //     member.value = response.data.memberSaved;
    //     console.log("로그확인1" + response.data.success);
    //     console.log("로그확인2" + response.data.fail);
    // }
    
    
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

