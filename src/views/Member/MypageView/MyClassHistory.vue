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
         <div class="d-flex" style="flex-wrap: wrap;" >
            <div class="qcard" v-for="(ccards,index) in cookClasses" :key="index" @click="routerLinkto(index)">
                    <MypageClassCard :objectProp="ccards" class="d-none"/>
            </div>
        </div>

    </div>
 </template>
 
 <script setup>
import memberAPI from '@/apis/memberAPI';
import classAPI from '@/apis/classAPI';
import MypageClassCard from '@/components/MypageClassCard.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
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


async function myClassHistoryRead() {
    let mid = store.state.userId;
    console.log("내아이디: ", mid)
    try{
        //아이디로 신청한 클래스 리스트 받아오기
        const response = await memberAPI.myClassHistory(mid);
        cookClasses.value = response.data.myClassList;
        console.log("cdday", dateFormat(new Date(cookClasses.value[0].cdday)))
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
 </script>
 
 <style scoped>
 </style>