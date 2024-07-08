<template>
    <div class="d-flex py-1 px-4" style="align-items: center;">
        <h5 class="m-2" style="font-weight: bold;"> 레시피 리뷰</h5>
        <div class="star m-2">
            <img src="/images/photos/ic_star.png">
        </div>
    </div>

    <!-- 댓글 등록 -->
    <!-- 로그인 한 유저만 등록 가능 v-show로 -->
    <div class="d-flex p-2 m-2 border rounded bg-light">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3">
            <!-- 리뷰 내용 입력 -->
            <div class="w-100 row pe-5">
                <div class="me-3" style="font-weight: bold;">제목 : </div>
                <input class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="리뷰 제목을 입력해주세요." v-model="reviewInit.rrtitle">
                <div class="me-3" style="font-weight: bold;">내용 : </div>
                <textarea class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="리뷰 내용을 입력해주세요." v-model="reviewInit.rrcontent"></textarea>
            </div>
            <div class=" text-end mt-3 pe-5">
                <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewInsert">등록</button>
            </div>
        </div>
    </div>
    <!-- 로그인 안했을 경우 v-if-->
    <div class="d-flex p-2 m-2 border rounded bg-light" style="color: gray;">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3" style="align-items: center;">

            <h6 class="m-1"><RouterLink to="/Member/LoginView">로그인</RouterLink> 하시고 리뷰를 남겨보세요.</h6>
        </div>
    </div>   



    <!------------------------------------------------ 리뷰 보기 / 수정 ------------------------------------------------>
    <div v-for="(review, index) in reviewArray" :key="index">
        <!-- 등록된 리뷰 보기 -->
        <div class="d-flex p-1" v-if="!isReviewArray[index]">
            <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
            <div class="flex-grow-1 row my-3">
                <div class="d-flex mb-1">
                    <div class="me-3" style="font-weight: bold;">{{ review.mnickname }}</div>
                    <div style="color: grey; font-size: small">{{ review.rrdate }}</div>
                </div>
                <div style="color: grey; font-weight: bold;">
                    {{ review.rrtitle }}
                </div>
                <div style="color: grey;">
                    {{ review.rrcontent }}
                </div>
                <!-- 작성자에게만 보여야 하는 버튼 -->
                <div class=" text-end mt-3 pe-5">
                    <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewUpdateOpen(index)">수정</button>
                    <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewDelete(index)">삭제</button>
                </div>
            </div>
        </div>

        <!-- 리뷰 수정 -->
        <div class="d-flex p-2 m-2 border rounded bg-light" v-if="isReviewArray[index]">
            <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
            <div class="w-100 row pe-5">
                <div class="me-3" style="font-weight: bold;">제목 : </div>
                <input class="p-3 ms-3 me-3 border rounded" style="color: grey;" v-model="review.rrtitle">
                <div class="me-3" style="font-weight: bold;">내용 : </div>
                <textarea class="p-3 ms-3 me-3 border rounded" style="color: grey;" v-model="review.rrcontent"></textarea>
            </div>
            <div class=" text-end mt-3 pe-5">
                <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewUpdate(index)">등록</button>
                <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewClose(index)">닫기</button>
            </div>
        </div>
    </div>

</template>

<script setup>
import recipeAPI from '@/apis/recipeAPI';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
const store = useStore();
const route = useRoute();
const rno = route.query.rno;

const reviewInit = ref({
    rrtitle: "",
    rrcontent: "",
    mid: null,
    rno: null,
});

const review = ref({});
const reviewArray = ref([]);
const isReviewArray = ref([]);

//dateFormating (2024-06-28)
function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

//------- review data insert function ---------------------------------------------------------------------------------------------- 

async function reviewInsert() {
    reviewInit.value.rno = rno;
    reviewInit.value.mid = store.state.userId;
    const data = JSON.parse(JSON.stringify(reviewInit.value));
    try{
       const response =  await recipeAPI.registerRecipeReview(data);
       console.log("등록 성공");
    }catch{
        console.log("등록 실패");
    }

    getReview(rno);

    reviewInit.value = {};
}
//------- review data read function ---------------------------------------------------------------------------------------------- 

async function getReview(rno) {
    try{
        const response = await recipeAPI.recipeReviewList(rno);
        reviewArray.value = response.data
        for(let i=0; i<reviewArray.value.length; i++){
            reviewArray.value[i].originalRRrtitle = reviewArray.value[i].rrtitle;
            reviewArray.value[i].originalRrcontent = reviewArray.value[i].rrcontent;
            reviewArray.value[i].rrdate = dateFormat(new Date(reviewArray.value[i].rrdate));
        }
        console.log("리뷰 성공")
    } catch(error) {
        console.log(error);
    }
}

getReview(rno);

//------- review data update function ---------------------------------------------------------------------------------------------- 

function reviewUpdateOpen(index) {
    isReviewArray.value[index] = !isReviewArray.value[index];
    console.log("리뷰 수정창 열기")
}

async function reviewUpdate(index) {
    const data = JSON.parse(JSON.stringify(reviewArray.value[index]));
    isReviewArray.value[index] = !isReviewArray.value[index]; 
    try{
        const response = await recipeAPI.recipeReviewUpdate(data);
        getReview(rno);
        console.log("업데이트 완료");
    }catch{
        console.log("업데이트 실패");
    }
}

function reviewClose(index) {
    reviewArray.value[index].rrtitle = reviewArray.value[index].originalRrtitle;
    reviewArray.value[index].rrcontent = reviewArray.value[index].originalRrcontent;
    isReviewArray.value[index] = !isReviewArray.value[index];
}

//------- review data delete function ---------------------------------------------------------------------------------------------- 

async function reviewDelete(index) {
    const rrno = reviewArray.value[index].rrno;
    try{
        const respons = await recipeAPI.recipeReviewDelete(rrno);
        console.log("성공");
    }catch{
        console.log("실패");
    } 
    getReview(rno);
}

</script>

<style scoped>
</style>