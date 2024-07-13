<template>
    <div class="d-flex flex-column justify-content-center align-items-center" >

        <div class="d-flex flex-column justify-content-center align-items-start my-5 p-3 rounded-4" style='width:850px' >
            
            <div class="w-100 my-3">
                <label class="form-label mb-3 fw-bold">카테고리</label>
                <div class="d-flex " >
                    <input type="button" class="category-button" style="margin-left: 0px" value="한식" :class="{ active: activeIndex === 1 }" @click="handlecategory(1)">
                    <input type="button" class="category-button" value="중식" :class="{ active: activeIndex === 2 }" @click="handlecategory(2)">
                    <input type="button" class="category-button" value="일식" :class="{ active: activeIndex === 3 }" @click="handlecategory(3)">
                    <input type="button" class="category-button" value="양식" :class="{ active: activeIndex === 4 }" @click="handlecategory(4)">
                    <input type="button" class="category-button" value="디저트" :class="{ active: activeIndex === 5 }" @click="handlecategory(5)">
                    <input type="button" class="category-button" value="기타" :class="{ active: activeIndex === 6 }" @click="handlecategory(6)">
                </div>
            </div>
    
            <div class="w-100 my-3">
                <label class="form-label mb-3 fw-bold">제목</label>
                <input type="text" class="form-control" v-model="classes.ctitle" placeholder="클래스 이름을 입력해주세요.">
            </div>

            <div class="w-100 mb-3">
                <label class="form-label mb-3 fw-bold">내용</label>
                <textarea class="form-control" rows="10" v-model="classes.ccontent"
                    placeholder="클래스를 간단히 소개해주세요">
                </textarea>
            </div>

            <div class="d-flex flex-column align-items-center w-100 mb-3">
                <div class="w-75 position-relative mb-3">
                    <div class="position-absolute top-50 start-25 translate-middle" style="z-index: 99;">
                        <img src="/images/assets/ic_left.png" class="left btn" @click='swipePrve'>
                    </div>
                    <div class="position-absolute top-50 start-100 translate-middle" style="z-index: 99;">
                        <img src="/images/assets/ic_right.png" class="right btn" @click='swipeNext'>
                    </div>
                    <swiper-container class="mySwiper1 mt-3" loop="true" style="height: 300px;" v-show="!isPreImg">
                        <swiper-slide v-for="n in imgCount" :key="n">
                            <img :src="`${axios.defaults.baseURL}/class/thumbattach/${cno}/${n}`">
                        </swiper-slide>
                    </swiper-container>
                    <swiper-container class="mySwiper2 mt-3" loop="true" style="height: 300px;" v-show="isPreImg">
                    </swiper-container>
                </div>

                <div class="tInputForm w-100">            
                    <label for="tFile" class="form-label my-3 fw-bold"> 완성품 사진</label>
                    <input id="tFile" type="file" class="form-control" ref="presetImg" multiple @change="setPreviewImg">
                </div>
            </div>
        </div>

        <div class="d-flex flex-column justify-content-center align-items-start mb-5 p-3 rounded-4" >
            <h5 class="mb-3 p-3 text-success fw-bold">* 필수 입력 사항 </h5>
            <div class="mb-5 p-3 rounded-4" style='background-color: rgba(var(--bs-light-rgb));width:850px'>
            <div class="w-25 my-3">
                <label class="form-label mb-3">모집 인원(5~30명 사이의 인원)</label>
                <input type="number" class="form-control" v-model="classes.cpersoncount" min="5" max="30"  @change="isValidPersonCount">
            </div>

            <div class="w-25 mb-3">
                <label class="form-label mb-3">가격</label>
                <input type="number" class="form-control" v-model="classes.cprice" min="0" max="999999" @change="isValidPrice">
            </div>

            <div class="w-25 mb-3">
                <label class="form-label mb-3">개최 일자</label>
                    <VueDatePicker  v-model="classes.cdday" :min-date="minDate" :max-date="maxDate"
                    :start-date="minDate"
                    :format="format" :format-locale="ko"
                    input-class-name="form-control"
                    hide-input-icon
                    select-text="선택" cancel-text="취소"
                    :enable-time-picker="false"></VueDatePicker>
            </div>

            <div class="w-25 mb-3">
                <label for="title" class="form-label mb-3">시작 시간</label>
                    <VueDatePicker
                        v-model="classes.cstarttime" 
                        time-picker
                        :start-time="{hours:9, minutes:0}"
                        minutes-increment="30"
                        no-hours-overlay
                        no-minutes-overlay
                        input-class-name="form-control"
                        hide-input-icon
                        :max-time="{hours:18, minutes:0}"
                        @update:model-value="setTime"
                        select-text="선택" cancel-text="취소"
                    />
            </div>

            <div class="w-25 mb-3">
                <label for="title" class="form-label mb-3">끝나는 시간</label>
                    <VueDatePicker 
                        v-model="classes.cendtime"
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

            <div class="w-100 mb-3">
                <div><button class="btn btn-outline-secondary  mb-3" @click="execDaumPostcode">주소 찾기</button></div>
                <div><input type="text" v-model="classes.caddress" placeholder="주소" class="w-50 mb-3 form-control"></div>
                <div><input type="text" v-model="classes.cdetailaddress" placeholder="상세주소" class="w-50 mb-3 form-control"></div>
            </div>
            </div>
        </div>

        <div id="classItems" class=" rounded-4 mb-5 p-3" style='background-color: rgba(var(--bs-light-rgb));width:850px'>
            <h5 class="my-3 fw-bold">주재료</h5>
            <div class="d-flex flex-column align-items-center mb-3">
                <div class="d-flex justify-content-center align-items-center row w-100 mt-2" v-for="(classitem, index) in classitems" :key="index"  >
                    <div class="col-11 d-flex justify-content-center align-items-center m-0 p-0">
                        <input type="text" class="form-control w-100 me-1" v-model="classitem.ciname" placeholder="예) 다진 돼지고기 600g">
                    </div>
                    <div class="col-1 d-flex justify-content-start align-items-center m-0  p-0">
                        <button class="btn bg-white me-1 w-50 d-flex justify-content-center align-items-center text-success" v-if="index !== 0" @click="removeClassItem(index)">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <button class="btn bg-white w-50 d-flex justify-content-center align-items-center text-success" v-if="index + 1 === classitems.length" @click="addClassItem(index)">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div id="curiculums" class="mb-3" v-for="(curiculum, index) in curiculums" :key="index">
            <div class="d-flex flex-column justify-content-center" style="width:850px">
                <h5 class="mb-3 text-success fw-bold">Chapter.{{ index+1 }}</h5>
                <div class="p-3 w-100" style='background-color: rgba(var(--bs-light-rgb));border-top:1px solid #15a775;border-radius: 0 0 5px 5px'>
                    <div class="cInputForm my-3">
                        <div class="mt-3" style="text-align: center;" v-show="isCuImg[index]"> 
                            <img class="rounded-4" style="width: 250px; height: 250px"/>
                        </div>    
                        <div class="mt-3" style="text-align: center;" v-show="nowCuImgs[index]"> 
                            <img :src="`${axios.defaults.baseURL}/class/curriculumattach/${cno}/${index+1}`" class="rounded-4" style="width: 250px; height: 250px"/>
                        </div> 
                        <label class="form-label my-3 fw-bold"> 이미지</label>
                        <input  type="file" class="form-control" ref="cuImgs" @change="setCuImg($event,index)">
                    </div>

                    <div class="mb-3">
                        <label class="form-label mb-3 fw-bold">제목</label>
                        <input type="text" class="form-control" v-model="curiculum.cutitle" placeholder="제목을 입력해주세요.">
                    </div>

                    <div class="mb-3">
                        <label class="form-label mb-3 fw-bold">내용</label>
                        <textarea class="form-control" v-model="curiculum.cucontent" rows="5" 
                        placeholder="커리큘럼을 소개해주세요">
                        </textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="dd mt-3 d-flex text-center mb-5" style="justify-content: center;width:850px" >
            <button class="prbtn btn" @click="removeCu" style="font-size:18px;">단계 삭제 - </button>
            <button class="prbtn btn" @click="addCu"  style="font-size: 18px;">단계 추가 +</button>
        </div>
        <div class="d-flex mb-5 text-center">
            <RouterLink to="/class/classListView?pageNo=1"><button class="backList btn btn-outline-secondary btn-sm">취소</button></RouterLink>
            <button class="backList btn btn-outline-success btn-sm ms-3"  v-if="type!=='reopen'" @click="submitClass">수정</button>
            <button class="backList btn btn-outline-success btn-sm ms-3" v-if="type==='reopen'"  @click="reopenClass">다시 열기</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {ko} from "date-fns/locale";
