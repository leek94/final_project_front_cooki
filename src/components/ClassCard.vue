<template>
    <!-- 클래스 카드 -->
    <li class="class-img-li ss">
        <div class="router-div" >
            <div class="class-image">
                <img :src="`${axios.defaults.baseURL}/class/thumbattach/${prop.objectProp.cno}/1`">
            </div>
            <div class="text-start" >
                <div class=" class-text text-start">
                    <h4 class="classti" style="height:60px;">{{ prop.objectProp.ctitle }}</h4>
                </div>
                <div>
                    <h6>모집강사 : {{ prop.objectProp.mname }}</h6>
                </div>
                <div>
                    <h6>모집인원 : {{prop.objectProp.cnowPerson}}/{{ prop.objectProp.cpersoncount }}</h6>
                </div>
                <div class="info d-flex">
                    <div class="class-date border-left-solid me-3">강의날짜 : {{ prop.objectProp.cdday }}</div>
                    <div class="dday-box">D-{{ checker() }}</div>
                </div>
                <div class="d-flex justify-content-end mt-3">
                    <div class="me-2"><img src="/images/photos/ic_talk.png" width="25px">: {{ prop.objectProp.reviewCount }}</div>
                    <div class="me-2"><img src="/images/photos/ic_star_pink.png" width="25px" />: {{ prop.objectProp.crratio }}</div>
                    <div><img src="/images/photos/ic_eyes.jpg" width="25px" />: {{ prop.objectProp.chitcount }}</div>
                </div>
            </div>
        </div>
    </li>
    <!-- 클래스 카드 끝 -->
</template>
<script setup>

import axios from 'axios';

const prop = defineProps(["objectProp"]);


// D-Day 구하는 함수
function checker(){
const today = new Date();
// 날짜 형태가 2024-06-20여야만 가능 아니면 형태를 변경해서 넣어줘야함

const cday = new Date(prop.objectProp.cdday);
cday.setDate(cday.getDate() - 1 );
const diff = cday - today; // 초 단위로 나와서 밑에서 변경해줘야함
const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
return diffDays
}

</script>

<style scoped>
/* 클래스 카드 시작 */
.class-img-li{
    width: calc(25% - 2rem);
    margin: 0 1rem 4rem;
    list-style: none;
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
/* 클래스 카드 끝 */

.class-image:hover img {
    transform: translate(-50%, -50%) scale(1.1);
    transition: all 0.2s linear;
}
.classti{
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

}

</style>