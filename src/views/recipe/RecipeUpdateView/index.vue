<template>
    <div class="d-flex flex-column justify-content-center align-items-center">

        <div class="d-flex flex-column justify-content-center align-items-center my-5 p-3 rounded-4" style='width:850px'>

            <div class="w-100 my-3">
                <label class="form-label mb-3 fw-bold">카테고리</label>
                <div class="d-flex " >
                    <input type="button" class="category-button" value="한식" :class="{ active: activeIndex === 1 }" @click="handlecategory(1)">
                    <input type="button" class="category-button" value="중식" :class="{ active: activeIndex === 2 }" @click="handlecategory(2)">
                    <input type="button" class="category-button" value="일식" :class="{ active: activeIndex === 3 }" @click="handlecategory(3)">
                    <input type="button" class="category-button" value="양식" :class="{ active: activeIndex === 4 }" @click="handlecategory(4)">
                    <input type="button" class="category-button" value="디저트" :class="{ active: activeIndex === 5 }" @click="handlecategory(5)">
                    <input type="button" class="category-button" value="기타" :class="{ active: activeIndex === 6 }" @click="handlecategory(6)">
                </div>
            </div>

            <div class="w-100 my-3">
                <label class="form-label mb-3 fw-bold">제목</label>
                <input type="text" class="form-control" v-model="recipe.rtitle" placeholder="레시피 이름을 입력해주세요.">
            </div>

            <div class="w-100 mb-3">
                <label class="form-label mb-3 fw-bold">내용</label>
                <textarea class="form-control" rows="10" v-model="recipe.rcontent"
                    placeholder="레시피를 간단히 소개해주세요">
                </textarea>
            </div>

            <div class="d-flex flex-column align-items-center w-100 mb-3">
                <div class="mt-3" style="text-align: center;"> 
                    <img class="preImg rounded-4" v-show="isPreImg" style="width: 250px; height: 250px" />
                    <img class="preImg rounded-4" v-if="!isPreImg" style="width: 250px; height: 250px" :src="`${axios.defaults.baseURL}/recipe/thumbattach/${rno}`"/>
                </div> 

                <div class="tInputForm w-100">            
                    <label for="tFile" class="form-label my-3 fw-bold"> 완성품 사진</label>
                    <input id="tFile" type="file" class="form-control" ref="presetImg" @change="setPreviewImg">
                </div>
            </div>
        </div>

        <div id="classItems" class="rounded-4 mb-5 p-3" style='background-color: rgba(var(--bs-light-rgb));width:850px'>
            <h5 class="my-3 fw-bold">주재료</h5>
            <div class="d-flex flex-column align-items-center mb-3">
                <div class="d-flex justify-content-center align-items-center row w-100 mt-2" v-for="(recipeItem, index) in recipeItems" :key="index"  >
                    <div class="col-11 d-flex justify-content-center align-items-center m-0 p-0">
                        <input type="text" class="form-control w-100 me-1" v-model="recipeItem.riname" placeholder="예) 다진 돼지고기 600g">
                    </div>
                    <div class="col-1 d-flex justify-content-start align-items-center m-0  p-0">
                        <button class="btn bg-white me-1 w-50 d-flex justify-content-center align-items-center text-success" v-if="index !== 0" @click="removeRecipeItem(index)">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <button class="btn bg-white w-50 d-flex justify-content-center align-items-center text-success" v-if="index + 1 === recipeItems.length" @click="addRecipesItem(index)">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div id="curiculums" class=" mb-3" v-for="(recipeProcess, index) in recipeProcesses" :key="index" style="width:850px">
            <div class="d-flex flex-column justify-content-center">
                <h5 class="mb-3 fw-bold text-success">Step.{{ index+1 }}</h5>
                <div class="p-3 w-100" style='background-color: rgba(var(--bs-light-rgb));border-top:1px solid #15a775;border-radius: 0 0 5px 5px' >
                    <div class="cInputForm my-3">
                        <div class="mt-3" style="text-align: center;" v-show="isRpImg[index]"> 
                            <img class="rounded-4" style="width: 250px; height: 250px"/>
                        </div>
                        <div class="mt-3" style="text-align: center;" v-show="nowRpImgs[index]"> 
                            <img :src="`${axios.defaults.baseURL}/recipe/recipeprocessattach/${rno}/${index+1}`" class="rounded-4" style="width: 250px; height: 250px"/>
                        </div> 
                        <label class="form-label my-3 fw-bold"> 이미지</label>
                        <input  type="file" class="form-control" ref="rpImgs" @change="setPrImg($event,index)">
                    </div>

                    <div class="mb-3">
                        <label class="form-label mb-3 fw-bold">제목</label>
                        <input type="text" class="form-control" v-model="recipeProcess.rptitle" placeholder="제목을 입력해주세요.">
                    </div>

                    <div class="mb-3">
                        <label class="form-label mb-3 fw-bold">내용</label>
                        <textarea class="form-control" v-model="recipeProcess.rpcontent" rows="5" 
                        placeholder="커리큘럼을 소개해주세요">
                        </textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="dd mt-3 d-flex text-center mb-5" style="justify-content: center;width:850px" >
            <button class="prbtn btn" @click="removePr" style="font-size:18px;">단계 삭제 - </button>
            <button class="prbtn btn" @click="addPr"  style="font-size: 18px;">단계 추가 +</button>
        </div>
        <div class="d-flex mb-5 text-center">
            <RouterLink :to="`/recipe/RecipeDetailView?rno=${rno}`"><button class="backList btn btn-outline-secondary btn-sm">취소</button></RouterLink>
            <button class="backList btn btn-outline-success btn-sm ms-3" @click="submitClass">수정 하기</button>
        </div>
    </div>
