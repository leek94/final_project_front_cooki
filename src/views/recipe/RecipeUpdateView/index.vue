<template>
    <div class="d-flex flex-column justify-content-center align-items-center">

        <div class="d-flex flex-column justify-content-center align-items-center w-50 my-5 p-3 rounded-4" style='background-color: #fff9e2;'>
            <div class="w-100 my-3">
                <label class="form-label mb-3">제목</label>
                <input type="text" class="form-control" v-model="recipe.rtitle" placeholder="클래스 이름을 입력해주세요.">
            </div>

            <div class="w-100 mb-3">
                <label class="form-label mb-3">내용</label>
                <textarea class="form-control" rows="10" v-model="recipe.rcontent"
                    placeholder="클래스를 간단히 소개해주세요">
                </textarea>
            </div>

            <div class="d-flex flex-column align-items-center w-100 mb-3">
                <div class="mt-3" style="text-align: center;"> 
                    <img class="preImg rounded-4" v-if="isPreImg" style="width: 250px; height: 250px" />
                    <img class="preImg rounded-4" v-if="!isPreImg" style="width: 250px; height: 250px" :src="`${axios.defaults.baseURL}/recipe/thumbattach/${rno}`"/>
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
                <div class="d-flex justify-content-center align-items-center row w-100 mt-2" v-for="(recipeItem, index) in recipeItems" :key="index"  >
                    <div class="col-11 d-flex justify-content-center align-items-center m-0 p-0">
                        <input type="text" class="form-control w-100 me-1" v-model="recipeItem.riname" placeholder="예) 다진 돼지고기 600g">
                    </div>
                    <div class="col-1 d-flex justify-content-start align-items-center m-0  p-0">
                        <button class="btn bg-white me-1 w-50 d-flex justify-content-center align-items-center" v-if="index !== 0" @click="removeRecipeItem(index)">&#10134;</button>
                        <button class="btn bg-white w-50 d-flex justify-content-center align-items-center" v-if="index + 1 === recipeItems.length" @click="addRecipesItem(index)">&#10133;</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="curiculums" class="w-50 mb-3" v-for="(recipeProcess, index) in recipeProcesses" :key="index">
            <div class="d-flex flex-column justify-content-center">
                <h5 class="mb-3">Step.{{ index+1 }}</h5>
                <div class="rounded-4 p-3 w-100" style='background-color: #fff9e2;'>
                    <div class="cInputForm my-3">
                        <div class="mt-3" style="text-align: center;" v-show="isRpImg[index]"> 
                            <img class="rounded-4" style="width: 250px; height: 250px"/>
                        </div>    
                        <label class="form-label my-3"> 이미지(필수!!!)</label>
                        <input  type="file" class="form-control" ref="rpImgs" @change="setPrImg($event,index)">
                    </div>

                    <div class="mb-3">
                        <label class="form-label mb-3">제목</label>
                        <input type="text" class="form-control" v-model="recipeProcess.rptitle" placeholder="제목을 입력해주세요.">
                    </div>

                    <div class="mb-3">
                        <label class="form-label mb-3">내용</label>
                        <textarea class="form-control" v-model="recipeProcess.rpcontent" rows="5" 
                        placeholder="커리큘럼을 소개해주세요">
                        </textarea>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <button class="btn btn-outline-warning" @click="removePr">단계 삭제하기</button>
            <button class="btn btn-outline-warning" @click="addPr">단계 추가하기</button>
        </div>

        <button class="btn" @click="submitClass">저장 </button>
    </div>
</template>

<script setup>
import recipeAPI from '@/apis/recipeAPI';
import axios from 'axios';
import { ref } from 'vue';

const presetImg = ref(null);
let isPreImg = ref(false);
const rno=55;

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
let isRpImg = ref([
    false,
]);

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
        isRpImg.value[index] = true;
        }
    }else{
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
}
getRecipe(rno);


//recipe Update------------------------------------------------------------

async function submitClass(){
    const recipeFormdata= new FormData();
    recipeFormdata.append("rno", rno);
    recipeFormdata.append("rtitle",recipe.value.rtitle);
    recipeFormdata.append("rcontent",recipe.value.rcontent);
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
}

</script>

<style scoped>
</style>