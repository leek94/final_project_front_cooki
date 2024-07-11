<template>
    <div class="myRecipe" style="width:80%;  margin:auto auto;padding:50px 0 0">
    <h4 class="fw-bold text-start mb-4" >나의 레시피 </h4>
        <div class="d-flex" style="font-size:20px">
            <p>총 &ensp;</p>
            <p style="color:darkseagreen"> {{ page.pager.totalRows }}</p>
            <p>개</p>
        </div>
 
        <hr class="mt-0"/>
        <div class="d-flex" style="flex-wrap: wrap;" v-if="page.pager.totalRows !==0">
            <div class="qcard" v-for="(recards,index) in recipeCard" :key="index" @click="routerLinkto(index)">
                <MypageRecipeCard :objectProp="recards" @click="handleClick(index)"/>
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

    <div v-if="page.pager.totalRows ===0" style="margin-top:100px">
                <div style="margin: 60px auto; text-align: center">
                    <h5>검색어어가 존재하지 않습니다.</h5>
                </div>
    </div>
</template>
 
<script setup>
import memberAPI from '@/apis/memberAPI';
import MypageRecipeCard from '@/components/MypageRecipeCard.vue';
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

function handleClick(index){
    recipeCard.value[index].isActive = !recipeCard.value[index].isActive;
}

const recipeCard = ref([ ])
const route = useRoute();
const page=ref({
    pager:{}
})
const pageNo = ref(route.query.pageNo||1);
//dateFormating (2024-06-28)
function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

const store = useStore();
const mid = store.state.userId;

async function myLikeRecipeRead() {
    const response = await memberAPI.getMyLikeRecipe(mid,pageNo.value);
    recipeCard.value = response.data.myLikeRecipe;
    page.value.pager= response.data.pager;
    for(let i=0; i<recipeCard.value.length; i++) {
        recipeCard.value[i].rdate = dateFormat(new Date(recipeCard.value[i].rdate));
    }
}

myLikeRecipeRead()

const router = useRouter();
function routerLinkto(index){
    router.push(`/Recipe/RecipeDetailView?rno=${recipeCard.value[index].rno}`);
}

function changePageNo(argpageNo){
    router.push(`/Member/MypageView/MyLikeRecipe?pageNo=${argpageNo}`);
}

watch(route,(newRoute,oldRoute) => {
    if(newRoute.query.pageNo){ 
        pageNo.value=newRoute.query.pageNo;
        myLikeRecipeRead()
    } else {   
        //pageNo가 존재하지 않으면 list를 다시 호출하기 위한 초기값을 설정해주는 것
        pageNo.value=1;
    }
})
 </script>
 
 <style scoped>
.myRecipe{
    width:100%;
}
.qcard{
    width:calc(25%-2rem);
}
 </style>