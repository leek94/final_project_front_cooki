<template>
    <div class="d-flex" style="justify-content: center;">

        <form @submit.prevent="handleSubmit">
        <div class="row m-5 px-5 " style=" width: 700px; ">
            <h3 style="font-weight: bold; text-align: center">회원가입</h3>

                <!-- 일반유저/에디터 공통 항목 -->
                <div class="text-start bg-light p-5 my-5">
                    <h4 class="p-2 border-bottom border-dark border-3" style="font-weight: bold;">기본 정보</h4>
                    <div class="row my-3 px-3" >
                        <li class="green-point">아이디(이메일)</li>
                        <div class="m-0 p-0" style="position: relative; display: flex;">
                            <input class="p-2 border" style="width: 100%;" v-model="member.mid" placeholder="이메일 형식의 아이디를 입력해주세요" @keyup="midCheck"/>
                            <i class="fa-solid fa-check" v-if="idChecking === 1" style="position: absolute; top: 50%; transform: translateY(-50%); right: 85px; color: #15a775;"></i>
                            <i class="fa-solid fa-xmark" v-if="idChecking === -1" style="position: absolute; top: 50%; transform: translateY(-50%); right: 85px; color: red;"></i>
                            <button class="id_checker border-0 bg-white" style="position: absolute; top: 5px; bottom: 5px; right: 5px; font-weight: bold;" @click.prevent="idCheck">
                                중복검사
                            </button>
                        </div>
                        <div class="checkError m-1" v-if="midResultError" style="color: red;">올바른 형식의 아이디를 입력해주세요</div>
                        <div class="checkGood m-1"  v-if="idChecking === 1">생성 가능한 아이디입니다</div>
                        <div class="checkError m-1" v-if="idChecking === -1">중복된 아이디입니다</div>
                    </div>

                    <div class="row my-3 px-3">
                        <li class="green-point">이름</li>
                        <input class="p-2 border" v-model="member.mname" placeholder="한글 2~5자 이내" @keyup="mnameCheck"/>
                        <div class="checkError m-1" v-if="mnameResultError">올바른 형식의 이름을 입력해주세요</div>
                    </div>
                    
                    <div class="row my-3 px-3">
                        <li class="green-point">휴대폰 번호</li>
                        <input class="p-2 border" v-model="member.mphonenum" placeholder="하이픈(-)을 넣어서 작성해주세요" @keyup="mphonenumCheck"/>
                        <div class="checkError m-1" v-if="mphonenumResultError">(-)을 사용하여 올바른 형식의 휴대폰 번호를 입력해주세요</div>
                    </div>
                    
                    <div class="row my-3 px-3">
                        <li class="green-point">닉네임</li>
                        <input class="p-2 border" v-model="member.mnickname" placeholder="한글 4~16자 이내" @keyup="mnicknameCheck"/>
                        <div class="checkError m-1" v-if="mnicknameResultError">올바른 형식의 닉네임을 입력해주세요</div>
                    </div>
                    
                    <div class="row my-3 px-3" >
                        <li class="green-point">비밀번호</li>
                           <div class="m-0 p-0" style="position: relative; display: flex;" v-if="!showPassword">
                               <input class="p-2 border" type="password" style="width: 100%;" v-model="member.mpassword" placeholder="알파벳 대소문자, 숫자를 혼용해서 8자 이상 15장 이하" @keyup="mpasswordCheck"/>
                               <button class="border-0 bg-white" style="position: absolute; top: 5px; bottom: 5px; right: 5px;" @click="showPasswordBtn">
                                   <i class="fa-regular fa-eye border-0"></i>
                               </button>
                           </div>
                           <div class="m-0 p-0" style="position: relative; display: flex;" v-if="showPassword">
                               <input class="p-2 border" style="width: 100%;" v-model="member.mpassword" placeholder="알파벳 대소문자, 숫자를 혼용해서 8자 이상 15장 이하" @keyup="mpasswordCheck"/>
                               <button class="border-0 bg-white" style="position: absolute; top: 5px; bottom: 5px; right: 5px;" @click="showPasswordBtn">
                                   <i class="fa-regular fa-eye-slash border-0"></i>
                               </button>
                           </div>
                        <div class="checkError m-1" v-if="mpasswordResultError">올바른 형식의 비밀번호를 입력해주세요</div>
                    </div>
                
                    <div class="row my-3 px-3">
                        <li class="green-point">비밀번호 확인</li>
                        <div class="m-0 p-0" style="position: relative; display: flex;" v-if="!showPasswordCheck">
                            <input class="p-2 border" type="password" style="width: 100%;" v-model="member.mpasswordcheck" placeholder="비밀번호를 한 번 더입력해주세요" @keyup="mpasswordMatchCheck"/>
                            <button class="border-0 bg-white" style="position: absolute; top: 5px; bottom: 5px; right: 5px;" @click="showPasswordMatchBtn">
                                <i class="fa-regular fa-eye border-0"></i>
                            </button>
                        </div>
                        <div class="m-0 p-0" style="position: relative; display: flex;" v-if="showPasswordCheck">
                            <input class="p-2 border" style="width: 100%;" v-model="member.mpasswordcheck" placeholder="비밀번호를 한 번 더입력해주세요" @keyup="mpasswordMatchCheck"/>
                            <button class="border-0 bg-white" style="position: absolute; top: 5px; bottom: 5px; right: 5px;" @click="showPasswordMatchBtn">
                                <i class="fa-regular fa-eye-slash border-0"></i>
                            </button>
                        </div>

                        <div class="checkError m-1" v-if="mpasswordMatchError">입력한 비밀번호와 일치하지않습니다</div>
                    </div>
                </div>
            
                <!-- 에디터 추가 항목 -->
                <div class="text-start bg-light p-5 my-5">
                    <h4 class=" p-2 border-bottom border-dark border-3" style="font-weight: bold;">추가 정보</h4>
                    <div class="mx-2 my-3">
                        <input class="checkbox me-2" type="checkbox" id="switch" name="editor" @click="joinEditor"/>
                        <label for="switch">에디터로 가입하기</label>
                    </div>

                    <!-- 경력 추가 -->
                    <div class="row my-3 px-3" v-if="member.isEditor">
                        <li class="green-point">경력</li>
                        <div class="d-flex m-1" v-for="(career, index) in careerArray" :key="index">
                            <input class="flex-grow-1 p-2 border" placeholder="경력을 입력해주세요" v-model="career.cacontent"/>
                            <!-- 삭제 버튼은 index=0(첫행)일 때만 안보이고 항상 보임-->
                            <button class="button p-2 ms-3 border" v-if="index > 0" @click="careerRemove(index)"> - </button>
                            <!-- 추가 버튼은 마지막행일 때만 보임 -->
                            <button class="button p-2 ms-3 border" v-if="index+1===careerArray.length" @click="careerAdd(index)"> + </button>
                        </div>
                        <div class="checkError m-1" v-if="cacontentNullError">빈칸을 채워주세요</div>
                    </div>

                    <!-- 수상내역 추가 -->
                    <div class="row my-3 px-3" v-if="member.isEditor">
                        <li class="green-point">수상 내역</li>
                        <div class="d-flex m-1" v-for="(awards, index) in awardsArray" :key="index">
                            <input class="flex-grow-1 p-2 border" placeholder="수상 이력을 입력해주세요" v-model="awards.acontent"/>
                            <!-- 삭제 버튼은 index=0(첫행)일 때만 안보이고 항상 보임-->
                            <button class="button p-2 ms-3 border" v-if="index > 0" @click="awardsRemove(index)"> - </button>
                            <!-- 추가 버튼은 마지막행일 때만 보임 -->
                            <button class="button p-2 ms-3 border" v-if="index+1===awardsArray.length" @click="awardsAdd(index)"> + </button>
                        </div>
                        <div class="checkError m-1" v-if="cacontentNullError">빈칸을 채워주세요</div>
                    </div>
                </div>

                <!-- 약관 동의 -->

                <!-- 
                    체크박스 속성
                name="editor": 서버로 전송될 때 체크박스의 이름을 지정합니다. 같은 이름을 가진 체크박스는 그룹으로 취급됩니다.
                value="yes": 체크박스가 선택되었을 때 서버로 전송될 값입니다.
                checked: 체크박스가 기본적으로 선택된 상태로 표시되도록 합니다.
                 -->
                <div class="text-start bg-light p-5 my-5">
                    <h4 class="p-2 border-bottom border-dark border-3" style="font-weight: bold;">약관 동의</h4>
                    <div class="mx-2 my-3">
                        <input class="checkbox me-2 rounded" id="essential1" type="checkbox" name="editor" v-model="checkFirst"/>
                        <label for="essential1"> [필수] 만 14세 이상입니다.</label>
                    </div>
                    <div class="mx-2 my-3">
                        <input class="checkbox me-2" id="essential2" type="checkbox" name="editor" v-model="checkSecond">
                        <label for="essential2"> [필수] <a href="https://member.sempio.com/legal/terms-and-condition">이용약관</a> 확인</label>
                    </div>
                    <div class="mx-2 my-3">
                        <input class="checkbox me-2" id="essential3" type="checkbox" name="editor" v-model="checkThird"/>
                        <label for="essential3"> [필수] <a href="https://member.sempio.com/legal/privacy-policy">개인정보처리방침</a> 확인</label>
                    </div>
                    <div class="checkError m-1" v-if="checkboxError">필수 조건에 모두 동의해주세요</div>
                    <div class="mx-2 my-3 p-3" style="background-color: #D9EDBF;">
                        <li>회원 탈퇴 시까지 회원으로서 자격이 유지됩니다.</li>
                    </div>
                </div>

                <div>
                    <button class="btn py-2 border rounded w-100" @click="joinFormSubmit">회원가입</button>
                </div>
            </div>    
        </form>
        <DuplicateModal id="duplicateModal"></DuplicateModal>
        <EssentialModal id="essentialModal"></EssentialModal>
        <NullcontentModal id="nullcontentModal"></NullcontentModal>
        <ValidationModal id="validationModal"></ValidationModal>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import memberAPI from '@/apis/memberAPI'
