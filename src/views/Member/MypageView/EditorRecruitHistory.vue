<template>
    <div class="myRecipe" style="width:80%;  margin:auto auto;padding:50px 0 0">
    <h3 class="fw-bold text-start mb-4" >Editor </h3>
    <h5 class="text-start mb-4" > - 모집 마감된 클래스 </h5>
        <div class="d-flex" style="font-size:20px">
            <p>총 &ensp;</p>
            <p style="color:darkseagreen"> {{ page.pager.totalRows }}</p>
            <p>개</p>
        </div>
        <hr class="mt-0"/>
        <div class="d-flex" style="flex-wrap: wrap;" v-if="page.pager.totalRows !==0">
            <div class="qcard" v-for="(ccards,index) in cookClasses" :key="index" @click="routerLinkto(index)">
                <MypageClassCard :objectProp="ccards"/>
            </div>
        </div>

        <div class="text-center mt-5"  v-if="page.pager.totalRows !==0">
                <button class="initial btn btn-sm" @click="changePageNo(1)"> 처음 </button>
                <button class="prev btn btn-sm" v-if="page.pager.groupNo>1" @click="changePageNo(page.pager.startPageNo-1)">이전</button>
                <button class="btn btn-sm" v-for="pageNo in page.pager.pageArray" :key="pageNo" @click="changePageNo(pageNo)">{{pageNo}}</button>
                <button  class="btn btn-sm" v-if="page.pager.groupNo<page.pager.totalGroupNo" @click="changePageNo(page.pager.endPageNo+1)">다음</button>
                <button class="last btn btn-sm" @click="changePageNo(page.pager.totalPageNo)">마지막</button>
        </div>
    </div>

    <div v-if="page.pager.totalRows===0" style="margin-top:100px">
                <div style="margin: 60px auto; text-align: center">
                    <h5>내가 개설한 클래스가 존재하지 않습니다.</h5>
                    <div style="text-align: center; margin-top: 30px;">
                        <RouterLink class="" to="/Class/ClassRegisterView" style="text-align: center; text-decoration: none;font-size: 17px">
                            <button class="backList btn btn-outline-success">클래스 개설</button>
                        </RouterLink>
                    </div>
                </div>
    </div>
 </template>
 
 <script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import memberAPI from '@/apis/memberAPI';
import classAPI from '@/apis/classAPI';
import MypageClassCard from '@/components/MypageClassCard.vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
 // 데이터 바인딩을 위한 더미 데이터
const cookClasses = ref([]);

const countClass=computed(()=> cookClasses.value.length)
 
const page=ref({
    pager:{}
})
const pageNo = ref(route.query.pageNo||1);

//dateFormating (2024-06-28)
function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

const store = useStore();

//문의 처리를 위한 변수
const classQnaArray = ref([]);

async function editorRecruitHistoryRead() {
    let mid = store.state.userId;
    try{
        //아이디로 내가 개설한 클래스 리스트 불러오기
        const response = await memberAPI.editorRecruitHistory(mid,pageNo.value);
        cookClasses.value = response.data.myClassList;
        page.value.pager = response.data.pager;
        for(let i=0; i<cookClasses.value.length; i++) {
            cookClasses.value[i].cdday = dateFormat(new Date(cookClasses.value[i].cdday));
            //개설한 클래스 번호로 신청 인원수 불러오기
            const cno = cookClasses.value[i].cno;
            const response2 = await classAPI.classNowPerson(cno);
            cookClasses.value[i].nowPerson = response2.data.nowPerson;
            console.log("신청한 사람수", cookClasses.value[i].nowPerson)
            //클래스 미답변 문의댓글 갯수를 카운트
            cookClasses.value[i].qreplyNullCount = 0;
            const response3 = await classAPI.qnaRead(cno);
            classQnaArray.value = response3.data.qnaList;
            for(let j=0; j<classQnaArray.value.length; j++) {
                if(classQnaArray.value[j].qreply==null) {
                    cookClasses.value[i].qreplyNullCount += 1;
                }
            }
        }
    } catch(error) {
        console.log(error);
    }
    console.log("내가 모집하고있는 클래스 리스트", JSON.parse(JSON.stringify(cookClasses.value)));
}

editorRecruitHistoryRead();

//카드 클릭 시 디테일 페이지로 가는 함수
function routerLinkto(index){
    console.log("인덱스", index)
    console.log("클래스번호" , cookClasses.value[index].cno)
    router.push(`/Class/ClassDetailView?cno=${cookClasses.value[index].cno}`);
}

function changePageNo(argpageNo){
    router.push(`/Member/MypageView/EditorRecruitHistory?pageNo=${argpageNo}`);
}


watch(route,(newRoute,oldRoute) => {
    if(newRoute.query.pageNo){ 
        pageNo.value=newRoute.query.pageNo;
        editorRecruitHistoryRead();
    } else {   
        //pageNo가 존재하지 않으면 list를 다시 호출하기 위한 초기값을 설정해주는 것
        pageNo.value=1;
    }
})
 </script>
 
 <style scoped>
 /* 클래스 카드 시작 */
.class-img-li{
    list-style: none;
    width:100%;
}

.class-image{
    overflow: hidden;
    position: relative;
    width: 100%;
    padding-top: 100%; /* 자식 요소의 세로 길이를 부모 요소의 너비에 맞춤 */
    border-radius: 20px;
}

.class-image > img{
    position: absolute;
    width: 100%;
    height: auto;
    top: 50%;
    left: 50%;
    object-fit: cover;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease-out;
}

.class-name{
    color: #c4c4c4;
    font-size: 0.75rem;
}

.class-text{
    padding: 1.25rem 0 0.5rem;
}

.dday-box{
    color:red;
}

.class-label{
    display: inline-block;
    margin-bottom: 0.625rem;
    padding: 0.4rem 0.8rem;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 5px;
    background-color: #0bab6d;
}
 .qnaCard{
     border:solid 1px #e5e5e5;
     border-radius: 0.7rem;
     box-shadow: 0 2px 20px 0 rgba(0, 0, 3, 0.2);
     margin-top:3.5rem;
     margin:0 1rem;
     width: 245px;
}

.btn:hover {
    background-color: #15a775;
    color: white;
    font-weight: bold;
}

.btn:active {
    background-color: #15a775;
    color: white;
    font-weight: bold;
}

.backList{
    font-size: 1rem;
    font-weight: bold;
    padding:1.5rem 2.938rem 1.438rem 3rem; 
    border-radius: 38px;

}
 </style>