<template>
    <h4 class="fw-bold m-5">Q&A</h4>

    <!-- 댓글 등록 -->
    <!-- 로그인 한 유저만 등록 가능 v-show로 -->
    <div class="d-flex p-2 m-2 border rounded bg-light">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3">
             <div class="d-flex mb-1">
                  <div class="me-3" style="font-weight: bold;">닉네임</div>
             </div>
            <form @submit.prevent="">
                <div class="w-100 row pe-5">
                    <div class="me-3" style="font-weight: bold;">제목 : </div>
                    <input class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="문의 제목을 입력해주세요." v-model="qna.qtitle">
                    <div class="me-3" style="font-weight: bold;">내용 : </div>
                    <textarea class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="문의 내용을 입력해주세요." v-model="qna.qcontent"></textarea>
                </div>
                <div class=" text-end mt-3 pe-5">
                    <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="qnaInsert">등록</button>
                    <!-- <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;">닫기</button> -->
                </div>
            </form>
        </div>
    </div>

    <!-- 로그인 페이지 링크 -->
    <!-- 로그인 안했을 경우 v-if-->
    <div class="d-flex p-2 m-2 border rounded bg-light" style="color: gray;">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3" style="align-items: center;">

            <h6 class="m-1"><RouterLink to="/Member/LoginView">로그인</RouterLink> 하시고 댓글을 남겨보세요.</h6>
        </div>
    </div>    
    
    <!-- 댓글 보여주기-->
    <div v-for="(qna, index) in qnaArray" :key="index">
        <div class="d-flex p-1" v-if="!isQnaArray[index]">
            <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
            <div class="flex-grow-1 row my-3">
                <div class="d-flex mb-1">
                    <div class="me-3" style="font-weight: bold;">닉네임</div>
                    <div style="color: grey; font-size: small">년-월-일 시:분</div>
                </div>
                <div style="color: grey; font-weight: bold;">
                    {{ qna.qtitle }}
                </div>
                <div style="color: grey;">
                    {{ qna.qcontent }}
                </div>
                
                <div class="flex-grow-1 row justify-content-start">
                    <!-- 에디터한테만 보여야 하는 버튼 -->
                    <button class="border-0 bg-white text-start me-5 pe-5" style="font-size: small; color: grey; font-weight: bold;" v-if="qnaArray[index].qreply===null || qnaArray[index].qreply===''" @click="qreplyResist(index)">
                        <!-- <img src="/images/photos/ic_talk.png"> -->
                        <img src="/images/photos/ic_comment.png">
                        답글달기
                    </button>
                </div>
                <div class="flex-grow-1 row justify-content-end">
                    <!-- 작성자에게만 보여야 하는 버튼 -->
                    <div class="text-end">
                        <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold; " @click="qnaUpdate(index)">수정</button>
                        <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="qnaDelete(index)">삭제</button>
                    </div>
                </div>
            </div>
        </div>
    

    <!-- 댓글 수정하기 -->
    <div class="d-flex p-2 m-2 border rounded" style="background-color: #FDFFAB;" v-if="isQnaArray[index]">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3">
             <div class="d-flex mb-1">
                  <div class="me-3" style="font-weight: bold;">닉네임</div>
             </div>
            <form @submit.prevent="quaFormSubmit">
                <div class="w-100 row pe-5">
                    <div class="me-3" style="font-weight: bold;">제목 : </div>
                    <input class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="수정할 문의 제목을 입력해주세요." v-model="qna.qtitle">
                    <div class="me-3" style="font-weight: bold;">내용 : </div>
                    <textarea class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="수정할 문의 내용을 입력해주세요." v-model="qna.qcontent"></textarea>
                </div>
                <div class=" text-end mt-3 pe-5">
                    <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="qnaUpdate(index)">등록</button>
                    <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="qnaClose(index)">닫기</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 로그인 한 유저만 등록 가능 v-show로 -->
    <!-- 대댓글 등록하기 -->
    <div class="d-flex p-2 ms-5 me-2 border rounded" style="background-color: #D9EDBF;" v-if="isWriteArray[index]">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3">
             <div class="d-flex mb-1">
                  <div class="me-3" style="font-weight: bold;">닉네임</div>
             </div>
            <form @submit.prevent="handleForm">
                <div class="w-100 row pe-5">
                    <textarea class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="문의에 대한 답글을 입력해주세요." v-model="qna.qreply"></textarea>
                </div>
                <div class="text-end mt-3 pe-5">
                    <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="qreplyInsert(index)">등록</button>
                    <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;"  @click="qreplyClose(index)">닫기</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 대댓글 보여주기-->
 
        <div class="d-flex ms-5 me-2 p-1 border rounded" style="background-color: #D9EDBF;" v-if="qnaArray[index].qreply && !isWriteArray[index]">
            <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
            <div class="flex-grow-1 row my-3">
                <div class="d-flex mb-1">
                    <div class="me-3" style="font-weight: bold;">닉네임</div>
                    <div style="color: grey; font-size: small">년-월-일 시:분</div>
                </div>
                <div style="color: grey;">
                    {{ qna.qreply }}
                </div>
                
                <div class="flex-grow-1 justify-content-end">
                    <!-- 에디터에게만 보여야 하는 버튼 -->
                    <div class="text-end  mt-3 pe-5">
                        <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="qreplyUpdate(index)">수정</button>
                        <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="qreplyDelete(index)">삭제</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
</template>

<script setup>
import { ref } from 'vue';

const isQna = ref(false);
const isQnaArray = ref([
    {
        isQna: isQna.value
    }
]);
const isWrite = ref(false);
const isWriteArray = ref([]);

const qna = ref({});
const qnaArray = ref([
    {
    qtitle:'문의제목1',
    qcontent:'문의내용111입니다.',
    qreply: '댓글 1111입니다'
    },
    {
    qtitle:'문의제목2',
    qcontent:'문의내용2222입니다.',
    qreply: '댓글 22222입니다'
    },
    {
    qtitle:'문의제목3333333',
    qcontent:'문의내용33333입니다.',
    qreply: ''
    },
    {
    qtitle:'문의제목44444',
    qcontent:'문의내용444444입니다.',
    qreply: ''
    },
])

function qnaInsert() {
    qnaArray.value.push({qtitle: qna.value.qtitle, qcontent: qna.value.qcontent});
   
}

function qnaUpdate(index) {
    console.log("큐앤에이수정시작")
    isQnaArray.value[index] = !isQnaArray.value[index];
}

function qnaClose(index) {
    isQnaArray.value[index] = !isQnaArray.value[index];
}

function qnaDelete(index) {
    qnaArray.value.splice(index, index);
    console.log("큐앤에이 삭제 함수 클릭")
}

function qreplyResist(index) {
    isWriteArray.value[index] = !isWriteArray.value[index];
}

function qreplyInsert(index) {
    isWriteArray.value[index] = !isWriteArray.value[index];
    qnaArray.value.push({qtitle: qna.value.qreply});
    console.log(isWrite.value);
}

function qreplyClose(index) {
    isWriteArray.value[index] = !isWriteArray.value[index];
}

function qreplyUpdate(index) {
    isWriteArray.value[index] = !isWriteArray.value[index];
}

function qreplyDelete(index) {
    // splice 메서드는 (삭제 시작 인덱스, 삭제할 요소의 개수) 형태로 인자를 받습니다.
    qnaArray.value[index].qreply = '';
}

</script>

<style scoped>
</style>