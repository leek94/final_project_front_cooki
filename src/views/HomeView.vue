<template>
   <div class="d-flex flex-column justify-content-center align-items-center w-100 m-0 p-0">
      <div class="mt-5"></div>
      <div class="d-flex m-0 mt-5 p-0" style="width:80%; height: 800px;">
       <div class="m-0 px-2 h-100" style="width: 25%; height: 100%">
         <swiper-container class="classLeftSwiper" style=" width: 100%; height: 35%;"
           loop="true"
           speed="800"
           allow-touch-move="false"
           space-between="30"
           >
           <swiper-slide>
             <img src="/images/photos/main/class1.jpg" class="rounded"/>
           </swiper-slide>
           <swiper-slide>
             <img src="/images/photos/main/class2.jpg"  class="rounded"/>
           </swiper-slide>
           <swiper-slide>
             <img src="/images/photos/main/class3.jpg"  class="rounded"/>
           </swiper-slide>
           <swiper-slide>
             <img src="/images/photos/main/class4.jpg"  class="rounded"/>
           </swiper-slide>
           <swiper-slide>
             <img src="/images/photos/main/class5.jpg"  class="rounded"/>
           </swiper-slide>
           <swiper-slide>
             <img src="/images/photos/main/class6.jpg"  class="rounded"/>
           </swiper-slide>
         </swiper-container>
 
         <div class="d-flex flex-column justify-content-end align-items-start m-0 p-0" style=" width: 100%; height: 55%;">
           <div class="mb-5">
           <h6>추천드려요!</h6>
           <h1>요리 초보를 위한</h1>
           <h1>추천 클래스</h1>
           </div>
           <span class="d-flex justify-content-between align-items-center badge rounded-pill text-bg-success m-0 p-0" style=" width: 80%; height: 15%;">
              <p class="fs-5 m-0 ms-4 p-0">클래스 더보기</p>
              <p class="fs-5 m-0 me-4 p-0">&#10011;</p>
           </span>
         </div>
       </div>
 
       <div class=" m-0 p-0 px-2" style="width: 50%; height: 100%;">
             <swiper-container class="classCenterSwiper" style="width: 70%; height: 90%"
               loop="true"
               speed="800"
               space-between="30"
               autoplay-delay="3000">
               <swiper-slide>
                 <img src="/images/photos/main/class2.jpg" class="rounded"/>
               </swiper-slide>
               <swiper-slide>
                 <img src="/images/photos/main/class3.jpg" class="rounded"/>
               </swiper-slide>
               <swiper-slide>
                 <img src="/images/photos/main/class4.jpg" class="rounded"/>
               </swiper-slide>
               <swiper-slide>
                 <img src="/images/photos/main/class5.jpg" class="rounded"/>
               </swiper-slide>
               <swiper-slide>
                 <img src="/images/photos/main/class6.jpg" class="rounded"/>
               </swiper-slide>
               <swiper-slide>
                 <img src="/images/photos/main/class1.jpg" class="rounded"/>
               </swiper-slide>
             </swiper-container>
       </div>
       
       <div class="d-flex flex-column m-0 p-0" style="width: 25%; height: 100%">
         <div class="m-0 p-0" style="height: 20%;"></div>
         <swiper-container class="classRightSwiper" style="width: 100%; height: 50%;"
           loop="true"
           allow-touch-move="false"
           speed="800"
           space-between="30">
           <swiper-slide>
             <img src="/images/photos/main/class3.jpg" class="rounded"/>
           </swiper-slide>
           <swiper-slide>
             <img src="/images/photos/main/class4.jpg" class="rounded"/>
           </swiper-slide>
           <swiper-slide>
             <img src="/images/photos/main/class5.jpg" class="rounded"/>
           </swiper-slide>
           <swiper-slide>
             <img src="/images/photos/main/class6.jpg" class="rounded"/>
           </swiper-slide>
           <swiper-slide>
             <img src="/images/photos/main/class1.jpg" class="rounded"/>
           </swiper-slide>
           <swiper-slide>
             <img src="/images/photos/main/class2.jpg" class="rounded"/>
           </swiper-slide>
         </swiper-container>
 
         <div class="d-flex justify-content-between align-items-end m-0 p-0" style="height: 20%;">
           <div class="d-flex justify-content-center align-items-center col-1  m-0 p-0">
             <h5>{{classSwiperNow }}</h5>
           </div>
 
           <div class="d-flex justify-content-center align-items-center col-6 m-0 p-0">
             <div class="progress w-100" role="progressbar"  style="height: 4px;">
               <div class="progress-bar" style="width: 25%; background-color: green;"></div>
             </div>
             <button class="btn" v-show="isRun" @click="stopAuto">></button>
             <button class="btn" v-show="!isRun" @click="runAuto">||</button>
           </div>
 
           <div class="d-flex justify-content-center align-items-center col-1 m-0 p-0">
            <h5>{{ imgCount }}</h5>
           </div>
 
           <div class="d-flex justify-content-center align-items-center col-4 m-0 p-0">
             <img src="/images/assets/ic_left.png" class="left1 btn w-100">
             <img src="/images/assets/ic_right.png" class="right1 btn w-100"/>
           </div>
         </div>
       </div>
     </div>
 
     <hr class="m-0 p-0" style="width: 100%;"/>
 
     <div class="my-5 position-relative" style="width:80%; height: 800px">
      <h1 class="mb-5">카테고리</h1>
      <div class="position-absolute top-50 start-0 translate-middle" style="z-index: 99;"><img src="/images/assets/ic_prev.png" class="left2 btn"/></div>
      <div class="position-absolute top-50 start-100 translate-middle" style="z-index: 99;"><img src="/images/assets/ic_next.png" class="right2 btn"/></div>
      <swiper-container class="categorySwiper  border-top" style="width: 100%; height: 90%"
      space-between="0"
      loop="true"
      slides-per-view="4"
      speed="800">
         <swiper-slide class="d-felx flex-column m-0 p-0" :class="lastIndex===0? '': 'border-end'"> 
            <div class="m-0 p-0" style="width: 90%; height: 60%;">
               <img src="/images/photos/main/hansick.jpg" class="rounded"/>
            </div>
            <div class="m-0 p-0 d-flex justify-content-center align-items-center" style="width: 90%; height: 35%;">
               <h1>한식</h1>
            </div>
         </swiper-slide>
         <swiper-slide class="d-felx flex-column m-0 p-0" :class="lastIndex===1? '': 'border-end'"> 
            <div class="m-0 p-0" style="width: 90%; height: 60%;">
               <img src="/images/photos/main/yangsick.jpg" class="rounded" width="100%" height="100%"/>
            </div>
            <div class="m-0 p-0 d-flex justify-content-center align-items-center" style="width: 90%; height: 35%;">
               <h1>양식</h1>
            </div>
         </swiper-slide>
         <swiper-slide class="d-felx flex-column m-0 p-0" :class="lastIndex===2? '': 'border-end'"> 
            <div class="m-0 p-0" style="width: 90%; height: 60%;">
               <img src="/images/photos/main/fushion.jpg" class="rounded"/>
            </div>
            <div class="m-0 p-0 d-flex justify-content-center align-items-center" style="width: 90%; height: 35%;">
               <h1>퓨전</h1>
            </div>
         </swiper-slide>
         <swiper-slide class="d-felx flex-column m-0 p-0" :class="lastIndex===3? '': 'border-end'"> 
            <div class="m-0 p-0" style="width: 90%; height: 60%;">
               <img src="/images/photos/main/dosirack.jpg" class="rounded"/>
            </div>
            <div class="m-0 p-0 d-flex justify-content-center align-items-center" style="width: 90%; height: 35%;">
               <h1>도시락</h1>
            </div>
         </swiper-slide>
         <swiper-slide class="d-felx flex-column m-0 p-0" :class="lastIndex===4? '': 'border-end'"> 
            <div class="m-0 p-0" style="width: 90%; height: 60%;">
               <img src="/images/photos/main/busick.jpg" class="rounded"/>
            </div>
            <div class="m-0 p-0 d-flex justify-content-center align-items-center" style="width: 90%; height: 35%;">
               <h1>분식</h1>
            </div>
         </swiper-slide>
      </swiper-container>
   </div>
   
   <div id="rDiv" class="d-flex flex-column align-items-center m-0 my-5 p-0" style="width:100%; height: 800px;">
      <div class="d-flex justify-content-start align align-items-center m-0 p-0" style="width:80%; height: 15%" >
         <h1>이달의 추천 레시피!!!</h1>
      </div>

      <div class="d-flex m-0 p-0" style="width: 80%; height: 70%">
         <div style="width: 15%; height: 100%">
            <swiper-container class="recipeLeftSwiper1"
            space-between="30"
            loop="true"
            allow-touch-move="false"
            speed="800"
            >
            <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                  <img src="/images/photos/main/recpie1.jpg" class="rounded"/>
               </div>
               </swiper-slide>
               <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                  <img src="/images/photos/main/recpie2.jpg" class="rounded"/>
               </div>
               </swiper-slide>
               <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                  <img src="/images/photos/main/recpie3.jpg" class="rounded"/>
               </div>
               </swiper-slide>
               <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                  <img src="/images/photos/main/recpie4.jpg" class="rounded"/>
               </div>
               </swiper-slide>
               <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                  <img src="/images/photos/main/recpie5.jpg" class="rounded"/>
               </div>
               </swiper-slide>
            </swiper-container>
         </div>

         <div style="width:2.5%"></div>
         
         <div style="width: 15%; height: 100%">
            <swiper-container class="recipeLeftSwiper2"
            space-between="30"
            loop="true"
            allow-touch-move="false"
            speed="800"
            >
               <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                  <img src="/images/photos/main/recpie2.jpg" class="rounded"/>
               </div>
               </swiper-slide>
               <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                  <img src="/images/photos/main/recpie3.jpg" class="rounded"/>
               </div>
               </swiper-slide>
               <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                  <img src="/images/photos/main/recpie4.jpg" class="rounded"/>
               </div>
               </swiper-slide>
               <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                  <img src="/images/photos/main/recpie5.jpg" class="rounded"/>
               </div>
               </swiper-slide>
               <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                  <img src="/images/photos/main/recpie1.jpg" class="rounded"/>
               </div>
               </swiper-slide>
            </swiper-container>
         </div>
 
         <div style="width:2.5%"></div>

         <div class="position-relative" style="width: 30%; height: 100%">
           <div class="position-absolute top-50 start-25 translate-middle border-5" style="z-index: 99;">
             <img src="/images/assets/ic_prev.png" class="left3 btn">
           </div>
           <div class="position-absolute top-50 start-100 translate-middle" style="z-index: 99;">
             <img src="/images/assets/ic_next.png" class="right3 btn">
           </div>
           <swiper-container class="recipeCenterSwiper rCard"
           space-between="30" 
           loop="true"
           speed="800"
           autoplay-delay="3000"
           >
             <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                   <img src="/images/photos/main/recpie3.jpg" class="rounded"/>
               </div>
               <div style="height: 30%"></div>
             </swiper-slide>
             <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                   <img src="/images/photos/main/recpie4.jpg" class="rounded"/>
               </div>
               <div style="height: 30%"></div>
             </swiper-slide>
             <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                  <img src="/images/photos/main/recpie5.jpg" class="rounded"/>
               </div>
               <div style="height: 30%"></div>
             </swiper-slide>
             <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                   <img src="/images/photos/main/recpie1.jpg" class="rounded"/>
               </div>
               <div style="height: 30%"></div>
             </swiper-slide>
             <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                   <img src="/images/photos/main/recpie2.jpg" class="rounded"/>
               </div>
               <div style="height: 30%"></div>
             </swiper-slide>
           </swiper-container>
         </div>
 
         <div style="width:2.5%"></div>

         <div style="width: 15%; height: 100%">
           <swiper-container class="recpieRightSwiper1"
           space-between="30"
           loop="true"
           allow-touch-move="false"
           speed="800"
           >
           <swiper-slide>
             <div style="height: 30%"></div>
             <div style="height: 40%">
                 <img src="/images/photos/main/recpie4.jpg" class="rounded"/>
             </div>
           </swiper-slide>
           <swiper-slide>
             <div style="height: 30%"></div>
             <div style="height: 40%">
               <img src="/images/photos/main/recpie5.jpg" class="rounded"/>
             </div>
           </swiper-slide>
           <swiper-slide>
             <div style="height: 30%"></div>
             <div style="height: 40%">
               <img src="/images/photos/main/recpie1.jpg" class="rounded"/>
             </div>
           </swiper-slide>
           <swiper-slide>
             <div style="height: 30%"></div>
             <div style="height: 40%">
               <img src="/images/photos/main/recpie2.jpg" class="rounded"/>
             </div>
           </swiper-slide>
           <swiper-slide>
             <div style="height: 30%"></div>
             <div style="height: 40%">
               <img src="/images/photos/main/recpie3.jpg" class="rounded"/>
             </div>
           </swiper-slide>
           </swiper-container>
         </div>
 
         <div style="width:2.5%"></div>
         
         <div style="width: 15%; height: 100%">
           <swiper-container class="recpieRightSwiper2"
           space-between="30"
           loop="true"
           allow-touch-move="false"
           speed="800"
           >
           <swiper-slide>
             <div style="height: 30%"></div>
             <div style="height: 40%">
                 <img src="/images/photos/main/recpie5.jpg" class="rounded"/>
               </div>
             </swiper-slide>
             <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                 <img src="/images/photos/main/recpie1.jpg" class="rounded"/>
               </div>
             </swiper-slide>
             <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                 <img src="/images/photos/main/recpie2.jpg" class="rounded"/>
               </div>
             </swiper-slide>
             <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                 <img src="/images/photos/main/recpie3.jpg" class="rounded"/>
               </div>
             </swiper-slide>
             <swiper-slide>
               <div style="height: 30%"></div>
               <div style="height: 40%">
                 <img src="/images/photos/main/recpie4.jpg" class="rounded"/>
               </div>
             </swiper-slide>
           </swiper-container>
         </div>
 
     </div>
 
     <div style="height: 15%"></div>
   </div>

