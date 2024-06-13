<template>
    <nav class="navbar bg-white text-dark" >
        <div class="header" style="margin-left: 7rem; margin-right: 20px;">
            <img style="top:50%" src="@/assets/logo.png" width="40" height="40"/>
        </div>
        <ul class="d-flex " style="font-weight:bold; margin-left: 70px;">
        <li><RouterLink to="/" class="ms-4">홈</RouterLink></li>
        <li><RouterLink to="/Class/ClassList" class="ms-4">클래스</RouterLink></li>
        <li><RouterLink to="#" class="ms-4">레시피</RouterLink></li>
        <li><RouterLink to="#" class="ms-4" >마이 클래스</RouterLink></li>
        </ul>

        <div class="d-flex" style="margin-right: 7rem; font-size: 1.3rem;" >
            <div class="btn me-2" style="font-size: 14px;" @click="logoutBtn">로그아웃</div>
            <RouterLink to="#"><i class="fa-solid fa-magnifying-glass me-3" ></i></RouterLink>
            <RouterLink to="#"><i class="fa-solid fa-user me-4" ></i></RouterLink>
            <RouterLink to="#" class="btn btn-outline-success btn-md " style="border-radius: 14px;">글쓰기</RouterLink>
        </div>

    </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';


</script>

<style scoped>
.navbar{
    top: 0px; 
    left: 0px;
    height:5.625rem;
    border-bottom: 1px solid #15a775;
    box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.08);
    font-size: 100%
}
.header{
    font-size: 1.125rem;
}
li{
    text-align: center;
    list-style-type: none;
    background: url(@/assets/star.png) no-repeat 0px 0px;
    padding: 10px 20px 0px 27px;


}
li::before{
    margin-right: 15px;
    background-image:url(@/assets/star.png);
    background-size:20px 20px;
}

i{
    color:#0bab6d;
}


a{
    text-decoration: none;
    color: black
}
</style>