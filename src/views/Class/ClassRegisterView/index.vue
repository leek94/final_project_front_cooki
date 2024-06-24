<template>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="my-5"></div>

        <div class="w-50 my-5">
            <label class="form-label mb-3">제목</label>
            <input type="text" class="form-control" v-model="c.ctitle" placeholder="클래스 이름을 입력해주세요.">
        </div>

        <div class="w-50 mb-5">
            <label class="form-label mb-3">내용</label>
            <textarea class="form-control" rows="10" v-model="c.ccontent"
                placeholder="클래스를 간단히 소개해주세요">
            </textarea>
        </div>

        <div class="w-50 mb-5">
            <label class="form-label mb-3">모집 인원(5~30명 사이의 인원)</label>
            <input type="number" class="form-control w-25" v-model="c.cpersoncount" min="5" max="30"  @change="isvalidPersonCount">
        </div>

        <div class="w-50 mb-5">
            <label class="form-label mb-3">가격</label>
            <input type="number" class="form-control w-25" v-model="c.cprice">
        </div>

        <div class="w-50 mb-5">
            <label class="form-label mb-3">개최 일자</label>
            <VueDatePicker  v-model="c.cdday" :min-date="minDate" :max-date="maxDate"
            :start-date="minDate"
            :format="format" :format-locale="ko"
            input-class-name="form-control w-25 "
            hide-input-icon
            select-text="선택" cancel-text="취소"
            :enable-time-picker="false"></VueDatePicker>
        </div>

        <div class="w-50 mb-5">
            <label for="title" class="form-label mb-3">시작 시간</label>
                <VueDatePicker
                    class="w-25" 
                    v-model="c.cstarttime" 
                    time-picker
                    :start-time="{hours:9, minutes:0}"
                    minutes-increment="30"
                    no-hours-overlay
                    no-minutes-overlay
                    input-class-name="form-control"
                    hide-input-icon
                    :max-time="{hours:19, minutes:0}"
                    @update:model-value="setTime"
                    select-text="선택" cancel-text="취소"
                />
        </div>

        <div class="w-50 mb-5">
            <label for="title" class="form-label mb-3">끝나는 시간</label>
                <VueDatePicker 
                    class="w-25"
                    v-model="c.cendtime"
                    time-picker
                    minutes-increment="30"
                    no-hours-overlay
                    no-minutes-overlay
                    input-class-name="form-control"
                    hide-input-icon
                    :min-time="minTime"
                    :max-time="maxTime"
                    :disabled = "!isStart"
                    select-text="선택" cancel-text="취소"
                />
        </div>

        <div class="w-50 mb-5">
            <div><button class="btn btn-outline-secondary  mb-3" @click="execDaumPostcode">주소 찾기</button></div>
            <div><input type="text" v-model="c.caddress" placeholder="주소" class="w-50 mb-3 form-control"></div>
            <div><input type="text" v-model="c.cdetailaddress" placeholder="상세주소" class="w-50 mb-3 form-control"></div>
        </div>

        <div class="d-flex flex-column align-items-center w-50 mb-5">
            <div class="w-75 position-relative mb-3" v-show="isPreImg">
                <div class="position-absolute top-50 start-25 translate-middle" style="z-index: 99;">
                    <img src="/images/assets/ic_left.png" class="left btn" @click='swipePrve'>
                </div>
                <div class="position-absolute top-50 start-100 translate-middle" style="z-index: 99;">
                    <img src="/images/assets/ic_right.png" class="right btn" @click='swipeNext'>
                </div>
                <swiper-container class="mySwiper" loop="true" style="height: 300px;">
                </swiper-container>
            </div>

            <div class="tInputForm w-100">            
                <label for="tFile" class="form-label"> 완성품 사진(필수!!!!)</label>
                <input id="tFile" type="file" class="form-control" ref="presetImg" multiple @change="setPreviewImg">
            </div>
        </div>


        <div id="classItems" class="w-50 bg-secondary-subtle rounded-4 mb-5 p-3">
            <h5>주재료</h5>
            <div class="d-flex flex-column align-items-center mb-3">
                <div class="d-flex justify-content-center align-items-center row w-100 mt-2" v-for="(citem, index) in citems" :key="index"  >
                    <div class="col-11 d-flex justify-content-center align-items-center m-0 p-0">
                        <input type="text" class="form-control w-100 me-1" v-model="citem.ciname" placeholder="예) 다진 돼지고기 600g">
                    </div>
                    <div class="col-1 d-flex justify-content-start align-items-center m-0  p-0">
                        <button class="btn bg-white me-1 w-50 d-flex justify-content-center align-items-center" v-if="index !== 0" @click="removeClassItem(index)">&#10134;</button>
                        <button class="btn bg-white w-50 d-flex justify-content-center align-items-center" v-if="index + 1 === citems.length" @click="addClassItem(index)">&#10133;</button>
                    </div>
                </div>
            </div>
            <p class="text-danger">{{itemErrorMessage}}</p>
        </div>

        <div id="curiculums" class="w-50 mb-3" v-for="(curiculum, index) in curiculums" :key="index">
            <div class="d-flex flex-column justify-content-center"> 
                <h5 class="mb-3">Step.{{ index+1 }}</h5>
                <div class="bg-secondary-subtle rounded-4 p-3 w-100">
                    <div class="cInputForm">
                        <div class="my-3" style="text-align: center;" v-show="isCuImg[index]"> 
                            <img class="rounded-4" style="width: 250px; height: 250px"/>
                        </div>    
                        <label class="form-label"> 이미지(필수!!!)</label>
                        <input  type="file" class="form-control" ref="cuImgs" @change="setCuImg($event,index)">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">제목</label>
                        <input type="text" class="form-control" v-model="curiculum.cutitle" placeholder="제목을 입력해주세요.">
                    </div>

                    <div>
                        <label class="form-label">내용</label>
                        <textarea class="form-control" v-model="curiculum.cucontent" rows="5" 
                        placeholder="커리큘럼을 소개해주세요">
                        </textarea>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <button class="btn" @click="removeCu">단계 삭제하기</button>
            <button class="btn" @click="addCu">단계 추가하기</button>
            <p class="text-danger">{{ cuErrorMessage }}</p>
        </div>

        <button class="btn" @click="submitClass">저장 </button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {ko} from "date-fns/locale";
