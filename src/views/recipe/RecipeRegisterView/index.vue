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
import store from '@/store';
import { ref } from 'vue';

const recipe = ref({
    rtitle:"",
    rcontent:"",
    mid:"",
    ctno:1
})

const presetImg = ref(null);
let isPreImg = ref(false);
const rno=ref(0);

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
    
    if(recipe.value.length > 1){
        recipe.value.splice(-1,1);
        isRpImg.value.splice(-1,1);
    }
}

//// ------- 등록 function ------------------------------------------------------------------------------------------------------------------------
async function submitClass(){
    //이미지 파일을 전송하기 위해 JSON 대신 폼데이터로 전송 
    const recipeFormdata = new FormData();
    recipeFormdata.append("rtitle",recipe.value.rtitle);
    recipeFormdata.append("rcontent",recipe.value.rcontent);
    recipeFormdata.append("mid",store.state.userId);
    recipeFormdata.append("ctno",1);
    const preAttach = presetImg.value;
    //이미지를 배열로 전달
    recipeFormdata.append("rAttach",preAttach.files[0]);
    
    try{
        //레시피 데이터만 전달
        const response1 = await recipeAPI.recipeRegister(recipeFormdata);

        rno.value=response1.data.rno;
        //입력받은 recipeItems(배열)의 값들에 rno와 rino를 같이 전달
        recipeItems.value.rno=rno.value;
        for(let i=0; i<recipeItems.value.length;i++){
            recipeItems.value[i].rino=i+1;
            recipeItems.value[i].rno=rno.value;
        }
    }catch(error){
        console.log(error);
    }
    //레시피 아이템을 리스트 형태로 전달
    const recipeItem= JSON.parse(JSON.stringify(recipeItems.value));
    const response2 = await recipeAPI.recipeItemRegister(recipeItem)
    
    //레시피 프로세스를 폼데이터 형태로 객체 하나씩 전달 
    for(let i=0;i<recipeProcesses.value.length;i++){
        const rpFormdata= new FormData();
        rpFormdata.append("rno",rno.value);
        rpFormdata.append("rporder",recipeProcesses.value[i].rporder);
        rpFormdata.append("rptitle",recipeProcesses.value[i].rptitle);
        rpFormdata.append("rpcontent",recipeProcesses.value[i].rpcontent);
        const rpAttach = rpImgs.value[i];
        if(rpAttach.files.length!==0){
            rpFormdata.append("rpAttach",rpAttach.files[0]);

        }
        const response3= await recipeAPI.recipeProcessRegister(rpFormdata);
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