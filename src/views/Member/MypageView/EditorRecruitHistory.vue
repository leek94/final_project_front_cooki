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
            <div class="card qnaCard mt-3" style="padding:0;"  v-for="(classes, index) in cookClasses" :key="index" @click="routerLinkto(index)">
                <div class="card-body text-center">
                    <li class="class-img-li ss" >
                        <div class="router-div">
                            <div class="class-image">
                                <img :src="`${axios.defaults.baseURL}/class/thumbattach/${classes.cno}/1`">
                            </div>
                            <div class="text-start" >
                                <div class="class-text text-start">
                                    <h4>{{ classes.ctitle }}</h4>
                                </div>
                                <div>
                                    <h6>모집강사 : {{ classes.mname }}</h6>
                                </div>
                                <div>
                                    <h6>모집인원 : {{ classes.nowPerson }}/{{ classes.cpersoncount }}</h6>
                                </div>
                                <div class="info d-flex mb-3">
                                    <div class="class-date border-left-solid me-3">강의날짜 : {{ classes.cdday }}</div>
                                </div>
                                <div class="text-end">
                                    <button class=" btn btn-sm" style="background-color: #f3f3f3; font-weight: bold;" @click.stop="participantList(index)">출석 확인</button>
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
import { useStore } from 'vuex';
import memberAPI from '@/apis/memberAPI';
import classAPI from '@/apis/classAPI';
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();

 // 데이터 바인딩을 위한 더미 데이터
const cookClasses = ref([]);

const countClass=computed(()=> cookClasses.value.length)
 
// 출석 확인 하는 페이지로 이동
function participantList(index) {
    router.push(`/Class/ParticipantCheckView?cno=${cookClasses.value[index].cno}`)
}
//dateFormating (2024-06-28)
function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

const store = useStore();

async function editorRecruitHistoryRead() {
    let mid = store.state.userId;
    console.log("내아이디: ", mid)
    try{
        //아이디로 내가 개설한 클래스 리스트 불러오기
        const response = await memberAPI.editorRecruitHistory(mid);
        cookClasses.value = response.data.myClassList;
        for(let i=0; i<cookClasses.value.length; i++) {
            cookClasses.value[i].cdday = dateFormat(new Date(cookClasses.value[i].cdday));
            //개설한 클래스 번호로 신청 인원수 불러오기
            const cno = cookClasses.value[i].cno;
            const response2 = await classAPI.classNowPerson(cno);
            cookClasses.value[i].nowPerson = response2.data.nowPerson;
            console.log("신청한 사람수", cookClasses.value[i].nowPerson)
            
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