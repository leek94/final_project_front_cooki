<template>
   <div class="myqna">
    <h4 class="fw-bold text-start mb-4" >내가 작성한 QnA </h4>
        <div class="d-flex" style="font-size:20px">
            <p>총 &ensp;</p>
            <p style="color:darkseagreen"> {{qnaCard.length}}</p>
            <p>개</p>
        </div>

        <hr class="mt-0"/>
        <div class="qcards d-flex">
        <div class="card qnaCard mt-5" style="padding:0 0 10px 0 " v-for="(qna,index) in qnaCard" :key="index" @click="routerLinkto(index)">
            <div class="card-body">
                <div v-if="qnaCard[index].qreply== null" class="qnaAnswered mb-3" style="background-color: #eff9ef; color:gray">미답변</div>
                <div v-if="qnaCard[index].qreply!= null" class="qnaAnswered mb-3" style="background-color: #15a775;; color:white">답변완료</div>
                
            </div>
            <div class="qtitle d-flex" style="font-size: 16px; color:grey">
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


    </div>
</template>

<script setup>
import memberAPI from '@/apis/memberAPI';
import { tr } from 'date-fns/locale';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const mid = store.state.userId;

const qnaCard = ref([ ]);
//const qnaCount = computed(() => qnaCard.value.length);

//dateFormating (2024-06-28)
function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

//내가 쓴 Q&A read 함수
async function myQAndA(mid) {
    try{
        const response = await memberAPI.getMyQAndA(mid);
        qnaCard.value = response.data.myQnaList;
        
        for(let i=0; i<qnaCard.value.length; i++) {
            qnaCard.value[i].qdate = dateFormat(new Date(qnaCard.value[i].qdate))
        }
    } catch(error) {
        console.log(error);
    }
    console.log("문의리스트", qnaCard.value.length)
}

myQAndA(mid);

//카드 클릭 시 해당 클래스의 Q&A 카테고리로 이동함
const router= useRouter();
function routerLinkto(index){
    router.push(`/Class/ClassDetailView/QAndA?cno=${qnaCard.value[index].cno}`);
}

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
   /* 텍스트 바디 한줄로 표시하는 css*/
   display: -webkit-box; /* 웹킷 기반 브라우저에서 다음 속성을 사용하기 위한 설정 */
   -webkit-line-clamp: 2; /* 원하는 줄 수 지정 */
   -webkit-box-orient: vertical; /* 수직으로 텍스트를 표시 */
   overflow: hidden; /* 넘치는 부분을 숨김 */
}
</style>