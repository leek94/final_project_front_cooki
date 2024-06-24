<template>
    <h4 class="fw-bold m-5">리뷰</h4>
    <!-- 평점 -->
    <div class="d-flex py-1 px-4" style="align-items: center;">
        <h5 class="m-2 d-flex align-content-center" style="font-weight: bold;"> 클래스 평점</h5>
        <div class="star">
            <img src="/images/photos/ic_star.png">
            <img src="/images/photos/ic_star.png">
            <img src="/images/photos/ic_star.png">
        </div>
    </div>

    <!-- 댓글 등록 -->
    <!-- 로그인 한 유저만 등록 가능 v-show로 -->
    <div class="d-flex p-2 m-2 border rounded bg-light">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3">
             <div class="d-flex mb-1">
                  <div class="me-3" style="font-weight: bold;">닉네임</div>
             </div>
            <form @submit.prevent="handleSubmit">

                <!-- 별점 체크 -->
                <!-- onclick 이벤트로 클릭스 하얀별에서 노란별로 바뀌고 폼 저장할 때 별점도 입력되게 하기 -->
                <div class="d-flex pb-2" style="align-items: center;">
                    <div class="star" v-for="index in 5" :key="index" @click="starCheck(index)">
                        <!-- 클릭된 별의 인덱스보다 작은 숫자의 별들은 star로 표시/ 크거나 같은 숫자의 별들은 star_white로 표시 -->
                        <div v-show="index<starClick"><img src="/images/photos/ic_star.png"> </div>
                        <div v-show="index>=starClick"><img src="/images/photos/ic_star_white.png"></div>                
                    </div>
                    <h6 class="m-2">평점을 입력해주세요</h6>
                </div>
                
                <!-- 리뷰 내용 입력 -->
                <div class="w-100 row pe-5">
                    <div class="me-3" style="font-weight: bold;">제목 : </div>
                    <input class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="리뷰 제목을 입력해주세요." v-model="review.crtitle">
                    <div class="me-3" style="font-weight: bold;">내용 : </div>
                    <textarea class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="리뷰 내용을 입력해주세요." v-model="review.crcontent"></textarea>
                </div>
                <div class=" text-end mt-3 pe-5">
                    <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewInsert">등록</button>
                    <!-- <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;">닫기</button> -->
                </div>
                <!-- <div class="w-100 row pe-5">
                     <textarea class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="리뷰 내용을 입력해주세요." v-model="review."></textarea>
                </div>
                <div class=" text-end mt-3 pe-5">
                    <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;">등록</button>
                    <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;">닫기</button>
                </div> -->
            </form>
        </div>
    </div>
    <!-- 로그인 안했을 경우 v-if-->
    <div class="d-flex p-2 m-2 border rounded bg-light" style="color: gray;">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3" style="align-items: center;">

            <h6 class="m-1"><RouterLink to="/Member/LoginView">로그인</RouterLink> 하시고 리뷰를 남겨보세요.</h6>
        </div>
    </div>   

    <!-- 리뷰 보기 / 수정 -->
    <div v-for="(review, index) in reviewArray" :key="index">
        <!-- 등록된 리뷰 보기 -->
        <div class="d-flex p-1" v-if="!isReviewArray[index]">
            <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
            <div class="flex-grow-1 row my-3">
                <div class="d-flex mb-1">
                    <div class="me-3" style="font-weight: bold;">{{ review.memberMid }}</div>
                    <div class="star-group me-3" v-for=" n in review.crratio" :key="n">
                        <img src="/images/photos/ic_star.png">
                    </div>
                    <div style="color: grey; font-size: small">{{ review.crdate }}</div>
                </div>
                <div style="color: grey; font-weight: bold;">
                    {{ review.crtitle }}
                </div>
                <div style="color: grey;">
                    {{ review.crcontent }}
                </div>
                <!-- 작성자에게만 보여야 하는 버튼 -->
                <div class=" text-end mt-3 pe-5">
                    <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewUpdate(index)">수정</button>
                    <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewDelete(index)">삭제</button>
                </div>
                
                <!-- <div class="flex-grow-1 row justify-content-end">
                    <div class="text-end">
                        <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;">수정</button>
                        <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;">삭제</button>
                    </div>
                </div> -->
    
    
            </div>
        </div>

        <!-- 리뷰 수정 -->
        <!-- 로그인 한 유저만 등록 가능 v-show로 -->
        <div class="d-flex p-2 m-2 border rounded bg-light" v-if="isReviewArray[index]">
            <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
            <div class="flex-grow-1 row my-3">
                <div class="d-flex mb-1">
                    <div class="me-3" style="font-weight: bold;">{{ review.memberMid }}</div>
                </div>
                <form @submit.prevent="handleSubmit">

                    <!-- 별점 체크 수정 -->
                    <div class="d-flex pb-2" style="align-items: center;">
                        <div class="star" v-for="index in 5" :key="index" @click="starCheck(index)">
                            <!-- 클릭된 별의 인덱스보다 작은 숫자의 별들은 star로 표시/ 크거나 같은 숫자의 별들은 star_white로 표시 -->
                            <div v-show="index<starClick"><img src="/images/photos/ic_star.png"> </div>
                            <div v-show="index>=starClick"><img src="/images/photos/ic_star_white.png"></div>                
                        </div>
                        <h6 class="m-2">평점을 입력해주세요</h6>
                    </div>
                    <!-- 문의 내용 수정 -->
                    <div class="w-100 row pe-5">
                        <div class="me-3" style="font-weight: bold;">제목 : </div>
                        <input class="p-3 ms-3 me-3 border rounded" style="color: grey;" v-model="review.crtitle">
                        <div class="me-3" style="font-weight: bold;">내용 : </div>
                        <textarea class="p-3 ms-3 me-3 border rounded" style="color: grey;" v-model="review.crcontent"></textarea>
                    </div>
                    <div class=" text-end mt-3 pe-5">
                        <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewUpdate(index)">등록</button>
                        <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewClose(index)">닫기</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';

