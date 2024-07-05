<template>
    <div class="container_box ss">
    
            <div class="recipe-title mb-5"></div>
            <!--검색바-->
            <SearchBar @searchword="searchresult"></SearchBar>

            <!-- 작성바 & 작성 버튼 -->
            <RouterLink to="./ClassRegisterView">클래스 등록</RouterLink>
            
            <!-- main 시작 -->
            <div class="main-box ss">
                <!-- 정렬 버튼 -->
                <div class="sorted-box d-flex ">
                    <ul class="sorted-part d-flex">
                        <li class="clicked-li me-4" :class="{ active: activeIndex === 0 }" @click="setActive(0)">마감순</li>
                        <li class="clicked-li me-4" :class="{ active: activeIndex === 1 }" @click="setActive(1)">조회순</li>
                        <li class="clicked-li me-4" :class="{ active: activeIndex === 2 }" @click="setActive(2)">리뷰순</li>
                        <li class="clicked-li me-4" :class="{ active: activeIndex === 3 }" @click="setActive(3)">평점순</li>
                    </ul>
                </div>
                <!-- 클래스 리스트 -->
                <div class="main-box ss">
                    <ul class="main-img d-flex ss">

                    <!-- 클래스 카드 -->
                    <ClassCard v-for="(clcard, index) in classCard" :key="index" :objectProp="clcard" :dataProp="searchText" @click="routerLinkto(index)"></ClassCard>
                    </ul>
                </div>
            </div>
            <div class="text-center" >
                <button class="initial btn btn-sm" @click="changePageNo(1)"> 처음 </button>
                <button class="prev btn btn-sm" v-if="page.pager.groupNo>1" @click="changePageNo(page.pager.startPageNo-1)">이전</button>
                <button class="btn btn-sm" v-for="pageNo in page.pager.pageArray" :key="pageNo" @click="changePageNo(pageNo)">{{pageNo}}</button>
                <button  class="btn btn-sm" v-if="page.pager.groupNo<page.pager.totalGroupNo" @click="changePageNo(page.pager.endPageNo+1)">다음</button>
                <button class="last btn btn-sm" @click="changePageNo(page.pager.totalPageNo)">마지막</button>
            </div>
    </div>
</template>

<script setup>
import classAPI from '@/apis/classAPI';
import ClassCard from '@/components/ClassCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const classCard = ref([
    {
        cno:null,
        mname: '',
        ctitle: '쿠킹클래스 쿡쿠키스',
        ccontent:"",
        cdday: '', 
        ctime:'',
        chitcount:null,
        cpersoncount: null,
        cprice:null,
        cnowPerson:null,
        reviewCount:null,
        classRatio:null

    },
])

const page=ref({
    pager:{}
})
const route= useRoute();
const pageNo = ref(route.query.pageNo||1);



function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

const data=ref({
    searchText:'', 
    searchTitle:'all',
    searchSort:0,
    pageNo:1
})

data.value.searchText = route.query.searchText||'';
data.value.searchTitle=route.query.searchTitle||'all';


async function getClssList(pageNo){
    try{
        console.log("확인")
        console.log(data.value);
        const response1 = await classAPI.getSearchClass(JSON.parse(JSON.stringify(data.value)),pageNo);
        classCard.value= response1.data.searchClass;
        page.value.pager=response1.data.pager;
        console.log("pager"+response1.data.pager)
        for(let i=0;i<classCard.value.length;i++){
            const resoponse2= await classAPI.classNowPerson(classCard.value[i].cno);
            classCard.value[i].cnowPerson = resoponse2.data.nowPerson;
            const response3=await classAPI.getReviewCount(classCard.value[i].cno);
            classCard.value[i].reviewCount= response3.data;
            console.log("count"+classCard.value[i].reviewCount)
            let date = new Date(classCard.value[i].cdday);
            classCard.value[i].cdday= dateFormat(date);
        }
    }catch(error){
        console.log(error);
    }
}

getClssList(pageNo.value);

const router= useRouter();

function routerLinkto(index){
    console.log("pp"+data.value.searchCategory);
    router.push(`./ClassDetailView?cno=${classCard.value[index].cno}&pageNo=${pageNo.value}&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=${data.value.searchSort}`);
}

const activeIndex = ref(null);
console.log("r"+route.query.searchSort);

activeIndex.value=parseInt(route.query.searchSort)||0;

console.log("dd"+activeIndex.value)
async function searchresult(search){
   data.value.searchText=search.searchText
   data.value.searchTitle=search.searchTitle
    // 검색어와 검색 타이틀로 DB에서 확인해서 찾아옴
    router.push(`/class/classListView?pageNo=${pageNo.value}&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=${data.value.searchSort}`);

    }

// 정렬을 위한 자바스크립트 시작

const setActive = (index) => {
    activeIndex.value = index;
    data.value.searchSort= index;
    pageNo.value=1;
    console.log("data"+data.value.searchSort)
    changePageNo(1)
};

//pager
function changePageNo(argpageNo){
    router.push(`/class/classListView?pageNo=${argpageNo}&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=${data.value.searchSort}`);
    
}

watch(route,(newRoute,oldRoute) => {
    if(newRoute.query.pageNo){ 
        getClssList(newRoute.query.pageNo);
        pageNo.value=newRoute.query.pageNo;
    } else{   
        getClssList(1)
        pageNo.value=1;
    }
})

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