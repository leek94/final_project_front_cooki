<template>
    <div class="myRecipe" style="width:80%;  margin:auto auto;padding:50px 0 0">
     <h3 class="fw-bold text-start mb-4" >마이 클래스 </h3>
     <h5 class="text-start mb-4" > - 내가 수강한 클래스 </h5>
         <div class="d-flex" style="font-size:20px">
             <p>총 &ensp;</p>
             <p style="color:darkseagreen"> {{countClass}}</p>
             <p>개</p>
         </div>
 
         <hr class="mt-0"/>
         <div class="d-flex" style="flex-wrap: wrap;" v-if="page.pager.totalRows !==0">
            <div class="qcard" v-for="(ccards,index) in cookClasses" :key="index" @click="routerLinkto(index)">
                    <MypageClassCard :objectProp="ccards" class="d-none"/>
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
                    <h5>검색어어가 존재하지 않습니다.</h5>
                </div>
    </div>
 </template>
 
 <script setup>
import memberAPI from '@/apis/memberAPI';
import classAPI from '@/apis/classAPI';
import MypageClassCard from '@/components/MypageClassCard.vue';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
 // 데이터 바인딩을 위한 더미 데이터
const cookClasses = ref([
    
]);

//dateFormating (2024-06-28)
function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

const countClass=computed(()=> cookClasses.value.length)

const store = useStore();
const route = useRoute();
const page=ref({
    pager:{}
})
const pageNo = ref(route.query.pageNo||1);

async function myClassHistoryRead() {
    let mid = store.state.userId;
    try{
        //아이디로 신청한 클래스 리스트 받아오기
        const response = await memberAPI.myClassHistory(mid,pageNo.value);
        cookClasses.value = response.data.myClassList;
        page.value.pager = response.data.pager
        for(let i=0; i<cookClasses.value.length; i++) {
            cookClasses.value[i].cdday = dateFormat(new Date(cookClasses.value[i].cdday));
            //신청한 클래스 번호로 신청인원수 불러오기
            const cno = cookClasses.value[i].cno;
            const response2 = await classAPI.classNowPerson(cno);
            cookClasses.value[i].nowPerson = response2.data.nowPerson;
            console.log("신청한 사람수", cookClasses.value[i].nowPerson)
        }

    } catch(error) {
        console.log(error);
    }
    console.log("내가 신청한 클래스 리스트", JSON.parse(JSON.stringify(cookClasses.value)));
}

myClassHistoryRead();

//카드 클릭 시 디테일 페이지로 가는 함수
const router= useRouter();
function routerLinkto(index){
    console.log("인덱스", index)
    console.log("클래스번호" , cookClasses.value[index].cno)
    router.push(`/Class/ClassDetailView?cno=${cookClasses.value[index].cno}`);
}

function changePageNo(argpageNo){
    router.push(`/Member/MypageView/MyClassHistory?pageNo=${argpageNo}`);
}

watch(route,(newRoute,oldRoute) => {
    if(newRoute.query.pageNo){ 
        pageNo.value=newRoute.query.pageNo;
        myClassHistoryRead();
    } else {   
        //pageNo가 존재하지 않으면 list를 다시 호출하기 위한 초기값을 설정해주는 것
        pageNo.value=1;
    }
})
 </script>
 
 <style scoped>
 </style>