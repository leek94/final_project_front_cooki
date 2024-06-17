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
                <ul style="list-style-type: none;">
                    <li><RouterLink class="me-2" to="/Member/MypageView/MyRecipe">나의 레시피</RouterLink></li>
                    <li><RouterLink class="me-2" to="/Member/MypageView/MyLikeRecipe">내가 찜한 레시피</RouterLink></li>
                    <li><RouterLink class="me-2" to="/Member/MypageView/MyQAndA">내가 작성한 QAndA</RouterLink></li>
                    <li><RouterLink class="me-2" to="/Member/MypageView/MyProfile">프로필 관리</RouterLink></li>
                </ul>
     
            </div>
            <div class="mypage_cont">
                <RouterLink class="btn btn-success btn-sm" to="/Class/ClassUpdateView" >클래스 수정(에디터)</RouterLink>
                <RouterView></RouterView>
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
  padding: 8px 16px;
  text-decoration: none;
  font-size: 20px;
}


li a:hover:not(.active) {
  background-color: #04AA6D;
  color: white;
}


</style>