<template>
    <div class="card">
        <div class="card-header">Mypage</div>
        <div class="card-body">
            <RouterLink class="me-2" to="/Class/ClassUpdateView">클래스 수정(에디터)</RouterLink> 
            <hr/>
            
            <div>
                <RouterLink class="me-2" to="/Member/MypageView/MyRecipe">나의 레시피</RouterLink> 
                <RouterLink class="me-2" to="/Member/MypageView/MyLikeRecipe">내가 찜한 레시피</RouterLink> 
                <RouterLink class="me-2" to="/Member/MypageView/MyQAndA">내가 작성한 QAndA</RouterLink> 
                <RouterLink class="me-2" to="/Member/MypageView/MyProfile">프로필 관리</RouterLink>
                <RouterLink class="me-2" to="/Member/MypageView/MyNowClass">내가 참여한 클래스</RouterLink> 
                <RouterLink class="me-2" to="/Member/MypageView/MyClassHistory">내가 현재 신청한</RouterLink> 
                <RouterLink class="me-2" to="/Member/MypageView/EditorNowRecruit">현재 모집 중인 </RouterLink> 
                <RouterLink class="me-2" to="/Member/MypageView/EditorRecruitHistory">모집이 마감된</RouterLink> 


            </div>

            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
</style>