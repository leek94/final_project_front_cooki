<template>
    <div class="d-flex" style="justify-content: center;">

        <form @submit.prevent="handleSubmit">
        <div class="row m-5 px-5 " style=" width: 700px; ">
            <h3 style="font-weight: bold; text-align: center">회원가입</h3>
            <div class="">

                <!-- 일반유저/에디터 공통 항목 -->
                <div class="text-start bg-light p-5 my-5">
                    <h4 class="p-2 border-bottom border-dark border-3" style="font-weight: bold;">기본 정보</h4>
                    <div class="row my-3 px-3">
                        <li class="green-point">아이디(이메일)</li>
                        <input class="p-2 border" v-model="member.mid" placeholder="이메일 형식의 아이디를 입력해주세요" @keyup="midCheck"/>
                        <div class="checkError m-1" v-if="midResultError">올바른 형식의 아이디를 입력해주세요</div>
                    </div>
                
                    <div class="row my-3 px-3">
                        <li class="green-point">이름</li>
                        <input class="p-2 border" v-model="member.mname" placeholder="한글 이름 2~5자 이내" @keyup="mnameCheck"/>
                        <div class="checkError m-1" v-if="mnameResultError">올바른 형식의 이름을 입력해주세요</div>
                    </div>
                
                    <div class="row my-3 px-3">
                        <li class="green-point">휴대폰 번호</li>
                        <input class="p-2 border" v-model="member.mphonenum" placeholder="하이픈(-)을 넣어서 작성해주세요" @keyup="mphonenumCheck"/>
                        <div class="checkError m-1" v-if="mphonenumResultError">올바른 형식의 휴대폰 번호를 입력해주세요</div>
                    </div>
                
                    <div class="row my-3 px-3">
                        <li class="green-point">닉네임</li>
                        <input class="p-2 border" v-model="member.mnickname" placeholder="3~16자 이내" @keyup="mnicknameCheck"/>
                        <div class="checkError m-1" v-if="mnicknameResultError">올바른 형식의 닉네임을 입력해주세요</div>
                    </div>
                
                    <div class="row my-3 px-3">
                        <li class="green-point">비밀번호</li>
                        <input class="p-2 border" v-model="member.mpassword" placeholder="알파벳 대소문자, 숫자를 혼용해서 8자 이상 15장 이하" @keyup="mpasswordCheck"/>
                        <div class="checkError m-1" v-if="mpasswordResultError">올바른 형식의 비밀번호를 입력해주세요</div>
                    </div>
                
                    <div class="row my-3 px-3">
                        <li class="green-point">비밀번호 확인</li>
                        <input class="p-2 border" v-model="member.mpasswordcheck" placeholder="비밀번호를 한 번 더입력해주세요" @keyup="mpasswordMatchCheck"/>
                        <div class="checkError m-1" v-if="mpasswordMatchError">입력한 비밀번호와 일치하지않습니다</div>
                        
                    </div>
                </div>
            
                <!-- 에디터 추가 항목 -->
                <div class="text-start bg-light p-5 my-5">
                    <h4 class=" p-2 border-bottom border-dark border-3" style="font-weight: bold;">추가 정보</h4>
                    <div class="mx-2 my-3">
                        <input class="checkbox me-2" type="checkbox" id="switch" name="editor" value="yes" @click="joinEditor"/>
                        <label for="switch">에디터로 가입하기</label>
                    </div>

                    <!-- 경력 추가 -->
                    <div class="row my-3 px-3" v-if="isEditor">
                        <li class="green-point">경력</li>
                        <div class="d-flex m-1" v-for="(career, index) in careerArray" :key="index">
                            <input class="flex-grow-1 p-2 border" placeholder="경력을 입력해주세요" v-model="career.cacontent"/>
                            <!-- 삭제 버튼은 index=0(첫행)일 때만 안보이고 항상 보임-->
                            <button class="p-2 ms-3 border" v-if="index > 0" @click="careerRemove(index)"> - </button>
                            <!-- 추가 버튼은 마지막행일 때만 보임 -->
                            <button class="p-2 ms-3 border" v-if="index+1===careerArray.length" @click="careerAdd(index)"> + </button>
                        </div>
                        <div class="checkError m-1" v-if="cacontentNullError">빈칸을 채워주세요</div>
                    </div>

                    <!-- 수상내역 추가 -->
                    <div class="row my-3 px-3" v-if="isEditor">
                        <li class="green-point">수상 내역</li>
                        <div class="d-flex m-1" v-for="(awards, index) in awardsArray" :key="index">
                            <input class="flex-grow-1 p-2 border" placeholder="수상 이력을 입력해주세요" v-model="awards.acontent"/>
                            <!-- 삭제 버튼은 index=0(첫행)일 때만 안보이고 항상 보임-->
                            <button class="p-2 ms-3 border" v-if="index > 0" @click="awardsRemove(index)"> - </button>
                            <!-- 추가 버튼은 마지막행일 때만 보임 -->
                            <button class="p-2 ms-3 border" v-if="index+1===awardsArray.length" @click="awardsAdd(index)"> + </button>
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
                        <input class="checkbox me-2 rounded" type="checkbox" name="editor" v-model="checkFirst"/>
                        <label for="switch"> [필수] 만 14세 이상입니다.</label>
                    </div>
                    <div class="mx-2 my-3">
                        <input class="checkbox me-2" type="checkbox" name="editor" v-model="checkSecond">
                        <label for="switch"> [필수] <a href="https://member.sempio.com/legal/terms-and-condition">이용약관</a> 확인</label>
                    </div>
                    <div class="mx-2 my-3">
                        <input class="checkbox me-2" type="checkbox" name="editor" v-model="checkThird"/>
                        <label for="switch"> [필수] <a href="https://member.sempio.com/legal/privacy-policy">개인정보처리방침</a> 확인</label>
                    </div>
                    <div class="checkError m-1" v-if="checkboxError">필수 조건에 모두 동의해주세요</div>
                    <div class="mx-2 my-3 p-3" style="background-color: #D9EDBF;">
                        <li>회원 탈퇴 시까지 회원으로서 자격이 유지됩니다.</li>
                    </div>
                </div>

                <div>
                    <button class="py-2 border rounded w-100" @click="joinFormSubmit">회원가입</button>
                </div>
            </div>    
        </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// 멤버 객체 선언
