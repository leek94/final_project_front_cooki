<template>
    <h4 class="fw-bold m-5">리뷰</h4>
    <!-- 평점 -->
    <div class="d-flex py-1 px-4" style="align-items: center;">
        <h5 class="m-2" style="font-weight: bold;"> 클래스 평점</h5>
        <div class="star m-2">
            <img src="/images/photos/ic_star.png">
        </div>
        <div style="font-weight: bold;">{{ avgCrratio }} 점</div>
    </div>

    <!-- 댓글 등록 -->
    <!-- 로그인 한 유저만 등록 가능 v-show로 -->
    <div class="d-flex p-2 m-2 border rounded bg-light" v-if="store.state.userId != '' && isParticipant == 1">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;" v-if="!store.state.mimgoname">
        <img class="m-3 rounded-circle" :src="`${axios.defaults.baseURL}/member/mattach/${store.state.userId}`" style="width: 50px; height: 50px;" v-if="store.state.mimgoname">
        <div class="flex-grow-1 row my-3">
             <div class="d-flex mb-1">
                  <div class="me-3" style="font-weight: bold;">{{ $store.state.mnickname }}</div>
             </div>
                <!-- 별점 체크 -->
                <!-- onclick 이벤트로 클릭스 하얀별에서 노란별로 바뀌고 폼 저장할 때 별점도 입력되게 하기 -->
                <div class="d-flex pb-2" style="align-items: center;">
                    <div class="star" v-for="index in 5" :key="index" @click="starCheck(index)">
                        <!-- 클릭된 별의 인덱스보다 작은 숫자의 별들은 star로 표시/ 크거나 같은 숫자의 별들은 star_white로 표시 -->
                        <div v-show="index<=starClick"><img src="/images/photos/ic_star.png"> </div>
                        <div v-show="index>starClick"><img src="/images/photos/ic_star_white.png"></div>                
                    </div>
                    <h6 class="m-2">별점을 입력해주세요</h6>
                </div>
                
                <!-- 리뷰 내용 입력 -->
                <div class="w-100 row pe-5">
                    <div class="me-3" style="font-weight: bold;">제목 : </div>
                    <input class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="리뷰 제목을 입력해주세요." v-model="reviewInit.crtitle">
                    <div class="me-3" style="font-weight: bold;">내용 : </div>
                    <textarea class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="리뷰 내용을 입력해주세요." v-model="reviewInit.crcontent"></textarea>
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
        </div>
    </div>
    <!-- 로그인 안했을 경우 v-if-->
    <div class="d-flex p-2 m-2 border rounded bg-light" style="color: gray;" v-if="store.state.userId == '' || isParticipant == 0">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3" style="align-items: center;">

            <h6 class="m-1">리뷰는 해당 클래스의 출석자에 한해서만 작성이 가능합니다 </h6>
        </div>
    </div>   



    <!------------------------------------------------ 리뷰 보기 / 수정 ------------------------------------------------>
    <div  v-if="isReview">
        <div v-for="(review, index) in reviewArray" :key="index">
            <!-- 등록된 리뷰 보기 -->
            <div class="d-flex p-1" v-if="!isReviewArray[index]">
                <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;" v-if="!review.mimgoname">
                <img class="m-3 rounded-circle" :src="`${axios.defaults.baseURL}/member/mattach/${review.mid}`" style="width: 50px; height: 50px;" v-if="review.mimgoname">
                <div class="flex-grow-1 row my-3">
                    <div class="d-flex mb-1">
                        <div class="me-3" style="font-weight: bold;">{{ review.mnickname }}</div>
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
                    <div class=" text-end mt-3 pe-5" v-if="isWriter[index]">
                        <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewUpdateOpen(index)">수정</button>
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
                <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;" v-if="!review.mimgoname">
                <img class="m-3 rounded-circle" :src="`${axios.defaults.baseURL}/member/mattach/${review.mid}`" style="width: 50px; height: 50px;" v-if="review.mimgoname">
                <div class="flex-grow-1 row my-3">
                    <div class="d-flex mb-1">
                        <div class="me-3" style="font-weight: bold;">{{ review.memberMid }}</div>
                    </div>
                    
                        <div class="d-flex mb-1">
                            <div class="me-3" style="font-weight: bold;">{{nickname}}</div>
                        </div>
                        <!-- 별점 체크 수정 -->
                        <div class="d-flex pb-2" style="align-items: center;">
                            <div class="star" v-for="starIndex in 5" :key="starIndex" @click="starCheckUpdate(index,starIndex)">
                                <!-- 클릭된 별의 인덱스보다 작은 숫자의 별들은 star로 표시/ 크거나 같은 숫자의 별들은 star_white로 표시 -->
                                <div v-show="starIndex<=review.crratio"><img src="/images/photos/ic_star.png"> </div>
                                <div v-show="starIndex>review.crratio"><img src="/images/photos/ic_star_white.png"></div>                
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
                        <div class=" text-end mt-3 pe-5" v-if="isWriter[index]">
                            <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewUpdate(index)">등록</button>
                            <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;" @click="reviewClose(index)">닫기</button>
                        </div>
                    
                </div>
            </div>
        </div>
    </div>

    <div class="d-flex p-5 m-5" style="justify-content: center; color: grey; font-weight: bold;" v-if="!isReview">등록된 리뷰가 없습니다. </div>

    <!--페이지네이션-->
    <div class="text-center" v-if="page.pager.totalRows!==0">
        <button class="initial btn btn-sm" @click="changePageNo(1)"> 처음 </button>
        <button class="prev btn btn-sm" v-if="page.pager.groupNo>1" @click="changePageNo(page.pager.startPageNo-1)">이전</button>
        <button class="btn btn-sm" v-for="pageNo in page.pager.pageArray" :key="pageNo" @click="changePageNo(pageNo)">{{pageNo}}</button>
        <button class="btn btn-sm" v-if="page.pager.groupNo<page.pager.totalGroupNo" @click="changePageNo(page.pager.endPageNo+1)">다음</button>
        <button class="last btn btn-sm" @click="changePageNo(page.pager.totalPageNo)">마지막</button>
    </div>

