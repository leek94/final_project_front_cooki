<template>
    <li class="img-li ss">
        <div class="router-div">
            <div class="image">
                <i id="like" class="icon-heart fa-solid fa-heart like-heart" :class="{active: prop.objectProp.islike}" @click.stop="changeLike"></i>
                <img :src="`${axios.defaults.baseURL}/recipe/thumbattach/${prop.objectProp.rno}`">
            </div>

            <div>
            <div class="info d-flex mt-3 ">
                <div class="name me-2">{{ prop.objectProp.mnickname }}</div>
                <div class="date border-left-solid">{{ prop.objectProp.rdate}}</div>
            </div>
            <div class="text text-start">
                <h4 class="rtitle">{{  prop.objectProp.rtitle }}</h4>
                <div class="d-flex justify-content-end">
                    <div class="me-2"><img src="/images/photos/ic_talk.png" width="25px">: {{ prop.objectProp.reviewcount }}</div>
                    <div class="me-2"><i class="fa-solid fa-heart like-heart" style="color:red;">&ensp;</i>{{  prop.objectProp.likecount }}</div>
                    <div><img src="/images/photos/ic_eyes.jpg" width="25px" />: {{ prop.objectProp.rhitcount }}</div>
                </div>
            </div>
        </div>
        </div>
    </li>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import recipeAPI from '@/apis/recipeAPI';

const store = useStore();
const prop = defineProps(["objectProp"]);
const emit = defineEmits(["like"])


async function changeLike() {
    let data = {rno:prop.objectProp.rno,mid:store.state.userId};
    data = JSON.parse(JSON.stringify(data));
    if(prop.objectProp.islike){
        try{
            const response = await recipeAPI.recipeDislike(data);
            console.log("dislike success")
        }catch{
            console.log("dislike fail")
        }
    }else{
        try{
            const response = await recipeAPI.recipeLike(data);
            console.log("like success")
        }catch{
            console.log("like fail")
        }
    }
    emit('like',prop.objectProp.rno);
}
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
.rtitle{
    -webkit-box-orient: vertical;
    line-clamp: 2; /* 최대 3줄까지만 표시 */
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>