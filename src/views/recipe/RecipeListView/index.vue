<template>
    <div class="container_box ss">
            <div class="recipe-title mb-5"></div>
            <SearchBar @searchword="searchresult"></SearchBar>
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
                        <li class="clicked-li me-4" :class="{ active: activeIndex === 2 }" @click="setActive(2)">리뷰순</li>
                        <li class="clicked-li me-4" :class="{ active: activeIndex === 3 }" @click="setActive(3)">좋아요순</li>
                    </ul>
                </div>
                <!-- 사진 -->
                
                <div class="main-box ss">
                    <ul class="main-img d-flex ss">
                        <RecipeCard v-for="(recard, index) in recipeCard" :key="index" :objectProp="recard" @click="routerLinkto(recard.rno)" @like="handleLike"/>
                    </ul>
                </div>
            </div>

            <!--pagination-->
            <div class="text-center" v-if="page.pager.totalRows!==0">
                <button class="initial btn btn-sm" @click="changePageNo(1)"> 처음 </button>
                <button class="prev btn btn-sm" v-if="page.pager.groupNo>1" @click="changePageNo(page.pager.startPageNo-1)">이전</button>
                <button class="btn btn-sm" v-for="pageNo in page.pager.pageArray" :key="pageNo" @click="changePageNo(pageNo)">{{pageNo}}</button>
                <button  class="btn btn-sm" v-if="page.pager.groupNo<page.pager.totalGroupNo" @click="changePageNo(page.pager.endPageNo+1)">다음</button>
                <button class="last btn btn-sm" @click="changePageNo(page.pager.totalPageNo)">마지막</button>
            </div>

            <div v-if="page.pager.totalRows===0" style="margin-top:100px">
                <hr/>
                <div style="margin: 60px auto; text-align: center">
                    <h5>검색어어가 존재하지 않습니다.</h5>
                </div>
                <hr/>
            </div>
    </div>
</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue';
import RecipeCard from '@/components/RecipeCard.vue';
import recipeAPI from '@/apis/recipeAPI';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const recipeCard = ref([
    {

    },
])

const data=ref({
    searchText:'', 
    searchTitle:'all',
    searchSort:0,
    pageNo:1
})

const page=ref({
    pager:{}
})

const router = useRouter();
const route= useRoute();
const pageNo = ref(route.query.pageNo||1);
data.value.searchText = route.query.searchText||'';
data.value.searchTitle=route.query.searchTitle||'all';
data.value.searchSort=route.query.searchSort||0;

getRecipeList(pageNo.value);

async function getRecipeList(pageNo){
    try{
        //클래스 리스트를 받아오기 위한 axios 호출
        const response1 = await recipeAPI.getRecipeList(JSON.parse(JSON.stringify(data.value)),pageNo);
        recipeCard.value= response1.data.searchRecipe;
        page.value.pager=response1.data.pager;
        //날짜 세팅
        for(let i=0;i<recipeCard.value.length;i++){
            let date = new Date(recipeCard.value[i].rdate);
            recipeCard.value[i].rdate= dateFormat(date);
        }
        console.log("success");
    }catch(error){
        console.log(error);
    }
}

function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

function routerLinkto(rno){
    console.log("???");
    router.push(`./RecipeDetailView?rno=${rno}&pageNo=${pageNo.value}&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=${data.value.searchSort}`);
}


async function searchresult(search){
   data.value.searchText=search.searchText
   data.value.searchTitle=search.searchTitle
   
    router.push(`/recipe/recipeListView?pageNo=1&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=${data.value.searchSort}`);
}

// 정렬을 위한 코드
const activeIndex = ref(0);
activeIndex.value=parseInt(route.query.searchSort)||0;
const setActive = (index) => {
    activeIndex.value = index;
    data.value.searchSort= index;
    pageNo.value=1;
    changePageNo(1)
};

function changePageNo(argpageNo){
    router.push(`/recipe/recipeListView?pageNo=${argpageNo}&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=${data.value.searchSort}`);
}

function handleLike(rno){
    for(let i=0; i<recipeCard.value.length; i++){
        if(recipeCard.value[i].rno === rno){
            recipeCard.value[i].islike = !recipeCard.value[i].islike;
            if(recipeCard.value[i].islike){
                recipeCard.value[i].likecount += 1;
            }else{
                recipeCard.value[i].likecount -= 1;
            }
        }
    }
}
//같은 페이지->같은 페이지로 이동했을 때 
//route(url) 값이 단 하나라도 바뀌었을 때 실행
watch(route,(newRoute,oldRoute) => {
    if(newRoute.query.pageNo){ 
        console.log("다시 들어옴")
        getRecipeList(newRoute.query.pageNo);
        pageNo.value=newRoute.query.pageNo;
    } else {   
        //pageNo가 존재하지 않으면 list를 다시 호출하기 위한 초기값을 설정해주는 것
        data.value.searchTitle='all'
        data.value.searchSort=0
        data.value.searchText=''
        activeIndex.value=0
        getRecipeList(1)
        pageNo.value=1;
    }
})

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