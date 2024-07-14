<template>
    <h4 class="fw-bold m-5">Q&A</h4>

    <!-- 댓글 등록 -->
    <!-- 로그인 한 유저만 등록 가능 v-show로 -->
    <div class="d-flex p-2 m-2 border rounded bg-light" v-if="store.state.userId!=''">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;" v-if="!store.state.mimgoname">
        <img class="m-3 rounded-circle" :src="`${axios.defaults.baseURL}/member/mattach/${store.state.userId}`" style="width: 50px; height: 50px;" v-if="store.state.mimgoname">
        <div class="flex-grow-1 row my-3">
             <div class="d-flex mb-1">
                  <div class="me-3" style="font-weight: bold;">{{$store.state.mnickname}}</div>
             </div>
                <div class="w-100 row pe-5">
                    <div class="me-3" style="font-weight: bold;">제목 : </div>
                    <input class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="문의 제목을 입력해주세요." v-model="qnaInit.qtitle">
                    <div class="me-3" style="font-weight: bold;">내용 : </div>
                    <textarea class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="문의 내용을 입력해주세요." v-model="qnaInit.qcontent"></textarea>
                </div>
                <div class=" text-end mt-3 pe-5">
                    <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="qnaInsert">등록</button>
                    <!-- <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;">닫기</button> -->
                </div>

        </div>
    </div>

    <!-- 로그인 페이지 링크 -->
    <!-- 로그인 안했을 경우 v-if-->
    <div class="d-flex p-2 m-2 border rounded bg-light" style="color: gray;" v-if="store.state.userId==''">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3" style="align-items: center;">

            <h6 class="m-1"><RouterLink to="/Member/LoginView">로그인</RouterLink> 하시고 댓글을 남겨보세요.</h6>
        </div>
    </div>    
    

    <!------------------------------------------------ 문의 보기 / 수정 ------------------------------------------------>

    <!-- 댓글 보여주기-->
    <div v-if="isQna">
        <div v-for="(qna, index) in qnaArray" :key="index">
            <div class="d-flex p-1" v-if="!isQnaArray[index]">
                <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;" v-if="!qna.mimgoname">
                <img class="m-3 rounded-circle" :src="`${axios.defaults.baseURL}/member/mattach/${qna.mid}`" style="width: 50px; height: 50px;" v-if="qna.mimgoname">
                <div class="flex-grow-1 row my-3">
                    <div class="d-flex mb-1">
                        <div class="me-3" style="font-weight: bold;">{{ qna.mnickname}}</div>
                        <div style="color: grey; font-size: small">{{ qna.qdate }}</div>
                    </div>
                    <div style="color: grey; font-weight: bold;">
                        {{ qna.qtitle }}
                    </div>
                    <div style="color: grey;">
                        {{ qna.qcontent }}
                    </div>
                    
                    <div class="flex-grow-1 row justify-content-start">
                        <!-- 에디터한테만 보여야 하는 버튼 -->
                        <button class="border-0 bg-white text-start me-5 pe-5" style="font-size: small; color: grey; font-weight: bold;" v-if="(qna.qreply===null || qna.qreply==='') && isEditor" @click="qreplyResist(index)">
                            <!-- <img src="/images/photos/ic_talk.png"> -->
                            <img src="/images/photos/ic_comment.png">
                            답글달기
                        </button>
                    </div>
                    <div class="flex-grow-1 row justify-content-end">
                        <!-- 작성자에게만 보여야 하는 버튼 -->
                        <div class="text-end" v-if="isWriter[index]">
                            <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold; " @click="qnaUpdateOpen(index)">수정</button>
                            <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="qnaDelete(index)">삭제</button>
                        </div>
                    </div>
                </div>
            </div>
        
    
        <!-- 댓글 수정하기 -->
        <div class="d-flex p-2 m-2 border rounded" style="background-color: #FCF6DE;" v-if="isQnaArray[index]">
            <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;" v-if="!qna.mimgoname">
            <img class="m-3 rounded-circle" :src="`${axios.defaults.baseURL}/member/mattach/${qna.mid}`" style="width: 50px; height: 50px;" v-if="qna.mimgoname">
            <div class="flex-grow-1 row my-3">
                 <div class="d-flex mb-1">
                      <div class="me-3" style="font-weight: bold;">{{qna.nickname}}</div>
                 </div>
                    <div class="w-100 row pe-5">
                        <div class="me-3" style="font-weight: bold;">제목 : </div>
                        <input class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="수정할 문의 제목을 입력해주세요." v-model="qna.qtitle">
                        <div class="me-3" style="font-weight: bold;">내용 : </div>
                        <textarea class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="수정할 문의 내용을 입력해주세요." v-model="qna.qcontent"></textarea>
                    </div>
                    <div class=" text-end mt-3 pe-5" v-if="isWriter[index]">
                        <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="qnaUpdate(index)">등록</button>
                        <button type="button" class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="qnaClose(index)">닫기</button>
                    </div>
            </div>
        </div>
        
        <!-- 로그인 한 유저만 등록 가능 v-show로 -->
        <!-- 대댓글 등록하기 -->
        <div class="d-flex p-2 ms-5 me-2 border rounded" style="background-color: #D9EDBF;" v-if="isWriteArray[index]">
            <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;"  v-if="!editorImgoname">
            <img class="m-3 rounded-circle" :src="`${axios.defaults.baseURL}/member/mattach/${editorMid}`" style="width: 50px; height: 50px;" v-if="editorImgoname">
            <div class="flex-grow-1 row my-3">
                 <div class="d-flex mb-1">
                      <div class="me-3" style="font-weight: bold;">{{nickname}} <span style="font-size:small;">(editor)</span></div>
                 </div>
       
                    <div class="w-100 row pe-5">
                        <textarea class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="문의에 대한 답글을 입력해주세요." v-model="qna.qreply"></textarea>
                    </div>
                    <div class="text-end mt-3 pe-5" v-if="isEditor">
                        <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="qreplyInsert(index)">등록</button>
                        <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;"  @click="qreplyClose(index)">닫기</button>
                    </div>
    
            </div>
        </div>
    
        <!-- 대댓글 보여주기-->
     
            <div class="d-flex ms-5 me-2 p-1 border rounded" style="background-color: #D9EDBF;" v-if="qnaArray[index].qreply && !isWriteArray[index]">
                <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;" v-if="!editorImgoname">
                <img class="m-3 rounded-circle" :src="`${axios.defaults.baseURL}/member/mattach/${editorMid}`" style="width: 50px; height: 50px;" v-if="editorImgoname">
                <div class="flex-grow-1 row my-3">
                    <div class="d-flex mb-1">
                        <div class="me-3" style="font-weight: bold;">{{nickname}} <span style="font-size:small;">(editor)</span></div>
                        <div style="color: grey; font-size: small">{{ qna.qreplydate }}</div>
                    </div>
                    <div style="color: grey;">
                        {{ qna.qreply }}
                    </div>
                    
                    <div class="flex-grow-1 justify-content-end">
                        <!-- 에디터에게만 보여야 하는 버튼 -->
                        <div class="text-end  mt-3 pe-5" v-if="isEditor">
                            <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="qreplyUpdate(index)">수정</button>
                            <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="qreplyDelete(index)">삭제</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <!--페이지네이션-->
        <div class="text-center" v-if="page.pager.totalRows!==0">
            <button class="initial btn btn-sm" @click="changePageNo(1)"> 처음 </button>
            <button class="prev btn btn-sm" v-if="page.pager.groupNo>1" @click="changePageNo(page.pager.startPageNo-1)">이전</button>
            <button class="btn btn-sm" :class="pageNo===page.pager.pageNo? 'btn-active': ''" v-for="pageNo in page.pager.pageArray" :key="pageNo" @click="changePageNo(pageNo)">{{pageNo}}</button>
            <button class="btn btn-sm" v-if="page.pager.groupNo<page.pager.totalGroupNo" @click="changePageNo(page.pager.endPageNo+1)">다음</button>
            <button class="last btn btn-sm" @click="changePageNo(page.pager.totalPageNo)">마지막</button>
        </div>
    </div>

    <div class="d-flex p-5 m-5" style="justify-content: center; color: grey; font-weight: bold;" v-if="!isQna">등록된 문의가 없습니다. </div>

