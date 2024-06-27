<template>
    <div class="ClassDetail">
        <div class="d-flex grow" style="align-items: center">
            <div class="col-6 position-relative">
            <!-- Additional required wrapper -->
                <swiper-container loop="true" class="swiper-container" >
                    <swiper-slide v-for="n in imgcount" :key="n">
                        <img :src="`${axios.defaults.baseURL}/class/thumbattach/64/${n}?accessToken=${store.state.accessToken}`">
                    </swiper-slide>
                </swiper-container>

                <button class="prevBtn btn btn-lg position-absolute top-50 start-0 translate-middle-y">
                    <i class="fa-solid fa-chevron-left" style="font-size: 40px"></i>
                </button>
                <button class="nextBtn btn btn-lg position-absolute top-50 end-0 translate-middle-y" >
                    <i class="fa-solid fa-chevron-right" style="font-size: 40px" ></i>
                </button> 
            </div>
            <div class="col-6">
                <span class="ClassTitle"> {{ info.ctitle }}</span>
                <div class="Classinfo">
                    <ul style="text-align:start; padding-top:20px">
                        <li class="border-top pt-3 pb-3"><span>장소 &ensp;</span>
                        <span>{{info.caddress}} </span></li>
                        <li class="border-top pt-3 pb-3"><span>날짜 &ensp;</span>
                        <span>{{info.cdday}} </span>
                        <span class="fw-bold ps-3" style="font-size: large; color:crimson">모집 마감 D-{{checker()}}</span></li>
                        <li class="border-top pt-3 pb-3  ">
                            <div style="display:inline-block;text-align: center ;width:100%;padding:0px 5% 0px 5%;">
                                <div style="display:inline-block;width:35%; border-right: 1px solid #dee2e6 ; margin-right: 50px;padding-right:50px">
                                    <span style="display:inline-block;">강의 시간</span>
                                    <span class="fw-bold" style="display:inline-block;">{{info.cstarttime}}&nbsp;</span>
                                    <span class="fw-bold" style="display:inline-block;">- {{info.cendtime}}</span>
                                </div>
                                <div style="display:inline-block;width:30%; padding:0px 20px;">
                                    <span style="display:inline-block;">모집인원</span>
                                    <div class="d-flex" style="justify-content: center;">
                                        <span class="fw-bold" style="display:inline-block;">24</span>
                                        <span class="fw-bold" style="display:inline-block;"> /{{info.cpersoncount}}</span>
                                    </div>
                                </div>
                

                        </div>
                    </li>
                    <li class="border-top">
                        <div class="d-flex" style="margin: 20px">
                            <div class="justify-content-center" style="text-align: center;">
                                <img class="rounded-circle" style=" width:50px; height:50px; margin-right: 30px;" 
                                src="https://cdn.class101.net/images/7ee5dd7f-be19-4e0c-89b1-d250ef0a2e2f/1920xauto.webp">
                            </div>
                          <span style="align-content: center;">{{info.mnickname}}</span>
                        </div>
                    </li>
                    </ul>
                </div>
    <hr/>
    <div class="d-flex" style="justify-content: end; align-items: center">
        <div style="font-size: 26px;font-weight: bold; margin-right: 60px;">48,000원</div>
            <button class="btn btn-success btn-lg" v-if="applyresult===0" @click="isParticipant(64)">신청하기</button>
            <button class="btn btn-success btn-lg" v-if="applyresult===1" @click="showDialogCancel">취소하기</button>
        <ClassOverPersonModal/>
        <button class="btn btn-success btn-lg" v-if="applyresult===-1" @click="showDialogCancel">모집마감</button>
        <CRegisterModal id="registerModal" @close="hideDialogR"/>
        <CCancelModal id="cancelModal" @cancel="realCancelDialog(64)"/>
    </div>
    </div>
        </div>
        <hr class="mt-5"/>
                <pre class="ClassContent mt-5" style="overflow: hidden; white-space: pre-wrap" >{{ info.ccontent }}
              </pre>
                <hr style="border-width:5px; margin:10px 0px"/>
        <nav class="navbar navbar-expand-sm navbar-light" style="text-align: center">
            <div class="container-fluid">
                <ul class="navbar-nav d-flex w-100">
                    <li class="nav-item w-25" style="display: inline-block; ">
                        <RouterLink class="menu" id="curriculum" to="/Class/ClassDetailView/Curriculum">커리큘럼</RouterLink>
                    </li>
                    <li class="nav-item w-25" style="display: inline-block; ">
                        <RouterLink class="menu" id="creatorInfo" to="/Class/ClassDetailView/CreatorInfo">에디터경력</RouterLink> 
                    </li>
                    <li class="nav-item w-25" style="display: inline-block; ">
                        <RouterLink class="menu" id="qAnda" to="/Class/ClassDetailView/QAndA">QAndA</RouterLink> 
                    </li>
                    <li class="nav-item w-25" style="display: inline-block; ">
                        <RouterLink class="menu" id="review" to="/Class/ClassDetailView/Review">리뷰</RouterLink> 
                    </li>
                </ul>
            </div>
        </nav>
        <hr style="margin:10px"/>
        <RouterView/>
        <div style="text-align: center; margin-top: 100px;">
            <RouterLink to="/Class/ClassListView"><button class="backList btn btn-outline-success btn-sm">목록으로</button></RouterLink>
        </div>
        </div>
        
