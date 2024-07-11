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
                        <RecipeCard v-for="(recard, index) in recipeCardes" :key="index" :objectProp="recard" @click="routerLinkTo(recard.rno)" @like="handleLike"/>
                    
                    </ul>

                    <div class="d-flex justify-content-center" v-if="recipeCardes.length !== page.pager.totalRows">
                        <button class="plus-button btn" @click="appendList">더보기</button>
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
]);
const page=ref({
    pager:{}
})

const data= ref({
    searchTitle:'all',
    searchText:'',
    searchSort:1
})

data.value.searchTitle=route.query.searchTitle||'all';
data.value.searchText=route.query.searchText||'';

let pageNo=1;
const perPage=8;
if(data.value.searchText!==''){
    getSearchRecipe();
}

function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}


async function getSearchRecipe(){

    const response = await recipeAPI.getRecipeList(JSON.parse(JSON.stringify(data.value)), pageNo,perPage)

    let rlData = response.data.searchRecipe
    page.value.pager =  response.data.pager
    //for문을 clData 배열에 있는 객체를 가져온다
    for(let i=0;i<rlData.length;i++){
            //dateformat
            let date = new Date(rlData[i].rdate);
            rlData[i].rdate= dateFormat(date);
            //classCards 배열에 clData 객체 하나씩 할당 해준다(넣어준다)
            recipeCardes.value.push(rlData[i])
        }
}

async function appendList(){
    pageNo+=1
    getSearchRecipe()
}

 function routerLinkTo(rno){
    router.push(`/recipe/recipeDetailView?rno=${rno}&pageNo=1&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}&searchSort=1`);
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