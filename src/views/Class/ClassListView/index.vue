<template>
    <div class="container_box ss">
        
        <form>
            <div class="recipe-title mb-5"><h3>클래스</h3></div>
            <SearchBar></SearchBar>
            <!-- 작성바 & 작성 버튼 -->
            <RouterLink to="./ClassDetailView" class="me-3">클래스 디테일</RouterLink>
            <RouterLink to="./ClassRegisterView">클래스 등록</RouterLink>
            
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
                <!-- 클래스 리스트 -->
                <div class="main-box ss">
                    <ul class="main-img d-flex ss">

                    <!-- 클래스 카드 -->
                    <ClassCard v-for="(clcard, index) in classCard" :key="index" :objectProp="clcard"/>
                    </ul>
                </div>
            </div>

        </form>
    </div>
</template>

<script setup>
import ClassCard from '@/components/ClassCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import { ref } from 'vue';

const classCard = ref([
    {
        mname: '손혜선씨',
        ctitle: '쿠킹클래스 쿡쿠키스',
        ccontent:"맛있는 쿠키를 만들어볼까요? 유후",
        cdday: '2024-06-25', 
        ctime:'14:00',
        cpersoncount: 30,
        cprice:48000,
    },
    {
        mname: '손혜삼씨',
        ctitle: '쿠킹클래스 쿡쿠키스',
        ccontent:"맛있는 쿠키를 만들어볼까요? 유후",
        cdday: '2024-06-25', 
        ctime:'14:00',
        cpersoncount: 30,
        cprice:48000,
    },
    {
        mname: '손혜사씨',
        ctitle: '쿠킹클래스 쿡쿠키스',
        ccontent:"맛있는 쿠키를 만들어볼까요? 유후",
        cdday: '2024-06-25', 
        ctime:'14:00',
        cpersoncount: 30,
        cprice:48000,
    },
    {
        mname: '손혜선씨',
        ctitle: '쿠킹클래스 쿡쿠키스',
        ccontent:"맛있는 쿠키를 만들어볼까요? 유후",
        cdday: '2024-06-25', 
        ctime:'14:00',
        cpersoncount: 30,
        cprice:48000,
    },
    {
        mname: '손혜삼씨',
        ctitle: '쿠킹클래스 쿡쿠키스',
        ccontent:"맛있는 쿠키를 만들어볼까요? 유후",
        cdday: '2024-06-25', 
        ctime:'14:00',
        cpersoncount: 30,
        cprice:48000,
    },
    {
        mname: '손혜사씨',
        ctitle: '쿠킹클래스 쿡쿠키스',
        ccontent:"맛있는 쿠키를 만들어볼까요? 유후",
        cdday: '2024-06-25', 
        ctime:'14:00',
        cpersoncount: 30,
        cprice:48000,
    },
    {
        mname: '손혜선씨',
        ctitle: '쿠킹클래스 쿡쿠키스',
        ccontent:"맛있는 쿠키를 만들어볼까요? 유후",
        cdday: '2024-06-25', 
        ctime:'14:00',
        cpersoncount: 30,
        cprice:48000,
    },
    {
        mname: '손혜삼씨',
        ctitle: '쿠킹클래스 쿡쿠키스',
        ccontent:"맛있는 쿠키를 만들어볼까요? 유후",
        cdday: '2024-06-25', 
        ctime:'14:00',
        cpersoncount: 30,
        cprice:48000,
    },
    {
        mname: '손혜사씨',
        ctitle: '쿠킹클래스 쿡쿠키스',
        ccontent:"맛있는 쿠키를 만들어볼까요? 유후",
        cdday: '2024-06-25', 
        ctime:'14:00',
        cpersoncount: 30,
        cprice:48000,
    },
    {
        mname: '손혜선씨',
        ctitle: '쿠킹클래스 쿡쿠키스',
        ccontent:"맛있는 쿠키를 만들어볼까요? 유후",
        cdday: '2024-06-25', 
        ctime:'14:00',
        cpersoncount: 30,
        cprice:48000,
    },
    {
        mname: '손혜삼씨',
        ctitle: '쿠킹클래스 쿡쿠키스',
        ccontent:"맛있는 쿠키를 만들어볼까요? 유후",
        cdday: '2024-06-25', 
        ctime:'14:00',
        cpersoncount: 30,
        cprice:48000,
    },
    {
        mname: '손혜사씨',
        ctitle: '쿠킹클래스 쿡쿠키스',
        ccontent:"맛있는 쿠키를 만들어볼까요? 유후",
        cdday: '2024-06-25', 
        ctime:'14:00',
        cpersoncount: 30,
        cprice:48000,
    },
])

// 정렬을 위한 자바스크립트 시작
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

// 정렬을 위한 자바스크립트 끝

</script>

<style scoped>
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

.recipe-title{
    font-size: 3.75rem;
    font-weight: 800;
    text-align: start;
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

/* 정렬 부분 시작 */
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
    font-weight: bold; /* 체크 표시 굵기 */
    font-size: 1em; /* 체크 표시 크기 */ 
}
/* 정렬 부분 끝 */

/* 카드 컴포넌트 설정시 필요한 */
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