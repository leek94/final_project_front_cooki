<template>
    <div class="ClassDetail">
        <div class="d-flex grow" style="align-items: center">
            <div class="col-6 position-relative">
            <!-- Additional required wrapper -->
                <swiper-container loop="true" class="swiper-container" >
                    <swiper-slide><img src="/images/photos/cooki-thumb.png"></swiper-slide>
                    <swiper-slide><img src="/images/photos/thumb2.png"></swiper-slide>
                </swiper-container>

                <button class="prevBtn btn btn-lg position-absolute top-50 start-0 translate-middle-y">
                    <i class="fa-solid fa-chevron-left" style="font-size: 40px"></i>
                </button>
                <button class="nextBtn btn btn-lg position-absolute top-50 end-0 translate-middle-y" >
                    <i class="fa-solid fa-chevron-right" style="font-size: 40px" ></i>
                </button> 
            </div>
            <div class="col-6">
                <span class="ClassTitle"> 일주일 만에 베이커로 거듭나기! 인기폭발 이런날케이크의 (필수 베이킹 6종 레시피) </span>
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
        <button class="btn btn-success btn-lg">신청하기</button>
    </div>
    </div>
        </div>
        <hr/>
        <h5 class="mt-5 fw-bold">건강하고 맛있게 즐기는 찌니빵공장의 비건 홈카페 디저트</h5>
                <p class="ClassContent mt-5" rows="20" cols=" 100" >
                반갑습니다! 이런날케이크의 대표 천보람입니다.
                저는 대전에서 수제 디저트샵을 운영하며, 달콤한 하루를 보내고 있습니다.
                처음 매장을 오픈했을 땐, 문제가 발생하면 하나하나 부딪혀 가며 해결할 수밖에 없었어요. 이런 경험이 저를 더 단단하게 만들어 준 거 같습니다.
                지금은 일이 많아 몸이 힘들지만 저희 디저트 맛있다며 칭찬해 주시고 재방문 해주실 때, 오픈하고 짧은 기간 내 단골 고객님들이 많이 생겼다는 점에서 큰 보람을 느낀답니다.
                </p>
                <blockquote class="mt-5" style="font-weight: 800; margin-bottom: 80px;">
                눈과 입이 즐거운 트렌디한 디자인의 감각적인 디저트,
                저와 함께 만들어 보실래요?
                </blockquote>
                <hr style="border-width:5px; margin:10px"/>
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
        </div>

</template>

<script setup>
import { onMounted } from 'vue';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

    onMounted(()=>{
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
    font-size: 1.4rem;
    font-weight: bold;
    text-align: start;

}

.ClassContent{
    resize:none;
    border-style: none;
    font-size: 1rem;
    word-break: keep-all;
    text-align: center;

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
</style>