import { useRouter } from 'vue-router';
import store from '@/store';
import DuplicateModal from './DuplicateModal.vue';
import EssentialModal from './EssentialModal.vue';
import NullcontentModal from './NullcontentModal.vue';
import ValidationModal from './ValidationModal.vue';
import { Modal } from 'bootstrap';

let duplicateModal = null;
let essentialModal = null;
let nullcontentModal = null;
let validationModal = null;

onMounted(() =>{
    duplicateModal = new Modal(document.querySelector("#duplicateModal"));
    essentialModal = new Modal(document.querySelector("#essentialModal"));
    nullcontentModal = new Modal(document.querySelector("#nullcontentModal"));
    validationModal = new Modal(document.querySelector("#validationModal"));
});


// 멤버 객체 선언
let member = ref( {
    mid: "",
    mname: "",
    mphonenum: "",
    mnickname: "",
    mpassword: "",
    mpasswordcheck: "",
    isEditor:false
});

// 유효성 검사를 위한 상태 변수 선언
const midResultError = ref(false);
const mnameResultError = ref(false);
const mphonenumResultError = ref(false);
const mnicknameResultError = ref(false);
const mpasswordResultError = ref(false);
const mpasswordMatchError = ref(false);
const checkboxError = ref(false);
const idChecking = ref(0);

