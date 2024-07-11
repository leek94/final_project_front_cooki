<template>
    <div class="container-box">
        <!-- 좋아요 -->
        <button id="like" class="like-button align-item-center" :class="{active:cookRecipes.islike}" style="align-content: center;" @click="changeLike">
            <i class="fa-solid fa-heart like-heart"></i>
            <div class="like-text">좋아요</div>
        </button>
        <!-- 레시피 내용 -->
        <div>
            <div class="recipe-title">
                <div class="inner">
                    <span class="label">레시피</span>
                    <h3 class="mb-4">{{ cookRecipes.rtitle}}</h3>
                    <div class="d-flex">
                        <p class="me-3">{{ cookRecipes.rdate }}</p>
                    </div>
                </div>
            </div>
            <div class="recipe-view-content">
                <div class="recipe-content">
                    <div class="content-top">
                        <h4>{{ cookRecipes.rcontent }}</h4>
                    </div>
                    <img :src="`${axios.defaults.baseURL}/recipe/thumbattach/${rno}`" width="100%">
                </div>
            </div>
        </div>

        <div class="recipe-view-content">
            <!-- 재료 -->
             <RecipeItems :objectProp="recipeItems" />

            <div class="recipe-step mt-3">
                <div class="recipe-step-tit text-start">
                    <h4>한 단계씩 따라해 보세요😄</h4>
                </div>
                <!-- Additional required wrapper -->
                 <div class="step-button d-flex justify-content-between align-items-center">
                    <button class="prevBtn btn btn-lg">
                        <i class="fa-solid fa-chevron-left "></i>
                    </button>
                <div id="step">Step.1</div>
                    <button class="nextBtn btn btn-lg" >
                        <i class="fa-solid fa-chevron-right" ></i>
                    </button> 
                </div>
                <swiper-container class="swiper-container border-bottom">
                    <swiper-slide v-for="(recipe, index) in recipeCurriculumes" :key="index">
                        <!-- 이미지 주소 매핑하는 법 -->
                        <img :src="`${axios.defaults.baseURL}/recipe/recipeprocessattach/${rno}/${recipe.rporder}`" class="swiper-img">

                        <div class="recipe-step-cont">
                            <p class="step-h mt-3 text-start">
                                <span>Step {{ recipe.rporder}}.</span>
                                <span>{{ recipe.rptitle }}</span>
                            </p>
                            <p class="step-desc mt-2 text-start">
                                {{ recipe.rpcontent }}
                            </p>
                            
                        </div>
                    </swiper-slide>
                </swiper-container>
            </div>

            <Review/>
            <div style="text-align: center; margin-top: 100px;">
            <RouterLink :to="`/Recipe/RecipeListView?pageNo=${pageNo}&searchTitle=${searchTitle}&searchText=${searchText}&searchSort=${searchSort}`"><button class="backList btn btn-outline-success btn-sm">목록으로</button></RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { register } from 'swiper/element/bundle';
import { ref, onMounted, TrackOpTypes } from "vue";
import recipeAPI from '@/apis/recipeAPI';
import axios from 'axios';
import RecipeItems from '@/components/Items.vue';
import { useStore } from 'vuex';
import Review from '@/views/Recipe/RecipeDetailView/Review.vue'
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const rno = route.query.rno;
const router = useRouter();

let pageNo= route.query.pageNo;
let searchTitle = route.query.searchTitle;
let searchText = route.query.searchText;
let searchSort = route.query.searchSort;

const cookRecipes = ref({
    rtitle:'자작자작 서울식 소불고기',rdate:'2024.06.11 08:00' , rcontent:'촉촉하게, 감칠맛 가득 불고기 만드는 법! 좋아하는 채소와 떡, 당면 등 재료를 마음껏 추가해 완성',
    islike: false,
});

const recipeCurriculumes = ref([
    {
        rporder: null, 
        rptitle:null, 
        rpcontent:null 
    },
])

let recipeItems = ref([]);
register();

async function changeLike() {
    if(store.state.userId===""){
        router.push('/Member/LoginView');
    }
    let btn = document.getElementById("like");
    const islike = cookRecipes.value.islike;
    let data = {rno:rno,mid:store.state.userId};
    data = JSON.parse(JSON.stringify(data));
    console.log(data);
    if(islike){
        try{
            const response = await recipeAPI.recipeDislike(data);
            console.log("dislike success")
        }catch{
            console.log("dislike fail")
        }
    }else{
        try{
            const response = await recipeAPI.recipeLike(data);
            console.log("like success")
        }catch{
            console.log("like fail")
        }
    }

    cookRecipes.value.islike = !cookRecipes.value.islike;
    btn.classList.toggle('active');
}

