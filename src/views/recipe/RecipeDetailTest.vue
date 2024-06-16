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
                <div class="recipe-content ss">
                    <div class="content-top ss">
                        <h3>촉촉하게, 감칠맛 가득 불고기 만드는 법!</h3>
                        <div>좋아하는 채소와 떡, 당면 등 재료를 마음껏 추가해 완성</div>
                    </div>

                        <img src="/images/photos/recipeimg1.jpg" width="700" heigth="700">
                </div>
                <!-- 재료 -->
                <div class="ingredient-box d-flex ss">
                    <ul class="ingredient-title ss">
                        <li class="green-point">주재료</li>
                    </ul>
                    <div class="ingredient-content ss">
                        <div class="checker-parent d-flex"><div class="green-checker ss"></div><div class="ss">완숙토마토 2개(300g)</div></div>
                        <div class="checker-parent d-flex"><div class="green-checker ss"></div><div class="ss">완숙토마토 2개(300g)</div></div>
                        <div class="checker-parent d-flex"><div class="green-checker ss"></div><div class="ss">완숙토마토 2개(300g)</div></div>
                        <div class="checker-parent d-flex"><div class="green-checker ss"></div><div class="ss">완숙토마토 2개(300g)</div></div>
                        <div class="checker-parent d-flex"><div class="green-checker ss"></div><div class="ss">완숙토마토 2개(300g)</div></div>
                        <div class="checker-parent d-flex"><div class="green-checker ss"></div><div class="ss">완숙토마토 2개(300g)</div></div>
                        <div class="checker-parent d-flex"><div class="green-checker ss"></div><div class="ss">완숙토마토 2개(300g)</div></div>
                        <div class="checker-parent d-flex"><div class="green-checker ss"></div><div class="ss">완숙토마토 2개(300g)</div></div>
                        <div class="checker-parent d-flex"><div class="green-checker ss"></div><div class="ss">완숙토마토 2개(300g)</div></div>
                        <div class="checker-parent d-flex"><div class="green-checker ss"></div><div class="ss">완숙토마토 2개(300g)</div></div>

                    </div>
                </div>
                <!-- swiper 스텝 -->
                 <div class="myswiper1">
                    <swiper-container class="mySwiper" pagination="true" pagination-type="progressbar" navigation="true">
                        <swiper-slide><img src="/images/photos/recipeimg1.jpg"></swiper-slide>
                        <swiper-slide><img src="/images/photos/recipeimg1.jpg"></swiper-slide>
                        <swiper-slide><img src="/images/photos/recipeimg1.jpg"></swiper-slide>
                        <swiper-slide><img src="/images/photos/recipeimg1.jpg"></swiper-slide>
                        <swiper-slide><img src="/images/photos/recipeimg1.jpg"></swiper-slide>
                        <swiper-slide><img src="/images/photos/recipeimg1.jpg"></swiper-slide>
                        <swiper-slide><img src="/images/photos/recipeimg1.jpg"></swiper-slide>
                        <swiper-slide><img src="/images/photos/recipeimg1.jpg"></swiper-slide>
                        <swiper-slide><img src="/images/photos/recipeimg1.jpg"></swiper-slide>
                    </swiper-container>
                 </div>
            </div>
    </div>
</template>

<script setup>
import { register } from 'swiper/element/bundle';
import { ref, onMounted } from "vue";
register();

onMounted(()=>{
    const mySwiper = document.querySelector(".mySwiper");
    const leftSwiper = document.querySelector(".leftSwiper");
    const rightSwiper = document.querySelector(".rightSwiper");
})
</script>

<style scoped>

.myswiper1{
    position: relative;
    height: 100%;
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #000;
    margin: 0;
    padding: 0;
}

swiper-container {
    width: 100%;
    height: 100%;
}

swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}


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
    max-width: 75rem;
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

.checker-parent{
    
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

</style>