// 약관 동의 필수 값
const checkFirst = ref(false);
const checkSecond = ref(false);
const checkThird = ref(false);

// 비밀번호 보이게 하는 버튼
let showPassword = ref(false);
let showPasswordCheck = ref(false);


// 비밀번호 보이게
function showPasswordBtn() {
    showPassword.value = !showPassword.value;
}

// 비밀번호 확인 보이게
function showPasswordMatchBtn() {
    showPasswordCheck.value = !showPasswordCheck.value;
}

// mid를 통해서 중복 검사
async function idCheck() {
    // 그전에 눌렸던 중복검사을 삭제 하기 위해서 초기화
    idChecking.value = 0;
    // 값이 채워져 있고, 이메일 정규식을 통과했을 경우
    if(member.value.mid !== "" && midResultError.value === false) {
        // DB에서 아이디가 있는 지 확인 - 중복 검사
        const response = await memberAPI.idCheck(member.value.mid);
        
        // 중복값 확인
        if(response.data.mid === null){
            // 중복되지 않을 경우
            idChecking.value = 1;
        } else {
            // 중복된 경우
            idChecking.value = -1;
        }
    } else {
        // 값이 없거나, 정규식을 통과하지 못함
        midResultError.value = true;
    }
}

// 정규 표현식 ---------------------------------------------------------------------
//아이디 정규 표현식 검사
function midCheck() {
  idChecking.value = 0;
  const midPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const midResult = midPattern.test(member.value.mid);
  midResultError.value = !midResult;
  return midResult;
}

// 이름 정규 표현식 검사
function mnameCheck() {
  const mnamePattern = /^[가-힣]{2,5}$/;	
  const mnameResult = mnamePattern.test(member.value.mname);
  mnameResultError.value = !mnameResult;
  return mnameResult;
}

