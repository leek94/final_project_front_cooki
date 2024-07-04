<template>
    
    <div>
        <div>
            <form @submit.prevent="handleSubmit" >
                <div class="search-box d-flex align-items-center justify-content-center mb-5">
                    <!-- 선택하는 셀렉터 -->
                    <select class="select-button" v-model="search.searchTitle">
                        <option value="all">전체</option>
                        <option value="titlecontent">제목&내용만</option>
                        <option value="ingredient">재료만</option>
                        <option value="category">카테고리만</option>
                    </select>

                    <!-- 검색바 & 검색 버튼 & 카테고리 박스-->
                    <div class="d-flex search-input-box">
                        <input class="search-input me-1" type="text" placeholder="어떤 레시피가 궁금하신가요?" v-model="search.searchText">
                        <button type="submit" class="search-button align-items-center justify-content-center" >검색 &ensp;<i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </div>
            </form>
    

            <div class="d-flex mb-5">
                <input type="button" class="category-button" value="한식" :class="{ active: activeIndex === '한식' }" @click="handlecategory('한식')">
                <input type="button" class="category-button" value="중식" :class="{ active: activeIndex === '중식' }" @click="handlecategory('중식')">
                <input type="button" class="category-button" value="일식" :class="{ active: activeIndex === '일식' }" @click="handlecategory('일식')">
                <input type="button" class="category-button" value="양식" :class="{ active: activeIndex === '양식' }" @click="handlecategory('양식')">
                <input type="button" class="category-button" value="디저트" :class="{ active: activeIndex === '디저트' }" @click="handlecategory('디저트')">
                <input type="button" class="category-button" value="베이커리" :class="{ active: activeIndex === '베이커리' }" @click="handlecategory('베이커리')">
            </div>
        </div>
    </div>
        
</template>

<script setup>
import { ref } from 'vue';

let search = ref({
    searchText : "",
    searchTitle : "all"
})

function handleSubmit() {
    // 검색에 대한 axios
    console.log("검색어: " + search.value.searchText);
    console.log("검색타이틀: " + search.value.searchTitle);
}

// 정렬을 위한 자바스크립트 시작
const activeIndex = ref(null);

const handlecategory = (index) => {

    console.log("0번 실행");
    console.log(index);
    activeIndex.value = index;
    search.value.searchText = index;
    search.value.searchTitle = 'category';
    handleSubmit();
};

</script>

<style scoped>

.active{
    background-color:#04AA6D !important;
    color:#fff !important;
}

.category-button:hover{
    background-color:#04AA6D !important;
    color:#fff !important;
}
/* 검색바 시작 */

.select-button > option{
    font-size: 1.2rem;
}

.search-box{
    width: 100%;
    margin-bottom: 4rem;
}

.select-button{
    flex: 1;
    width: 14rem;
    height: 5rem;
    border-radius: 46px;
    padding: 0 2.5rem;
    border: solid 3px #e5e5e5;
    font-size: 1.2rem;
}

.search-input-box{
   flex: 10;
}

.search-input{
    flex: 18;
    width: calc(100%-24rem);
    height: 5rem;
    border-radius: 46px 0 0 46px;
    font-size: 1.25rem;
    font-weight: bold;
    border: none;
    padding: 0 2.5rem;
    background-color: #f3f3f3;
}

.search-button{
    flex: 3;
    width: 10rem;
    height: 5rem;
    border-radius: 0 46px 46px 0;
    background-color: #15a775;
    color: #fff;
    font-size: 1.25rem;
    font-weight: bold;
    border: none;
}

/* 검색바 끝 */

.category-button{
    margin-right: 0.5rem;
    padding: 0.8rem 1.4rem;
    border-radius: 2rem;
    border: solid 1px #d4d4d4;
    background-color: #fff;
    margin: 0 10px;
}

.select-button option:hover {
  background-color: #04AA6D;
  color: white;
}

</style>