import { register } from 'swiper/element/bundle';

register();

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return ` ${year}년 ${month}월 ${day}일`;
}

const minDate = new Date();
minDate.setDate(minDate.getDate() + 7);
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 28);

const minTime = ref(null);
const maxTime = ref(null);
let isStart = false;

const itemErrorMessage = ref(null);
const cuErrorMessage = ref(null); 

const c = ref({
    ctitle:null,
    ccontent:null,
    cpersoncount:null,
    cdday: null,
    cstarttime: null,
    cendtime: null,
    ccaddress: null,
    cdetailaddress: null,
    cpirce:null
})

const presetImg = ref(null);
let isPreImg = ref(false);

const citems = ref([
    {
        ciname: "",
        cno: 1,
    }
])

const curiculums = ref([
    {
        cuorder:1,
        cutitle:"",
        cucontent:"",
        cuImg:null,
        cno:1
    }
])

const cuImgs = ref([]);
let isCuImg = ref([
    false,
]);
    
function setPreviewImg(e){
    const swiper = document.querySelector("swiper-container");  
    
    while(swiper.hasChildNodes()){
        swiper.removeChild(swiper.firstChild);
    }

    for(let img of e.target.files){
        const reader = new FileReader(); 
        reader.readAsDataURL(img);
        reader.onload = function(e){
        swiper.swiper.appendSlide(
            "<swiper-slide><img src='"+ e.target.result +"' class='rounded-4' style='width:100%; height:100%;'/></swiper-slide>"
        );
        }
    }

    if(e.target.files.length > 0){
        isPreImg.value = true;
    }else{
        isPreImg.value = false;
    }
}

function swipeNext(){
    const swiper = document.querySelector('swiper-container');
    swiper.swiper.slideNext();
}

function swipePrve(){
    const swiper = document.querySelector('swiper-container');
    swiper.swiper.slidePrev();
}

function addClassItem(index){
    const newItem = {
        ciname: "",
        cno: 1,
    }
    citems.value.push(newItem);
    itemErrorMessage.value = null;
}

function removeClassItem(index){
    citems.value.splice(index,1);
}

function setCuImg(event,index){
    const nowCu = event.target.parentElement.firstChild;
  
    if(nowCu.firstChild !== null){
        const img = nowCu.querySelector("img");
        img.src = null;
    }

    if(event.target.files.length !== 0){
        const file  = event.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
        const img  = nowCu.querySelector("img");
        img.src = e.target.result;
        isCuImg.value[index] = true;
        }
    }else{
        isCuImg.value[index] = false;
    }
}

function addCu(){
    const newCuriculum =     {
        cuorder: curiculums.value.length+1,
        cutitle:"",
        cucontent:"",
        cuImg:null,
        cno:1
    };

    curiculums.value.push(newCuriculum);
    isCuImg.value.push(false);
}

function removeCu(){
    
    if(curiculums.value.length > 1){
        curiculums.value.splice(-1,1);
        isCuImg.value.splice(-1,1);
    }
}

function setTime(){
    if(c.value.cstarttime !== null){
        
        minTime.value = {
            hours: c.value.cstarttime.hours + 1,
            minutes: c.value.cstarttime.minutes
        }
        
        maxTime.value = {
            hours: c.value.cstarttime.hours + 5,
            minutes: c.value.cstarttime.minutes
        }

        c.value.cendtime = minTime.value;

        isStart = true;

    }else{

        minTime.value = null;
        maxTime.value = null;
        c.value.cendtime = null;
        isStart= false;
    }
}

function execDaumPostcode() {
        new window.daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    c.value.caddress = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    c.value.caddress = data.jibunAddress;
                }

            }
        }).open();
    }

function isvalidPersonCount(){
    if(c.value.cpersoncount < 5){
        c.value.cpersoncount =5;
    }else if(c.value.cpersoncount > 30 ){
        c.value.cpersoncount = 30;
    }
}
</script>

<style scoped>

swiper-container {
       width: 100%;
       height: 100%;
}

swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

swiper-slide img {
    width: 100%;
    height: 100%;
}

</style>