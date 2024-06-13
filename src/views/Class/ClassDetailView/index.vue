<template>
    <div class="card">
        <div class="card-header">classDetail</div>
        <div class="card-body">
            <RouterLink class="me-2" to="/Class/ClassUpdateView">클래스 수정(에디터)</RouterLink> 
            <hr/>
            
            <div>
                <RouterLink class="me-2" to="/Class/ClassDetailView/Curriculume">커리큘럼</RouterLink> 
                <RouterLink class="me-2" to="/Class/ClassDetailView/CreatorInfo">에디터경력</RouterLink> 
                <RouterLink class="me-2" to="/Class/ClassDetailView/QAndA">QAndA</RouterLink> 
                <RouterLink to="/Class/ClassDetailView/Review">리뷰</RouterLink> 
            </div>

            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
</style>