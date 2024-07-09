<template>
    <div class="myprofile" style="max-width: 1000px;">
        <h4 class="fw-bold text-start mb-4" >프로필 관리 </h4>
        
        
        <div class="row mx-2 mb-3">
            <li class="green-point m-3" >프로필 사진</li>
            <img class="mx-3 mb-3 mt-1 " style="width: 160px; height: 150px" v-show="isPreImg === 0" src="/images/photos/profile.png"/> 
            <img class="myimg mx-3 mb-3 mt-1" style="width: 160px; height: 160px" v-show="isPreImg=== 2" :src="`${axios.defaults.baseURL}/member/mattach/${store.state.userId}`"/>
            <img class="myimg preImg mx-3 mb-3 mt-1"  style="width: 160px; height: 160px" v-show="isPreImg===1"/>
            <div class="input-group w-100">
                <input type="file" class="form-control" id="inputGroupFile" aria-describedby="inputGroupFileAddon" aria-label="파일첨부" ref="memberImg" @change="setPreviewImg">
                <button class="btn border" type="button" id="inputGroupFileAddon" @click="submitImg">변경</button>
                <button class="btn border" type="button" @click="deletImg">삭제</button>
            </div>
            <div class="checkError m-2" v-if="fileResultError">올바른 파일을 넣어주세요</div>
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
            <div class="d-flex input-group input-group-box" v-if="!editingMnickname">
                <div class="mnicknameinput d-flex bg-light" style="height:50px; align-items: center" >
                    <div >{{ member.mnickname  }}</div>
                </div>
                <button class="btn border" style="height:50px" type="button" id="button-addon2" @click="changeMnickname" >변경</button>
            </div>
            <div class="input-group input-group-box w-100" v-if="editingMnickname" >
                <input type="text" class="form-control input-box" v-model="member.mnickname" aria-label="Recipient's username" aria-describedby="button-addon2" @keyup="mnicknameCheck">
                <button class="btn border" type="button" id="button-addon2" @click="savenickname" >저장</button>
            </div>
            <div class="checkError m-2" v-if="mnicknameResultError">올바른 형식의 닉네임을 입력해주세요</div>
        </div>

        <div class="flex-grow-1 row mx-2 mb-3">
            <li class="green-point m-1">전화번호</li>
            <div class="d-flex input-group input-group-box" v-if="!editingPhonenum">
                <div class="mnicknameinput d-flex bg-light" style="height:50px; align-items: center" >
                    <div >{{ member.mphonenum  }}</div>
                </div>
                <button class="btn border" style="height:50px" type="button" id="button-addon2" @click="changePhonenum" >변경</button>
            </div>
            <div class="input-group input-group-box w-100" v-if="editingPhonenum" >
                <input type="text" class="form-control input-box" v-model="member.mphonenum" aria-label="Recipient's username" aria-describedby="button-addon2" @keyup="phonenumCheck">
                <button class="btn border" type="button" id="button-addon2" @click="savephonenum" >저장</button>
            </div>
            <div class="checkError m-2" v-if="mphonenumResultError">올바른 형식의 전화번호를 입력해주세요</div>
        </div>

        <div class="flex-grow-1 row mx-2 mb-4" >
            <li class="green-point m-1">비밀번호
            <span style="margin-left:10px; font-size: 12px; color:green"> * 알파벳 대소문자, 숫자를 혼용해서 8자 이상 15자 이하</span>
            </li>
            <div class="input-group input-group-box w-100">
                <input type="text" placeholder="비밀번호" v-model="member.mpassword" aria-label="password" class="form-control input-box" @keyup="mpasswordCheck">
            </div>
            <div class="checkError" v-if="mpasswordResultError">올바른 형식의 비밀번호를 입력해주세요</div>
            <div class="input-group input-group-box w-100">
                <input type="text" placeholder="비밀번호 확인" v-model="member.mpasswordcheck" aria-label="passwordCheck" class="form-control" @keyup="mpasswordMatchCheck">
                <button class="btn border" type="button" id="button-addon2" @click="changePassword">변경</button>
            </div>
            <div class="checkError col  m-2 w-50" v-if="mpasswordMatchError">입력한 비밀번호와 일치하지않습니다</div>
        </div>

        <!-- 에디터한테만 보이는 화면 -->
        <div class="flex-grow-1 row mx-2 mb-3" v-if="mrole === 'ROLE_EDITOR'">
            <div class="d-flex justify-content-between">
                <li class="green-point m-1">경력</li>
                <button class="btn btn-md btn-outline-success" v-if="!editingCareers" @click="changeCareers()">변경</button>
                <div class="d-flex"  v-if="editingCareers">
                    <button class="btn btn-md btn-success me-3" @click="saveCareers()">저장</button>
                    <button class="btn btn-md" style="background-color: rgb(243, 243, 243);" @click="cancelCareers()">취소</button>
                </div>
            </div>
            <!-- db에 저장된 수만큼 for문 -->
            <div  v-if="!editingCareers" >
                <div class="mb-1" style="margin-top:10px" v-for="(career, index) in careers" :key="index">
                    <div class="mnicknameinput d-flex bg-light" style="height:50px; align-items: center; width:100%" >
                        <div>{{ career.cacontent }}</div>
                    </div>
                </div>
            </div>
            <div v-if="editingCareers">
                <div class="input-group input-group-box w-100 mb-1" v-for="(career, index) in careers" :key="index">
                    <input type="text" class="form-control input-box" placeholder="경력을 입력해주세요" v-model="career.cacontent" aria-label="Recipient's username" aria-describedby="button-addon2">
                    <button class="btn border" type="button" id="button-addon2"  @click="careerRemove(index)">x</button>
                </div>
                <div class="text-center mt-3">
                    <button class="btn btn border" style="width:40px; font-size: 24px" @click="careerAdd()">+</button>
                </div>

            </div>
        </div>

            <div class="row  mx-2 mb-5 " v-if="pluscareer">
                <div class="d-flex" v-for="(career, index) in careerArray" :key="index" >
                     <div class="input-group input-group-box w-100 mb-1">
                        <input type="text" class="form-control input-box" placeholder="경력을 입력해주세요" v-model="career.cacontent" aria-label="Recipient's username" aria-describedby="button-addon2">
                        <button class="btn border" type="button" id="button-addon2">변경</button>
                        <button class="btn border" type="button" id="button-addon2" @click="pluscareerRemove(index)">삭제</button>
                    </div>
                </div>
            </div>

        

        <!-- 에디터한테만 보이는 화면 -->
        <div class="flex-grow-1 row mx-2 mb-3" v-if="mrole === 'ROLE_EDITOR'">
            <div class="d-flex justify-content-between">
                <li class="green-point m-1">수상내역</li>
                <button class="btn btn-md btn-outline-success" v-if="!editingAwards" @click="changeAwards()">변경</button>
                <div class="d-flex"  v-if="editingAwards">
                    <button class="btn btn-md btn-success me-3" @click="saveAwards()">저장</button>
                    <button class="btn btn-md" style="background-color: rgb(243, 243, 243);" @click="cancelAwards()">취소</button>
                </div>
            </div>
            <!-- db에 저장된 수만큼 for문 -->
            <div  v-if="!editingAwards">
                <div class="mb-1" style="margin-top:10px" v-for="(aw, index) in awards" :key="index">
                    <div class="mnicknameinput d-flex bg-light" style="height:50px; align-items: center; width:100%" >
                        <div>{{ aw.acontent }}</div>
                    </div>
                </div>
            </div>
            <div v-if="editingAwards">
                <div class="input-group input-group-box w-100 mb-1" v-for="(aw, index) in awards" :key="index">
                    <input type="text" class="form-control input-box" placeholder="경력을 입력해주세요" v-model="aw.acontent" aria-label="Recipient's username" aria-describedby="button-addon2">
                    <button class="btn border" type="button" id="button-addon2"  @click="awardsRemove(index)">x</button>
                </div>
                <div class="text-center mt-3" >
                    <button class="btn btn border" style="width:40px; font-size: 24px" @click="awardsAdd()">+</button>
                </div>

            </div>
        </div>
    
    </div>


