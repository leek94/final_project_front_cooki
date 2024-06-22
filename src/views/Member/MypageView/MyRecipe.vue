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
            <div class="qcard" v-for="(recards,index) in recipeCard" :key="index">
                    <MypageRecipeCard :objectProp="recards"/>
            </div>
        </div>
     </div>
 </template>
 
 <script setup>
 import MypageRecipeCard from '@/components/MypageRecipeCard.vue';

import { computed, ref } from 'vue';
 
const recipeCard = ([
    { 
        bno:1, 
        btitle:"이거 맛있겠죠1", 
        blike: 30, 
        bhitcount:129, 
        mname: "Sonhyeseon",
         bdate: "2024-06-21 14:00", 
         isActive: false 
    },
    { 
        bno:2, 
        btitle:"이거 맛있겠죠2", 
        blike: 30, 
        bhitcount:129, 
        mname: "Sonhyeseon",
         bdate: "2024-06-21 14:00", 
         isActive: false 
    },
    { 
        bno:3, 
        btitle:"이거 맛있겠죠3", 
        blike: 30, 
        bhitcount:129, 
        mname: "Sonhyeseon",
         bdate: "2024-06-21 14:00", 
         isActive: false 
    },
    { 
        bno:4, 
        btitle:"이거 맛있겠죠4", 
        blike: 30, 
        bhitcount:129, 
        mname: "Sonhyeseon",
         bdate: "2024-06-21 14:00", 
         isActive: false 
    },
    { 
        bno:4, 
        btitle:"이거 맛있겠죠5", 
        blike: 30, 
        bhitcount:129, 
        mname: "Sonhyeseon",
         bdate: "2024-06-21 14:00", 
         isActive: false 
    },

])
const countR= computed(()=>recipeCard.length)
 </script>
 
 <style scoped>
.myRecipe{
    width:100%;
}
.qcard{
    width:calc(25%-2rem);
}
 </style>