<div class="my-5"></div>
</div>
 
</template>
   
 <script setup>
 import { computed, onMounted, ref } from 'vue';
 import { register } from 'swiper/element/bundle';
 
 register();
 
 const classSwiperNow = ref(null);
 const lastIndex = ref(3);
 const isRun = ref(true);
 let imgCount = null;
 let classCenterSwiper = null
 
   onMounted(() => {
     classCenterSwiper = document.querySelector('.classCenterSwiper');
     const classLeftSwiper = document.querySelector('.classLeftSwiper');
     const classRightSwiper = document.querySelector('.classRightSwiper');
     const left1 = document.querySelector(".left1");
     const right1 = document.querySelector(".right1");
     const progressBar = document.querySelector(".progress-bar");
     imgCount = "0"+6;
 
     const categorySwiper = document.querySelector('.categorySwiper');
     const left2 = document.querySelector(".left2");
     const right2 = document.querySelector(".right2");
 
     const recipeCenterSwiper = document.querySelector('.recipeCenterSwiper');
     const recipeLeftSwiper1 = document.querySelector('.recipeLeftSwiper1');
     const recpieRightSwiper1 = document.querySelector('.recpieRightSwiper1');
     const recipeLeftSwiper2 = document.querySelector('.recipeLeftSwiper2');
     const recpieRightSwiper2 = document.querySelector('.recpieRightSwiper2');
     const left3 = document.querySelector(".left3");
     const right3 = document.querySelector(".right3");
     setProgressbar();
     
     classCenterSwiper.swiper.controller.control = [classLeftSwiper.swiper,classRightSwiper.swiper];
     classCenterSwiper.addEventListener("swiperslidechange", setProgressbar);
     categorySwiper.addEventListener("swiperslidechange",setLastIndex);
     recipeCenterSwiper.swiper.controller.control = [recipeLeftSwiper1.swiper, recpieRightSwiper1.swiper,recipeLeftSwiper2.swiper,recpieRightSwiper2.swiper];
 
     left1.addEventListener("click", () => {
       classCenterSwiper.swiper.slidePrev();
     })
 
     right1.addEventListener("click", () => {
       classCenterSwiper.swiper.slideNext();
     });
 
     left2.addEventListener("click", () => {
       categorySwiper.swiper.slidePrev();
     })
 
     right2.addEventListener("click", () => {
       categorySwiper.swiper.slideNext();
     });
 
     left3.addEventListener("click", () => {
       recipeCenterSwiper.swiper.slidePrev();
     })
 
     right3.addEventListener("click", () => {
       recipeCenterSwiper.swiper.slideNext();
     });
 
     function setProgressbar(){
       let now = classLeftSwiper.swiper.realIndex + 1;
       classSwiperNow.value = "0" + now;
       progressBar.style.width =  now/imgCount * 100 + "%";
     }
 
     function setLastIndex(){
       lastIndex.value = categorySwiper.swiper.realIndex + 3;
       if(lastIndex.value >= 5){
         lastIndex.value -= 5;
       }
     }
 
     })
 
     function stopAuto(){
       classCenterSwiper.swiper.autoplay.pause();
       isRun.value = !isRun.value;
     }
     
     function runAuto(){
       classCenterSwiper.swiper.autoplay.resume();
       isRun.value = !isRun.value;
     }
 
   </script>
   
   <style scoped>
     
     #rDiv{
       background-image: url(/public/images/assets/bg_pattern.png);
       background-color: #fff9e2;
       background-size: 100% 100%
       
     }
 
     .rCard{
       background-image: url(/public/images/assets/bg_frame.png);
       background-size: 100% 100%;
       background-repeat: no-repeat;
     }
 
     swiper-container {
       width: 100%;
       height: 100%;
     }
 
     swiper-slide {
       text-align: center;
       font-size: 18px;
       display: flex;
       justify-content: center;
       align-items: center;
     }
 
     swiper-slide img {
       width: 100%;
       height: 100%;
     }
     
   </style>