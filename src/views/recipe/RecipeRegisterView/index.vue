<template>
    <div class="d-flex flex-column justify-content-center align-items-center">

        <div class="d-flex flex-column justify-content-center align-items-center w-50 my-5 p-3 rounded-4" style='background-color: #fff9e2;'>
            <div class="w-100 my-3">
                <label class="form-label mb-3">제목</label>
                <input type="text" class="form-control" v-model="classes.ctitle" placeholder="클래스 이름을 입력해주세요.">
            </div>

            <div class="w-100 mb-3">
                <label class="form-label mb-3">내용</label>
                <textarea class="form-control" rows="10" v-model="classes.ccontent"
                    placeholder="클래스를 간단히 소개해주세요">
                </textarea>
            </div>

            <div class="d-flex flex-column align-items-center w-100 mb-3">
                <div class="mt-3" style="text-align: center;" v-show="isPreImg"> 
                    <img class="preImg rounded-4" style="width: 250px; height: 250px"/>
                </div> 

                <div class="tInputForm w-100">            
                    <label for="tFile" class="form-label my-3"> 완성품 사진(필수!!!!)</label>
                    <input id="tFile" type="file" class="form-control" ref="presetImg" @change="setPreviewImg">
                </div>
            </div>
        </div>

        <div id="classItems" class="w-50 rounded-4 mb-5 p-3" style='background-color: #fff9e2;'>
            <h5 class="my-3">주재료</h5>
            <div class="d-flex flex-column align-items-center mb-3">
                <div class="d-flex justify-content-center align-items-center row w-100 mt-2" v-for="(classitem, index) in classitems" :key="index"  >
                    <div class="col-11 d-flex justify-content-center align-items-center m-0 p-0">
                        <input type="text" class="form-control w-100 me-1" v-model="classitem.ciname" placeholder="예) 다진 돼지고기 600g">
                    </div>
                    <div class="col-1 d-flex justify-content-start align-items-center m-0  p-0">
                        <button class="btn bg-white me-1 w-50 d-flex justify-content-center align-items-center" v-if="index !== 0" @click="removeClassItem(index)">&#10134;</button>
                        <button class="btn bg-white w-50 d-flex justify-content-center align-items-center" v-if="index + 1 === classitems.length" @click="addClassItem(index)">&#10133;</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="curiculums" class="w-50 mb-3" v-for="(curiculum, index) in curiculums" :key="index">
            <div class="d-flex flex-column justify-content-center">
                <h5 class="mb-3">Step.{{ index+1 }}</h5>
                <div class="rounded-4 p-3 w-100" style='background-color: #fff9e2;'>
                    <div class="cInputForm my-3">
                        <div class="mt-3" style="text-align: center;" v-show="isCuImg[index]"> 
                            <img class="rounded-4" style="width: 250px; height: 250px"/>
                        </div>    
                        <label class="form-label my-3"> 이미지(필수!!!)</label>
                        <input  type="file" class="form-control" ref="cuImgs" @change="setCuImg($event,index)">
                    </div>

                    <div class="mb-3">
                        <label class="form-label mb-3">제목</label>
                        <input type="text" class="form-control" v-model="curiculum.cutitle" placeholder="제목을 입력해주세요.">
                    </div>

                    <div class="mb-3">
                        <label class="form-label mb-3">내용</label>
                        <textarea class="form-control" v-model="curiculum.cucontent" rows="5" 
                        placeholder="커리큘럼을 소개해주세요">
                        </textarea>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <button class="btn btn-outline-warning" @click="removeCu">단계 삭제하기</button>
            <button class="btn btn-outline-warning" @click="addCu">단계 추가하기</button>
        </div>

        <button class="btn" @click="submitClass">저장 </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const classes = ref({
    ctitle:null,
    ccontent:null,
})

const presetImg = ref(null);
let isPreImg = ref(false);


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
let isCuImg = ref([
    false,
]);
    
function setPreviewImg(e){

    if(e.target.files.length !== 0){
        const file  = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){

        const img  = document.querySelector(".preImg");
        console.log(img);
        img.src = e.target.result;
        isPreImg.value = true;
        }
    }else{
        isPreImg.value = false;
    }
}

function addClassItem(){
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

//// ------- 등록 function ------------------------------------------------------------------------------------------------------------------------
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