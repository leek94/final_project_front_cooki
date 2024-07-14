<template>
   <div class="d-flex flex-column justify-content-center align-items-center w-100 m-0 p-0">
      <div class="mt-5"></div>
      <div class="d-flex m-0 my-5 p-0" style="width:80%; height: 700px;">
       <div class="m-0 px-2 h-100" style="width: 27%; height: 100%">
         <swiper-container class="classLeftSwiper" style=" width: 100%; height: 40%;"
           loop="true"
           speed="800"
           allow-touch-move="false"
           space-between="30"
           >
          <swiper-slide v-for="(c, index) in classes" :key="index">
            <img :src="`${axios.defaults.baseURL}/class/thumbattach/${index > 0? classes[index-1].cno : classes[number-1].cno}/1`" class="rounded-4"/>
          </swiper-slide>
         </swiper-container>
 
         <div class="d-flex flex-column justify-content-end align-items-start m-0 p-0" style=" width: 100%; height: 50%;">
           <div class="mb-5">
           <h6>추천드려요!</h6>
           <h1>요리 초보를 위한</h1>
           <h1>추천 클래스</h1>
           </div>
           <span class="d-flex justify-content-between align-items-center badge rounded-pill text-bg-success m-0 p-0" style=" width: 80%; height: 15%;" @click="showMoreClass">
              <p class="fs-5 m-0 ms-4 p-0">클래스 더보기</p>
              <p class="fs-5 m-0 me-4 p-0">&#10011;</p>
           </span>
         </div>
       </div>
 
       <div class=" m-0 p-0 px-2" style="width: 46%; height: 100%;">
            <swiper-container class="classCenterSwiper" style="width: 75%; height: 90%"
            loop="true"   
            speed="800"
            space-between="30"
            autoplay-delay="3000">
            <swiper-slide class="container" style="position: relative; text-align: start;">
              <img :src="`${axios.defaults.baseURL}/class/thumbattach/${classes[0].cno}/1`" class="rounded-4" />
              <div class="overlay rounded-4 px-5" @click="gotoClassDetail(classes[0].cno)">
                <img src="/images/assets/il_ribbon.png" style="z-index: 999; width: 10%; height: 10%; display: block;">
                <h2 class="mt-5">{{ classes[0].ctitle }}</h2>
              </div>
            </swiper-slide>
            <swiper-slide  class="container" style="position: relative; text-align: start;">
              <img :src="`${axios.defaults.baseURL}/class/thumbattach/${classes[1].cno}/1`" class="rounded-4"/>
              <div class="overlay rounded-4 px-5" @click="gotoClassDetail(classes[1].cno)">
                <img src="/images/assets/il_ribbon.png" style="z-index: 999; width: 10%; height: 10%; display: block;">
                <h2 class="mt-5">{{ classes[1].ctitle }}</h2>
              </div>
            </swiper-slide>
            <swiper-slide class="container" style="position: relative; text-align: start;">
              <img :src="`${axios.defaults.baseURL}/class/thumbattach/${classes[2].cno}/1`" class="rounded-4"/>
              <div class="overlay rounded-4 px-5" @click="gotoClassDetail(classes[2].cno)">
                <img src="/images/assets/il_ribbon.png" style="z-index: 999; width: 10%; height: 10%; display: block;">
                <h2 class="mt-5">{{ classes[2].ctitle }}</h2>
              </div>
            </swiper-slide>
            <swiper-slide class="container" style="position: relative; text-align: start;">
              <img :src="`${axios.defaults.baseURL}/class/thumbattach/${classes[3].cno}/1`" class="rounded-4"/>
              <div class="overlay rounded-4 px-5" @click="gotoClassDetail(classes[3].cno)">
                <img src="/images/assets/il_ribbon.png" style="z-index: 999; width: 10%; height: 10%; display: block;">
                <h2 class="mt-5">{{ classes[3].ctitle }}</h2>
              </div>
            </swiper-slide>
            <swiper-slide class="container" style="position: relative; text-align: start;">
              <img :src="`${axios.defaults.baseURL}/class/thumbattach/${classes[4].cno}/1`" class="rounded-4"/>
              <div class="overlay rounded-4 px-5" @click="gotoClassDetail(classes[4].cno)">
                <img src="/images/assets/il_ribbon.png" style="z-index: 999; width: 10%; height: 10%; display: block;">
                <h2 class="mt-5">{{ classes[4].ctitle }}</h2>
              </div>
            </swiper-slide>
            <swiper-slide class="container" style="position: relative; text-align: start;"> 
              <img :src="`${axios.defaults.baseURL}/class/thumbattach/${classes[5].cno}/1`" class="rounded-4"/>
              <div class="overlay rounded-4 px-5" @click="gotoClassDetail(classes[5].cno)">
                <img src="/images/assets/il_ribbon.png" style="z-index: 999; width: 10%; height: 10%; display: block;">
                <h2 class="mt-5">{{ classes[5].ctitle }}</h2>
              </div>
            </swiper-slide>
            </swiper-container>
       </div>
       
       <div class="d-flex flex-column m-0 p-0" style="width: 27%; height: 100%">
         <div class="m-0 p-0" style="height: 20%;"></div>
         <swiper-container class="classRightSwiper" style="width: 100%; height: 50%;"
           loop="true"
           allow-touch-move="false"
           speed="800"
           space-between="30">
           <swiper-slide v-for="(c, index) in classes" :key="index">
            <img :src="`${axios.defaults.baseURL}/class/thumbattach/${index+1 < number ? classes[index+1].cno : classes[0].cno}/1`" class="rounded-4"/>
          </swiper-slide>
         </swiper-container>
 
         <div class="d-flex justify-content-between align-items-end m-0 p-0" style="height: 20%;">
           <div class="d-flex justify-content-center align-items-center col-1  m-0 p-0">
             <h5>{{classSwiperNow }}</h5>
           </div>
 
           <div class="d-flex justify-content-center align-items-center col-6 m-0 p-0">
             <div class="progress w-75" role="progressbar"  style="height: 4px;">
               <div class="progress-bar" style="width: 25%; background-color: green;"></div>
             </div>
             <div class="w-25">
             <button class="btn w-100" v-show="isRun" @click="stopAuto">&#8214;</button>
             <button class="btn w-100" v-show="!isRun" @click="runAuto">&#9654;</button>
            </div>
           </div>
 
           <div class="d-flex justify-content-center align-items-center col-1 m-0 p-0">
            <h5>{{ "0"+number }}</h5>
           </div>
 
           <div class="d-flex justify-content-center align-items-center col-4 m-0 p-0">
             <img src="/images/assets/ic_left.png" class="left1 btn w-100">
             <img src="/images/assets/ic_right.png" class="right1 btn w-100"/>
           </div>
         </div>
       </div>
     </div>
 
     <hr class="m-0 p-0" style="width: 100%;"/>
 
     <div class="my-5 position-relative" style="width:80%; height: 700px">
      <div class="d-flex justify-content-start align-items-center" style="height: 20%;">
        <h1 class="mb-5">카테고리</h1>
      </div>
      
      <div class="position-absolute top-50 start-0 translate-middle" style="z-index: 99;"><img src="/images/assets/ic_left.png" class="left2 btn"/></div>
      <div class="position-absolute top-50 start-100 translate-middle" style="z-index: 99;"><img src="/images/assets/ic_right.png" class="right2 btn"/></div>
      <swiper-container class="categorySwiper  border-top" style="width: 100%; height: 80%"
      space-between="0"
      loop="true"
      slides-per-view="4"
      speed="800">
         <swiper-slide class="d-felx flex-column m-0 p-0" :class="lastIndex===0? '': 'border-end'" @click="gotoClassLIst('한식')"> 
            <div class="m-0 p-0 rounded-4" style="width: 80%; height: 50%; overflow: hidden;">
               <img src="/images/photos/main/category1.jpg"  style="transition: all 0.2s ease-out;">

            </div>
            <div class="m-0 p-0 d-flex flex-column justify-content-start align-items-start" style="width: 80%; height: 40%;">
              <span class="d-flex justify-content-center align-items-center badge rounded-pill text-bg-success m-0 mt-5 p-0" style=" width: 30%; height: 10%;">
                <p class="fs-5 m-0 m-0 p-0">한식</p>
              </span>
              <p class="fs-5 m-0 mt-3 p-0">집에서 좀 먹고 싶은</p>
              <p class="fs-6 m-0 mt-3 p-0">
                <span class="badge rounded-pill text-bg-light">#비빔밥</span>
                <span class="badge rounded-pill text-bg-light ms-1">#불고기</span>
                <span class="badge rounded-pill text-bg-light ms-1">#육계장</span>
              </p>
            </div>
         </swiper-slide>
         <swiper-slide class="d-felx flex-column m-0 p-0" :class="lastIndex===1? '': 'border-end'" @click="gotoClassLIst('중식')"> 
            <div class="m-0 p-0 rounded-4" style="width: 80%; height: 50%; overflow:hidden">
               <img src="/images/photos/main/category2.jpg" class="rounded-4"/>
            </div>
            <div class="m-0 p-0 d-flex flex-column justify-content-start align-items-start" style="width: 80%; height: 40%;">
              <span class="d-flex justify-content-center align-items-center badge rounded-pill text-bg-success m-0 mt-5 p-0" style=" width: 30%; height: 10%;">
                <p class="fs-5 m-0 m-0 p-0">중식</p>
              </span>
              <p class="fs-5 m-0 mt-3 p-0">짜vs짬 부vs찍</p>
              <p class="fs-6 m-0 mt-3 p-0">
                <span class="badge rounded-pill text-bg-light">#짜장면</span>
                <span class="badge rounded-pill text-bg-light ms-1">#짬뽕</span>
                <span class="badge rounded-pill text-bg-light ms-1">#탕수육</span>
              </p>
            </div>
         </swiper-slide>
         <swiper-slide class="d-felx flex-column m-0 p-0" :class="lastIndex===2? '': 'border-end'" @click="gotoClassLIst('일식')"> 
            <div class="m-0 p-0 rounded-4" style="width: 80%; height: 50%; overflow:hidden">
               <img src="/images/photos/main/category3.jpg" class="rounded-4"/>
            </div>
            <div class="m-0 p-0 d-flex flex-column justify-content-start align-items-start" style="width: 80%; height: 40%;">
              <span class="d-flex justify-content-center align-items-center badge rounded-pill text-bg-success m-0 mt-5 p-0" style=" width: 30%; height: 10%;">
                <p class="fs-5 m-0 m-0 p-0">일식</p>
              </span>
              <p class="fs-5 m-0 mt-3 p-0">입맛만은 가까운 사이</p>
              <p class="fs-6 m-0 mt-3 p-0">
                <span class="badge rounded-pill text-bg-light">#초밥</span>
                <span class="badge rounded-pill text-bg-light ms-1">#라멘</span>
                <span class="badge rounded-pill text-bg-light ms-1">#규동</span>
              </p>
            </div>
         </swiper-slide>
         <swiper-slide class="d-felx flex-column m-0 p-0" :class="lastIndex===3? '': 'border-end'" @click="gotoClassLIst('양식')"> 
            <div class="m-0 p-0 rounded-4" style="width: 80%; height: 50%; overflow:hidden">
               <img src="/images/photos/main/category4.jpg" class="rounded-4"/>
            </div>
            <div class="m-0 p-0 d-flex flex-column justify-content-start align-items-start" style="width: 80%; height: 40%;">
              <span class="d-flex justify-content-center align-items-center badge rounded-pill text-bg-success m-0 mt-5 p-0" style=" width: 30%; height: 10%;">
                <p class="fs-5 m-0 m-0 p-0">양식</p>
              </span>
              <p class="fs-5 m-0 mt-3 p-0">it타워 근처에는 없어요</p>
              <p class="fs-6 m-0 mt-3 p-0">
                <span class="badge rounded-pill text-bg-light">#파스타</span>
                <span class="badge rounded-pill text-bg-light ms-1">#스테이크</span>
                <span class="badge rounded-pill text-bg-light ms-1">#피자</span>
              </p>
            </div>
         </swiper-slide>
         <swiper-slide class="d-felx flex-column m-0 p-0" :class="lastIndex===4? '': 'border-end'" @click="gotoClassLIst('베이커리')"> 
            <div class="m-0 p-0 rounded-4" style="width: 80%; height: 50%; overflow:hidden">
               <img src="/images/photos/main/category5.jpg" class="rounded-4"/>
            </div>
            <div class="m-0 p-0 d-flex flex-column justify-content-start align-items-start" style="width: 80%; height: 40%;">
              <span class="d-flex justify-content-center align-items-center badge rounded-pill text-bg-success m-0 mt-5 p-0" style=" width: 30%; height: 10%;">
                <p class="fs-5 m-0 m-0 p-0">베이커리</p>
              </span>
              <p class="fs-5 m-0 mt-3 p-0">빵이 없다면???</p>
              <p class="fs-6 m-0 mt-3 p-0">
                <span class="badge rounded-pill text-bg-light">#찰깨빵</span>
                <span class="badge rounded-pill text-bg-light ms-1">#크로아상</span>
                <span class="badge rounded-pill text-bg-light ms-1">#식빵</span>
              </p>
            </div>
         </swiper-slide>
         <swiper-slide class="d-felx flex-column m-0 p-0" :class="lastIndex===5? '': 'border-end'" @click="gotoClassLIst('기타')"> 
            <div class="m-0 p-0 rounded-4" style="width: 80%; height: 50%; overflow:hidden">
               <img src="/images/photos/main/category6.jpg" class="rounded-4"/>
            </div>
            <div class="m-0 p-0 d-flex flex-column justify-content-start align-items-start" style="width: 80%; height: 40%;">
              <span class="d-flex justify-content-center align-items-center badge rounded-pill text-bg-success m-0 mt-5 p-0" style=" width: 30%; height: 10%;">
                <p class="fs-5 m-0 m-0 p-0">기타</p>
              </span>
              <p class="fs-5 m-0 mt-3 p-0">아무거나</p>
              <p class="fs-6 m-0 mt-3 p-0">
                <span class="badge rounded-pill text-bg-light">#화채</span>
                <span class="badge rounded-pill text-bg-light ms-1">#식혜</span>
                <span class="badge rounded-pill text-bg-light ms-1">#인절미</span>
              </p>
            </div>
         </swiper-slide>
      </swiper-container>
   </div>
   
   <div id="rDiv" class="d-flex flex-column align-items-center m-0 my-5 p-0" style="width:100%; height: 700px;">
      <div class="d-flex justify-content-start align align-items-center m-0 p-0" style="width:80%; height: 10%" >
         <h1>이달의 추천 레시피</h1>
      </div>

      <div class="d-flex m-0 p-0" style="width: 80%; height: 80%">
         <div style="width: 15%; height: 100%">
            <swiper-container class="recipeLeftSwiper1"
            space-between="30"
            loop="true"
            allow-touch-move="false"
            speed="800"
            >
            <swiper-slide v-for="(r, index) in recipe" :key="index">
              <div style="height: 30%"></div>
              <div style="height: 40%">
                <img :src="`${axios.defaults.baseURL}/recipe/thumbattach/${index > 1? recipe[index-2].rno : recipe[number-2 + index].rno}`" class="rounded-4"/>
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
              <swiper-slide v-for="(r, index) in recipe" :key="index">
                <div style="height: 30%"></div>
                <div style="height: 40%">
                  <img :src="`${axios.defaults.baseURL}/recipe/thumbattach/${index > 0? recipe[index-1].rno : recipe[number-1].rno}`" class="rounded-4"/>
                </div>
               </swiper-slide>
            </swiper-container>
         </div>
 
         <div style="width:2.5%"></div>

         <div class="position-relative" style="width: 30%; height: 100%">
           <div class="position-absolute top-50 start-25 translate-middle" style="z-index: 99;">
             <img src="/images/assets/ic_left.png" class="left3 btn">
           </div>
           <div class="position-absolute top-50 start-100 translate-middle" style="z-index: 99;">
             <img src="/images/assets/ic_right.png" class="right3 btn">
           </div>
           <swiper-container class="recipeCenterSwiper rCard"
           space-between="30" 
           loop="true"
           speed="800"
           >
            <swiper-slide v-for="(r, index) in recipe" :key="index">
              <div class="d-flex flex-column m-0 p-0" style="width:100%; height: 100%;">
                <div class="d-flex flex-column justify-content-center align-items-start mx-5" style="height: 30%;">
                  <h3 class="text-start" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;">
                    {{r.rtitle}}
                  </h3>
                  <p> {{ r.mnickname}} | {{dateFormat(r.rdate)}}</p>
                </div>
                <div style="height: 40%">
                  <img :src="`${axios.defaults.baseURL}/recipe/thumbattach/${r.rno}`" class="rounded-4" style="width: 50%;" @click="gotoRecipeDetail(r.rno)"/>
                </div>
                <div class="d-flex align-items-center justify-content-center" style="height: 30%">
                  <p class="m-0 p-3 text-center" style="width: 100%; height:75%; display: -webkit-box; word-wrap: break-word; -webkit-line-clamp: 4; -webkit-box-orient: vertical; text-overflow: ellipsis; overflow: hidden;">
                    {{r.rcontent}}
                  </p>
                </div>
              </div>
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
           <swiper-slide v-for="(r, index) in recipe" :key="index">
              <div style="height: 30%"></div>
              <div style="height: 40%">
                <img :src="`${axios.defaults.baseURL}/recipe/thumbattach/${index+1 < number? recipe[index+1].rno : recipe[0].rno}`" class="rounded-4"/>
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
           <swiper-slide v-for="(r, index) in recipe" :key="index">
              <div style="height: 30%"></div>
              <div style="height: 40%">
                <img :src="`${axios.defaults.baseURL}/recipe/thumbattach/${index+2 < number? recipe[index+2].rno : recipe[number-index].rno}`" class="rounded-4"/>
              </div>
            </swiper-slide>
           </swiper-container>
         </div>
 
     </div>
 
     <div style="height: 10%"></div>
   </div>

