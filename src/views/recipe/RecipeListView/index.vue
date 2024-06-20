<template>
    <div class="container_box ss">
        
        <form>
            <div class="recipe-title mb-5"><h3>레시피</h3></div>
            <SearchBar></SearchBar>
            <!-- 작성바 & 작성 버튼 -->
            <div class="top-box ss d-flex align-content-center align-content-center mb-5">
                <img src="/images/photos/il_samie_3.png">
                <p class="mt-2">
                    나만의 레시피를 올려주세요!
                    <br>
                    <span>나만의 요리법, 재밌는 플레이팅, 요리 꿀팁 등 다양한 이야기를 함께 나눠주세요!</span>
                </p>

                <div class="regist-recipe d-flex align-items-center justify-content-center">
                    <!-- 라우터로 변경 예정 -->
                    <RouterLink to="./RecipeRegisterView" class="regist-button">작성하기 &ensp;<i class="fa-solid fa-pen"></i></RouterLink>
                </div>
            </div>
            <RouterLink to="./RecipeDetailView">레시피 디테일</RouterLink>
            <!-- main 시작 -->
            <div class="main-box ss">
                <!-- 정렬 버튼 -->
                <div class="sorted-box d-flex ">
                    <ul class="sorted-part d-flex">
                        <li class="clicked-li me-4" :class="{ active: activeIndex === 0 }" @click="setActive(0)">최신순</li>
                        <li class="clicked-li me-4" :class="{ active: activeIndex === 1 }" @click="setActive(1)">조회순</li>
                        <li class="clicked-li me-4" :class="{ active: activeIndex === 2 }" @click="setActive(2)">좋아요순</li>
                    </ul>
                </div>
                <!-- 사진 -->
                
                <div class="main-box ss">
                    <ul class="main-img d-flex ss">
                    <RecipeCard></RecipeCard>
                    <RecipeCard></RecipeCard>
                    <RecipeCard></RecipeCard>
                    <RecipeCard></RecipeCard>

                    <RecipeCard></RecipeCard>
                    <RecipeCard></RecipeCard>
                    <RecipeCard></RecipeCard>
                    <RecipeCard></RecipeCard>
                    
                    <RecipeCard></RecipeCard>
             
                 

                    </ul>
                </div>
            </div>

        </form>
    </div>
</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue';
import RecipeCard from '@/components/RecipeCard.vue';
import { ref } from 'vue';

const activeIndex = ref(0);

const setActive = (index) => {
  activeIndex.value = index;
  // 로직 axios
  if(index == 0){
    // 최신순 axios
  } else if(index == 1) {
    // 조회순 axios
  } else {
    // 좋아요순 axios
  }
};
</script>

<style scoped>

.recipe-title{
    font-size: 3.75rem;
    font-weight: 800;
    text-align: start;
}


/* .ss{
    border: solid 1px;
} */

.container_box{
    padding: 6.875rem 1.875rem 6.25rem;
    margin-bottom: 1.25rem;
    max-width: 85rem;
    min-width: 75rem;
    margin: 0 auto;
}


.top-box{
    position: relative;
    width: 100%;
    justify-content: space-between;
    padding: 1.799rem 2rem 1.513rem 13rem;
    text-align: left;
    background-color: #fbb9bf;
    border-radius: 0.625rem;
    color:#fff;
}

.regist-recipe{
    padding-left: 2.625rem;
    border-left: 1px solid #fff
}

.regist-button{
    color: #fff;
    text-decoration: none;
    font-weight: bold;
}

.top-box > img {
    position: absolute;
    left:0;
    bottom: 0;
    height: 9.75rem;
    margin-left: 3rem;
}

.sorted-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 1.75rem;
}

.clicked-li{
    font-size: 0.9rem;
    color: #c4c4c4;
}

.sorted-box li::marker {
    color: #c4c4c4;
}

.sorted-box li:hover {
    cursor: pointer;
}

.sorted-box li{
    color: #c4c4c4;
}

.sorted-box li.active {
    color: #000;
    font-weight: bold;
}

.sorted-box li.active::marker{
    content: "✔"; /* 체크 표시 추가 */
    color: #000; /* 체크 표시 색상 */
     /* 체크 표시 굵기 */
    font-size: 1em; /* 체크 표시 크기 */ 
}

.main-box{
    width: 100%;
    height: auto;
}

.main-img{
    width: 100%;
    height: auto;
    list-style-type: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
}

</style>