onMounted(()=>{
    const swiperEl = document.querySelector('.swiper-container');
    const nextBtn = document.querySelector('.nextBtn');
    const prevBtn = document.querySelector('.prevBtn');
    // step 태그를 찾아옴
    var step = document.getElementById("step");
    let currentStep = 1;

    // Swiper 인스턴스가 이미 존재하는 경우
    const swiper = swiperEl.swiper;

    // step뒤의 숫자를 추가하는 자바스크립트 & 버튼으로 캐러셀 움직이는 자바스크립트
    nextBtn.addEventListener('click', () => {
      swiperEl.swiper.slideNext();
      
    });

    prevBtn.addEventListener('click', () => {
      swiperEl.swiper.slidePrev();
      
    });

    // var nextSlide;
    // nextSlide.addEventListener('slidenexttransitionstart', function(){
    //     console.log("슬라이드 다음으로 실행")
    // })

    swiper.on('slideNextTransitionStart', function(){
        console.log("슬라이드 다음으로 실행");
        // 현재 슬라이드의 번호를 받아서 넣어줌
        currentStep = swiper.activeIndex + 1;
        step.innerText = `Step.${currentStep}`;
    })

    swiper.on('slidePrevTransitionStart', function(){
        console.log("슬라이드 이전으로 실행");
        currentStep = swiper.activeIndex + 1;
        step.innerText = `Step.${currentStep}`;
    })

    
});

//------ 데이터 얻어오기
async function getRecipeData(rno){
    try{
        const response = await recipeAPI.recipeRead(rno);
        cookRecipes.value = response.data
        console.log("디테일 성공");
    } catch{
        console.log("디테일 실패");
    }

    try{
        const response = await recipeAPI.recipeIncreaseHitcount(rno);
        console.log("조회수 성공");
    }catch{
        console.log("조회수 실패");
    }

    try{
        const response = await recipeAPI.processandItemRead(rno);
        const itemsData = response.data.recipeItems;
        for(let i=0; i<itemsData.length; i++){
            Object.keys(itemsData[i]).forEach((keys)=>{
                const content = itemsData[i][keys]
                if(typeof content === "string"){
                    recipeItems.value.push(content);
                }
            }
            )
        }
        recipeCurriculumes.value = response.data.recipeProcess;
        console.log("재료 프로세스 성공");
    } catch{
        console.log("재료 프로세스 실패");
    }
}

getRecipeData(rno);
</script>

<style scoped>
/* 좋아요 시작 */
.like-button{
    position: fixed;
    top: 27rem;
    right: 7rem;
    bottom: 27.625rem;
    width: 3rem;
    height: 5rem;
    border-radius: 40px;
    border: solid 1px #e5e5e5;
    background-color: #fff;
    z-index: 100;
    text-align: center;
}

.like-text{
    font-size: 0.7rem;
}

.like-heart{
    color:#e5e5e5;
}
/* 토글로 class에 active가 들어갈 경우만 색상을 변경함 */
.active i{
    color:red;
}
/* 좋아요 끝 */

.ss{
    border: 1px solid ;
}

.recipe-title{
    background-color: #eff9ef;
    background-image: url(/public/images/photos/bg_pattern_green.png);
    padding: 4.875rem 0;
    background-repeat: no-repeat;
    background-position: center;
}

.inner{
    width: 100%;
    max-width: 65rem;
    margin: 0 auto;
    text-align: left;
}

.inner > h3{
    font-size: 3rem;
    font-weight: 800;
}

.label{
    display: inline-block;
    margin-bottom: 0.625rem;
    padding: 0.313rem 0.563rem;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 5px;
    background-color: #0bab6d;
}

.recipe-view-content{
    width: 100%;
    max-width: 65rem;
    margin: 0 auto;
    padding: 3.75rem 0;
}

.recipe-content{
    width: 100%;
}

.content-top{
    margin-bottom: 7rem;
    text-align: center;
}

.ingredient-box{
    padding: 2.5rem;
}

.ingredient-title{
    width: 50%;
    text-align: left;
    flex: 1;
}

.ingredient-content{
    width: 50%;
    text-align: left;
    flex: 1;
}

.green-point::marker {
    color: #15a775;
}

/* 레시피 캐러셀 */
swiper-container{
    padding: 2rem 0;
    
}

.swiper-img{
    padding-bottom: 2rem;
    border-bottom: 1px solid #e5e5e5;
}

.recipe-step-tit{
    border-bottom: 1px solid;
}

.swiper-container{
    display: flex; 
    border-style: none;
}

.swiper-container img {
    display: block;
    width: 100%;
    height: auto;
}

.step-button{
    border-bottom: 1px solid #e5e5e5;
    padding: 0.5rem;
}

#step{
    color: #15a775;
}

.prevBtn{
    border-radius: 100%;
    background-color: white;
    border-color: rgba(0, 0, 0, 0.1);
    padding: 15px 25px;
    color: #15a775;
}

.nextBtn{
    border-radius: 100%;
    background-color: white;
    border-color: rgba(0, 0, 0, 0.1);
    padding: 15px 25px;
    color: #15a775;
}

.step-h{
    font-size: 1.2rem;
    font-weight: bold;
}

.step-desc{
    font-size: 0.8rem;
}

li{
    list-style: none;
    
}

ol{
    padding-left: 0; /* 기본 패딩 제거 */
    margin-left: 0; /* 기본 마진 제거 */
}

.backList{
    font-size: 1rem;
    font-weight: bold;
    padding:1.5rem 2.938rem 1.438rem 3rem; 
    border-radius: 38px;

}
</style>