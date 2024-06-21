<template>
    <li class="img-li ss">
        <div class="router-div">
            <div class="image">
                <i class="icon-heart fa-solid fa-heart like-heart" :class="{active: cookRecipes.isActive}" @click="toggleLike(index)"></i>
                <img src="/images/photos/140114575djmw.jpg">
            </div>

            <div>
            <div class="info d-flex mt-3 ">
                <div class="name me-2">{{ cookRecipes.mname }}</div>
                <div class="date border-left-solid">{{cookRecipes.bdate}}</div>
            </div>
            <div class="text text-start">
                <h4>{{ cookRecipes.btitle }}</h4>
                <div class="d-flex justify-content-end">
                    <div class="me-2"><i class="fa-solid fa-heart like-heart" style="color:red;">&ensp;</i>{{ cookRecipes.blike }}</div>
                    <div><i class="fa-solid fa-eye">&ensp;</i>{{ cookRecipes.bhitcount }}</div>
                </div>
            </div>
        </div>
        </div>
    </li>
</template>

<script setup>

import { ref } from 'vue';

// 데이터 바인딩을 위한 더미 데이터
const cookRecipes = ref(
    { bno:1, btitle:"이거 맛있겠죠?", blike: 30, bhitcount:129, mname: "Sonhehesun", bdate: "2024-06-21 14:00", isActive: false },
    
);

// 좋아요 버튼 자바스크립트 시작

const toggleLike = () => {
    cookRecipes.value.isActive = !cookRecipes.value.isActive;

};
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
ul ::marker{
    content: none;
}
ul{
    padding: 0;
}
.img-li{
    width: calc(25% - 2rem);
    list-style-type: none;
    margin: 0 1rem 4rem;

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
    padding: 1.25rem 0 2rem;
}
/* 레시피 카드 끝 */

.image:hover img{
    transform: translate(-50%, -50%) scale(1.1);
    transition: all 0.2s linear;
}
</style>