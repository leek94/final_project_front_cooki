<template>
<ModalTemplate>
    <template v-slot:header>
        비밀번호 변경
    </template>
    <template v-slot:body>
        <div class="d-flex" style="justify-content: center;">알파벳 대소문자, 숫자를 혼용해서 8자 이상 15장 이하로 사용</div>
        <div class="d-flex" style="justify-content: center;">   
            <div class="row m-5 px-3 " style=" width: 1000px; ">
                <div class="row my-3 px-3" >
                    <li class="green-point">비밀번호</li>
                        <div class="m-0 p-0" style="position: relative; display: flex;" v-if="!showPassword" >
                            <input class="p-2 border" type="password" style="width: 100%;" v-model="checker.check" placeholder="비밀번호를 입력해주세요" @keyup="mpasswordCheck"/>
                            <button class="border-0 bg-white" style="position: absolute; top: 5px; bottom: 5px; right: 5px;" @click="showPasswordBtn">
                                <i class="fa-regular fa-eye border-0"></i>
                            </button>
                        </div>
                        <div class="m-0 p-0" style="position: relative; display: flex;" v-if="showPassword" >
                            <input class="p-2 border" style="width: 100%;" v-model="checker.check" placeholder="비밀번호를 입력해주세요" @keyup="mpasswordCheck"/>
                            <button class="border-0 bg-white" style="position: absolute; top: 5px; bottom: 5px; right: 5px;" @click="showPasswordBtn">
                                <i class="fa-regular fa-eye-slash border-0"></i>
                            </button>
                        </div>
                    <div class=" m-1" v-if="mpasswordResultError" style="color: red;">올바른 형식의 비밀번호를 입력해주세요</div>
                </div>
            
                <div class="row my-3 px-3">
                    <li class="green-point">비밀번호 확인</li>
                    <div class="m-0 p-0" style="position: relative; display: flex;" v-if="!showPasswordCheck" >
                        <input class="p-2 border" type="password" style="width: 100%;" v-model="checker.reCheck" placeholder="비밀번호를 다시 입력해주세요" @keyup="mpasswordMatchCheck"/>
                        <button class="border-0 bg-white" style="position: absolute; top: 5px; bottom: 5px; right: 5px;" @click="showPasswordMatchBtn">
                            <i class="fa-regular fa-eye border-0"></i>
                        </button>
                    </div>
                    <div class="m-0 p-0" style="position: relative; display: flex;" v-if="showPasswordCheck" >
                        <input class="p-2 border" style="width: 100%;" v-model="checker.reCheck" placeholder="비밀번호를 다시 입력해주세요" @keyup="mpasswordMatchCheck"/>
                        <button class="border-0 bg-white" style="position: absolute; top: 5px; bottom: 5px; right: 5px;" @click="showPasswordMatchBtn">
                            <i class="fa-regular fa-eye-slash border-0"></i>
                        </button>
                    </div>
                    <div class=" m-1" v-if="mpasswordMatchError" style="color: red;">비밀번호가 서로 다릅니다</div>
                </div>
            </div>
        </div>
    </template>
    <template v-slot:footer> 
        <button type="button" class="btn btn-success btn-sm" @click="updateButton">확인</button>
    </template>
</ModalTemplate>
</template>

<script setup>
import ModalTemplate from '@/components/ModalTemplate.vue'
import { ref } from 'vue';

const checker = ref({
    check:"",
    reCheck: ""
})

const showPassword = ref(false);
const showPasswordCheck = ref(false);

const mpasswordResultError = ref(false);
const mpasswordMatchError = ref(false);

const emit = defineEmits(["click"]);

function updateButton() {
    mpasswordMatchError.value = false;
    if(checker.value.check === checker.value.reCheck && mpasswordResultError.value === false && mpasswordMatchError.value === false){
        emit('click', checker.value.reCheck);
        console.log("비밀번호가 변경됨")
    } else {
        console.log("비밀번호 변경이 안됨")
        mpasswordMatchError.value = !mpasswordMatchError.value;
    }
    
}

// 비밀번호 정규 표현식 검사
function mpasswordCheck() {
    const mpasswordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
    const mpasswordResult = mpasswordPattern.test(checker.value.check);
    mpasswordResultError.value = !mpasswordResult;

}

function mpasswordMatchCheck() {
    const mpasswordCheckResult = false;
    if(checker.value.check != checker.value.reCheck) {
        mpasswordMatchError.value = !mpasswordCheckResult;
    } else {
        mpasswordMatchError.value = mpasswordCheckResult;
    }
   
}


function showPasswordBtn() {
    showPassword.value = !showPassword.value;
}

function showPasswordMatchBtn() {
    showPasswordCheck.value = !showPasswordCheck.value;
}
</script>

<style scoped>
</style>