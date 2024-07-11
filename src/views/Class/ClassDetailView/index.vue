<template>
    <div class="ClassDetail">
        <div class="d-flex grow" style="align-items: center">
            <div class="col-6 position-relative">
            <!-- Additional required wrapper -->
                <swiper-container loop="true" class="swiper-container" >
                    <swiper-slide v-for="n in imgcount" :key="n">
                        <img :src="`${axios.defaults.baseURL}/class/thumbattach/${info.cno}/${n}`">
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
                        <span class="fw-bold ps-3" v-if="checker()-1>0" style="font-size: large; color:crimson">모집 마감 D-{{checker()}}</span></li>
                        <li class="border-top pt-3 pb-3  ">
                            <div style="display:inline-block;text-align: center ;width:100%;padding:0px 5% 0px 5%;">
                                <div style="display:inline-block;width:35%; border-right: 1px solid #dee2e6 ; margin-right: 50px;padding-right:50px">
                                    <div >강의 시간</div>
                                    <span class="fw-bold" style="display:inline-block;">{{info.cstarttime}}&nbsp;</span>
                                    <span class="fw-bold" style="display:inline-block;">- {{info.cendtime}}</span>
                                </div>
                                <div style="display:inline-block;width:30%; padding:0px 20px;">
                                    <span style="display:inline-block;">모집인원</span>
                                    <div class="d-flex" style="justify-content: center;">
                                        <span class="fw-bold" style="display:inline-block;">{{ countPerson }}</span>
                                        <span class="fw-bold" style="display:inline-block;"> /{{info.cpersoncount}}</span>
                                    </div>
                                </div>
                

                        </div>
                    </li>
                    <li class="border-top">
                        <div class="d-flex" style="margin: 20px">
                            <div class="justify-content-center" style="text-align: center;">
                                <img class="rounded-circle" style=" width:50px; height:50px; margin-right: 30px;" 
                                src="/images/photos/profile.png" v-if="!isEditorProfile">
                                <img class="rounded-circle" style=" width:50px; height:50px; margin-right: 30px;" 
                                :src="`${axios.defaults.baseURL}/member/mattach/${info.mid}`" v-if="isEditorProfile">
                            </div>
                          <span style="align-content: center;">{{info.mnickname}}</span>
                        </div>
                    </li>
                    </ul>
                </div>
    <hr/>
    <div class="d-flex" style="justify-content: end; align-items: center">
        <div style="font-size: 26px;font-weight: bold; margin-right: 60px;">{{ info.cprice }}원</div>
            <button class="btn btn-success btn-lg" v-if="applyresult===0" @click="isParticipant(cno)">신청하기</button>
            <button class="btn btn-danger btn-lg" v-if="applyresult===1" @click="showDialogCancel">취소하기</button>
        <ClassOverPersonModal id="overPersonModal"/>
        <button class="btn btn-secondary btn-lg disabled" v-if="applyresult===-1" @click="showDialogCancel">모집마감</button>
        <CRegisterModal id="registerModal" @close="hideDialogR(cno)"/>
        <CCancelModal id="cancelModal" @cancel="realCancelDialog(cno)"/>
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
                        <RouterLink class="menu" id="curriculum" :to="`/Class/ClassDetailView/Curriculum?cno=${cno}`">커리큘럼</RouterLink>
                    </li>
                    <li class="nav-item w-25" style="display: inline-block; ">
                        <RouterLink class="menu" id="creatorInfo" :to="`/Class/ClassDetailView/CreatorInfo?cno=${cno}`">에디터경력</RouterLink> 
                    </li>
                    <li class="nav-item w-25" style="display: inline-block; ">
                        <RouterLink class="menu" id="qAnda" :to="`/Class/ClassDetailView/QAndA?cno=${cno}`">Q&A</RouterLink> 
                    </li>
                    <li class="nav-item w-25" style="display: inline-block; ">
                        <RouterLink class="menu" id="review" :to="`/Class/ClassDetailView/Review?cno=${cno}`">리뷰</RouterLink> 
                    </li>
                </ul>
            </div>
        </nav>
        <hr style="margin:10px"/>
        <RouterView/>
        <div style="text-align: center; margin-top: 100px;">
            <RouterLink :to="`/Class/ClassListView?pageNo=${pageNo}&searchTitle=${searchTitle}&searchText=${searchText}&searchSort=${searchSort}`"><button class="backList btn btn-outline-success btn-sm">목록으로</button></RouterLink>
        </div>
        <div style="text-align: center; margin-top: 30px;">
            <button class="backList btn btn-outline-success btn-sm me-3" @click="gotoupdatepage">수정하기</button>
            <button class="backList btn btn-outline-success btn-sm" @clcik="gotodelete">삭제하기</button>
        </div>
        </div>
        
