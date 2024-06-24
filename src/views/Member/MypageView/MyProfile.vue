<template>
    <div class="myprofile" style="max-width: 1000px;">
        <h4 class="fw-bold text-start mb-4" >프로필 관리 </h4>
        
        
        <div class="row mx-2 mb-3">
            <li class="green-point m-3" >프로필 사진</li>
            <img class="border rounded p-2 mx-3 mb-3 mt-1" style="width:220px" src="/images/photos/profile.png">
            <div class="input-group  w-100">
                <input type="file" class="form-control" id="inputGroupFile" aria-describedby="inputGroupFileAddon" aria-label="파일첨부">
                <button class="btn border" type="button" id="inputGroupFileAddon" >변경</button>
            </div>
        </div>

        <div class="row mx-2 mb-3" >
            <li class="green-point m-1">아이디(이메일)</li>
            <div class="input-group input-group-box w-100">
                <input type="text" class="form-control bg-light input-box" v-model=" member.mid" aria-label="Recipient's username" aria-describedby="button-addon2" readonly>
            </div>
        </div>

        <div class="flex-grow-1 row mx-2 mb-3">
            <li class="green-point m-1">닉네임
                <span style="margin-left:10px; font-size: 12px; color:green"> * 3~16자 이내</span>
            </li>
            <div class="input-group input-group-box w-100" >
                <input type="text" class="form-control input-box" v-model="member.mnickname" aria-label="Recipient's username" aria-describedby="button-addon2" @keyup="mnicknameCheck">
                <button class="btn border" type="button" id="button-addon2" >변경</button>
            </div>
            <div class="checkError m-2" v-if="mnicknameResultError">올바른 형식의 닉네임을 입력해주세요</div>
        </div>

        <div class="flex-grow-1 row mx-2 mb-5" >
            <li class="green-point m-1">비밀번호
            <span style="margin-left:10px; font-size: 12px; color:green"> * 알파벳 대소문자, 숫자를 혼용해서 8자 이상 15자 이하</span>
            </li>
            <div class="input-group input-group-box w-100">
                <input type="text" placeholder="비밀번호" v-model="member.mpassword" aria-label="password" class="form-control input-box" @keyup="mpasswordCheck">
                <input type="text" placeholder="비밀번호 확인" v-model="member.mpasswordcheck" aria-label="passwordCheck" class="form-control" @keyup="mpasswordMatchCheck">
                <button class="btn border" type="button" id="button-addon2">변경</button>
            </div>
            <div class="container" style="width:95%">
                <div class="row"> 
                    <div class="checkError col m-2" v-if="mpasswordResultError">올바른 형식의 비밀번호를 입력해주세요</div>
                    <div class="checkError col  m-2" v-if="mpasswordMatchError">입력한 비밀번호와 일치하지않습니다</div>
                </div>
             </div>
        </div>

        <!-- 에디터한테만 보이는 화면 -->
        <div class="flex-grow-1 row mx-2 mb-5">
            <div class="d-flex justify-content-between">
                <li class="green-point m-1">경력</li>
                <button class="btn btn-md btn-outline-success" @click="careerAdd()">추가</button>
            </div>
            <!-- db에 저장된 수만큼 for문 -->
            <div class="input-group input-group-box w-100 mb-1" v-for="(ca, index) in careers" :key="index">
                <input type="text" class="form-control input-box" placeholder="경력을 입력해주세요" v-model="ca.careerContent" aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn border" type="button" id="button-addon2">변경</button>
                <button class="btn border" type="button" id="button-addon2"  @click="careerRemove(index)">삭제</button>
            </div>
            <div class="checkError col m-2" v-if="cacontentNullError">내용을 입력하신 후 추가해주세요</div>
        </div>

            <div class="row  mx-2 mb-3 " v-if="pluscareer">
                <div class="d-flex" v-for="(career, index) in careerArray" :key="index" >
                     <div class="input-group input-group-box w-100 mb-1">
                        <input type="text" class="form-control input-box" placeholder="경력을 입력해주세요" v-model="career.cacontent" aria-label="Recipient's username" aria-describedby="button-addon2">
                        <button class="btn border" type="button" id="button-addon2">변경</button>
                        <button class="btn border" type="button" id="button-addon2" @click="pluscareerRemove(index)">삭제</button>
                    </div>
                </div>
                <div class="checkError m-1" v-if="cacontentNullError">내용을 입력하신 후 추가해주세요</div>
            </div>

        

        <!-- 에디터한테만 보이는 화면 -->
        <div class="flex-grow-1 row mx-2 mb-3">
            <div class="d-flex justify-content-between">
                <li class="green-point m-1">수상내역</li>
                <button class="btn btn-md btn-outline-success" @click="awardsAdd()">추가</button>
             </div>
            <div class="input-group input-group-box w-100 mb-1" v-for="(aw, index) in awards" :key="index">
                <input type="text" class="form-control input-box" placeholder="수상 내역을 입력해주세요" v-model="aw.awardsContent" aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn border" type="button" id="button-addon2">변경</button>
                <button class="btn border" type="button" id="button-addon2" @click="awardsRemove(index)">삭제</button>
            </div>
        </div>
    
    
    </div>


