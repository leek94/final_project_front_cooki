<template>
    <div class="container_box ss">
        <div class="recipe-title mb-5"><h3>클래스</h3></div>
        <SearchBar></SearchBar>
        <div class="result">
            <div class="default-result">
                <b>어떤 요리가 궁금하신가요?</b>
                <br>
                요리명, 재료명으로 검색해 보세요
            </div>
        </div>


    </div>

    <div class="card">
        <div class="card-header">totalSearch</div>
        <div class="card-body">
            
            <RouterLink class="me-2" to="/TotalSearchView/Total">전체</RouterLink>
            <RouterLink class="me-2" to="/TotalSearchView/ClassCompact">클래스</RouterLink>
            <RouterLink class="me-2" to="/TotalSearchView/RecipeCompact">레시피</RouterLink>
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue';
</script>

<style scoped>

/* .ss{
    border: solid 1px;
} */

.container_box{
    padding: 6.875rem 1.875rem 6.25rem;
    margin-bottom: 1.25rem;
    max-width: 85rem;
    min-width: 75rem;
    margin: 0 auto;
}

.recipe-title{
    font-size: 3.75rem;
    font-weight: 800;
    text-align: start;
}

.result{
    margin-bottom: 5rem;
}

.default-result{
    padding: 3rem 0;
    text-align: center;
    line-height: 1.7;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
}
</style>