</template>

<script setup>
import classAPI from '@/apis/classAPI';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useStore } from 'vuex';

//클래스 번호 가져오기
const route = useRoute();
const cno = route.query.cno;

//댓글
const reviewInit = ref({});
const review = ref({});
const reviewArray = ref([]);
const store =useStore();

//댓글 유효성 검사를 위한 출석리트스
const participantList = ref([]);
const isParticipant = ref(0);

//v-if 변수
const isReview = ref(true);
const isReviewArray = ref([]);


//페이지네이션 변수
//const pageNo = ref(route.query.pageNo||1);
const pageNo = ref(1);
const page=ref({
    pager:{}
})
//const pager = ref({})

//리뷰 등록 전 초기 평점
let avgCrratio = ref(0);

//별점 체크 디폴트값 설정
const starClick = ref(0);

//댓글 수정 및 삭제를 위한 글쓴이 여부
const isWriter = ref([]);

//별점 체크 함수
function starCheck(index) {
    starClick.value = index;
    //console.log("별점체크후에 저장되는 값:",index)
    reviewInit.value.crratio = index;
}

//별점 수정 함수
function starCheckUpdate(index, starIndex) {
    reviewArray.value[index].crratio = starIndex;
    //return classAPI.reviewUpdate(JSON.parse(JSON.stringify(reviewArray.value[index])));
}

//날짜 형식 함수
function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}


async function reviewInsertValid() {
    //출결 여부 확인 후 출결한 사람에 한해서 댓글 등록할 수 있도록 해주기
    const response = await classAPI.getParticpantList(cno);
    participantList.value = response.data.participantList;
    console.log("출석리스트", participantList.value);
    for(let i=0; i<participantList.value.length; i++) {
        console.log("participantList.value[i].mid",participantList.value[i].mid)
        console.log("participantList.value[i].isParticipant", participantList.value[i].isParticipant)
        if(participantList.value[i].mid === store.state.userId && participantList.value[i].isParticipant ==='1') {
            isParticipant.value = 1;
        } 
        
    }
    console.log("isParticipant.value" , isParticipant.value)
}
reviewInsertValid()

 
/*
async function reviewInsertValid() {
    //출결 여부 확인 후 출결한 사람에 한해서 댓글 등록할 수 있도록 해주기
    const response = await classAPI.getParticpantList(cno);
    participantList.value = response.data.participantList;
    console.log("출석리스트", participantList.value);
    console.log("participantList.value.length", participantList.value.length)
    for(let i=0; i<participantList.value.length; i++) {
        if(participantList.value[i].mid === store.state.userId && participantList.value[i].isParticipant ==='1') {
            isParticipant.value = 1;
        } 
    }
    console.log("isParticipant.value", isParticipant.value)
    if(isParticipant.value == 1) {
        reviewInsert()
    } else {
        alert("리뷰 댓글은 해당 클래스의 출석자에 한해서만 작성이 가능합니다 ")
    }
   
}

*/

//------- review data insert function ---------------------------------------------------------------------------------------------- 

