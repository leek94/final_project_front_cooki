<template>
    <div class="container-box ss">
        <!-- 레시피 내용 -->
        <div class="recipe-title">
            <div class="inner">
                <span class="label">레시피</span>
                <h3 class="mb-4">자작자작 서울식 소불고기</h3>
                <p class="">2024.06.11 08:00</p>
            </div>
        </div>

        <div class="recipe-view-content">
            <div class="recipe-content">
                <div class="content-top">
                    <h3>촉촉하게, 감칠맛 가득 불고기 만드는 법!</h3>
                    <div>좋아하는 채소와 떡, 당면 등 재료를 마음껏 추가해 완성</div>
                </div>

                <img src="/images/photos/recipeimg1.jpg" width="700" heigth="700">
            </div>
            <!-- 재료 -->
             <Items></Items>

            
            <div class="recipe-step mt-3">
                <div class="recipe-step-tit text-start">
                    <h4>한 단계씩 따라해 보세요😄</h4>
                </div>
                <!-- Additional required wrapper -->
                 <div class="step-button d-flex justify-content-between align-items-center">
                    <button class="prevBtn btn btn-lg">
                    <i class="fa-solid fa-chevron-left "></i>
                </button>
                <div class="">Step.1</div>
                <button class="nextBtn btn btn-lg" >
                    <i class="fa-solid fa-chevron-right" ></i>
                </button> 
                 </div>
                <swiper-container class="swiper-container border-bottom" >
                    <swiper-slide>
                        <img src="/images/photos/semi2.jpg" class="swiper-img">
                        
                        <div class="recipe-step-cont">
                            <p class="step-h mt-3 text-start">
                                <span>Step 1.</span>
                                <span> 양념 만들기</span>
                            </p>
                            <p class="step-desc mt-2 text-start">
                                생강과 대파는 곱게 다져주세요. 모든 양념 재료를 넣고 잘 섞어 양념을 만들어 주세요.
                                <br>
                                (간장6, 연두진3, 물 1.5컵, 설탕3, 물엿2, 참기름2, 다진 마늘4, 다진 생강1, 다진 대파1컵, 후추)

                            </p>
                            <ol class="tip-list text-start">
                                <li class="tip">
                                    <span>
                                        설탕과 함께 물엿을 따로 넣는 이유는 끈적이는 점도의 단맛을 부여하기 위해서!
                                        <br>
                                        물엿 대신 올리고당이나 꿀로 대체 가능해요!
                                    </span>
                                </li>
                            </ol>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="/images/photos/recipeimg1.jpg" class="swiper-img">
                        
                        <div class="recipe-step-cont">
                            <p class="step-h mt-3 text-start">
                                <span>Step 1.</span>
                                <span> 양념 만들기</span>
                            </p>
                            <p class="step-desc mt-2 text-start">
                                생강과 대파는 곱게 다져주세요. 모든 양념 재료를 넣고 잘 섞어 양념을 만들어 주세요.
                                <br>
                                (간장6, 연두진3, 물 1.5컵, 설탕3, 물엿2, 참기름2, 다진 마늘4, 다진 생강1, 다진 대파1컵, 후추)

                            </p>
                            <ol class="tip-list text-start">
                                <li class="tip">
                                    <span>
                                        설탕과 함께 물엿을 따로 넣는 이유는 끈적이는 점도의 단맛을 부여하기 위해서!
                                        <br>
                                        물엿 대신 올리고당이나 꿀로 대체 가능해요!
                                    </span>
                                </li>
                            </ol>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="/images/photos/semi2.jpg" class="swiper-img">
                        
                        <div class="recipe-step-cont">
                            <p class="step-h mt-3 text-start">
                                <span>Step 1.</span>
                                <span> 양념 만들기</span>
                            </p>
                            <p class="step-desc mt-2 text-start">
                                생강과 대파는 곱게 다져주세요. 모든 양념 재료를 넣고 잘 섞어 양념을 만들어 주세요.
                                <br>
                                (간장6, 연두진3, 물 1.5컵, 설탕3, 물엿2, 참기름2, 다진 마늘4, 다진 생강1, 다진 대파1컵, 후추)

                            </p>
                            <ol class="tip-list text-start">
                                <li class="tip">
                                    <span>
                                        설탕과 함께 물엿을 따로 넣는 이유는 끈적이는 점도의 단맛을 부여하기 위해서!
                                        <br>
                                        물엿 대신 올리고당이나 꿀로 대체 가능해요!
                                    </span>
                                </li>
                            </ol>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="/images/photos/recipeimg1.jpg" class="swiper-img">
                        
                        <div class="recipe-step-cont">
                            <p class="step-h mt-3 text-start">
                                <span>Step 1.</span>
                                <span> 양념 만들기</span>
                            </p>
                            <p class="step-desc mt-2 text-start">
                                생강과 대파는 곱게 다져주세요. 모든 양념 재료를 넣고 잘 섞어 양념을 만들어 주세요.
                                <br>
                                (간장6, 연두진3, 물 1.5컵, 설탕3, 물엿2, 참기름2, 다진 마늘4, 다진 생강1, 다진 대파1컵, 후추)

                            </p>
                            <ol class="tip-list text-start">
                                <li class="tip">
                                    <span>
                                        설탕과 함께 물엿을 따로 넣는 이유는 끈적이는 점도의 단맛을 부여하기 위해서!
                                        <br>
                                        물엿 대신 올리고당이나 꿀로 대체 가능해요!
                                    </span>
                                </li>
                            </ol>
                        </div>
                    </swiper-slide>
                    
                </swiper-container>
            </div>

        </div>
    </div>
</template>

<script setup>
import Items from '@/components/Items.vue'
import { register } from 'swiper/element/bundle';
import { ref, onMounted } from "vue";
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
.ss{
    border: 1px solid ;
}

.recipe-title{
    background-color: #eff9ef;
    background-image: url('C:\project\projects-vue\cooki_final_front_web\public\images\photos\bg_pattern_green.png');
    padding: 4.875rem 0;
    background-repeat: no-repeat;
    background-position: center;
}

.inner{
    width: 100%;
    max-width: 45rem;
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
    max-width: 45rem;
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

.green-checker{
    top: 0;
    left: 0;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url('C:\project\projects-vue\cooki_final_front_web\public\images\photos\li_checker.png');
    background-repeat: no-repeat;
    background-position: center;
    list-style-type: none;
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

.tip-list li::before{
    text-align: center;
    display: inline-block;
    min-width: 3rem;
    max-height: 1.9rem;
    margin-right: 1.2rem;
    margin-top: 0.25rem;
    padding: 0.25rem 0.8rem;
    color: #15a775;
    font-size: 0.875rem;
    font-weight: bold;
    text-align: center;
    border-radius: 5px;
    border: solid 1px #15a775;
    counter-increment: step-counter;
    content: "TIP." counter(step-counter);
    
}

.tip{
    display: flex;
    font-size: 0.7rem;
    font-weight: bold;
}
</style>