</template>

<script setup>
import { ref } from 'vue';

const member = ref( {
    mid: "cooki@naver.com",
    mnickname: "김쿠키",
    mpassword: "",
    mpasswordcheck: ""
});

const careers=ref([
    {
        cano:1,
        careerContent:"쿠키호텔 주방장 3년"
    },
    {
        cano:2,
        careerContent:"키쿠제과 베이킹 클래스 운영 2년"
    },
])

const awards=ref([
    {
        ano:1,
        awardsContent:"제1회 쿠키쿠 베이킹 대회 장려상"
    },
    {
        ano:2,
        awardsContent:"제2회 쿠키쿠 베이킹 대회 장려상"
    },
    {
        ano:3,
        awardsContent:"제3회 쿠키쿠 베이킹 대회 장려상"
    },
])
const mnicknameResultError = ref(false);
const mpasswordResultError = ref(false);
const mpasswordMatchError = ref(false);

function mnicknameCheck(){
    const mnicknamePattern = /^[가-힣a-zA-Z0-9-_]{3,10}$/;
    const mnicknameResult = mnicknamePattern.test(member.value.mnickname);
    mnicknameResultError.value = !mnicknameResult;
    return mnicknameResult;
}

function mpasswordCheck(){
    const mpasswordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
    const mpasswordResult = mpasswordPattern.test(member.value.mpassword);
    mpasswordResultError.value = !mpasswordResult;
    console.log(member.value.mpassword);
    return mpasswordResult;
}

function mpasswordMatchCheck(){
    const mpasswordCheckResult = false;
    if(member.value.mpassword != member.value.mpasswordcheck) {
        mpasswordMatchError.value = !mpasswordCheckResult;
    } else {
        mpasswordMatchError.value = mpasswordCheckResult;
    }
    console.log(member.value.mpasswordcheck);

    return mpasswordCheckResult;
}

const cacontentNullError =ref (false);

function careerAdd() {
    const newcareer=ref({
        cano:careers.value.length+1,
        cacontent: ''
    })
    careers.value.push(newcareer);
}

function careerRemove(index){
    if(careers.value.length>1){
        careers.value.splice(index,1);
    }
}

function awardsAdd() {
    const newawards=ref({
        cano:awards.value.length+1,
        cacontent: ''
    })
    awards.value.push(newawards);
}

function awardsRemove(index){
    awards.value.splice(index,1)
}
</script>

<style scoped>
.myprofile{
    margin:0 auto;
    padding:50px 50px 0; 
}
.green-point::marker {
    color: #15a775;
}

.green-point {
    font-weight: bold;
}

.btn {
    font-weight: bold;
}

.btn:hover {
    background-color: #15a775;
    color: white;
}
.input-group-box{
    height:50px;
    margin-top:10px;
}
.checkError{
    font-size: 13px;
    color:red;
}
</style>