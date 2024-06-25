<template>
<ModalTemplate>

    <template v-slot:header>
        에디터 신청
        <!-- <h4 style="font-weight: bold;">에디터 신청폼</h4> -->
    </template>
    <template v-slot:body>
        <diV>
            <div class="text-start my-3">
                <!-- <h5 class=" p-2 border-bottom border-dark border-1" >추가 정보</h5> -->
                    <!-- 경력 추가 -->
                    <div class="row my-3 px-3" v-if="isEditor">
                        <li class="green-point">경력</li>
                        <div class="d-flex m-1" v-for="(career, index) in careerArray" :key="index">
                            <input class="flex-grow-1 p-2 border" placeholder="경력을 입력해주세요" v-model="career.cacontent"/>
                            <!-- 삭제 버튼은 index=0(첫행)일 때만 안보이고 항상 보임-->
                            <button class="btnGroup p-2 ms-3 border" v-if="index > 0" @click="careerRemove(index)"> - </button>
                            <!-- 추가 버튼은 마지막행일 때만 보임 -->
                            <button class="btnGroup p-2 ms-3 border" v-if="index+1===careerArray.length" @click="careerAdd(index)"> + </button>
                        </div>
                        <div class="checkError m-1" v-if="cacontentNullError">빈칸을 채워주세요</div>
                    </div>

                    <!-- 수상내역 추가 -->
                    <div class="row my-3 px-3" v-if="isEditor">
                        <li class="green-point">수상 내역</li>
                        <div class="d-flex m-1" v-for="(awards, index) in awardsArray" :key="index">
                            <input class="flex-grow-1 p-2 border" placeholder="수상 이력을 입력해주세요" v-model="awards.acontent"/>
                            <!-- 삭제 버튼은 index=0(첫행)일 때만 안보이고 항상 보임-->
                            <button class="btnGroup p-2 ms-3 border" v-if="index > 0" @click="awardsRemove(index)"> - </button>
                            <!-- 추가 버튼은 마지막행일 때만 보임 -->
                            <button class="btnGroup p-2 ms-3 border" v-if="index+1===awardsArray.length" @click="awardsAdd(index)"> + </button>
                        </div>
                        <div class="checkError m-1" v-if="cacontentNullError">빈칸을 채워주세요</div>
                    </div>
            </div>
        </diV>
    </template>

    <template v-slot:footer>
       <button class="btn btn-success" style="width:75px; height:40px" @click="$emit('close')">신청</button>
       <button class="btn " style="background-color:rgb(243, 243, 243); color:black;width:75px; height:40px" @click="$emit('close')">취소</button>
    </template>


</ModalTemplate>
</template>

<script setup>
import ModalTemplate from "../../../components/ModalTemplate.vue";
import {ref} from'vue'
const isEditor = ref(true);
const emit=defineEmits(['close'])

// 에디터로 가입하기 선택시 폼을 열어주는 함수
function joinEditor() {
    isEditor.value = !isEditor.value;
    console.log(isEditor.value);
}

// 커리어 상태 객체 선언
const career = ref({
    cano: 1,
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
        careerArray.value.push({cano: index+2, cacontent: ''});
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
.btnGroup {
    width: 50px;
    background-color: white;
    font-weight: bold;
}

.btnGroup:hover {
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
</style>