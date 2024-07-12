<template>
    <h4 class="fw-bold m-5">리뷰</h4>

    <!-- 댓글 등록 -->
    <!-- 로그인 한 유저만 등록 가능 v-show로 -->
    <div class="d-flex p-2 m-2 border rounded bg-light" v-if="store.state.userId != ''">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;" v-if="!isProfileIMG">
        <img class="m-3 rounded-circle" :src="`${axios.defaults.baseURL}/member/mattach/${store.state.userId}`" style="width: 50px; height: 50px;" v-if="isProfileIMG">
        <div class="flex-grow-1 row my-3">
             <div class="d-flex mb-1">
                  <div class="me-3" style="font-weight: bold;">{{nickname}}</div>
             </div>            
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
    <div class="d-flex p-2 m-2 border rounded bg-light" style="color: gray;" v-if="store.state.userId == ''">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3" style="align-items: center;">

            <h6 class="m-1"><RouterLink to="/Member/LoginView">로그인</RouterLink> 하시고 리뷰를 남겨보세요.</h6>
        </div>
    </div>   



    <!------------------------------------------------ 리뷰 보기 / 수정 ------------------------------------------------>
    <div  v-if="isReview">
        <div v-for="(review, index) in reviewArray" :key="index">
            <!-- 등록된 리뷰 보기 -->
            <div class="d-flex p-1" v-if="!isReviewArray[index]">
                <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;" v-if="!isProfileIMGArray[index]">
                <img class="m-3 rounded-circle" :src="`${axios.defaults.baseURL}/member/mattach/${review.mid}`" style="width: 50px; height: 50px;" v-if="isProfileIMGArray[index]">
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
                    <div class=" text-end mt-3 pe-5" v-if="isWriter[index]">
                        <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewUpdateOpen(index)">수정</button>
                        <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewDelete(index)">삭제</button>
                    </div>
                </div>
            </div>
    
            <!-- 리뷰 수정 -->
            <!-- 로그인 한 유저만 등록 가능 v-show로 -->
            <div class="d-flex p-2 m-2 border rounded bg-light" v-if="isReviewArray[index]">
                <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;" v-if="!isProfileIMGArray[index]">
                <img class="m-3 rounded-circle" :src="`${axios.defaults.baseURL}/member/mattach/${review.mid}`" style="width: 50px; height: 50px;" v-if="isProfileIMGArray[index]">
                <div class="flex-grow-1 row my-3">
                    <div class="d-flex mb-1">
                        <div class="me-3" style="font-weight: bold;">{{ nickname }}</div>
                    </div>
                    <div class="w-100 row pe-5">
                        <div class="me-3" style="font-weight: bold;">제목 : </div>
                        <input class="p-3 ms-3 me-3 border rounded" style="color: grey;" v-model="review.rrtitle">
                        <div class="me-3" style="font-weight: bold;">내용 : </div>
                        <textarea class="p-3 ms-3 me-3 border rounded" style="color: grey;" v-model="review.rrcontent"></textarea>
                    </div>
                    <div class=" text-end mt-3 pe-5" v-if="isWriter[index]">
                        <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewUpdate(index)">등록</button>
                        <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewClose(index)">닫기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="d-flex p-5 m-5" style="justify-content: center; color: grey; font-weight: bold;" v-if="!isReview">등록된 리뷰가 없습니다. </div>


</template>

<script setup>
import recipeAPI from '@/apis/recipeAPI';
import store from '@/store';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import memberAPI from '@/apis/memberAPI';

//댓글
const reviewInit = ref({});
const review = ref({});
const reviewArray = ref([]);

//클래스 번호 가져오기
const route = useRoute();
const rno = route.query.rno;

//v-if 변수
const isReview = ref(true);
const isReviewArray = ref([]);

//댓글 수정 및 삭제를 위한 글쓴이 여부
const isWriter = ref([]);


//날짜 형식 함수
function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}


//------- review data insert function ---------------------------------------------------------------------------------------------- 

async function reviewInsert() {
    reviewInit.value = {rrtitle: reviewInit.value.rrtitle, rrcontent: reviewInit.value.rrcontent, rno: rno, mid: store.state.userId};
    console.log("리뷰데이터: ", JSON.parse(JSON.stringify(reviewInit.value)));
    try{
        const response  = await recipeAPI.registerRecipeReview(JSON.parse(JSON.stringify(reviewInit.value)));
        isReview.value = true
        getReview(rno);
        console.log("리뷰있는지확인: " , isReview.value)
        reviewInit.value.rrtitle = '';
        reviewInit.value.rrcontent = '';
        
    } catch (error) {
        console.log(error);
    }
    console.log("리뷰insert 객체", JSON.parse(JSON.stringify(reviewInit.value)));
}

//------- review data read function ---------------------------------------------------------------------------------------------- 

//댓글 등록 시 프로필 이미지를 바인딩 하기 위한 변수
const isProfileIMG = ref();
const isProfileIMGArray = ref([]);