</template>

<script setup>
import memberAPI from '@/apis/memberAPI';
import { useStore } from 'vuex';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const store = useStore();

const memberImg = ref(null);

// 에러시 보이게 하는 토글
const mnicknameResultError = ref(false);
const mpasswordResultError = ref(false);
const mpasswordMatchError = ref(false);
const fileResultError = ref(false);
const mphonenumResultError = ref(false);

async function submitImg(){

    if(memberImg.value.files.length !== 0){
        fileResultError.value = false;
        console.log("사진 변경 실행")
        const myPageFormdata = new FormData();
        myPageFormdata.append("mid", store.state.userId);
        const preAttach = memberImg.value; // input 태그를 selector로 찾는거랑 비슷하게 ref로 태그를 찾아옴
        // 이미지를 FormData로 전달 하려고 append로 값을 넣어줌
        myPageFormdata.append("mattach", preAttach.files[0]);
        router.go(0);
        try{
            const response = await memberAPI.updateImg(myPageFormdata);
        } catch(error){
            console.log("에러남" + error);
        }
        
    } else {
        console.log("파일이 없습니다.");
        fileResultError.value = true;

    }
    
}

const member = ref( {
    mid: "",
    mnickname: "",
    mpassword: "",
    mpasswordcheck: "",
});

