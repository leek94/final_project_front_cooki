<template>
    <div class="myRecipe">
     <h3 class="fw-bold text-start mb-4" >나의 레시피 </h3>
         <div class="d-flex" style="font-size:24px">
             <p>총 &ensp;</p>
             <p style="color:darkseagreen"> 4</p>
             <p>개</p>
         </div>
 
         <hr class="mt-0"/>
         <div class="qcards d-flex">
         <div class="card qnaCard mt-3" style="padding:0 ">
             <div class="card-body text-center">
                 <RecipeCard style="margin:0 ;padding:16px 0 0 16px; width:250px"/>
             </div>
         </div>
 
         <div class="card qnaCard mt-3" style="padding:0 ">
             <div class="card-body text-center">
                 <RecipeCard style="margin:0 ;padding:16px 0 0 16px; width:250px"/>
             </div>
         </div>
 
         <div class="card qnaCard mt-3" style="padding:0 ">
             <div class="card-body text-center">
                 <RecipeCard style="margin:0 ;padding:16px 0 0 16px; width:250px"/>
             </div>
         </div>
 
         <div class="card qnaCard mt-3" style="padding:0 ">
             <div class="card-body text-center">
                 <RecipeCard style="margin:0 ;padding:16px 0 0 16px; width:250px"/>
             </div>
         </div>
 
 
         <div class="card qnaCard mt-3" style="padding:0 ">
             <div class="card-body text-center">
                 <RecipeCard style="margin:0 ;padding:16px 0 0 16px; width:250px"/>
             </div>
         </div>
 
     </div>
 
     
     </div>
 </template>
 
 <script setup>
 import RecipeCard from '@/components/RecipeCard.vue';
 
 </script>
 
 <style scoped>
 .myRecipe{
     padding:50px 50px 0;
     width:80%;
     height:auto;
     text-align:center;
     margin:0 auto;
     
 
 }
 .qcards{ 
     flex-wrap: wrap;
 }
 
 .qnaCard{
     border:solid 1px #e5e5e5;
     border-radius: 0.7rem;
     box-shadow: 0 2px 20px 0 rgba(0, 0, 3, 0.2);
     width: 200px;
     height:400px;
     margin-top:3.5rem;
     width: calc(33% - 2rem);
     margin:0 1rem;
 }
 
 </style>