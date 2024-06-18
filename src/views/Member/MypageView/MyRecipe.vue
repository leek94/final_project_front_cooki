<template>
    <div class="myRecipe">
        <div class="d-flex fw-bold">
            <p style="font-size: 25px">레시피 </p>
            <p style="font-size: 26px">(5)</p>
        </div>
        <hr>
        <div class="recipeCard d-flex">
        <RecipeCard/>
        <RecipeCard/>
        <RecipeCard/>
        <RecipeCard/>
        <RecipeCard/>
        </div>
    </div>
</template>

<script setup>
import RecipeCard from '@/components/RecipeCard.vue';

</script>

<style scoped>
.myRecipe{
    border:solid 1px #e5e5e5;
    padding:50px;
    width:100%;
    height:60px;
}
.recipeCard{
   text-align: center;
    width: 100%;
    height: auto;
    list-style-type: none;
    padding: 0;
    margin: 0 auto;
    flex-wrap: wrap;
    margin-bottom: 0px;
    max-width: 75rem;
}
</style>