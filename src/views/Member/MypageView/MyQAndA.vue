<template>
   <div class="myqna">
    <h4 class="fw-bold text-start mb-4" >내가 작성한 QnA </h4>
        <div class="d-flex" style="font-size:20px">
            <p>총 &ensp;</p>
            <p style="color:darkseagreen"> {{qnaCount}}</p>
            <p>개</p>
        </div>

        <hr class="mt-0"/>
        <div class="qcards d-flex">
        <div class="card qnaCard mt-5" style="padding:0 0 10px 0 " v-for="(qna,index) in qnaCard" :key="index">
            <div class="card-body">
                <div v-if="qna.qreply===''" class="qnaAnswered mb-3" style="background-color: #eff9ef; color:gray">미답변</div>
                <div v-if="qna.qreply!==''" class="qnaAnswered mb-3" style="background-color: #15a775;; color:white">답변완료</div>
                
            </div>
            <div class="qtitle d-flex" style="font-size: 16px; color:grey">
                <div style="border-right:1px solid grey; padding:0 20px">원글</div>
                <diV style="padding:0 30px">{{ qna.qtitle }}</diV>
            </div>
            <div class="qcont mt-4"  style="font-size: 17px; font-weight:bold ;color:black;">
                <diV style="padding:0 20px;">
                   {{ qna.qcontent}}</diV>
            </div>
            <div class="qdate mt-4 text-start" style="padding:0 20px; color:gray">{{ qna.qdate }}</div>
        </div>     
    </div>


    </div>
</template>

<script setup>
import { computed, ref } from 'vue';


const qnaCard=ref([
    {
        qno:1,
        qtitle:"깻잎이 질겨요",
        qcontent:
        "마트에서 뒷다리살을 사서 수육을 했어요 보통 앞다리나 삼겹살로 많이 하시던데 뒷다리가 싸서 해봤거든요.마늘 양파 등 재료넣고 잡내제거로 인스터트 커피넣고 된장넣고 1시간 30분 삶았는데 넘 질기더라규요 ㅠ.ㅠ 부드러운 수육맛을 원했는데 고기종류가 문제였을까요 아님 시간이 문제였을까요?",
        qdate:"2024.06.19 11:23",
        qreply:''
    },
    {
        qno:2,
        qtitle:"깻잎이 질겨요",
        qcontent:
        "마트에서 뒷다리살을 사서 수육을 했어요 보통 앞다리나 삼겹살로 많이 하시던데 뒷다리가 싸서 해봤거든요.마늘 양파 등 재료넣고 잡내제거로 인스터트 커피넣고 된장넣고 1시간 30분 삶았는데 넘 질기더라규요 ㅠ.ㅠ 부드러운 수육맛을 원했는데 고기종류가 문제였을까요 아님 시간이 문제였을까요?",
        qdate:"2024.06.19 11:23",
        qreply:''
    },
    {
        qno:2,
        qtitle:"깻잎이 질겨요",
        qcontent:
        "마트에서 뒷다리살을 사서 수육을 했어요 보통 앞다리나 삼겹살로 많이 하시던데 뒷다리가 싸서 해봤거든요.마늘 양파 등 재료넣고 잡내제거로 인스터트 커피넣고 된장넣고 1시간 30분 삶았는데 넘 질기더라규요 ㅠ.ㅠ 부드러운 수육맛을 원했는데 고기종류가 문제였을까요 아님 시간이 문제였을까요?",
        qdate:"2024.06.19 11:23",
        qreply:'1'
    }

])
const qnaCount = computed(() => qnaCard.value.length);
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