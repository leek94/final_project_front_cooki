<template>
    <!-- 클래스 카드 -->
    <div class="d-flex" >
        <div class="qcards d-flex" >
            <div class="card qnaCard mt-3" style="padding:0 ">
                <div class="card-body text-center">
                    <li class="class-img-li ss">
                        <div class="router-div" :style="prop.style">
                            <div class="class-image">
                                <img :src="`${axios.defaults.baseURL}/class/thumbattach/${prop.objectProp.cno}/1`"> 
                            </div>
                            <div class="text-start" >
                                <div class="ctitle class-text text-start">
                                    <div class="ctitle" style="font-weight: bold; height: 60px;">{{ prop.objectProp.ctitle }}</div>
                                </div>
                                <div>
                                    <h6>모집강사 : {{ prop.objectProp.mname }}</h6>
                                </div>
                                <div>
                                    <h6>모집인원 : {{ prop.objectProp.nowPerson }}/{{ prop.objectProp.cpersoncount }}</h6>
                                    <!-- {{ prop.objectProp.nowPerson }} -->
                                </div>
                                <div class="info d-flex mb-3">
                                    <div class="class-date border-left-solid me-3">강의날짜 : {{ prop.objectProp.cdday }}</div>
                                    <div class="dday-box" :class="prop.class" v-if="checker()>0">D-{{ checker() }}</div>
                                </div>

                                <!-- 클래스 카드의 버튼들은 해당 클래스를 개설한 에디터롤의 유저에게만 보여짐 -->
                                <div v-if="store.state.mrole=='ROLE_EDITOR' && prop.objectProp.mid==store.state.userId">
                                    <button class="btn btn-sm w-100 mb-1"  @click.stop="participantList(index)">출석확인</button>
                                    <button class="btn btn-sm w-100 mb-1"  @click.stop="ReopenClass()">클래스 다시 열기</button>
                                    <button class="btn btn-sm w-100 mb-1" v-if="checker()>0" @click.stop="updateClass" >수정하기</button>
                                    <button class="btn btn-sm w-100" @click.stop="qna()">미답변 문의 <span style="color: red; font-weight: bold;">{{prop.objectProp.qreplyNullCount}}</span>개</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>
            </div>
        </div>
    </div>
    <!-- 클래스 카드 끝 -->
</template>

<script setup>
import router from '@/router';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const prop= defineProps([ "class","objectProp"])
// D-Day 구하는 함수
function checker(){
const today = new Date();
// 날짜 형태가 2024-06-20여야만 가능 아니면 형태를 변경해서 넣어줘야함

const cday = new Date(prop.objectProp.cdday);
cday.setDate(cday.getDate()-1);
const diff = cday - today; // 초 단위로 나와서 밑에서 변경해줘야함
const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
return diffDays
}

//클래스 다시 열기 => updateform으로 이동 
function ReopenClass(){
    router.push(`/class/classUpdateView?cno=${prop.objectProp.cno}&type=reopen`)
} 


// 출석 확인 하는 페이지로 이동
function participantList() {
    router.push(`/Class/ParticipantCheckView?cno=${prop.objectProp.cno}`)
}

function qna() {
    router.push(`/Class/ClassDetailView/QAndA?cno=${prop.objectProp.cno}`)
}
function updateClass(){
    router.push(`/Class/ClassUpdateView?cno=${prop.objectProp.cno}`)
}
console.log(prop.style)
console.log("mid", prop.objectProp.mid)
console.log("mid", store.state.userId)
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
    font-size: small;
    font-weight: bold;
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

.btn{
    background-color: #f3f3f3; 
    font-weight: bold;
}

.btn:hover{
    background-color: #15a775;
    color: white;
}
.ctitle{
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

}
</style>