<template>
    <div class="search-box d-flex align-items-center justify-content-center mb-5">
        <!-- 선택하는 셀렉터 -->
        <select class="select-button ss">
            <option value="all">전체</option>
            <option value="title">제목만</option>
            <option value="content">내용만</option>
        </select>
        <!-- 검색바 & 검색 버튼 & 카테고리 박스-->
        <div class="d-flex search-input-box">
            <input class="search-input me-1" type="text" placeholder="어떤 레시피가 궁금하신가요?">
            <button class="search-button align-items-center justify-content-center">검색</button>
        </div>
    </div>

    <div class="d-flex mb-5">
        <button class="category-button">#한식</button>
        <button class="category-button">#중식</button>
        <button class="category-button">#일식</button>
        <button class="category-button">#양식</button>
        <button class="category-button">#디저트</button>
        <button class="category-button">#베이커리</button>
    </div>
</template>

<script setup>
</script>

<style scoped>
/* 검색바 시작 */
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
    font-weight: 500;
    border: none;
}

/* 검색바 끝 */

.category-button{
    margin-right: 0.5rem;
    padding: 0.625rem 1rem;
    border-radius: 21px;
    border: solid 1px #d4d4d4;
    background-color: #fff;
    margin: 0 10px;
}

</style>