// 폰번호 정규 표현식 검사
function mphonenumCheck() {
    const mphonenumPattern = /^(010|011)-\d{3,4}-\d{4}$/;
    const mphonenumResult = mphonenumPattern.test(member.value.mphonenum); //입력 폰번호가 패턴 일치하면 true
    mphonenumResultError.value = !mphonenumResult; //result가 true면  !true->false->v-if 안나옴 / result가 false면 !false->true->v-if 나옴
    return mphonenumResult;
}

// 닉네임 정규 표현식 검사
function mnicknameCheck() {
    const mnicknamePattern = /^[가-힣a-zA-Z0-9-_]{3,10}$/;
    const mnicknameResult = mnicknamePattern.test(member.value.mnickname);
    mnicknameResultError.value = !mnicknameResult;
    return mnicknameResult;
}

// 비밀번호 정규 표현식 검사
function mpasswordCheck() {
    const mpasswordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
    const mpasswordResult = mpasswordPattern.test(member.value.mpassword);
    mpasswordResultError.value = !mpasswordResult;
    return mpasswordResult;
}

// 비밀번호 일치 검사
function mpasswordMatchCheck() {
    const mpasswordCheckResult = false;
    if(member.value.mpassword != member.value.mpasswordcheck) {
        mpasswordMatchError.value = !mpasswordCheckResult;
    } else {
        mpasswordMatchError.value = mpasswordCheckResult;
    }
    return mpasswordCheckResult;
}


// 에디터로 가입 선택에 따라 폼을 보여주기 위한 상태변수


// 에디터로 가입하기 선택시 폼을 열어주는 함수
function joinEditor() {
    member.value.isEditor = !member.value.isEditor;
    console.log(member.value.isEditor);
}

// 커리어 상태 객체 선언
let career = ref({
    cacontent: ''
 })

 // 커리어 상태 배열 선언
 const careerArray = ref([career.value]);
//const careerArray = ref([{ cano: '', cacontent: '' }]);
//let nextCano = 2;

const cacontentNullError = ref(false);
//커리어 입력 태그 추가 함수
function careerAdd(index) {
        //cacontentNullError.value = !cacontentNullError.value;
        careerArray.value.push({cacontent: ''});
        //careerArray.value.push({ cano: index+2, cacontent: '' });
        //console.log("다음인덱스번호",nextCano );
        console.log("배열객체",JSON.parse(JSON.stringify(careerArray.value)));
        console.log("커리어이름",careerArray.value[index].cacontent);
        console.log("인덱스번호",careerArray.value[index].cano);

}

// 수상내역 입력 태그 삭제 함수
function careerRemove(index) {
    careerArray.value.splice(index,index);
}

// 수상내역 상태 객체 선언
let awards = ref({
    ano: 1,
    acontent: ''
 })

 // 수상내역 상태 배열 선언
const awardsArray = ref([awards.value]);
const awardsNullError = ref(false);

// 수상내역 입력 태그 추가 함수
function awardsAdd(index) {
        awardsArray.value.push({ano: index+2, acontent: ''});
        console.log("배열객체",JSON.parse(JSON.stringify(awardsArray.value)));
}

// 수상내역 입력 태그 삭제 함수
function awardsRemove(index) {
    awardsArray.value.splice(index,index);
}

const router = useRouter();

