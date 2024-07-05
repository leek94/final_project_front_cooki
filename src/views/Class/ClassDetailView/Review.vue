<template>
    <h4 class="fw-bold m-5">리뷰</h4>
    <!-- 평점 -->
    <div class="d-flex py-1 px-4" style="align-items: center;">
        <h5 class="m-2" style="font-weight: bold;"> 클래스 평점</h5>
        <div class="star m-2">
            <img src="/images/photos/ic_star.png">
        </div>
        <div class="m-2"  style="font-weight: bold;">{{ avgCrratio }}</div>
    </div>

    <!-- 댓글 등록 -->
    <!-- 로그인 한 유저만 등록 가능 v-show로 -->
    <div class="d-flex p-2 m-2 border rounded bg-light" v-if="store.state.userId != ''">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3">
             <div class="d-flex mb-1">
                  <div class="me-3" style="font-weight: bold;"></div>
             </div>
            <form>

                <!-- 별점 체크 -->
                <!-- onclick 이벤트로 클릭스 하얀별에서 노란별로 바뀌고 폼 저장할 때 별점도 입력되게 하기 -->
                <div class="d-flex pb-2" style="align-items: center;">
                    <div class="star" v-for="index in 5" :key="index" @click="starCheck(index)">
                        <!-- 클릭된 별의 인덱스보다 작은 숫자의 별들은 star로 표시/ 크거나 같은 숫자의 별들은 star_white로 표시 -->
                        <div v-show="index<=starClick"><img src="/images/photos/ic_star.png"> </div>
                        <div v-show="index>starClick"><img src="/images/photos/ic_star_white.png"></div>                
                    </div>
                    <h6 class="m-2">평점을 입력해주세요</h6>
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
            </form>
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
    <div v-for="(review, index) in reviewArray" :key="index">
        <!-- 등록된 리뷰 보기 -->
        <div class="d-flex p-1" v-if="!isReviewArray[index]">
            <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
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
            <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
            <div class="flex-grow-1 row my-3">
                <div class="d-flex mb-1">
                    <div class="me-3" style="font-weight: bold;">{{ review.memberMid }}</div>
                </div>
                <form>
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
                </form>
            </div>
        </div>
    </div>

<div class="d-flex p-2 m-2" style="justify-content: center; color: grey; font-weight: bold;">등록된 리뷰가 없습니다. </div>
</template>

<script setup>
import classAPI from '@/apis/classAPI';
import store from '@/store';
import { ref } from 'vue';

const reviewInit = ref({});
const review = ref({});
const reviewArray = ref([]);

const isReview = ref(false);
const isReviewArray = ref([]);

//별점 체크 디폴트값 설정
const starClick = ref(0);

//댓글 수정 및 삭제를 위한 글쓴이 여부
const isWriter = ref([]);

//별점 체크 함수
function starCheck(index) {
    starClick.value = index;
    console.log("별점체크후에 저장되는 값:",index)
    reviewInit.value.crratio = index;
}

//별점 수정 함수
function starCheckUpdate(index, starIndex) {
    console.log("어레이인덱스",index)  
    console.log("별인덱스",starIndex)
    reviewArray.value[index].crratio = starIndex;
    //return classAPI.reviewUpdate(JSON.parse(JSON.stringify(reviewArray.value[index])));
}

const cno = 81;

let avgCrratio = 0;

//날짜 형식 함수
function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}


async function reviewInsertValid() {
    //출결 여부 확인 후 출결한 사람에 한해서 댓글 등록할 수 있도록 해주기
   
    /*
    const response = await classAPI.classRead(cno);
    console.log("강의날짜: " , response.data.classes.cdday);
    
    //강의 날짜 체크
    let today = new Date();
    //console.log("오늘날짜: " , today); //Fri Jul 05 2024 11:36:36 GMT+0900 (한국 표준시)
    let dday = new Date(response.data.classes.cdday);
    //console.log("강의날짜데이터포맷팅: " , dday);
    let dayCheck = false;
    let testday1 = new Date("2025-06-01"); //오늘 7월 5일 true
 
    //console.log("오늘연도",today.getFullYear(),"클래스연도",testday1.getFullYear())
    if(today.getFullYear()>testday1.getFullYear()) {
        //console.log("오늘연도",today.getFullYear(),"클래스연도",testday1.getFullYear())
        dayCheck = true;
    } else if (today.getFullYear()==testday1.getFullYear()) {
        if(today.getMonth()>testday1.getMonth()) {
            dayCheck = true;
        } else if (today.getMonth()==testday1.getMonth()) {
            if(today.getDate()>=testday1.getDate()){
                dayCheck = true;
            }
        }
    }
    console.log("데이체크 결과", dayCheck)

    //강의 시간 체크
    let nowtime = new Date().getHours();
    let endtime = new Date(response.data.classes.cendtime).getHours();
    let testtime = new Date("Fri Jul 05 2024 13:57:09").getHours();
    console.log("nowtime:", nowtime, ", testtime ", testtime, ", endtime: ", endtime);
    let timeCheck = false;
    if(nowtime>testtime) {
        timeCheck = true;
    }
    console.log("타임체크 결과", timeCheck)
    */

}

reviewInsertValid();
//------- review data insert function ---------------------------------------------------------------------------------------------- 

async function reviewInsert() {
    //reviewArray.value.push({crtitle: review.value.crtitle, crcontent: review.value.crcontent, crratio: review.value.crratio })
    reviewInit.value = {crtitle: reviewInit.value.crtitle, crcontent: reviewInit.value.crcontent, crratio: reviewInit.value.crratio, cno: cno};
    console.log("리뷰데이터: ", JSON.parse(JSON.stringify(reviewInit.value)));
    return classAPI.reviewRegister(JSON.parse(JSON.stringify(reviewInit.value)));
}

//------- review data read function ---------------------------------------------------------------------------------------------- 

async function getReview(cno) {
    try{
        const response = await classAPI.reviewRead(cno);
        reviewArray.value = response.data.classReviewList;
        avgCrratio = response.data.avgCrratio;
        for(let i=0; i<reviewArray.value.length; i++){
            reviewArray.value[i].crdate = dateFormat(new Date(reviewArray.value[i].crdate));
            // review 정보 수정 취소 버튼 클릭시 초기값으로 돌려주기 위한 설정
            reviewArray.value[i].originalCrtitle = reviewArray.value[i].crtitle;
            reviewArray.value[i].originalCrcontent = reviewArray.value[i].crcontent;
            reviewArray.value[i].originalCrratio = reviewArray.value[i].crratio;
            if(store.state.userId==reviewArray.value[i].mid) {
                isWriter.value[i] = true; 
            }
        }
    } catch(error) {
        console.log(error);
    }
    console.log("별점 평균:" , avgCrratio);
    console.log("리뷰어레이 길이:" , reviewArray.value.length);
    console.log("리뷰 목록:", JSON.parse(JSON.stringify(reviewArray.value)));
}

getReview(cno);

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

function reviewDelete(index) {
    let crno = reviewArray.value[index].crno;
    reviewArray.value.splice(index, 1);
    return classAPI.reviewDelete(crno);
    
}


</script>

<style scoped>
</style>