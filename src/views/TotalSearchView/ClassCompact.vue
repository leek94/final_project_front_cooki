<template>
    <!-- 전체 검색 -->
    <div class="total-search">
        <div class=" mb-2">
            <h5 class="class-name mb-3">클래스</h5>
            <div class="main-box mb-5">
                <div v-if="data.searchText==='' || classCards.length === 0" style="margin-top:100px">
                        <div style="margin: 60px auto; text-align: center">
                            <h6><strong>검색어어가 존재하지 않습니다.</strong></h6>
                        </div>
                    </div>
                    <div v-if="classCards.length !== 0 && data.searchText!==''">
                        <ul class="main-img d-flex">
                            <ClassCard v-for="(clcard, index) in classCards" :key="index" :objectProp="clcard" @click="routerLinkTo(index)"/>
                        </ul>

                        <div class="d-flex justify-content-center" v-if="classCards.length !== page.pager.totalRows">
                            <button class="plus-button btn"  @click="appendList">더보기</button>
                        </div>
                 </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import classAPI from '@/apis/classAPI';
import searchAPI from '@/apis/searchAPI';
import ClassCard from '@/components/ClassCard.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const classCards = ref([

]);
const page=ref({
    pager:{}
})
const data= ref({
    searchTitle:'all',
    searchText:'',
    searchSort:1
})

data.value.searchTitle=route.query.searchTitle||'all';
data.value.searchText=route.query.searchText||'';

//다음 페이지 넘버를 받아와 카드를 늘려주기 위해 pageNo를 변수로 받는다 
let pageNo=1;
const perPage=8;

if(data.value.searchText!==''){
    getSearchClass();
}



function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

async function getSearchClass(){

    const response = await searchAPI.getSearchClass(JSON.parse(JSON.stringify(data.value)), pageNo,perPage)
    let clData =response.data.searchClass
    page.value.pager =  response.data.pager
    //for문을 clData 배열에 있는 객체를 가져온다
    for(let i=0;i<clData.length;i++){
            //별점 소수점 첫째자리에서 반올림
            clData[i].crratio=Math.round(clData[i].crratio*10)/10;
            //현재 클래스 신청 인원수 받아오기 
            const resoponse2= await classAPI.classNowPerson(clData[i].cno);
            clData[i].cnowPerson = resoponse2.data.nowPerson;
            //dateformat
            let date = new Date(clData[i].cdday);
            clData[i].cdday= dateFormat(date);
            //classCards 배열에 clData 객체 하나씩 할당 해준다(넣어준다)
            classCards.value.push(clData[i])
        }
}
//더보기를 눌렀을 때 pageNo+1을 해서 (2)페이지에 나오는 카드 불러오기
async function appendList(){
    pageNo+=1
    getSearchClass()
}

function MovetoList(){
    router.push(`/class/classListView?pageNo=1&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=1`)
}

 function routerLinkTo(index){
    router.push(`/class/ClassDetailView?cno=${classCards.value[index].cno}&pageNo=1&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=1`);
}

watch(route,(newRoute,oldRoute)=>{
    if(newRoute.query.searchText!==''){
        data.value.searchTitle=newRoute.query.searchTitle||'all';
        data.value.searchText=newRoute.query.searchText||'';
        getSearchClass(1,8)
    } else{
        data.value.searchText=''
    }

})
</script>

<style scoped>
.class-name{
    border-bottom: 1px solid;
    border-color: #15a775;
    padding-bottom: 10px;
}

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

.plus-button{
    background-color: #f3f3f3;
    border-radius: 30px;
    padding: 10px 20px;
    margin-bottom: 3rem;
}
</style>