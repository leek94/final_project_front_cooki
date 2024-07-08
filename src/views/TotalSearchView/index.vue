<template>
    <div class="container_box ss">
        <div class="recipe-title mb-5"></div>
        <SearchBar @searchword="searchresult"/>

        <!-- 검색 이후에 v-if로 삭제할 예정 -->
        <div class="result" v-if="data.searchText===''">
            <div class="default-result">
                <b>어떤 요리가 궁금하신가요?</b>
                <br>
                요리명, 재료명으로 검색해 보세요
            </div>
        </div>
        
        <!-- navbar -->
        <nav class="navbar navbar-expand-sm navbar-light border-bottom border-top mb-5" style="text-align: center">
            <div class="container-fluid">
                <ul class="navbar-nav d-flex w-100">
                    <li class="nav-item" style="display: inline-block; ">
                        <RouterLink class="menu" :to="`/TotalSearchView/Total?searchTitle=${data.searchTitle}&searchText=${data.searchText}`">전체({{ classCount+recipeCount }})</RouterLink>
                    </li>
                    <li class="nav-item w-15" style="display: inline-block; ">
                        <RouterLink class="menu" :to="`/TotalSearchView/ClassCompact?searchTitle=${data.searchTitle}&searchText=${data.searchText}`">클래스({{classCount}})</RouterLink>
                    </li>
                    <li class="nav-item w-15" style="display: inline-block; ">
                        <RouterLink class="menu" :to="`/TotalSearchView/RecipeCompact?searchTitle=${data.searchTitle}&searchText=${data.searchText}`">레시피({{ recipeCount }})</RouterLink> 
                    </li>
                </ul>
            </div>
        </nav>

        <!-- 전체 검색 -->
         <RouterView></RouterView>
    </div>
</template>

<script setup>
import searchAPI from '@/apis/searchAPI';
import SearchBar from '@/components/SearchBar.vue';
import { ref, provide, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const data=ref({
    searchText:'', 
    searchTitle:'all',
    searchSort:1
})

data.value.searchTitle=route.query.searchTitle||'all'
data.value.searchText=route.query.searchText||''
let classCount= ref(0);
let recipeCount=ref(0);
async function searchresult(search){
   data.value.searchText=search.searchText
   data.value.searchTitle=search.searchTitle 
   const response = await searchAPI.getTotalCount(JSON.parse(JSON.stringify(data.value)));
    classCount.value= response.data.searchClasses;
    recipeCount.value= response.data.searchRecipes;
    
   if(data.value.searchText===''){
        data.value.searchText==='';
        data.value.searchTitle='all'
    }
   router.push(`/TotalSearchView/Total?pageNo=1&searchTitle=${data.value.searchTitle}&searchText=${data.value.searchText}`);
}


</script>   

<style scoped>

/* .ss{
    border: solid 1px;
} */

.container_box{
    padding: 6.875rem 1.875rem 1rem;
    margin-bottom: 1.25rem;
    max-width: 85rem;
    min-width: 75rem;
    margin: 0 auto;
}

.recipe-title{
    font-size: 3.75rem;
    font-weight: 800;
    text-align: start;
}

.default-result{
    padding: 3rem 0;
    text-align: center;
    line-height: 1.7;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
}

.navbar{
    text-align: left;
    padding: 0.8rem 0;
}

li {
    font-size: 0.7rem;
}

.container-fluid{
    --bs-gutter-x: 0rem; 
    /* 내부바 제일 앞 부분 padding 삭제를 위해 */
}

.menu{
    text-decoration: none;
    font-size:1rem;
    margin-right:30px;
}

/* 검색시 필요 */
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
}

</style>