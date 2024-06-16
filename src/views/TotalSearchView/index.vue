<template>
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
</script>

<style scoped>
</style>