import { register } from 'swiper/element/bundle';
import classAPI from '@/apis/classAPI';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const router= useRouter();
register();
const route = useRoute();
const cno = route.query.cno;
const imgCount = ref();
let cuRow;
const type= route.query.type
console.log("ee"+type);

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
let isStart = true;

const classes = ref({
    ctitle:null,
    ccontent:null,
    cpersoncount:null,
    cdday: null,
    cstarttime: null,
    cendtime: null,
    caddress: "",
    cdetailaddress: "",
    cprice:null
})

const presetImg = ref(null);
const nowPreImg = ref(true);
const isPreImg = ref(false);

const classitems = ref([
    {
        ciname: "",
    }
])

const curiculums = ref([
    {
        cuorder:1,
        cutitle:"",
        cucontent:"",
    }
])

const cuImgs = ref([]);
const nowCuImgs = ref([]);
const isCuImg = ref([]);
    
const activeIndex = ref(null);

const handlecategory = (index) => {
    activeIndex.value = index;
};

function setPreviewImg(e){
    if(e.target.files.length > 0){
        isPreImg.value = true;
        nowPreImg.value = false;

        const swiper = document.querySelector(".mySwiper2");  

        while(swiper.hasChildNodes()){
            swiper.removeChild(swiper.firstChild);
        }

        for(let img of e.target.files){
            const reader = new FileReader(); 
            reader.readAsDataURL(img);
            reader.onload = function(e){
                console.log(swiper);
                swiper.swiper.appendSlide(
                    "<swiper-slide><img src='"+ e.target.result +"' class='rounded-4' style='width:100%; height:100%;'/></swiper-slide>"
                );
            }
        }
    }else{
        isPreImg.value = false;
        nowPreImg.value = true;
    }

}

