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
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

function handleClick(index){
    recipeCard.value[index].isActive = !recipeCard.value[index].isActive;
}

const recipeCard = ref([ ])

const countR= computed(()=>recipeCard.value.length)

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
    const response = await memberAPI.getMyLikeRecipe(mid);
    recipeCard.value = response.data.myLikeRecipe;
    for(let i=0; i<recipeCard.value.length; i++) {
        recipeCard.value[i].rdate = dateFormat(new Date(recipeCard.value[i].rdate));
    }
}

myLikeRecipeRead()

const router = useRouter();
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