const review = ref({});
const reviewArray = ref([
    {
        memberMid: '유저1',
        crtitle:'리뷰제목111',
        crcontent:'리뷰내용111',
        crratio: 5,
        crdate: '몇시몇분'
    },
    {
        memberMid: '유저2',
        crtitle:'리뷰제목222',
        crcontent:'리뷰내용2222',
        crratio: 3,
        crdate: '몇시몇분'
    },
    {
        memberMid: '유저3',
        crtitle:'리뷰제목333',
        crcontent:'리뷰내용333',
        crratio: 4,
        crdate: '몇시몇분'
    },
]);

const isReview = ref(false);
const isReviewArray = ref([]);

//별점 체크 디폴트값 설정
const starClick = ref(0);

//별점 체크 함수
function starCheck(index) {
    starClick.value = index + 1;
    review.value.crratio = starClick.value - 1;
}

function reviewInsert() {
    reviewArray.value.push({crtitle: review.value.crtitle, crcontent: review.value.crcontent, crratio: review.value.crratio })
    console.log(reviewArray.value);
    console.log(review.value);
}

function reviewUpdate(index) {
    isReviewArray.value[index] = !isReviewArray.value[index];
    //reviewArray.value[index] = {crtitle: review.value.crtitle, crcontent: review.value.crcontent, crratio: review.value.crratio };
    reviewArray.value[index].crtitle = review.value.crtitle;
    reviewArray.value[index].crcontent = review.value.crcontent;
    reviewArray.value[index].crratio = review.value.crratio;
    console.log(starClick.value);
    console.log(review.value.crratio);
    console.log({crtitle: review.value.crtitle, crcontent: review.value.crcontent, crratio: review.value.crratio });

}

function reviewDelete(index) {
    reviewArray.value.splice(index, 1);
}

function reviewClose(index) {
    isReviewArray.value[index] = !isReviewArray.value[index];
}

</script>

<style scoped>
</style>