</template>

<script setup>
import { ref } from 'vue';
import classAPI from '@/apis/classAPI';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import axios from 'axios';

//클래스 번호 가져오기
const route = useRoute();
const cno = route.query.cno;

//v-if 변수
const isQna = ref(true);
const isQnaArray = ref([]);
const isWrite = ref(false);
const isWriteArray = ref([]);
const isWriter = ref([]);
const isEditor = ref();

//댓글
const qnaInit  = ref({});
const qna = ref({});
const qnaArray = ref([]);

const store = useStore();

//페이지네이션 변수
//const pageNo = ref(route.query.pageNo||1);
const pageNo = ref(1);
const page=ref({
    pager:{}
})



// function getUserRole() {
//     console.log("editor: ", store.state.userId);
//     console.log("editor: ", JSON.parse(JSON.stringify(store.state)));
//     return store.state.mrole;
// }
//getUserRole();

//취소 버튼 구현을 위한 qna 초기값 저장 배열 선언
//const originalQnaArray = [{qtitle:'', qcontent:'', qreply:''}];

//------- qna data insert function ---------------------------------------------------------------------------------------------- 


async function qnaInsert() {
    try{
        qnaInit.value = {qtitle: qnaInit.value.qtitle, qcontent: qnaInit.value.qcontent, cno: cno};
        console.log("qnaInit.value.qtitle", qnaInit.value.qtitle)
        console.log("qnaInit.value.qcontent", qnaInit.value.qcontent)
        if(qnaInit.value.qtitle == null || qnaInit.value.qtitle == '' || qnaInit.value.qcontent == null || qnaInit.value.qcontent == '') {
            alert("제목과 내용을 모두 입력해주세요")
        } else {
            const response = await classAPI.qnaRegister(JSON.parse(JSON.stringify(qnaInit.value)));
            isQna.value = true
            getQna(cno);
            qnaInit.value.qtitle = '';
            qnaInit.value.qcontent = '';
            console.log("작성자배열값", isWriter.value)
        }
    } catch(error) {
        console.log(error);
    }
}