const careers=ref([
    {
        cano:1,
        cacontent:"손짱1",
    },
])

const awards=ref([
    {
        ano: 1,
        acontent: "손짱 1등",
    },
])

// 위에서 v-if에서 mrole을 사용하기 때문에 여기서 초기화 해줘야함
const mrole = store.state.mrole;
// 마이프로필을 호출
getMyProfile();

// 마이프로필로 값을 가져오는 함수
async function getMyProfile() {
    try{
            const response = await memberAPI.getMyProfile(store.state.userId);
            member.value = response.data.member;
            console.log("esdf"+response.data.member.oname);
            // 이미지 oname이 있으면 값을 띠우고 없으면 디폴트 사진을
            if(response.data.member.mimgoname !== null){
                isPreImg.value = 2;
            }

        if(store.state.mrole === 'ROLE_EDITOR'){
            const response = await memberAPI.getEditorProfile(store.state.userId, store.state.mrole);
            careers.value = response.data.career;
            awards.value = response.data.awards;
        }
    }catch(error){
        console.log("에러남: " + error);
    }
        
}

let isPreImg = ref(0);
// 마이프로필 사진 미리 보기를 위한 로직
function setPreviewImg(e){
    if(e.target.files.length !== 0){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            const img = document.querySelector(".preImg");
            console.log(img);
            img.src = e.target.result;
            isPreImg.value = 1;
        }
    } else {
        isPreImg.value = 2;
    }
}

async function deletImg() {
    isPreImg.value = 0;
    await memberAPI.deleteMemberImg(store.state.userId);
    router.go(0);
}

function phonenumCheck(){
    const mphonenumPattern = /^(\d{3})-(\d{3,4})-(\d{4})$/;
    const mphonenumResult = mphonenumPattern.test(member.value.mphonenum);
    mphonenumResultError.value = !mphonenumResult;
    return mphonenumResult;
}