</template>

<script setup>
import recipeAPI from '@/apis/recipeAPI';
import EditorNowRecruit from '@/views/Member/MypageView/EditorNowRecruit.vue';
import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const presetImg = ref(null);
let isPreImg = ref(false);
const rno=route.query.rno;
const activeIndex = ref(null);

const handlecategory = (index) => {
    activeIndex.value = index;
};

const recipe = ref({
    rtitle:"",
    rcontent:"",
    mid:"",
    ctno:1
})

const recipeItems = ref([
    {
        riname: "",
    }
])

const recipeProcesses = ref([
    {
        rporder:1,
        rptitle:"",
        rpcontent:"",
    }
])

const rpImgs = ref([]);
let isRpImg = ref([]);
let nowRpImgs = ref([])

function setPreviewImg(e){
    if(e.target.files.length !== 0){
        isPreImg.value = true;
        const file  = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            const img  = document.querySelector(".preImg");
            img.src = e.target.result;
        }
    }else{
        isPreImg.value = false;
    }
}

function addRecipesItem(){
    const newItem = {
        riname: "",
    }
    recipeItems.value.push(newItem);
}

function removeRecipeItem(index){
    recipeItems.value.splice(index,1);
}


function setPrImg(event,index){
    const nowCu = event.target.parentElement.firstChild;

    if(event.target.files.length !== 0){
        const file  = event.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){

        const img  = nowCu.querySelector("img");
        img.src = e.target.result;
        if(index +1  <= nowRpImgs.value.length){
            nowRpImgs.value[index] = false;
        }
        isRpImg.value[index] = true;
        }
    }else{
        if(index +1  <= nowRpImgs.value.length){
            nowRpImgs.value[index] = true;
        }
        isRpImg.value[index] = false;
    }
}

function addPr(){
    const newCuriculum =     {
        rporder: recipeProcesses.value.length+1,
        rptitle:"",
        rpcontent:"",
    };
    recipeProcesses.value.push(newCuriculum);
    isRpImg.value.push(false);

}