//------- qna data read function ---------------------------------------------------------------------------------------------- 

//댓글 등록 시 프로필 이미지를 바인딩 하기 위한 변수

let editorMid = ref();
const editorImgoname = ref();
let nickname = ref();

//날짜 형식 함수
function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

async function getQna(cno, pageNo) {
    console.log("게시글번호: ", cno)
  
    try{
        const response2 = await classAPI.qnaRead(cno, pageNo);
        qnaArray.value = response2.data.qnaList;
        page.value.pager = response2.data.pager;
        if(qnaArray.value.length===0) {
            isQna.value = false
        } else {
            //qnaArray 안에 있는 qna들을 반복문을 통해 하나씩 꺼내기
            for(let i=0; i<qnaArray.value.length; i++){
                //꺼낸 qna 날짜 값을 dateFormat함수를 호출 하여 2024-06-28와 같은 형태로 바꾸기
                //이 때 new Date(qnaArray.value[i].qdate)를 해주는 이유는 dateFormat 함수가 제대로 작동하기 위해서는 매개변수가 Date타입이어야 하기 때문
                //그 전의 무슨 타입이 었는지 궁금하다면 console.log(typeof qnaArray.value[i].qdate); 
                //new Date()이후에는 Date타입
                qnaArray.value[i].qdate = dateFormat(new Date(qnaArray.value[i].qdate));
                qnaArray.value[i].qreplydate = dateFormat(new Date(qnaArray.value[i].qreplydate));
                // qna 정보 수정 취소 버튼 클릭시 초기값으로 돌려주기 위한 설정
                qnaArray.value[i].originalQtitle = qnaArray.value[i].qtitle;
                qnaArray.value[i].originalQcontent = qnaArray.value[i].qcontent;
                qnaArray.value[i].originalQreply = qnaArray.value[i].qreply;

                isWriter.value[i] = false; 
                if(store.state.userId==qnaArray.value[i].mid) {
                    isWriter.value[i] = true; 
                }
            } 
                //대댓글 에디터 프로필 이미지 가져오는 로직
                const response4 = await classAPI.classRead(cno)
                editorMid.value = response4.data.classes.mid;
                editorImgoname.value = response4.data.classes.mimgoname;
                nickname.value = response4.data.classes.mnickname;

                //에디터에게만 대댓글 등록, 수정 버튼 보이게 하는 로직
                if(store.state.userId==editorMid.value) {
                    isEditor.value = true;
                } else {
                    isEditor.value = false;
                }  
        }
    } catch(error) {
        console.log(error);
    }
   
    /*
    try{
        // const response2 = await classAPI.classRead(cno);
        // console.log("클래스등록아이디: ", response2.data.classes.mid);
        if(store.state.userId==response2.data.classes.mid) {
            console.log("에디터아이디확인용",editorMid.value )
            for(let i = 0; i<qnaArray.value.length; i++) {
                isEditor.value[i] = true;
            }
        }
        console.log("isEditor: ", isEditor.value);
        //console.log("큐앤에이어레이 길이:" , qnaArray.value.length);
        //console.log("큐앤에이 목록:", JSON.parse(JSON.stringify(qnaArray.value)));
    } catch(error) {
        console.log(error);
    }
    */
    console.log("로그인여부", store.state.userId)
    console.log("작성자배열값", isWriter.value)
    console.log("qna array",qnaArray.value )
}