async function reviewInsert() {
    //reviewArray.value.push({crtitle: review.value.crtitle, crcontent: review.value.crcontent, crratio: review.value.crratio })
    reviewInit.value = {crtitle: reviewInit.value.crtitle, crcontent: reviewInit.value.crcontent, crratio: reviewInit.value.crratio, cno: cno};
    console.log("리뷰데이터: ", JSON.parse(JSON.stringify(reviewInit.value)));
    
    try{
        if(reviewInit.value.crtitle == null || reviewInit.value.crtitle == '' || reviewInit.value.crcontent == null || reviewInit.value.crcontent == '' || starClick.value == 0) {
            alert("별점, 제목, 내용을 모두 입력해주세요")
        } else {
            const response  = await classAPI.reviewRegister(JSON.parse(JSON.stringify(reviewInit.value)));
            isReview.value = true
            getReview(cno);
            console.log("리뷰있는지확인: " , isReview.value)
            reviewInit.value.crtitle = '';
            reviewInit.value.crcontent = '';
            starClick.value = 0;
        }    
    } catch (error) {
        console.log(error);
    }
    console.log("리뷰insert 객체", JSON.parse(JSON.stringify(reviewInit.value)));
}

//------- review data read function ---------------------------------------------------------------------------------------------- 

//댓글 등록 시 프로필 이미지를 바인딩 하기 위한 변수

async function getReview(cno, pageNo) {

        const response1 = await classAPI.reviewRead(cno, pageNo);
        reviewArray.value = response1.data.classReviewList;
        page.value.pager= response1.data.pager;

        if (reviewArray.value.length==0) {
        isReview.value = false
        } else {
            avgCrratio.value = response1.data.avgCrratio;
            for(let i=0; i<reviewArray.value.length; i++){
                reviewArray.value[i].crdate = dateFormat(new Date(reviewArray.value[i].crdate));
                // review 정보 수정 취소 버튼 클릭시 초기값으로 돌려주기 위한 설정
                reviewArray.value[i].originalCrtitle = reviewArray.value[i].crtitle;
                reviewArray.value[i].originalCrcontent = reviewArray.value[i].crcontent;
                reviewArray.value[i].originalCrratio = reviewArray.value[i].crratio;
               
                if(reviewArray.value[i].mid == store.state.userId) {
                    isWriter.value[i] = true;
                } else {
                    isWriter.value[i] = false;
                }
                
            }
        }
 
    console.log("별점 평균:" , avgCrratio.value);
    console.log("리뷰어레이 길이:" , reviewArray.value.length);
    console.log("리뷰 목록:", JSON.parse(JSON.stringify(reviewArray.value)));
    console.log("isWriter", isWriter.value)
    console.log("reviewArray.value", reviewArray.value)
}

getReview(cno, pageNo.value);

//페이지를 변경했을 때 해당 페이지의 댓글을 가져오는 함수
function changePageNo(pageNo){
    getReview(cno, pageNo);
}

//------- review data update function ---------------------------------------------------------------------------------------------- 

function reviewUpdateOpen(index) {
    isReviewArray.value[index] = !isReviewArray.value[index];
    console.log("리뷰 수정창 열기")
}

function reviewUpdate(index) {
    //reviewArray.value[index] = {crtitle: review.value.crtitle, crcontent: review.value.crcontent, crratio: review.value.crratio };
    review.value.crtitle = reviewArray.value[index].crtitle
    review.value.crcontent = reviewArray.value[index].crcontent;
    //reviewArray.value[index].crratio = starClick.value;
    review.value.crratio = reviewArray.value[index].crratio;
    console.log(JSON.parse(JSON.stringify(review.value)))

    //review 정보 수정 취소 버튼 클릭시 초기값으로 돌려주기 위한 설정
    reviewArray.value[index].originalCrtitle = review.value.crtitle;
    reviewArray.value[index].originalCrcontent = review.value.crcontent;
    reviewArray.value[index].originalCrratio = review.value.crratio;
    isReviewArray.value[index] = !isReviewArray.value[index];

    return classAPI.reviewUpdate(JSON.parse(JSON.stringify(reviewArray.value[index])));
}

function reviewClose(index) {
    reviewArray.value[index].crtitle = reviewArray.value[index].originalCrtitle;
    reviewArray.value[index].crcontent = reviewArray.value[index].originalCrcontent;
    reviewArray.value[index].crratio = reviewArray.value[index].originalCrratio;
    isReviewArray.value[index] = !isReviewArray.value[index];
}

//------- review data delete function ---------------------------------------------------------------------------------------------- 

async function reviewDelete(index) {
    try {
        let crno = reviewArray.value[index].crno;
        reviewArray.value.splice(index, 1);
        const response = await classAPI.reviewDelete(crno);
        console.log("엑시오스 요청 후 리뷰 목록:", JSON.parse(JSON.stringify(reviewArray.value)));
        console.log("엑시오스 요청 후 isWriter:", JSON.parse(JSON.stringify(isWriter.value)));
        getReview(cno);
        console.log("리뷰 목록 다시 불러오기 후 리뷰 목록:", JSON.parse(JSON.stringify(reviewArray.value)));
        console.log("리뷰 목록 다시 불러오기 후 리뷰 목록:", JSON.parse(JSON.stringify(isWriter.value)));
    } catch(error) {
        console.log(error);
    }
}


</script>

<style scoped>
</style>