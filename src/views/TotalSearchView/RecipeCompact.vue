<template>
    <!-- 전체 검색 -->
    <div class="total-search">
        <div class=" mb-2">
            <h5 class="class-name mb-3">레시피</h5>
            <div class="main-box mb-5">
                <div v-if="data.searchText==='' || recipeCardes.length === 0" style="margin-top:100px">
                    <div style="margin: 60px auto; text-align: center">
                        <h6><strong>검색어어가 존재하지 않습니다.</strong></h6>
                    </div>
                </div>
                <div  v-if="recipeCardes.length !== 0 && data.searchText!==''">
                    <ul class="main-img d-flex">
                        <RecipeCard v-for="(recard, index) in recipeCardes" :key="index" :objectProp="recard" @click="handleClick(index)"/>
                    
                    </ul>

                    <div class="d-flex justify-content-center">
                        <button class="plus-button btn" @click="MovetoList">더보기</button>
                    </div>
                </div>
                    
            </div>
        </div>
    </div>
</template>

<script setup>
import recipeAPI from '@/apis/recipeAPI';
import RecipeCard from '@/components/RecipeCard.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route=useRoute();
const router=useRouter();

const recipeCardes = ref([
{
    },
]);

function handleClick(index) {
    console.log(recipeCardes.value[index].isActive);
    recipeCardes.value[index].isActive = !recipeCardes.value[index].isActive;
    router.push(`/recipe/recipeDetailView?cno=${recipeCardes.value[index].rno}&pageNo=1&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=1`);
    console.log(recipeCardes.value[index].isActive);
}

const data= ref({
    searchTitle:'all',
    searchText:'',
    searchSort:1
})

data.value.searchTitle=route.query.searchTitle||'all';
data.value.searchText=route.query.searchText||'';

let countSearchClass= ref(null);

if(data.value.searchText!==''){
    getSearchRecipe(1,4);
}



function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}

async function getSearchRecipe(pageNo,perPage){
    console.log("getclass 실행")
    const response = await recipeAPI.getRecipeList(JSON.parse(JSON.stringify(data.value)), pageNo,perPage)
    recipeCardes.value=response.data.searchRecipe;
    console.log(response.data.searchRecipe);
    countSearchClass.value=recipeCardes.value.length;
  
}
function MovetoList(){
    router.push(`/recipe/recipeListView?pageNo=1&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=1`)
}

 function routerLinkTo(index){
    router.push(`/recipe/recipeDetailView?cno=${recipeCardes.value[index].rno}&pageNo=1&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=1`);
}

watch(route,(newRoute,oldRoute)=>{
    if(newRoute.query.searchText!==''){
        data.value.searchTitle=newRoute.query.searchTitle||'all';
        data.value.searchText=newRoute.query.searchText||'';
        getSearchRecipe(1,4)
    } else{
        data.value.searchText=''
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