let nickname = ref();

async function getReview(rno) {

    //댓글 작성을 위한 로그인한 유저 닉네임 가져오는 로직
    const response = await memberAPI.getMyProfile(store.state.userId);
    nickname.value = response.data.member.mnickname
    console.log("닉네임", response.data.member.mnickname)

    try{
        const response1 = await recipeAPI.recipeReviewList(rno);
        reviewArray.value = response1.data

        //댓글 등록 시에 보여지는 프로필 이미지 가져오는 로직
        const response2 = await memberAPI.getMyProfile(store.state.userId);
        if(response2.data.member.mimgoname==null) {
            isProfileIMG.value = false;
        } else {
            isProfileIMG.value = true;
        }

        if (reviewArray.value.length==0) {
        isReview.value = false
        } else {
            for(let i=0; i<reviewArray.value.length; i++){
                reviewArray.value[i].rrdate = dateFormat(new Date(reviewArray.value[i].rrdate));
                // review 정보 수정 취소 버튼 클릭시 초기값으로 돌려주기 위한 설정
                reviewArray.value[i].originalRrtitle = reviewArray.value[i].rrtitle;
                reviewArray.value[i].originalRrcontent = reviewArray.value[i].rrcontent;
               
                if(reviewArray.value[i].mid == store.state.userId) {
                    isWriter.value[i] = true;
                } else {
                    isWriter.value[i] = false;
                }
                
                //등록된 댓글 프로필 이미지 가져오는 로직
                //댓글배열의 mid를 매개변수로 axios 요청을 통해 받아오는 mimgoname이 null 값일 경우 public 이미지로 지정하는 v-if
                //댓글배열의 mid를 매개변수로 axios 요청을 통해 받아오는 mimgoname 값이 있을 경우 img :src에 경로 지정하는 v-if 
                const response3 = await memberAPI.getMyProfile(reviewArray.value[i].mid)
                if(response3.data.member.mimgoname==null) {
                    isProfileIMGArray.value[i] = false
                } else {
                    isProfileIMGArray.value[i] = true
                }
            }
        }
    } catch(error) {
        console.log(error);
    }
    console.log("리뷰어레이 길이:" , reviewArray.value.length);
    console.log("리뷰 목록:", JSON.parse(JSON.stringify(reviewArray.value)));
    console.log("isWriter", isWriter.value)
    console.log("reviewArray.value", reviewArray.value)
}

if(store.state.userId !== ""){
    getReview(rno)
}


//------- review data update function ---------------------------------------------------------------------------------------------- 

function reviewUpdateOpen(index) {
    isReviewArray.value[index] = !isReviewArray.value[index];
    console.log("리뷰 수정창 열기")
}

function reviewUpdate(index) {
    //reviewArray.value[index] = {crtitle: review.value.crtitle, crcontent: review.value.crcontent, crratio: review.value.crratio };
    review.value.rrtitle = reviewArray.value[index].rrtitle
    review.value.rrcontent = reviewArray.value[index].rrcontent;
    console.log(JSON.parse(JSON.stringify(review.value)))

    //review 정보 수정 취소 버튼 클릭시 초기값으로 돌려주기 위한 설정
    reviewArray.value[index].originalRrtitle = review.value.rrtitle;
    reviewArray.value[index].originalRrcontent = review.value.rrcontent;
    reviewArray.value[index].originalRrratio = review.value.rrratio;
    isReviewArray.value[index] = !isReviewArray.value[index];

    return recipeAPI.recipeReviewUpdate(JSON.parse(JSON.stringify(reviewArray.value[index])));
}

function reviewClose(index) {
    reviewArray.value[index].rrtitle = reviewArray.value[index].originalRrtitle;
    reviewArray.value[index].rrcontent = reviewArray.value[index].originalRrcontent;
    reviewArray.value[index].rrratio = reviewArray.value[index].originalRrratio;
    isReviewArray.value[index] = !isReviewArray.value[index];
}

//------- review data delete function ---------------------------------------------------------------------------------------------- 

async function reviewDelete(index) {
    try {
        let rrno = reviewArray.value[index].rrno;
        reviewArray.value.splice(index, 1);
        const response = await recipeAPI.recipeReviewDelete(rrno);
        console.log("엑시오스 요청 후 리뷰 목록:", JSON.parse(JSON.stringify(reviewArray.value)));
        console.log("엑시오스 요청 후 isWriter:", JSON.parse(JSON.stringify(isWriter.value)));
        getReview(rno);
        console.log("리뷰 목록 다시 불러오기 후 리뷰 목록:", JSON.parse(JSON.stringify(reviewArray.value)));
        console.log("리뷰 목록 다시 불러오기 후 리뷰 목록:", JSON.parse(JSON.stringify(isWriter.value)));
    } catch(error) {
        console.log(error);
    }
}


</script>

<style scoped>
</style>