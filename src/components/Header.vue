<template>
    <nav class="navbar bg-white text-dark" style="min-width: 1300px;" >
        <div class="header" style="margin-left: 7rem; margin-right: 20px;">
            <RouterLink to="/"><img style="top:50%" src="@/assets/logo.png" width="40" height="40"/></RouterLink>
        </div>

        <div class="nav-wrapper" >
            <ul class="d-flex " style="font-weight:bold; margin-left: 200px">
                <li><RouterLink to="/" class="ms-4" style="margin-right:80px">홈</RouterLink></li>
                <li><RouterLink to="/Class/ClassListView" class="ms-4" style="margin-right:80px">클래스</RouterLink></li>
                <li><RouterLink to="/Recipe/RecipeListView" class="ms-4" style="margin-right:80px">레시피</RouterLink></li>
            </ul>
        </div>

       

        <div class="d-flex" style="margin-right: 9rem" >
            <div style="font-size: 17px;" >
                <RouterLink  class="me-4" to="/Member/LoginView" >로그인</RouterLink>
                <RouterLink  to="/TotalSearchView"><i class="fa-solid fa-magnifying-glass me-4" ></i></RouterLink>   
                <RouterLink to="/Member/MypageView"><i class="fa-solid fa-user me-4" ></i></RouterLink>
            </div>
      
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
    font-size: 100%;
    min-width: 75rem;
}
.header{
    font-size: 1.125rem;
}
li{
    text-align: center;
    list-style-type: none;
    background: url(/public/images/assets/star.png) no-repeat 0px 0px;
    padding: 10px 20px 0px 27px;
    text-decoration: none;
    color: black


}
li::before{
    margin-right: 25px;
    background-image:url(/public/images/assets/star.png);
    background-size:30px 30px;
}

i{
    color:#0bab6d;
    font-size: 1.5rem;
}


a{
    text-decoration: none;
    color: black
}
</style>