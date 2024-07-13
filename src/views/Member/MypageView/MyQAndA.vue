<template>
   <div class="myqna">
    <h4 class="fw-bold text-start mb-4" >내가 작성한 QnA </h4>
        <div class="d-flex" style="font-size:20px">
            <p>총 &ensp;</p>
            <p style="color:darkseagreen"> {{ page.pager.totalRows }}</p>
            <p>개</p>
        </div>

        <hr class="mt-0"/>
        <div class="qcards d-flex">
        <div class="card qnaCard mt-5" style="padding:0 0 10px 0 " v-for="(qna,index) in qnaCard" :key="index" @click="routerLinkto(index)">
            <div class="card-body">
                <div v-if="qnaCard[index].qreply== null" class="qnaAnswered mb-3" style="background-color: #eff9ef; color:gray">미답변</div>
                <div v-if="qnaCard[index].qreply!= null" class="qnaAnswered mb-3" style="background-color: #15a775;; color:white">답변완료</div>
                
            </div>
            <div class="qtitle d-flex" style="font-size: 16px; color:grey" v-if="page.pager.totalRows !==0">
                <div style="border-right:1px solid grey; padding:0 20px">{{qnaCard[index].ctitle}}</div>
                <diV style="padding:0 30px">{{ qnaCard[index].qtitle }}</diV>
            </div>
            <div class="qcont mt-4"  style="font-size: 17px; font-weight:bold ;color:black;">
                <diV style="padding:0 20px;">
                   {{ qnaCard[index].qcontent}}
                </diV>
            </div>
            <div class="qdate mt-4 text-start" style="padding:0 20px; color:gray">{{ qnaCard[index].qdate }}</div>
        </div>     
        </div>

        <div class="text-center mt-5"  v-if="page.pager.totalRows !==0">
                <button class="initial btn btn-sm" @click="changePageNo(1)"> 처음 </button>
                <button class="prev btn btn-sm" v-if="page.pager.groupNo>1" @click="changePageNo(page.pager.startPageNo-1)">이전</button>
                <button class="btn btn-sm" v-for="pageNo in page.pager.pageArray" :key="pageNo" @click="changePageNo(pageNo)">{{pageNo}}</button>
                <button  class="btn btn-sm" v-if="page.pager.groupNo<page.pager.totalGroupNo" @click="changePageNo(page.pager.endPageNo+1)">다음</button>
                <button class="last btn btn-sm" @click="changePageNo(page.pager.totalPageNo)">마지막</button>
        </div>
    </div>

    <div v-if="page.pager.totalRows ===0" style="margin-top:100px">
                <div style="margin: 60px auto; text-align: center">
                    <h5>내가 작성한 문의가 없습니다.</h5>
                    <div style="text-align: center; margin-top: 30px;">
                        <RouterLink class="" to="/Class/ClassListView" style="text-align: center; text-decoration: none;font-size: 17px">
                            <button class="backList btn btn-outline-success">클래스 문의하기</button>
                        </RouterLink>
                    </div>
                </div>
    </div>
</template>

<script setup>
import memberAPI from '@/apis/memberAPI';
import { tr } from 'date-fns/locale';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const mid = store.state.userId;
const route = useRoute();
const qnaCard = ref([ ]);
const page=ref({
    pager:{}
})
const pageNo = ref(route.query.pageNo||1);
//const qnaCount = computed(() => qnaCard.value.length);

//dateFormating (2024-06-28)
function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

//내가 쓴 Q&A read 함수
async function myQAndA() {
    try{
        const response = await memberAPI.getMyQAndA(mid, pageNo.value);
        qnaCard.value = response.data.myQnaList;
        page.value.pager = response.data.pager
        for(let i=0; i<qnaCard.value.length; i++) {
            qnaCard.value[i].qdate = dateFormat(new Date(qnaCard.value[i].qdate))
        }
    } catch(error) {
        console.log(error);
    }
    console.log("문의리스트", qnaCard.value.length)
}

myQAndA();

//카드 클릭 시 해당 클래스의 Q&A 카테고리로 이동함
const router= useRouter();
function routerLinkto(index){
    router.push(`/Class/ClassDetailView/QAndA?cno=${qnaCard.value[index].cno}`);
}


function changePageNo(argpageNo){
    router.push(`/Member/MypageView/MyQAndA?pageNo=${argpageNo}`);
}

watch(route,(newRoute,oldRoute) => {
    if(newRoute.query.pageNo){ 
        pageNo.value=newRoute.query.pageNo;
        myQAndA(mid);
    } else {   
        //pageNo가 존재하지 않으면 list를 다시 호출하기 위한 초기값을 설정해주는 것
        pageNo.value=1;
    }
})
</script>

<style scoped>
.myqna{
    padding:50px 0 0;
    width:80%;
    height:auto;
    text-align:center;
    margin:0 auto;

}
.qcards{ 
    flex-wrap: wrap;
    justify-content: space-between


}

.qnaCard{
    border:solid 1px #e5e5e5;
    border-radius: 0.7rem;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
    width: 47%;
    height:auto;
    margin-top:3.5rem;
}
.qnaAnswered{
    width:100px;
    height:40px;
    align-content: center;
    border-radius: 10px;
    font-weight: bold;
}

.qcont{
   line-clamp: 2; /* 원하는 줄 수 지정 */
   -webkit-box-orient: vertical; /* 수직으로 텍스트를 표시 */
   overflow: hidden; /* 넘치는 부분을 숨김 */
}

.btn:hover {
    background-color: #15a775;
    color: white;
    font-weight: bold;
}

.btn:active {
    background-color: #15a775;
    color: white;
    font-weight: bold;
}

.backList{
    font-size: 1rem;
    font-weight: bold;
    padding:1.5rem 2.938rem 1.438rem 3rem; 
    border-radius: 38px;

}
</style>