<template>
    <div class="myRecipe">
        <div class="d-flex fw-bold">
            <p style="font-size: 25px">찜한 레시피 </p>
            <p style="font-size: 26px">(5)</p>
        </div>
        <hr>
        <div class="recipeCard d-flex">
        <RecipeCard style="margin:1rem 1.65rem 0; width:260px;"/>
        <RecipeCard style="margin:1rem 1.65rem 0; width:260px;"/>
        <RecipeCard style="margin:1rem 1.65rem 0; width:260px;"/>
        <RecipeCard style="margin:1rem 1.65rem 0; width:260px;"/>
        <RecipeCard style="margin:1rem 1.65rem 0; width:260px;"/>
        </div>
    </div>
</template>

<script setup>
import RecipeCard from '@/components/RecipeCard.vue';
</script>

<style scoped>
.myRecipe{
    border:solid 1px #e5e5e5;
    border-radius: 0.7rem;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
    padding:50px 50px 0;
    width:70%;
    height:auto;
    text-align:center;
    margin:0 auto;
}
.recipeCard{
    list-style-type: none;
    flex-wrap: wrap;
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 10px;
    padding: 10px;
  

}
</style>