// 회원가입 실행 함수
async function handleSubmit() {
    //에디터로 가입하기 버튼 클릭 시 member 변수에서 isEditor의 값으로 mrole 설정
    
    if(member.value.mid === "" || member.value.mname === "" || member.value.mphonenum === "" || 
        member.value.mnickname === "" || member.value.mpassword === "" || member.value.mpasswordcheck === "") {

        console.log("빈칸이 있을 경우 - 빈칸 모달");
        nullcontentModal.show();

    } else if(midResultError.value === true || mnameResultError.value === true || mphonenumResultError.value === true ||
              mnicknameResultError.value === true || mpasswordResultError.value === true || mpasswordMatchError.value === true) {

        console.log("정규식을 통과 못했을 경우 - 정규식 모달");
        validationModal.show();

    } else if(checkFirst.value === false || checkSecond.value === false || checkThird.value === false){

        console.log("필수 항목을 체크하지 않았을 때 - 필수 모달")
        essentialModal.show();
    } else if(idChecking.value === 0 || idChecking.value === -1){

        console.log("중복검사를 실행하지 않음 - 중복검사 모달")
        duplicateModal.show();
    } else {

        console.log("빈칸&정규식 통과");
        let hasEmptyCareer = false;
        let hasEmptyAward = false;


        if(member.value.isEditor === true) {
            for(let i = 0; i<careerArray.value.length; i++){
                if(careerArray.value[i].cacontent === ''){

                    console.log("경력 빈칸 발생 - 빈칸 모달")
                    nullcontentModal.show();
                    hasEmptyCareer = true;
                    break;
                }
            }
            for(let j = 0; j<awardsArray.value.length; j++){
                if(awardsArray.value[j].acontent === ''){

                    console.log("수상 경력 빈칸 발생 - 빈칸 모달");
                    nullcontentModal.show();
                    hasEmptyAward = true;
                    break;
                }
            }

            console.log("에디터 신청 + 전체 통과 - 값 저장");
            if(!hasEmptyCareer && !hasEmptyAward){
                try{
                    // 에디터로 가입하기가 클릭되면 롤이 에디터
                    if (member.value.isEditor){
                        member.value.mrole="ROLE_EDITOR"
                    } else{
                        member.value.mrole="ROLE_USER"
                    }
                    const data = JSON.parse(JSON.stringify(member.value));
                    //member 데이터 값을 axios로 back로 전달 -> map 형태로 mid와 result값을 전달 받음
                    const response = await memberAPI.join(data);

                    if(response.data.result==="success" && data.mrole==="ROLE_EDITOR"){
                        //배열로 형성된 경력을 객체로 하나씩 전달 
                        //커리어(수상경력) 테이블의 pk값이 cano(ano)와 mid 복합키로 설정되어 있으므로 두 값을 같이 전달 
                        for(let i=0; i<careerArray.value.length; i++){ 
                            careerArray.value[i].cano=i+1;
                            careerArray.value[i].mid=response.data.mid;
                            //axios로 value 값 전달 
                            memberAPI.setCareer(JSON.parse(JSON.stringify(careerArray.value[i])));
                        }

                        for(let i=0; i<awardsArray.value.length; i++){
                            awardsArray.value[i].ano=i+1;
                            awardsArray.value[i].mid=response.data.mid;
                            memberAPI.setAwards(JSON.parse(JSON.stringify(awardsArray.value[i])));
                        }

                    }   
                router.push("/Member/LoginView?pr=join")
                
                }catch(error){
                    console.log("에러남: " + error);
                }

            }
            
        } else {

            console.log("에디터 신청 X + 전체 통과 - 값 저장");
            try{
                // 에디터로 가입하기가 클릭되면 롤이 에디터
                if (member.value.isEditor){
                    member.value.mrole="ROLE_EDITOR"
                } else{
                    member.value.mrole="ROLE_USER"
                }
                const data = JSON.parse(JSON.stringify(member.value));
                //member 데이터 값을 axios로 back로 전달 -> map 형태로 mid와 result값을 전달 받음
                const response = await memberAPI.join(data);

                if(response.data.result==="success" && data.mrole==="ROLE_EDITOR"){
                    //배열로 형성된 경력을 객체로 하나씩 전달 
                    //커리어(수상경력) 테이블의 pk값이 cano(ano)와 mid 복합키로 설정되어 있으므로 두 값을 같이 전달 
                    for(let i=0; i<careerArray.value.length; i++){ 
                        careerArray.value[i].cano=i+1;
                        careerArray.value[i].mid=response.data.mid;
                        //axios로 value 값 전달 
                        memberAPI.setCareer(JSON.parse(JSON.stringify(careerArray.value[i])));
                    }

                    for(let i=0; i<awardsArray.value.length; i++){
                        awardsArray.value[i].ano=i+1;
                        awardsArray.value[i].mid=response.data.mid;
                        memberAPI.setAwards(JSON.parse(JSON.stringify(awardsArray.value[i])));
                    }

                }   
            router.push("/Member/LoginView?pr=join")

            }catch(error){
                console.log("에러남: " + error);
            }
        }
    }

    
}
        

</script>

<style scoped>
.checkbox {
    accent-color: #D9EDBF;
}

.button {
    width: 50px;
    background-color: white;
    font-weight: bold;
}

.button:hover {
    background-color: #15a775;
    color: white;
}

.id_checker:hover{
    color: #15a775;
}

.green-point::marker {
    color: #15a775;
}

.green-point {
    font-weight: bold;
}

h6::marker {
    color: black;
}

.checkError {
    font-size: 13px;
    color: red;
}

.checkGood{
    font-size: 13px;
    color: #15a775;
}

a:link {
    color: #15a775;
}

a:visited {
    color: #15a775;
}

a:hover {
    color: #D9EDBF;
}

a:active {
    color: #D9EDBF;
} 

</style>