function swipeNext(){
    let swiper;
    if(nowPreImg.value){
        swiper = document.querySelector('.mySwiper1');
    }else{
        swiper = document.querySelector('.mySwiper2');
    }
    swiper.swiper.slideNext();
}

function swipePrve(){
    let swiper;
    if(nowPreImg.value){
        swiper = document.querySelector('.mySwiper1');
    }else{
        swiper = document.querySelector('.mySwiper2');
    }
    swiper.swiper.slidePrev();
}

function addClassItem(index){
    const newItem = {
        ciname: "",
    }
    classitems.value.push(newItem);
}

function removeClassItem(index){
    classitems.value.splice(index,1);
}

function setCuImg(event,index){
    const nowCu = event.target.parentElement.firstChild;

    if(event.target.files.length !== 0){
        const file  = event.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){

        const img  = nowCu.querySelector("img");
        img.src = e.target.result;
        if(index +1  <= nowCuImgs.value.length){
            nowCuImgs.value[index] = false;
        }
        isCuImg.value[index] = true;
        }
    }else{
        if(index +1  <= nowCuImgs.value.length){
            nowCuImgs.value[index] = true;
        }
        isCuImg.value[index] = false;
    }
}

function addCu(){
    const newCuriculum =     {
        cuorder: curiculums.value.length+1,
        cutitle:"",
        cucontent:"",
    };

    curiculums.value.push(newCuriculum);
    isCuImg.value.push(false);
}

function removeCu(){
    
    if(curiculums.value.length > 1){
        curiculums.value.splice(-1,1);
        if(nowCuImgs.value.length === isCuImg.value.length){
            nowCuImgs.value.splice(-1,1);
        }
        isCuImg.value.splice(-1,1);
    }
}