function removePr(){
    if(recipeProcesses.value.length > 1){
        recipeProcesses.value.splice(-1,1);
        if(nowRpImgs.value.length===isRpImg.value.length){
            nowRpImgs.value.splice(-1,1);
        }
        isRpImg.value.splice(-1,1);
    }
}
const initialLength=ref();
// recipe Read ----------------------------------------------------------
async function getRecipe(rno){
    try{
    const response1 =await recipeAPI.recipeRead(rno);
    recipe.value= response1.data;

    }catch(error){
        console.log(error);
    }
    const response2 = await recipeAPI.processandItemRead(rno);
    //map형태로 item과 process를 리턴 받음
    recipeItems.value=response2.data.recipeItems;
    recipeProcesses.value= response2.data.recipeProcess;
    initialLength.value=response2.data.recipeProcess.length;
    for(let i=1;i<=recipeProcesses.value.length;i++){
        nowRpImgs.value.push(true);
        isRpImg.value.push(false);
    }
    handlecategory(recipe.value.ctno);
}
getRecipe(rno);


//recipe Update------------------------------------------------------------

async function submitClass(){
    const iv = isValid();
    if(!iv){
        alert("모든 값을 입력해주세요");
        return
    }

    const recipeFormdata= new FormData();
    recipeFormdata.append("rno", rno);
    recipeFormdata.append("rtitle",recipe.value.rtitle);
    recipeFormdata.append("rcontent",recipe.value.rcontent);
    recipeFormdata.append("ctno",activeIndex.value);
    const rAttach= presetImg.value;
    //이미지 파일이 바뀔 경우 확인 ->  이미지가 바뀌지 않을 경우 length=0이 됨 
    if(rAttach.files.length!=0){
        recipeFormdata.append("rAttach",rAttach.files[0])
    }
    const response3= recipeAPI.recipeUpdate(recipeFormdata);
    
    //ITEM을 리스트 형태로 보내기 
    for(let i=0; i<recipeItems.value.length; i++){
        recipeItems.value[i].rino=i+1;
        recipeItems.value[i].rno=rno;
    }
    const response4= await recipeAPI.itemUpdate(JSON.parse(JSON.stringify(recipeItems.value)));
    
    const processFormdata= new FormData();
    //Form data list 형태로 보내기
    //(recipeProcess와 수정된 값의 길이와 수정 전의 길이을 비교하기 위해)
    for(let i=0; i<recipeProcesses.value.length;i++){
        processFormdata.append("rno",rno);
        processFormdata.append("initialLength",initialLength.value);
        processFormdata.append("changeLength",recipeProcesses.value.length);
        processFormdata.append("processes["+i+"].rporder",recipeProcesses.value[i].rporder);
        processFormdata.append("processes["+i+"].rptitle",recipeProcesses.value[i].rptitle);
        processFormdata.append("processes["+i+"].rpcontent",recipeProcesses.value[i].rpcontent);
        const rpAttach = rpImgs.value[i];

        if(rpAttach.files.length!==0){
            console.log(rpAttach);
            processFormdata.append("processes["+i+"].rpAttach",rpAttach.files[0])
        }
    }
    const response5= recipeAPI.processUpdate(processFormdata);
    router.push(`/recipe/recipeDetailView?rno=${route.query.rno}`);

}

function isValid(){
    let iv = true;
    
    if(!activeIndex.value){
        iv = false;
    }
    if( recipe.value.rtitle===null || 
    recipe.value.rcontent===null) {
        iv = false;
    }

    for(const v of recipeItems.value){
        if(!v.riname){
            iv = false;
            break;
        }
    }
    
    for(let i=0; i<recipeProcesses.value.length; i++){
        const cu = recipeProcesses.value[i]
        if(!cu.rptitle || !cu.rpcontent){
            iv = false;
        }else if(i>=nowRpImgs.value.length){
            if(!isRpImg.value[i]){
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