<template>
    <div class="ClassDetail">
        <div class="d-flex grow" style="align-items: center">
            <div class="col-6 position-relative">
            <!-- Additional required wrapper -->
                <swiper-container loop="true" class="swiper-container" >
                    <swiper-slide><img src="/images/photos/thumb1.jpg"></swiper-slide>
                    <swiper-slide><img src="/images/photos/thumb2.jpg"></swiper-slide>
                </swiper-container>

                <button class="prevBtn btn btn-lg position-absolute top-50 start-0 translate-middle-y">
                    <i class="fa-solid fa-chevron-left" style="font-size: 40px"></i>
                </button>
                <button class="nextBtn btn btn-lg position-absolute top-50 end-0 translate-middle-y" >
                    <i class="fa-solid fa-chevron-right" style="font-size: 40px" ></i>
                </button> 
            </div>
            <div class="col-6">
                <span class="ClassTitle"> 쫀득쫀득 스모어쿠키 만들기! </span>
                <div class="Classinfo">
                    <ul style="text-align:start; padding-top:20px">
                        <li class="border-top pt-3 pb-3"><span>장소    </span>
                        <span>서울시 송파구 중대로 135 아이티 벤처타워 16층 </span></li>
                        <li class="border-top pt-3 pb-3"><span>날짜    </span>
                        <span>2024년 7월 26일 </span>
                        <span class="fw-bold ps-3" style="font-size: large; color:crimson">모집 마감 D - 5</span></li>
                        <li class="border-top pt-3 pb-3  ">
                            <div style="display:inline-block;text-align: center ;width:100%;padding:0px 5% 0px 5%;">
                                <div style="display:inline-block;width:30%; border-right: 1px solid #dee2e6 ; margin-right: 50px;padding-right:50px">
                                    <span style="display:inline-block;">소요시간</span>
                                    <span class="fw-bold" style="display:inline-block;">1시간 30분</span>
                                </div>
                                <div style="display:inline-block;width:30%; padding:0px 20px;">
                                    <span style="display:inline-block;">모집인원  </span>
                                    <span class="fw-bold" style="display:inline-block;">24 / 30</span>
                                </div>
                

                        </div>
                    </li>
                    <li class="border-top">
                        <div class="d-flex" style="margin: 20px">
                            <div class="justify-content-center" style="text-align: center;">
                                <img class="rounded-circle" style=" width:50px; height:50px; margin-right: 30px;" 
                                src="https://cdn.class101.net/images/7ee5dd7f-be19-4e0c-89b1-d250ef0a2e2f/1920xauto.webp">
                            </div>
                          <span style="align-content: center;">찌니의 빵공장</span>
                        </div>
                    </li>
                    </ul>
                </div>
    <hr/>
    <div class="d-flex" style="justify-content: end; align-items: center">
        <div style="font-size: 26px;font-weight: bold; margin-right: 60px;">48,000원</div>
        <button class="btn btn-success btn-lg" @click="showDialogRegister">신청하기</button>
        <button class="btn btn-success btn-lg" @click="showDialogCancel">취소하기</button>
        <CRegisterModal id="registerModal" @close="hideDialogR"/>
        <CCancelModal id="cancelModal" @close="hideDialogC"/>
    </div>
    </div>
        </div>
        <hr class="mt-5"/>
        <h5 class="mt-5 fw-bold" style="text-align: left;">#스모어쿠키 만들기!</h5>
                <pre class="ClassContent mt-5" style="overflow: hidden; white-space: pre-wrap" >
안녕하세요!
포뇨솜작가와 함께 석촌역에서 3호점으로 찾아뵙게 된 투데이오브베이킹입니다:)
수업 후에 석촌호수를 돌거나 송리단길 데이트하기에 너무 좋은 공간으로 찾아왔답니다!
이번 수업은 쫀득한 마시멜로우를 넣고 이것저것 꾸미는 재미가 있는 스모어쿠키 입니다.
쭉 늘어나는 재미가 있는 스모어쿠키:) 개별포장 후 박스에 넣어드려 선물로도 좋답니다!
저희 공방은 최소2명부터 가능한 공방이며 단체의 경우 15인이상도 가능하니 따로 문의주세요!.
넓고 쾌적한 공방에서 다정하고 재미있게, 좋은 추억만드실 수 있도록 도와드릴게요:)
- 초등 고학년 이상부터 참여 가능합니다.
(이 외의 나이는 꼭 미리 문의주세요!!)
- 스모어쿠키 6pcs를 가져가실 수 있습니다.
- 맛은 단호박/말차/초코 3종 중 1가지 맛 선택이 가능하며 일행분들과 나누어 다양한 맛으로 나누어가실 수 있어요:)
- 재료비는 무료입니다.
준비물은 설레이는 마음과 열정만 가져오셔도 충분합니다.
- 레시피는 제공되지 않습니다(납품하여 판매하는 레시피라 제공이 어려운점 양해 부탁드려요ㅜ.ㅜ)
- 쿠키가 구워지는 동안 케이스에 마스킹테이프, 크레용을 이용해 꾸미실 수 있어요:)
- 주차불가한 매장입니다.<br/>
역에서 도보2분거리로 대중교통이나
송파여성문화회관 공영주차장 이용을 추천드려요:)

* 본 수업은 정시에 시작으로 10분 전 입실을 필수로 하고 있습니다!
* 수업 시간 10분 이상 지각시 어떤 사유에서든 클래스 참여가 불가하며 이에 따른 환불은 진행되지 않습니다. 
(정시 수업 시작 후 다른 수강생님을 방치하고 다시 수업을 할 수 없기에 불가합니다.즐거운 수업을 위해 시간은 꼭 지켜주세요)<br/>
* 매장에 주차가 불가합니다. 대중교통을 추천드립니다.(역에서 도보3분)
* 예약제임으로 수업일 기준 4일 전부터 날짜변경 불가합니다.
* 즐거운 수업이 되도록 항상 최선을 다하겠습니다. 찾아주셔서 감사합니다:)
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
import { onMounted } from 'vue';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import CRegisterModal from'./CRegisterModal.vue'
import CCancelModal from'./CCancelModal.vue'
import { Modal } from 'bootstrap';
import CRegisterModal from'./CRegisterModal.vue'
import CCancelModal from'./CCancelModal.vue'
import { Modal } from 'bootstrap';
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


function showDialogRegister(){
    registerModal.show();
}

function hideDialogR(){
    registerModal.hide();
}

function showDialogCancel(){
    CancelModal.show();
}
function hideDialogC(){
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