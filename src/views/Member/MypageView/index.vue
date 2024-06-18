<template>
        <div class="d-flex">
            <div class="mypage_bg"> 
                <div>
                    <img src="/images/photos/profile.png" width="120px" height="120px" style="margin-top: 100px; ">
                </div>
                <div class="d-flex username" style="justify-content: center">
                    <div style="color:#04AA6D">손혜선  </div>
                    <div> 님</div>
                 </div>
                
                <ul style="list-style-type: none;margin-top:80px; padding:0px;">
                    
                    <li><RouterLink to="/Member/MypageView/MyRecipe">나의 레시피</RouterLink></li>
                    <li><RouterLink to="/Member/MypageView/MyLikeRecipe">내가 찜한 레시피</RouterLink></li>
                    <li><RouterLink to="/Member/MypageView/MyQAndA">내가 작성한 QAndA</RouterLink></li>
                    <li><RouterLink to="/Member/MypageView/MyProfile">프로필 관리</RouterLink></li>
                    <nav class="navbar navbar-expand-lg ">
                           
                            <ul class="navbar-nav">
                                <li class="nav-item dropdown d-flex">
                                <a class="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    마이 클래스 
                                </a>
                                <ul class="dropdown-menu " aria-labelledby="navbarDarkDropdownMenuLink">
                                    <li><RouterLink class="dropdown-item me-2" to="/Member/MypageView/MyNowClass">내가 참여한 클래스</RouterLink> </li>
                                    <li><RouterLink class="dropdown-item me-2" to="/Member/MypageView/MyClassHistory">내가 현재 신청한</RouterLink> </li>
                                    <li><RouterLink class="dropdown-item me-2" to="/Member/MypageView/EditorNowRecruit">현재 모집 중인 </RouterLink> </li>
                                    <li><RouterLink class="dropdown-item me-2" to="/Member/MypageView/EditorRecruitHistory">모집이 마감된</RouterLink> </li>
                                </ul>
                                </li>
                            </ul>

                </nav>
                    
                </ul>
            </div>   
            <div class="mypage_cont">
                <RouterView/>
            </div>      
        </div>

</template>

<script setup>

</script>

<style scoped>
.mypage_bg{
  background-color:#eff9ef;
  height: 100%;
  width:30.5rem;
  min-height: 100vh;
  margin-right:4.375rem;
  text-align: center;
}

.username{
    font-size:30px;
    font-weight: 800;
    margin:1.5rem 0;
}
li a {
  display: block;
  color: #000;
  padding: 12px 16px;
  text-decoration: none;
  font-size: 20px;


}


li a:hover:not(.active) {
  background-color: #04AA6D;
  color: white;
}
.mypage_cont{
    width:100%;
    max-width: 73.75rem;
    margin-top:25rem;
}
.dropdown-item{
    background-color: #eff9ef;
}

a {
    display: block;
}


</style>