<template>
        <div class="d-flex">
            <div class="mypage_bg"> 
                <div>
                    <img class="myimg" v-if="store.state.mimgoname" width="120px" height="120px" style="margin-top: 120px;" :src="`${axios.defaults.baseURL}/member/mattach/${store.state.userId}`"/>
                    <img src="/images/photos/profile.png" v-if="!store.state.mimgoname" width="120px" height="120px" style="margin-top: 120px; ">
                </div>
                <div class="d-flex username" style="justify-content: center">
                    <div style="color:#04AA6D">{{ store.state.mnickname }}</div>
                    <div> &nbsp; 님</div>
                </div>
                <div>
                    <button class="btn btn-outline-success btn-md" v-if="store.state.mrole === 'ROLE_USER'" @click="EidtorModal">에디터 신청</button>
                    <EditorRegisterModal id="editorRegisterModal" @close="hideEditorform" @register="editorRegister"/>
                </div>
                <ul style="list-style-type: none;margin-top:80px; padding:0px;">
                    
                    <li><RouterLink to="/Member/MypageView/MyRecipe">나의 레시피</RouterLink></li>
                    <li><RouterLink to="/Member/MypageView/MyLikeRecipe">내가 찜한 레시피</RouterLink></li>
                    <li><RouterLink to="/Member/MypageView/MyQAndA">내가 작성한 QAndA</RouterLink></li>
                    <li><RouterLink to="/Member/MypageView/MyProfile">프로필 관리</RouterLink></li>

                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="true" data-bs-display="static">
                            마이 클래스 
                        </a>
                        <ul class="dropdown-menu w-100 p-0 border-0 align-middle text-center" aria-labelledby="navbarDarkDropdownMenuLink">
                            <li><RouterLink class="dropdown-item me-2" to="/Member/MypageView/MyNowClass">내가 신청한 클래스</RouterLink> </li>
                            <li><RouterLink class="dropdown-item me-2" to="/Member/MypageView/MyClassHistory">내가 수강한 클래스</RouterLink> </li>
                            <li v-if="isEditor"><RouterLink class="dropdown-item me-2" to="/Member/MypageView/EditorNowRecruit">현재 모집 중인 클래스</RouterLink> </li>
                            <li v-if="isEditor"><RouterLink class="dropdown-item me-2" to="/Member/MypageView/EditorRecruitHistory">모집 마감된 클래스</RouterLink> </li>
                        </ul>
                        </li>
                    </ul>
                </ul>
            </div>   
            <div class="mypage_cont">
                <RouterView/>
            </div>      
        </div>

</template>

<script setup>
import { onMounted } from 'vue';
import EditorRegisterModal from './EditorRegisterModal.vue'
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useStore } from 'vuex';
import memberAPI from '@/apis/memberAPI';
import axios from 'axios';

let store = useStore();

let eRegisterModal=null;
onMounted(()=>{
    eRegisterModal=new Modal(document.querySelector("#editorRegisterModal"))
})
function EidtorModal(){
    eRegisterModal.show();
}
function hideEditorform(){
    console.log("에디터 폼 실행")
    eRegisterModal.hide();
}

function editorRegister(){
    console.log("에디터 레지스터 실행")
    eRegisterModal.hide();
}

const member = ref({
    mid: '',
    mnickname: '',
})


// 에디터만 볼 수 있는 페이지를 위한 변수 선언


let isEditor = ref(store.state.mrole=="ROLE_EDITOR");
console.log("롤", store.state.mrole=="ROLE_EDITOR");
console.log("롤", store.state.mrole);
//let isEditor = ref(store.state.mrole==ROLE_EDITOR);
</script>

<style scoped>

.myimg{
    border-radius: 100px;
}
.mypage_bg{
  background-color:#eff9ef;
  height: auto;
  width:35rem;
  min-height: 100vh;
  text-align: center;
}

.username{
    font-size:26px;
    font-weight: 800;
    margin:1.5rem 0;
}
li a {
  display: block;
  color: #000;
  padding: 12px 16px;
  text-decoration: none;
  font-size: 19px;

}

li a:hover{
  background-color: #04AA6D;
  color: white;
}

.mypage_cont{
    width:1800px;
    padding:0 1.875rem 0;
    margin-bottom:100px;
    height:100%;
    
}
.dropdown-item{
    background-color: #eff9ef;
}

a {
    display: block;
}


</style>