</template>

<script setup>
import { onMounted, ref } from 'vue';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import CRegisterModal from'./CRegisterModal.vue'
import CCancelModal from'./CCancelModal.vue'
import ClassOverPersonModal from './ClassOverPersonModal.vue'
import { Modal } from 'bootstrap';
import classAPI from '@/apis/classAPI';
import memberAPI from '@/apis/memberAPI';
import axios from 'axios';
import store from '@/store';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route= useRoute();

// register Swiper custom elements
register();
//list에서 query로 받아오는 값들
let cno=route.query.cno;
let pageNo= route.query.pageNo;
let searchTitle = route.query.searchTitle;
let searchText = route.query.searchText;
let searchSort = route.query.searchSort;

//클래스 신청 성공 시 모달
let registerModal=null;
//클래스 취소 시 모달
let CancelModal=null;
//클래스 인원 초과 시 모달
let overPersonModal=null;

     onMounted(()=>{ 
        registerModal=new Modal(document.querySelector("#registerModal"))
        CancelModal = new Modal(document.querySelector("#cancelModal"))
        overPersonModal = new Modal(document.querySelector("#overPersonModal"))
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
    mid:""
});

//클래스 디테일 
detailInfo(cno);
console.log(cno);
//신청 인원 상태 정의 
let countPerson= ref(0)

//신청 결과를 보여주기 위한 상태 정의 
const applyresult= ref();

//dateFormating (2024-06-28)
function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

const isEditorProfile = ref();

// 클래스 디테일 정보 받기 
// class 기본 정보, 신청자 수, 마감이 되었는 지, 내가 신청을 했는지 여부 

async function detailInfo(cno){

    // 서버에서 값 받아옴 - 클래스 정보
    const response = await classAPI.classRead(cno);
    // 클래스 정보를 상태 값인 info에 넣어줌
    info.value = response.data.classes;
    // 날짜 포맷
    let today = new Date();
    let deadline = new Date(info.value.cdday);
    //클래스 dday 하루 전에 신청 마감 
    deadline.setDate(deadline.getDate() -1);
    let date = new Date(info.value.cdday);
    info.value.cdday= dateFormat(date);
    //클래스 참여자 수 
    countPerson.value= response.data.participants;
    console.log("몇명인지 확인 : " + countPerson.value);
    let todaydf = dateFormat(today);
    let deadlinedf = dateFormat(deadline);
    console.log(todaydf>deadlinedf)

    // 인원 마감되었는지 확인하는 로직
    const response1 = await classAPI.classOverPerson(cno, info.value.cpersoncount);

    // 내가 신청했는 지 확인하는 로직
    const response2 = await classAPI.isParticipant(cno);

    // 현재 신청 인원이 몇명인지 확인하는 로직
    const response3 = await classAPI.classNowPerson(cno);

    countPerson.value = response3.data.nowPerson;

    // 날짜가 클래스 오픈 1일 전이면 시간 마감
    if(todaydf>=deadlinedf){

        console.log("마감1");
        applyresult.value=-1; // 모집 마감으로 변경
        
    } else if(response1.data.result==="false") { //인원이 마감되었을 
        // 인원 마감시
        if(response2.data.result === "false"){
            //신청했을 때 -> 여기서 서버 확인해야함
            console.log("취소2");
            applyresult.value=1; // 신청이 되어 있으면 취소로 변경
        } else {
            console.log("모집 마감");
            //신청하지 않았을 때
            applyresult.value=-1; // 모집 마감으로 변경
        }
    }else{ // 인원, 날짜 마감이 되지 않았고, 신청하지 않았을 경우
        if(response2.data.result === "false"){
            console.log("취소 확인")
            applyresult.value=1;
        } else {
            console.log("신청 확인")
            applyresult.value=0;
        }
    }



    //댓글 등록 시에 보여지는 프로필 이미지 가져오는 로직
    const response4 = await memberAPI.getMyProfile(info.value.mid);
    if(response4.data.member.mimgoname==null) {
        isEditorProfile.value = false;
    } else {
        isEditorProfile.value = true;
    }
}

