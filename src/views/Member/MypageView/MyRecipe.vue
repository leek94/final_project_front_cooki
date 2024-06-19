<template>
   <div class="myRecipe">
    <h3 class="fw-bold text-start mb-4" >나의 레시피 </h3>
        <div class="d-flex" style="font-size:24px">
            <p>총 &ensp;</p>
            <p style="color:darkseagreen"> 4</p>
            <p>개</p>
        </div>

        
         <MyPageRecipeCard class="d-flex" style="margin:0 ;padding:16px 0 16px 16px; width:350px"/>
          
            
  
    </div>
</template>

<script setup>
import MyPageRecipeCard from '@/components/MyPageRecipeCard.vue';

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
    width: fit-content;

}

.qnaCard{
    border:solid 1px #e5e5e5;
    border-radius: 0.7rem;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
    width: 400px;
    height:auto;
    margin-top:3.5rem;
    width: 24%;
}

</style>