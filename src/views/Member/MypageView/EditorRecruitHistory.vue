<template>
    <div class="myRecipe" style="width:80%;  margin:auto auto;padding:50px 0 0">
     <h3 class="fw-bold text-start mb-4" >Editor </h3>
     <h5 class="text-start mb-4" > - 모집 마감된 클래스 </h5>
         <div class="d-flex" style="font-size:20px">
             <p>총 &ensp;</p>
             <p style="color:darkseagreen"> {{countClass}}</p>
             <p>개</p>
         </div>
 
         <hr class="mt-0"/>
         <div class="d-flex"  >
        <div class="qcards d-flex"  style="flex-wrap: wrap;">
            <div class="card qnaCard mt-3" style="padding:0;"  v-for="(classes, index) in cookClasses" :key="index">
                <div class="card-body text-center">
                    <li class="class-img-li ss" >
                        <div class="router-div">
                            <div class="class-image">
                                <img src="/images/photos/semi2.jpg">
                            </div>
                            <div class="text-start" >
                                <div class="class-text text-start">
                                    <h4>{{ classes.ctitle }}</h4>
                                </div>
                                <div>
                                    <h6>모집강사 : {{ classes.mname }}</h6>
                                </div>
                                <div>
                                    <h6>모집인원 : 17/{{ classes.cpersoncount }}</h6>
                                </div>
                                <div class="info d-flex mb-3">
                                    <div class="class-date border-left-solid me-3">강의날짜 : {{ classes.cdday }}</div>
                                </div>
                                <div class="text-end">
                                    <RouterLink to="/Class/ParticipantCheckView"><button class=" btn btn-sm" style="background-color: #f3f3f3; font-weight: bold;">출석 확인</button></RouterLink> 
                                    <button class=" btn btn-success btn-sm ms-2">다시 열기</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>
            </div>
        </div>
    </div>

    </div>
 </template>
 
 <script setup>

import { computed, ref } from 'vue';


 // 데이터 바인딩을 위한 더미 데이터
const cookClasses = ref([
    { 
        cno:1, 
        ctitle:"쿠키쿠킹클래스1",
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

 </style>