function checker(){
    const today = new Date();
    // 날짜 형태가 2024-06-20여야만 가능 아니면 형태를 변경해서 넣어줘야함
    const cday = new Date(info.value.cdday);
    const diff = cday - today; // 초 단위로 나와서 밑에서 변경해줘야함
    let diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    return diffDays
}

//for문으로 몇개의 이미지를 출력해야 하는 지를 알기 위한 상태값 
const imgcount=ref(null);

thumbimgcount(cno);

//axios로 썸네일 이미지 갯수 받아오기
async function thumbimgcount(){
    const response = await classAPI.getThumbimgCount(cno);
    imgcount.value=response.data;
}
//v-if로 어떤 버튼이 보일지에 대한 상태값 
const ip = ref(false);


async function isParticipant(cno){
    // 신청 인원 확인을 위해 서버에서 값을 받아옴
    const response = await classAPI.classNowPerson(cno);
    // cno와 마감인원을 back 단으로 전달
    // const response= await classAPI.SetClassApply(64, info.value.cpersoncount);

    // 날짜 계산을 위한 포맷 변경
    let today = new Date();
    let deadline = new Date(info.value.cdday);
    deadline.setDate(deadline.getDate() -1);
    countPerson.value= response.data.participants;
    let todaydf = dateFormat(today);
    let deadlinedf = dateFormat(deadline);

    const response1 = await classAPI.isParticipant(cno); // 신청했는지
    const response2 = await classAPI.classOverPerson(cno,info.value.cpersoncount); // 인원 넘었는지
    
    // 신청하기 버튼이 눌렸을 때
    if(todaydf>=deadlinedf ){ // 이미 시간이 지났으므로 모달 뛰운 후 버튼 변경 -1
        console.log("마감 시간 이후로 - 마감 모집");
        applyresult.value=-1; // 마감 모집으로 변경
        // router.push('/login');
        overPersonModal.show(); // 모달 띄움
    } else if(response1.data.result === "backToLogin") {
        console.log("로그인 페이지로 이동 실행됨");
        console.log("" + response.data.result);
        router.push('/Member/LoginView'); // 로그인 페이지로 이동 시키기
    } else if(response2.data.result ==="false") { //인원이 마감되었을 때 - 마감 모집
        if(response1.data.result === "false"){ // 삭제 해도 되는 부분인거 같음
            // 인원 마감되었으나 신청했으므로 취소 버튼
            applyresult.value=1;
        } else{
            console.log("인원 초과로 - 마감 모집");
            console.log("applyresult 확인" + applyresult.value);
            overPersonModal.show();
            applyresult.value=-1; // 마감 모집으로 변경
            console.log("applyresult 확인" + applyresult.value);
        }
        
    }else{ // 마감 시간 && 마감 인원 전에 성공
        console.log("마지막 콘솔 찍힘");
        countPerson.value = response.data.nowPerson;
        // 여기서 한번 흔들림
        registerModal.show();
        
        // 모집인원 확인 해야함
    }
}

async function hideDialogR(cno){
    console.log("모달 닫음1");
    
    console.log("모달 닫음2");
    applyresult.value=1; // 취소하기로 변경
    console.log("모달 닫음3");
    const response = await classAPI.SetClassApply(cno);
    const response1 = await classAPI.classNowPerson(cno);
    countPerson.value = response1.data.nowPerson;
    console.log("모달 닫음4");
    
    // 저장 밑 인원 파악
    registerModal.hide();
    
}

function showDialogCancel(){
    CancelModal.show();
}

async function realCancelDialog(cno){
    // await를 붙여야 비동기 프로세스에서 동기적으로 일이 처리됨
    await classAPI.deleteClassApply(cno);
    const response1 = await classAPI.classNowPerson(cno);
    console.log("취소후 확인 인원: " + response1.data.nowPerson);
    countPerson.value = response1.data.nowPerson;
    applyresult.value=0;
    CancelModal.hide();
    // 모집인원 조회해야함
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