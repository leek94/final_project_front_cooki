<template>
    <div class="container_box ss">
    
            <div class="recipe-title mb-5"></div>
            <!--검색바-->
            <SearchBar @searchword="searchresult"></SearchBar>
            <SearchModal id="searchModal"/>

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
                    <ClassCard v-for="(clcard, index) in classCard" :key="index" :objectProp="clcard"  @click="routerLinkto(index)"></ClassCard>
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
import classAPI from '@/apis/classAPI';
import searchAPI from '@/apis/searchAPI';
import ClassCard from '@/components/ClassCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import SearchModal from '@/components/SearchModal.vue';
import { Modal } from 'bootstrap';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

let searchModal=null;
onMounted(()=>{
    searchModal=new Modal(document.querySelector("#searchModal"))
})
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
        crratio:null

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

//목록에서 다시 들어가거나 새로 고침 했을 때 실행
console.log("새로 들어옴")
data.value.searchText = route.query.searchText||'';
data.value.searchTitle=route.query.searchTitle||'all';
data.value.searchSort=route.query.searchSort||0;
getClssList(pageNo.value);

async function getClssList(pageNo){
    try{
        //클래스 리스트를 받아오기 위한 axios 호출
        const response1 = await searchAPI.getSearchClass(JSON.parse(JSON.stringify(data.value)),pageNo);
        classCard.value= response1.data.searchClass;
        page.value.pager=response1.data.pager;
        console.log("eeee"+classCard.value[1].reviewCount)
        console.log("ddddd"+classCard.value[0].crratio)
        //
        for(let i=0;i<classCard.value.length;i++){
            classCard.value[i].crratio=Math.round(classCard.value[i].crratio*10)/10
            const resoponse2= await classAPI.classNowPerson(classCard.value[i].cno);
            classCard.value[i].cnowPerson = resoponse2.data.nowPerson;
            let date = new Date(classCard.value[i].cdday);
            classCard.value[i].cdday= dateFormat(date);
        }
    }catch(error){
        console.log(error);
    }
}

const router= useRouter();

//클래스 디테일로 이동할 때 -> 다시 목록으로 돌아가기 위해 query로 값을 저장
function routerLinkto(index){
    router.push(`./ClassDetailView?cno=${classCard.value[index].cno}&pageNo=${pageNo.value}&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=${data.value.searchSort}`);
}

const activeIndex = ref(null);


activeIndex.value=parseInt(route.query.searchSort)||0;

//watch로 다시 getclasslist 함수가 실행될 때 
//같은 페이지에서 같은페이지로 이동하면서 검색어 갑을 다시 setting 해준다 
async function searchresult(search){
    if(search.searchText==='' && search.toggle === true){
        console.log("초기화 실행")
        
    }else if(search.searchText===''){
    searchModal.show();
    }
   
   data.value.searchText=search.searchText
   data.value.searchTitle=search.searchTitle
   
    router.push(`/class/classListView?pageNo=1&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=${data.value.searchSort}`);

    }

// 정렬을 위한 자바스크립트 시작
const setActive = (index) => {
    activeIndex.value = index;
    data.value.searchSort= index;
    pageNo.value=1;
    changePageNo(1)
};

//pager
function changePageNo(argpageNo){
    router.push(`/class/classListView?pageNo=${argpageNo}&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=${data.value.searchSort}`);
    
}

//같은 페이지->같은 페이지로 이동했을 때 
//route(url) 값이 단 하나라도 바뀌었을 때 실행
watch(route,(newRoute,oldRoute) => {
    if(newRoute.query.pageNo){ 
        console.log("다시 들어옴")
        getClssList(newRoute.query.pageNo);
        pageNo.value=newRoute.query.pageNo;
    } else {   
        //pageNo가 존재하지 않으면 list를 다시 호출하기 위한 초기값을 설정해주는 것
        data.value.searchTitle='all'
        data.value.searchSort=0
        data.value.searchText=''
        activeIndex.value=0
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