getQna(cno, pageNo.value);

//페이지를 변경했을 때 해당 페이지의 댓글을 가져오는 함수
function changePageNo(pageNo){
    getQna(cno, pageNo);
}

//------- qna data update function ---------------------------------------------------------------------------------------------- 

function qnaUpdateOpen(index) {
    isQnaArray.value[index] = !isQnaArray.value[index];
    console.log("큐앤에이 수정창 열기")
}

function qnaUpdate(index) {
    console.log("큐앤에이 수정 시작")
    qna.value.qtitle = qnaArray.value[index].qtitle;
    qna.value.qcontent = qnaArray.value[index].qcontent;
    qna.value.qno = qnaArray.value[index].qno;
    //qna 정보 수정 취소 버튼 클릭시 초기값으로 돌려주기 위한 설정
    qnaArray.value[index].originalQtitle = qna.value.qtitle;
    qnaArray.value[index].originalQcontent = qna.value.qcontent;
    //console.log("큐엔에이 수정 정보", JSON.parse(JSON.stringify(qna.value)));
    isQnaArray.value[index] = !isQnaArray.value[index];
    return classAPI.qnaUpdate(JSON.parse(JSON.stringify(qna.value)));
}

function qnaClose(index) {
    //qna 정보 수정 취소 버튼 클릭시 초기값으로 돌려주기 위한 설정
    qnaArray.value[index].qtitle = qnaArray.value[index].originalQtitle;
    qnaArray.value[index].qcontent = qnaArray.value[index].originalQcontent;
    isQnaArray.value[index] = !isQnaArray.value[index];
    
}

//------- qna data delete function ---------------------------------------------------------------------------------------------- 

async function qnaDelete(index) {
    try{
        let qno = qnaArray.value[index].qno;
        qnaArray.value.splice(index, 1);
        const response = await classAPI.qnaDelete(qno);
        getQna(cno);
    } catch(error) {
        console.log(error);
    }
}

//------- qna qreply data insert function ---------------------------------------------------------------------------------------------- 
function qreplyResist(index) {
    isWriteArray.value[index] = !isWriteArray.value[index];
}


function qreplyInsert(index) {
    qna.value.qreply = qnaArray.value[index].qreply;
    qna.value.qno = qnaArray.value[index].qno;
    qnaArray.value[index].originalQreply = qna.value.qreply
    isWriteArray.value[index] = !isWriteArray.value[index];
    return classAPI.qreplyUpdate(JSON.parse(JSON.stringify(qna.value)));
    //qnaArray.value.push({qtitle: qna.value.qreply});
    //console.log(isWrite.value);
}

function qreplyClose(index) {
    qnaArray.value[index].qreply = qnaArray.value[index].originalQreply;
    isWriteArray.value[index] = !isWriteArray.value[index];
}

//------- qna qreply data update function ---------------------------------------------------------------------------------------------- 

function qreplyUpdate(index) {
    qna.value.qreply = qnaArray.value[index].qreply;
    qna.value.qno = qnaArray.value[index].qno;
    isWriteArray.value[index] = !isWriteArray.value[index];
    return classAPI.qreplyUpdate(JSON.parse(JSON.stringify(qna.value)));
}

//------- qna qreply data delete function ---------------------------------------------------------------------------------------------- 

function qreplyDelete(index) {
    qnaArray.value[index].qreply = '';
    qna.value.qreply = null;
    qna.value.qno = qnaArray.value[index].qno;
    return classAPI.qreplyUpdate(JSON.parse(JSON.stringify(qna.value)));
}

</script>

<style scoped>
.btn:hover {
    background-color: #15a775;
    color: white;
    font-weight: bold;
}

.btn-active {
    background-color: #15a775;
    color: white;
    font-weight: bold;
}
</style>