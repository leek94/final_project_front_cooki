<template>
    <div class="myRecipe" style="width:80%;  margin:auto auto;padding:50px 0 0">
    <h4 class="fw-bold text-start mb-4" >나의 레시피 </h4>
        <div class="d-flex" style="font-size:20px">
            <p>총 &ensp;</p>
            <p style="color:darkseagreen"> {{ countR }}</p>
            <p>개</p>
        </div>
 
        <hr class="mt-0"/>
        <div class="d-flex" style="flex-wrap: wrap;" >
            <div class="qcard" v-for="(recards,index) in recipeCard" :key="index" @click="routerLinkto(index)">
                    <MypageRecipeCard :objectProp="recards" @click="handleClick(index)"/>
            </div>
        </div>
    </div>
</template>
 
<script setup>
import memberAPI from '@/apis/memberAPI';
import MypageRecipeCard from '@/components/MypageRecipeCard.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
 
function handleClick(index){
    console.log("내가 찜한 레시피");
    console.log(recipeCard.value[index].isActive);
    recipeCard.value[index].isActive = !recipeCard.value[index].isActive;
    console.log(recipeCard.value[index].isActive);
}

const recipeCard = ref([ ]);
const countR= computed(()=>recipeCard.value.length)

const store = useStore();
const mid = store.state.userId

//dateFormating (2024-06-28)
function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

//내가 작성한 레시피 정보 읽어오기
async function myRecipeRead() {
    console.log("내아이디", mid)
    try{
        const response = await memberAPI.getMyRecipe(mid);
        recipeCard.value = response.data.myRecipeList;
        console.log("레시피카드", recipeCard.value);
        for(let i=0; i<recipeCard.value.length; i++) {
            recipeCard.value[i].rdate=dateFormat(new Date(recipeCard.value[i].rdate));
        }
    } catch(error) {
        console.log(error);
    }
}
myRecipeRead();

//카드 클릭 시 디테일 페이지로 가는 함수
const router= useRouter();
function routerLinkto(index){
    router.push(`/Recipe/RecipeDetailView?rno=${recipeCard.value[index].rno}`);
}
 </script>
 
 <style scoped>
.myRecipe{
    width:100%;
}
.qcard{
    width:calc(25%-2rem);
}
 </style>