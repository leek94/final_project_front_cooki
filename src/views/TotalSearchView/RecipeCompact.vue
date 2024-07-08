<template>
    <!-- 전체 검색 -->
    <div class="total-search">
        <div class=" mb-2">
            <h5 class="class-name mb-3">레시피</h5>
            <div class="main-box mb-5">
                <ul class="main-img d-flex">
                    <RecipeCard v-for="(recard, index) in recipeCardes" :key="index" :objectProp="recard" @click="handleClick(index)"/>
                   
                </ul>

                <div class="d-flex justify-content-center">
                    <button class="plus-button btn">더보기</button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import RecipeCard from '@/components/RecipeCard.vue';
import { ref } from 'vue';

function handleClick(index) {
    console.log(recipeCardes.value[index].isActive);
    recipeCardes.value[index].isActive = !recipeCardes.value[index].isActive;
    console.log(recipeCardes.value[index].isActive);
}

const recipeCardes = ref([
{
        mname: '',
        bdate: '',
        btitle:'',
        blike: null,
        bhitcount: null,
        isActive: false,
    },
]);

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