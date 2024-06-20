<template>
    <div class="myRecipe">
     <h3 class="fw-bold text-start mb-4" >Editor </h3>
     <h5 class="text-start mb-4" > - 모집 마감된 클래스 </h5>
         <div class="d-flex" style="font-size:24px">
             <p>총 &ensp;</p>
             <p style="color:darkseagreen"> 5</p>
             <p>개</p>
         </div>
 
         <hr class="mt-0"/>
         <div class="qcards d-flex">
         <div class="card qnaCard mt-3">
             <div class="card-body  text-center">
                <button class="reBtn btn btn-danger btn-sm">다시 열기</button>
                 <ClassCard class="d-none" style="width:250px" />
             </div>
         </div>

         <div class="card qnaCard mt-3">
             <div class="card-body  text-center">
                <button class="reBtn btn btn-danger btn-sm">다시 열기</button>
                 <ClassCard class="d-none" style="width:250px" />
             </div>
         </div>

         <div class="card qnaCard mt-3">
             <div class="card-body text-center">
                <button class="reBtn btn btn-danger btn-sm">다시 열기</button>
                 <ClassCard class="d-none" style="width:250px" />
             </div>
         </div>

         <div class="card qnaCard mt-3">
             <div class="card-body  text-center">
                <button class="reBtn btn btn-danger btn-sm">다시 열기</button>
                 <ClassCard class="d-none" style="width:250px" />
             </div>
         </div>

         <div class="card qnaCard mt-3">
             <div class="card-body  text-center">
                <button class="reBtn btn btn-danger btn-sm">다시 열기</button>
                 <ClassCard class="d-none" style="width:250px" />
             </div>
         </div>

         <div class="card qnaCard mt-3">
             <div class="card-body  text-center">
                <button class="reBtn btn btn-danger btn-sm">다시 열기</button>
                 <ClassCard class="d-none" style="width:250px" />
             </div>
         </div>

         <div class="card qnaCard mt-3">
             <div class="card-body text-center">
                <button class="reBtn btn btn-danger btn-sm">다시 열기</button>
                 <ClassCard class="d-none" style="width:250px" />
             </div>
         </div>

         

        
     </div>
    </div>
 </template>
 
 <script setup>
 import ClassCard from '@/components/ClassCard.vue';
 
 </script>
 
 <style scoped>
 .myRecipe{
     padding:50px 50px 0;
     width:85%;
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
     height:500px;
     margin-top:3.5rem;
     margin:0 1rem;
 }
 .reBtn{
    position: absolute;
    z-index: 10;
    right:20px;
    bottom:30px;

 }
 </style>