function setTime(){
    if(classes.value.cstarttime !== null){
        
        minTime.value = {
            hours: classes.value.cstarttime.hours + 1,
            minutes: classes.value.cstarttime.minutes
        }
        
        maxTime.value = {
            hours: classes.value.cstarttime.hours + 4,
            minutes: classes.value.cstarttime.minutes
        }

        classes.value.cendtime = minTime.value;

        isStart = true;

    }else{

        minTime.value = null;
        maxTime.value = null;
        classes.value.cendtime = null;
        isStart= false;
    }
}
function checkExpression(){

}
function execDaumPostcode() {
        new window.daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    classes.value.caddress = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    classes.value.caddress = data.jibunAddress;
                }

            }
        }).open();
    }

function isValidPersonCount(){
    if(classes.value.cpersoncount < 5){
        classes.value.cpersoncount =5;
    }else if(classes.value.cpersoncount > 30 ){
        classes.value.cpersoncount = 30;
    }
}

function isValidPrice(){
    if(classes.value.cprice < 0){
        classes.value.cprice =0;
    }else if(classes.value.cprice > 999999){
        classes.value.cprice = 999999;
    }
}

// ----------------------------------------------- read function -----------------------------------------------

async function getClass(cno) {
    try{
        const response = await classAPI.classRead(cno);
        // <backend>에서 map 으로 전달 받기 때문에 response.data가 아닌 response.data.classes로 get 해야함
        classes.value = response.data.classes;
        classes.value.cdday = new Date(classes.value.cdday);
        const stime = classes.value.cstarttime.split(":");
        classes.value.cstarttime =  { hours:stime[0], minutes:stime[1]};
        const etime = classes.value.cendtime.split(":");
        classes.value.cendtime =  { hours:etime[0], minutes:etime[1]};
        const addresses = classes.value.caddress.split(",");
        classes.value.caddress = addresses[0];
        classes.value.cdetailaddress = addresses[1];
        handlecategory(classes.value.ctno);
    } catch(error) {
        console.log(error);
    }
    const response = await classAPI.getThumbimgCount(cno);
    imgCount.value=response.data;
}

getClass(cno);

async function getCurriclumAndItem(cno) {
    try{
        //<back>에서 map<String, Object>로 보내주는 커리큘럼과 재료 data 가져오기
        const response = await classAPI.curriculumAndItemRead(cno);
        console.log(response.data);
        // response.data -> map의 object로 접근하기
        // response.data.curriculum -> 각 속성의 값을 가져오기
        curiculums.value = response.data.curriculums;
        for(let i=0; i<curiculums.value.length; i++){
            nowCuImgs.value.push(true);
            isCuImg.value.push(false);
        }
        cuRow = curiculums.value.length;
        classitems.value = response.data.classItems;

    } catch(error) {
        console.log(error);
    }
}

getCurriclumAndItem(cno);

// ----------------------------------------------- update function -----------------------------------------------


function updateClass(){
    // registClass와 비슷하지만 id나 hitcount 등 수정할 필요가 없는 속성들은 append 해주지 않음
    // 클래스 data를 넘겨주기 위해 formdata에 저장해서 axios로 전달
    // 사진파일은 JSON 객체로 넘겨줄 수 없기 때문에 formData로 넘겨줌
    const classFormData = new FormData();
    //----- v-model data 받기 -----
    classFormData.append("ctitle", classes.value.ctitle);
    classFormData.append("ccontent", classes.value.ccontent);
    classFormData.append("cpersoncount", classes.value.cpersoncount);
    classFormData.append("cprice", classes.value.cprice);
    classFormData.append("cdday", classes.value.cdday);
    classFormData.append("cstarttime", classes.value.cstarttime.hours +":"+(classes.value.cstarttime.minutes===0? "00" : "30"));
    classFormData.append("cendtime", classes.value.cendtime.hours +":"+(classes.value.cendtime.minutes===0? "00" : "30"));
    //주소+상세주소
    classFormData.append("caddress", classes.value.caddress + ", " +classes.value.cdetailaddress);
    //모집 마감일 -> 강의 시작일 -1일 (강의 시작일이 달의 첫날일 경우 조건식 필요)
    const cenddate = new Date(classes.value.cdday);
    cenddate.setDate(cenddate.getDate()-1);  
    classFormData.append("cenddate", cenddate);
    classFormData.append("cno", cno);
    classFormData.append("ctno", activeIndex.value);

    
    //----- 사진 data 받기 -----
    //여러(i)개의 사진을 배열로 받기 
    //<back>에 전달시 사진 여러개를 하나로 모아서 전달해주는 문법 -> <back>에서 분리해서 사용해야함
    //사진을 하나씩 여러번 보내주는 function submitClass() 에서의 for문과 차이점이 있음
    for(let i=0; i<presetImg.value.files.length; i++) {
        classFormData.append("cthumbnailimgs",presetImg.value.files[i]);
    }

    return classAPI.classUpdate(classFormData);
}

