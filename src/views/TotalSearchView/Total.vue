<template>
    <!-- 전체 검색 -->
    <div class="total-search">
            <div class=" mb-2">
                <h5 class="class-name mb-3">클래스</h5>
                <div class="main-box mb-5">
                    <div v-if="data.searchText==='' || classCards.length === 0" style="margin-top:100px">
                        <div style="margin: 60px auto; text-align: center">
                            <h6><strong>검색어어가 존재하지 않습니다.</strong></h6>
                        </div>
                    </div>

                    <div  v-if="classCards.length !== 0 && data.searchText!==''" >
                        <ul class="main-img d-flex">
                            <ClassCard v-for="(clcard,index) in classCards" :key="index" :objectProp="clcard" @click="routerLinkTo(index)"/>
                        </ul>
                        <div class="d-flex justify-content-center">
                            <button class="plus-button btn" @click="MovetoClassList">더보기</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class=" mb-5 pb-3">
                <h5 class="class-name mb-3">레시피</h5>
                <div class="main-box">
                    <div v-if="data.searchText==='' || recipeCardes.length === 0" style="margin-top:100px">
                        <div style="margin: 60px auto; text-align: center">
                            <h6><strong>검색어어가 존재하지 않습니다.</strong></h6>
                        </div>
                    </div>
                    <div v-if="recipeCardes.length !== 0 && data.searchText!==''" >
                        <ul class="main-img d-flex">
                            <RecipeCard  v-for="(recard,index) in recipeCardes" :key="index" :objectProp="recard" @click="handleClick(index)" @like="handleLike" />
                        </ul>

                        <div class="d-flex justify-content-center">
                            <button class="plus-button btn" @click="MovetoRecipeList">더보기</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
</template>

<script setup>
import classAPI from '@/apis/classAPI';
import recipeAPI from '@/apis/recipeAPI';
import searchAPI from '@/apis/searchAPI';
import ClassCard from '@/components/ClassCard.vue';
import RecipeCard from '@/components/RecipeCard.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
function handleClick(index) {
    console.log(recipeCardes.value[index].isActive)
    recipeCardes.value[index].isActive = !recipeCardes.value[index].isActive;
    router.push(`/recipe/recipeDetailView?rno=${recipeCardes.value[index].rno}&pageNo=1&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=1`);
    console.log(recipeCardes.value[index].isActive)
}

const classCards = ref([
    { }
]);

const recipeCardes = ref([
    { }
]);

const data= ref({
    searchTitle:'all',
    searchText:'',
    searchSort:1
})

data.value.searchTitle=route.query.searchTitle||'all';
data.value.searchText=route.query.searchText||'';

let countSearchClass= ref(null);

if(data.value.searchText!==''){
    console.log("eeee"+data.value.searchText)
    getSearchClass(1,4);
    getSearchRecipe(1,4);
}



function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

async function getSearchClass(pageNo,perPage){
    console.log("getclass 실행")
    const response = await searchAPI.getSearchClass(JSON.parse(JSON.stringify(data.value)), pageNo,perPage)
    classCards.value=response.data.searchClass;
    countSearchClass.value=classCards.value.length;
    for(let i=0;i<classCards.value.length;i++){
            classCards.value[i].crratio=Math.round(classCards.value[i].crratio*10)/10
            const resoponse2= await classAPI.classNowPerson(classCards.value[i].cno);
            classCards.value[i].cnowPerson = resoponse2.data.nowPerson;
            let date = new Date(classCards.value[i].cdday);
            classCards.value[i].cdday= dateFormat(date);
        }
}

async function getSearchRecipe(pageNo,perPage){
    console.log("getclass 실행")
    const response = await recipeAPI.getRecipeList(JSON.parse(JSON.stringify(data.value)), pageNo,perPage)
    recipeCardes.value=response.data.searchRecipe;
    console.log(response.data.searchRecipe);
    countSearchClass.value=recipeCardes.value.length;
  
}
function MovetoClassList(){
    router.push(`/class/classListView?pageNo=1&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=1`)
}

function MovetoRecipeList(){
    router.push(`/recipe/recipeListView?pageNo=1&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=1`)
}

 function routerLinkTo(index){
    router.push(`/class/classDetailView?cno=${classCards.value[index].cno}&pageNo=1&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=1`);
}

function handleLike(rno){
    for(let i=0; i<recipeCardes.value.length; i++){
        if(recipeCardes.value[i].rno === rno){
            recipeCardes.value[i].islike = !recipeCardes.value[i].islike;
            if(recipeCardes.value[i].islike){
                recipeCardes.value[i].likecount += 1;
            }else{
                recipeCardes.value[i].likecount -= 1;
            }
        }
    }
}

watch(route,(newRoute,oldRoute)=>{
    if(newRoute.query.searchText!==''){
        data.value.searchTitle=newRoute.query.searchTitle||'all';
        data.value.searchText=newRoute.query.searchText||'';
        getSearchClass(1,4)
        getSearchRecipe(1,4)
    } else{
        data.value.searchText='';
    }

})
</script>

<style scoped>
.class-name{
    border-bottom: 1px solid;
    border-color: #15a775;
    padding-bottom: 10px;
}

/* 카드 컴포넌트 설정시 필요한 */
.main-box{
    width: 100%;
    height: auto;
}

.main-img{
    width: 100%;
    height: auto;
    list-style-type: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
}

.plus-button{
    background-color: #f3f3f3;
    border-radius: 30px;
    padding: 10px 20px;
    margin-bottom: 3rem;
}
</style>