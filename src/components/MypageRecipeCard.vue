<template>
    <div class="d-flex" >
    <div class="qcards d-flex" >
         <div class="card qnaCard mt-3" style="padding:0 ">
             <div class="card-body text-center">
                <li class="img-li ss" >
                    <div class="router-div">
                        <div class="image" style="width:210px;height:210px">
                            <i class="icon-heart fa-solid fa-heart like-heart" :class="{active: prop.objectProp.isActive}" @click="$emit('click')"></i>
                            <img src="/images/photos/140114575djmw.jpg">
                        </div>

                        <div>
                            <div class="info d-flex mt-3 ">
                                <div class="name me-2">{{ prop.objectProp.mname }}</div>
                                <div class="date border-left-solid">{{prop.objectProp.bdate}}</div>
                            </div>
                            <div class="text text-start">
                                <div style="font-size: 20px; font-weight: bold">{{prop.objectProp.btitle }}</div>
                                <div class="d-flex justify-content-end mt-2">
                                    <div class="me-2"><i class="fa-solid fa-heart like-heart" style="color:red;">&ensp;</i>{{ prop.objectProp.blike }}</div>
                                    <div><i class="fa-solid fa-eye">&ensp;</i>{{ prop.objectProp.bhitcount }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>

import { ref } from 'vue';

// 데이터 바인딩을 위한 더미 데이터
const prop = defineProps(["objectProp"]);
const emit = defineEmits(["click"]);

// 좋아요 버튼 자바스크립트 시작


// 좋아요 버튼 자바스크립트 끝

</script>

<style scoped>

/* 좋아요 시작 */
.active {
    color:red !important;
}

.icon-heart{
    position: absolute;
    top: 1.5rem ;
    right: 0;
    width: 2.25rem;
    height: 2.25rem;
    z-index: 12;
    color: #e5e5e5;
}
/* 좋아요 끝 */

/* 레시피 카드 */

.img-li{
    list-style-type: none;
    width:100%;

}
.router-div{
    width:calc(25%-2rem);
}
.image{
    overflow: hidden;
    position: relative;
    width: 100%;
    padding-top: 100%; /* 자식 요소의 세로 길이를 부모 요소의 너비에 맞춤 */
    border-radius: 20px;
}

.image > img{
    position: absolute;
    width: 100%;
    height: auto;
    top: 50%;
    left: 50%;
    object-fit: cover;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease-out;
}

.name{
    color: #c4c4c4;
    font-size: 0.75rem;
}

.date{
    color: #c4c4c4;
    font-size: 0.75rem;
    border-left: 1px solid black;
    border-color: #c4c4c4;
    padding-left: 0.5rem;
}

.text{
    padding: 1rem 0 0.5rem;
}
/* 레시피 카드 끝 */

 .qnaCard{
    border:solid 1px #e5e5e5;
    border-radius: 0.7rem;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 3, 0.2);
    margin-top:3.5rem;
    margin:0 1rem;
    width:245px;
 }

</style>