// 클래스 재료 data를 넘겨주기 위해 formdata에 저장해서 axios로 전달
function updateClassItem(){
    for(let i=0; i<classitems.value.length; i++){
        classitems.value[i].cno = cno;
        classitems.value[i].cino = i+1;
    }
    // ciFormData.append() + for문 대신 list 형태로 <backend>에 바로 전달
    // <backend>에서는 수정 전 data 모두 delete 후 -> 새로 들어온 list의 index로 접근해서 insert하는 방식으로 update
    const ciFormData = JSON.parse(JSON.stringify(classitems.value));
    return classAPI.itemUpdate(ciFormData);
}

// 클래스 커리큘럼 data를 넘겨주기 위해 formdata에 저장해서 axios로 전달
function updateCuriculum(index){
    const cuFormData = new FormData();
    //커리큘럼 사진 파일은 배열로 저장되기 때문에 (커리큘럼 추가될 때마다 input 태그도 추가)
    //각 커리큘럼 순번에 맞는 사진을 가져오기 위해서는 인덱스를 매치시켜주고(첫번째 인풋태그, 두번째 인풋태그, ...)
    //input 태그 안에서 files로 이미지를 가져오는 경우 files(배열)의 0번 인덱스 값을 가져오면 됨
    // cuFormData.append("cuimg", cuImgs.value[index].files[0] ? cuImgs.value[index].files[0] : null);
    cuFormData.append("cuorder", curiculums.value[index].cuorder);
    cuFormData.append("cutitle", curiculums.value[index].cutitle);
    cuFormData.append("cucontent",curiculums.value[index].cucontent);
    cuFormData.append("cno", cno);
    if(cuImgs.value[index].files.length !== 0){
        cuFormData.append("cuimg", cuImgs.value[index].files[0]);
    }
    cuFormData.append("culength", curiculums.value.length);
    return classAPI.curriculumUpdate(cuFormData);
}

async function submitClass() {
    const iv = isValid();
    if(!iv){
        alert("모든 값을 입력해주세요");
        return
    }

    let cno;    

    //----- 클래스 업데이트 -----
    try{
        //axios를 통해서 저장한 formData 전달하기
        const response = await updateClass();
        //backend에서 받은 map("cno",cno) value를 사용하기 위해 변수에 값을 넣어줌
        //response.data 사용위해서는 async await 구조 사용해줘야 함
    } catch(error) {
        console.log("데이터 전달 안됨");
    }

    //----- 재료 업데이트 -----
    updateClassItem();

    //----- 커리큘럼 업데이트 -----
    //여러 단계의 커리큘럼을 받기 위해 커리큘럼 배열의 길이만큼 for문 실행
    //<back>에 전달시 사진 하나하나를 여러번 전달해주는 문법 
    for(let i=0; i<curiculums.value.length; i++) {
        const response = await updateCuriculum(i);
    }
    router.push(`/class/classDetailView?cno=${route.query.cno}`)
}

