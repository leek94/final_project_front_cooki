<template>
    <div class="myRecipe" style="width:80%;  margin:auto auto;padding:50px 0 0">
     <h3 class="fw-bold text-start mb-4" >Editor </h3>
     <h5 class="text-start mb-4" > - 모집 중인 클래스 </h5>
         <div class="d-flex" style="font-size:20px">
             <p>총 &ensp;</p>
             <p style="color:darkseagreen">{{countClass}}</p>
             <p>개</p>
         </div>
 
         <hr class="mt-0"/>
         <div class="d-flex" style="flex-wrap: wrap;" >
            <div class="qcard" v-for="(ccards,index) in cookClasses" :key="index">
                    <MypageClassCard :objectProp="ccards"/>
            </div>
        </div>

    </div>
 </template>
 
 <script setup>
 import MypageClassCard from '@/components/MypageClassCard.vue';
import { computed, ref } from 'vue';
 // 데이터 바인딩을 위한 더미 데이터
const cookClasses = ref([
    { 
        cno:1, 
        ctitle:"쿠키쿠킹클래스1",
        ccontent:"맛있는 쿠키를 만들어볼까요1 유후", 
        cpersoncount: 30, 
        cprice:48000, 
        mname: "손혜선", 
        cdday: "2024-06-21", 
        ctime:"14:00" 
    },
    { 
        cno:2, 
        ctitle:"쿠키쿠킹클래스2",
        ccontent:"맛있는 쿠키를 만들어볼까요2 유후", 
        cpersoncount: 30, 
        cprice:48000, 
        mname: "손혜선", 
        cdday: "2024-06-21", 
        ctime:"14:00" 
    },
    { 
        cno:3, 
        ctitle:"쿠키쿠킹클래스3",
        ccontent:"맛있는 쿠키를 만들어볼까요3 유후", 
        cpersoncount: 30, 
        cprice:48000, 
        mname: "손혜선", 
        cdday: "2024-06-21", 
        ctime:"14:00" 
    },
    { 
        cno:4, 
        ctitle:"쿠키쿠킹클래스4",
        ccontent:"맛있는 쿠키를 만들어볼까요4 유후", 
        cpersoncount: 30, 
        cprice:48000, 
        mname: "손혜선", 
        cdday: "2024-06-21", 
        ctime:"14:00" 
    },
    { 
        cno:5, 
        ctitle:"쿠키쿠킹클래스5",
        ccontent:"맛있는 쿠키를 만들어볼까요5 유후", 
        cpersoncount: 30, 
        cprice:48000, 
        mname: "손혜선", 
        cdday: "2024-06-21", 
        ctime:"14:00" 
    },
   
]);
const countClass=computed(()=> cookClasses.value.length)
 </script>
 
 <style scoped>
 </style>