const member = ref( {
    mid: "",
    mname: "",
    mphonenum: "",
    mnickname: "",
    mpassword: "",
    mpasswordcheck: ""
});

// 유효성 검사를 위한 상태 변수 선언
const midResultError = ref(false);
const mnameResultError = ref(false);
const mphonenumResultError = ref(false);
const mnicknameResultError = ref(false);
const mpasswordResultError = ref(false);
const mpasswordMatchError = ref(false);
const checkboxError = ref(false);

const checkFirst = ref(false);
const checkSecond = ref(false);
const checkThird = ref(false);



// function midCheck() {
//     var midPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
//     var midResult = midPattern.test(member.value.mid);
//     //member.value.mid == null || member.value.mid.equals("")
//     if(midResult == false) {
//         this.midResultError = true;
//     } else {
//         this.midResultError = false;
//     } 
//     return midResult;
// }

// 아이디 정규 표현식 검사
function midCheck() {
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



// const career = ref();
// const careerNo = ref(1);
// const careerArray = ref([
//     {careerNo, career}
// ]);

// function careerAdd() {
//     // careerArray.value.careerNo = +1;
//     careerArray.value.careerNo = +1;
//     careerArray.value.push({careerNo, career});
//     console.log(careerArray.value.careerNo);
//     console.log(careerArray.value.career);
// }


// 에디터로 가입 선택에 따라 폼을 보여주기 위한 상태변수
const isEditor = ref(false);

// 에디터로 가입하기 선택시 폼을 열어주는 함수
function joinEditor() {
    isEditor.value = !isEditor.value;
    console.log(isEditor.value);
}

// 커리어 상태 객체 선언
const career = ref({
    cacontent: ''
 })

 // 커리어 상태 배열 선언
 const careerArray = ref([career.value]);
//const careerArray = ref([{ cano: '', cacontent: '' }]);
//let nextCano = 2;

const careerAddAfter = ref(false);
const cacontentNullError = ref(false);

//커리어 입력 태그 추가 함수
function careerAdd(index) {
        //cacontentNullError.value = !cacontentNullError.value;
        careerArray.value.push({cacontent: ''});
        careerAddAfter.value = !careerAddAfter.value;
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
const awards = ref({
    ano: 1,
    acontent: ''
 })

 // 수상내역 상태 배열 선언
 const awardsArray = ref([awards.value]);

const awardsAddAfter = ref(false);
const awardsNullError = ref(false);

// 수상내역 입력 태그 추가 함수
function awardsAdd(index) {
        awardsArray.value.push({ano: index+2, acontent: ''});
        awardsAddAfter.value = !awardsAddAfter.value;
        console.log("배열객체",JSON.parse(JSON.stringify(awardsArray.value)));
}

// 수상내역 입력 태그 삭제 함수
function awardsRemove(index) {
    awardsArray.value.splice(index,index);
}

//폼 제출 함수
function joinFormSubmit() {

}

</script>

<style scoped>
.checkbox {
    accent-color: #D9EDBF;
}

button {
    width: 50px;
    background-color: white;
    font-weight: bold;
}

button:hover {
    background-color: #15a775;
    color: white;
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