</template>

<script setup>
import { onMounted, provide, ref } from 'vue';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import CRegisterModal from'./CRegisterModal.vue'
import CCancelModal from'./CCancelModal.vue'
import ClassOverPersonModal from './ClassOverPersonModal.vue'
import { Modal } from 'bootstrap';
import classAPI from '@/apis/classAPI';
import axios from 'axios';
import store from '@/store';
// register Swiper custom elements
register();


let registerModal=null;
let CancelModal=null;
    
     onMounted(()=>{ 
        registerModal=new Modal(document.querySelector("#registerModal"))
        CancelModal = new Modal(document.querySelector("#cancelModal"))
       
        const swiperEl = document.querySelector('.swiper-container');
        const nextBtn = document.querySelector('.nextBtn');
        const prevBtn = document.querySelector('.prevBtn');

        nextBtn.addEventListener('click', () => {
            swiperEl.swiper.slideNext();
         });
         prevBtn.addEventListener('click', () => {
            swiperEl.swiper.slidePrev();
         });



    });

//클래스 디테일 정보에 대한 상태 정의 
let info = ref({
    cno:null,
    ctitle:"",
    ccontent:"",
    caddress:"",
    cdday:"",
    cstarttime:"",
    cendtime:"",
    cpersoncount:null,
    mnickname:"",
    cprice:"",
});

detailInfo(64);

const applyresult= ref(0);
console.log()
//클래스 디테일 정보 받기 
async function detailInfo(cno){
    const response = await classAPI.classRead(cno)
    info.value = response.data.classes;
    if(response.data.result==="fail"){
        //시간 마감 혹은 인원 마감시 -1 리턴
        console.log("1");
        applyresult.value=-1;
    } else{
        if(response.data.isParticipant!== null){
            //신청했을 때
            console.log("2");
            applyresult.value=1;
        } else{
            console.log("3");
            //신청하지 않았을 때
            applyresult.value=0;
        }
    }
    
    
}
function checker(cno){
const today = new Date();
// 날짜 형태가 2024-06-20여야만 가능 아니면 형태를 변경해서 넣어줘야함

const cday = new Date(info.value.cdday);
const diff = cday - today; // 초 단위로 나와서 밑에서 변경해줘야함
const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
return diffDays
}

//썸네일 이미지 갯수를 받기 위한 상태 정의 
const imgcount=ref(null);

thumbimgcount();

//리스트에서 가져온 cno를 전달
async function thumbimgcount(){
    const response = await classAPI.getThumbimgCount(64);
    imgcount.value=response.data;
}
const ip = ref(false);

async function isParticipant(cno){
    const response= await classAPI.SetClassApply(cno, info.value.cpersoncount);
    console.log("personcount"+info.value.cpersoncount)
    console.log("is"+response.data.isParticipant);
    if(response.data.isParticipant!==null){
        applyresult.value=1;
    }
    console.log(response.data.length)
    registerModal.show();
    

}

function hideDialogR(){
    registerModal.hide();
}

function showDialogCancel(){
    CancelModal.show();
}
function realCancelDialog(cno){
    classAPI.deleteClassApply(cno);
    applyresult.value=0;
    CancelModal.hide();
}
</script>

<style scoped>
.ClassDetail{
    max-width: 65rem;
    line-height: 1.875rem;
    margin:0 auto;
    padding:6rem 0;
}
.ClassTitle{
    margin-top:30px;
    margin-bottom: 60px;
    margin-left:30px;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: start;

}

.ClassContent{
    resize:none;
    border-style: none;
    font-size: 1rem;
    word-break: break-all;

}  


.swiper-container img {
    display: block;
    max-width:500px;
    margin:0 auto;
    height:428px;

}
.nextBtn, .prevBtn{

  z-index: 10;

 
}
li{
    list-style-type: none;
}

.menu{
    text-decoration: none;
    font-size:1rem;
    margin-right:30px;
}
.sidebar{
  right:20px;
  top:30%;
  bottom: 200px;
  z-index: 9999;
  border: 1px solid #dee2e6;
}
.backList{
    font-size: 1rem;
    font-weight: bold;
    padding:1.5rem 2.938rem 1.438rem 3rem; 
    border-radius: 38px;

}
</style>