<div class="my-5"></div>
</div>
 
</template>
   
<script setup>
import { onMounted, ref} from 'vue';
import { register } from 'swiper/element/bundle';
import { useRouter } from 'vue-router';
import axios from 'axios';
import searchAPI from '@/apis/searchAPI';

register();
const router = useRouter();

const classSwiperNow = ref("01");
const lastIndex = ref(3);
const isRun = ref(true);
const number = 6;

const classes = ref([{},{},{},{},{},{}]);
const recipe = ref({});

function dateFormat(rdate) {
    const date = new Date(rdate);
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

getBi()
async function getBi(){
  try{
    const response = await searchAPI.getBestClassRecipe(number);
    classes.value = response.data.classes;
    recipe.value = response.data.recipe;
    for(let i=0; i<recipe.value.length; i++){
      recipe.value.rdate = dateFormat(new Date(recipe.value.rdate));
    }
    console.log("bi success");
  }catch{
    console.log("bi fail");
  }
}

onMounted( () => {
  const classCenterSwiper = document.querySelector('.classCenterSwiper');
  const classLeftSwiper = document.querySelector('.classLeftSwiper');
  const classRightSwiper = document.querySelector('.classRightSwiper');
  const left1 = document.querySelector(".left1");
  const right1 = document.querySelector(".right1");
  const progressBar = document.querySelector(".progress-bar");
  
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
  
  classCenterSwiper.swiper.controller.control = [classLeftSwiper.swiper,classRightSwiper.swiper];
  classCenterSwiper.addEventListener("swiperrealindexchange", setProgressbar);
  categorySwiper.addEventListener("swiperslidechange",setLastIndex);
  recipeCenterSwiper.swiper.controller.control = [recipeLeftSwiper1.swiper, recpieRightSwiper1.swiper,recipeLeftSwiper2.swiper,recpieRightSwiper2.swiper];
  setProgressbar();

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
    recipeCenterSwiper.swiper.slideNext();
  })

  right3.addEventListener("click", () => {
    recipeCenterSwiper.swiper.slidePrev();
  });

  function setProgressbar(){
    console.log(classCenterSwiper.swiper.realIndex);
    let now = classCenterSwiper.swiper.realIndex + 1;
    classSwiperNow.value = "0" + now;
    progressBar.style.width =  now/number * 100 + "%";
  }

  function setLastIndex(){
    lastIndex.value = categorySwiper.swiper.realIndex + 3;
    if(lastIndex.value >= 6){
      lastIndex.value -= 6;
    }
  }
}
)

function stopAuto(){
  const classCenterSwiper = document.querySelector('.classCenterSwiper');
  classCenterSwiper.swiper.autoplay.stop();
  isRun.value = !isRun.value;
}
     
function runAuto(){
  const classCenterSwiper = document.querySelector('.classCenterSwiper');
  classCenterSwiper.swiper.autoplay.start();
  isRun.value = !isRun.value;
}

function gotoClassDetail(cno){
  router.push(`class/ClassDetailView?cno=${cno}`);
}

function gotoRecipeDetail(rno){
  router.push(`recipe/recipeDetailView?rno=${rno}`);
}

function gotoClassLIst(category){
  router.push(`class/classListView?pageNo=1&searchTitle=category&searchText=${category}`);
}

function showMoreClass(){
  router.push("/Class/ClassListView")
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


.categorySwiper swiper-slide img:hover{
transform: scale(1.1);
transition: all 0.2s linear;
}

.overlay {
            position: absolute;
            top: 0;
            left: 10;
            width: 96%;
            height: 100%;
            justify-content: start;
            align-items: start;
            background: rgb(0, 0, 0, 0.5);
            opacity: 0;
            transition: opacity 0.2s;
            color: white;
	}

.container:hover .overlay {
            opacity: 1;
}
  

</style>