function mnicknameCheck(){
    const mnicknamePattern = /^[가-힣a-zA-Z0-9-_]{2,10}$/;
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



// 비밀번호 업데이트
async function changePassword() {
    console.log("비밀번호 체크: " + member.value.mpassword)
    if(member.value.mpassword === member.value.mpasswordcheck){ 
        const response = await memberAPI.updatePassword(JSON.parse(JSON.stringify(member.value)));
        member.value.mpassword = "";
        member.value.mpasswordcheck = "";
    }
}

const editingMnickname=ref(false);
const editingCareers=ref(false);
const editingAwards=ref(false);
const editingPhonenum = ref(false);

function changeMnickname(){
    editingMnickname.value= !editingMnickname.value;
}
function changeCareers(){
    editingCareers.value= !editingCareers.value;
}
function changeAwards(){
    editingAwards.value= !editingAwards.value;
}

function changePhonenum() {
    editingPhonenum.value = !editingPhonenum.value;
}

// 닉네임 DB에 업데이트 하는 함수
async function updateNickname(){
    await memberAPI.updateNickname(JSON.parse(JSON.stringify(member.value)));
}

// 닉네임 업데이트 버튼
function savenickname(){
    editingMnickname.value= !editingMnickname.value;
    updateNickname();
}

async function savephonenum() {
    editingPhonenum.value = !editingPhonenum.value;
    await memberAPI.updatePhonenum(JSON.parse(JSON.stringify(member.value)));
}

// 경력 추가 및 삭제---------------------------------------
// 변경 저장
async function saveCareers(){
    editingCareers.value = !editingCareers.value;
    
    // 전체 Delete 했다가, 현재 값 insert해야 편함 전체 수를 확인 하지 않아도 됨
    // Delete 식
    await memberAPI.deleteCareers(store.state.userId);

    // Insert 식 - for문으로 던져야함
    for(let i=0; i<careers.value.length; i++){
        careers.value[i].cano=i+1; // 번호 지정
        careers.value[i].mid=store.state.userId; // 아이디값 저장
        await memberAPI.setCareer(JSON.parse(JSON.stringify(careers.value[i])));
    }
    
}

// 변경 취소
function cancelCareers(){
    editingCareers.value = !editingCareers.value;
    console.log("경력 취소 실행")
    // Axios 들러서 원래 값 받아오기
    getMyProfile();
}

// 칸 추가
function careerAdd() {
    const newcareer=ref({
        cano:'',
        cacontent: ''
    })
    careers.value.push(newcareer);
}

// 칸 삭제 - 마지막 하나는 삭제 안됨
function careerRemove(index){
    if(careers.value.length>1){
        careers.value.splice(index,1);
    }
}

// 수상 추가 및 삭제-----------------------------------------
// 변경 저장
async function saveAwards(){
    editingAwards.value= !editingAwards.value;
    // 전체 Delete 했다가, 현재 값 insert
    // Delete 식
    await memberAPI.deleteAwards(store.state.userId);

    // Insert식 - for문으로 던져야함
    for(let i =0; i<awards.value.length; i++){
        awards.value[i].ano = i+1;
        awards.value[i].mid = store.state.userId;
        await memberAPI.setAwards(JSON.parse(JSON.stringify(awards.value[i])));
    }
}

// 변경 취소
function cancelAwards(){
    editingAwards.value=!editingAwards.value;
    // Axios 들러서 원래 값 받아오기
    getMyProfile();
}

// 칸 추가
function awardsAdd() {
    const newawards=ref({
        ano:'',
        cacontent: ''
    })
    awards.value.push(newawards);
}

// 칸 삭제 - 마지막 하나는 삭제 안됨
function awardsRemove(index){
    if(awards.value.length>1){
        awards.value.splice(index,1)
    }
}

</script>

<style scoped>

.myimg{
    border-radius: 200px;
    padding: 0;
}

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
.mnicknameinput{
    border:1px solid #dee2e6;
    border-radius: 0.375rem;
    padding:0.375rem 0.75rem;
    width:720px;
    height:36px;
    flex:1 1 auto

}
</style>