// 클래스 다시 열기---------------------------------------------------------------
async function reopenClass(){
    const iv = isValid();
    if(!iv){
        alert("모든 값을 입력해주세요");
        return
    }

    const initialLength=curiculums.value.length;
    let initCno=classes.value.cno;
    //class thumbnail을 받기 위해 formdata로 전송
    const reformData= new FormData();
    reformData.append("ctitle", classes.value.ctitle);
    reformData.append("ccontent", classes.value.ccontent);
    reformData.append("cpersoncount", classes.value.cpersoncount);
    reformData.append("cprice", classes.value.cprice);
    reformData.append("cdday", classes.value.cdday);
    reformData.append("cstarttime", classes.value.cstarttime.hours +":"+(classes.value.cstarttime.minutes===0? "00" : "30"));
    reformData.append("cendtime", classes.value.cendtime.hours +":"+(classes.value.cendtime.minutes===0? "00" : "30"));
    reformData.append("caddress", classes.value.caddress + ", " +classes.value.cdetailaddress);
  
    const cenddate = new Date(classes.value.cdday);
    cenddate.setDate(cenddate.getDate()-1);  
    reformData.append("cenddate", cenddate);
    reformData.append("cno", cno);
    reformData.append("ctno", activeIndex.value);
    const climg=presetImg.value;
    if(climg.files.length!==0){
        //list 형태의 이미지를 하나씩 전달
        for(let i=0;i<climg.files.length;i++){
            reformData.append("cthumbnailimgs",climg.files[i])
        }
    }
    try{
        const response1 = await classAPI.reopenClass(reformData);
        classes.value.cno=response1.data;
    } catch(error){
        console.log(error);
    }
    // 클래스 아이템 ---------------------------------------------------------
 
    for(let i=0;i<classitems.value.length;i++){
        classitems.value[i].cno=classes.value.cno;
        classitems.value[i].cino=i+1
    }
        const data= JSON.parse(JSON.stringify(classitems.value));
        const response2 = await classAPI.itemRegister(data);

    // 커리 큘럼---------------------------------------------------------------------
    const curFormData= new FormData();
    for(let i=0; i<curiculums.value.length;i++){
        curFormData.append("initCno",initCno);
        console.log("dd"+initCno)
        curFormData.append("cno",classes.value.cno);
        curFormData.append("initialLength",initialLength);
        curFormData.append("nowLength",curiculums.value.length);
        curFormData.append("curriculums["+i+"].cuorder",i+1)
        curFormData.append("curriculums["+i+"].cutitle",curiculums.value[i].cutitle)
        curFormData.append("curriculums["+i+"].cucontent",curiculums.value[i].cucontent)
        const clmf=cuImgs.value[i];
        console.log("img"+clmf);
        if(clmf.files.length!==0){
            console.log("들어옴")
            curFormData.append("curriculums["+i+"].cuimg",clmf.files[0])
        }
    }
    const response3= await classAPI.reopenClassCurri(curFormData);
    router.push(`/class/classDetailView?cno=${route.query.cno}`)
}
function isValid(){
    let iv = true;
    
    if(!activeIndex.value){
        console.log("ddd")
        iv = false;
    }
    if( classes.value.ctitle===null || 
    classes.value.ccontent===null || 
    classes.value.cpersoncount===null || 
    classes.value.cdday=== null || 
    classes.value.cstarttime=== null ||
    classes.value.cendtim=== null || 
    classes.value.caddress=== "" ||
    classes.value.cdetailaddress=== "" ||
    classes.value.cprice===null 
    ) {
        iv = false;
    }

    for(const v of classitems.value){
        if(!v.ciname){
            iv = false;
            break;
        }
    }
    
    for(let i=0; i<curiculums.value.length; i++){
        const cu = curiculums.value[i]
        if(!cu.cutitle || !cu.cucontent){
            iv = false;
        }else if(i>=nowCuImgs.value.length){
            if(!isCuImg.value[i]){
                iv = false;
            }
        }  
    }
    return iv;
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
.backList{
    font-size: 1rem;
    font-weight: bold;
    padding:1.2rem 2.238rem 1.138rem 2.3rem; 
    border-radius: 38px;
    border-width: 2px;
}
.prbtn{
    padding:0.65rem 1.5rem;
    border:solid 1px #d4d4d4;
    border-radius: 5px;
    width: calc(100% - 2rem);
    margin: 0 0.5rem;
}
.category-button{
    margin-right: 0.5rem;
    padding: 0.8rem 1.4rem;
    border-radius: 2rem;
    border: solid 1px #d4d4d4;
    background-color: #fff;
    margin: 0 10px;
}

.active{
    background-color:#04AA6D !important;
    color:#fff !important;
}

.select-button option:hover {
  background-color: #04AA6D;
  color: white;
}

</style>