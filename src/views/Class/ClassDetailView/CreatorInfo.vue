<template>
    <h4 class="fw-bold m-5">크리에이터</h4>
    <div class="d-flex w-100">
        <div class="d-flex" style="margin: 20px; width:30%">
            <div class="justify-content-center" style="align-content: center;">
                <img class="rounded-circle" style=" width:70px; height:70px; margin-right: 30px;" 
                src="https://cdn.class101.net/images/7ee5dd7f-be19-4e0c-89b1-d250ef0a2e2f/1920xauto.webp">
            </div>
            <span style="align-content: center; font-weight: bold; font-size: 20px">{{ mnickname }}</span>
        </div>
        <div class="ms-5" style="width:30%"> 
            <h5 class="fw-bold">경력</h5>
           <p v-for="(value,index) in info2" :key="index">
            {{ value }}
           </p>
        </div>
        <div class="ms-5" style="width:30%"> 
            <h5 class="fw-bold">수상</h5>
            <p v-for="(value,index) in info3" :key="index">
            {{ value }}
            </p>
        </div>
    </div>
    <div class="awards">

    </div>
</template>

<script setup>
import { ref } from 'vue';

const mnickname=ref("찌니의 빵공장")

const info2=ref({
    career1:"(현) 얌얌 베이킹 클래스 강사",
    career2:"제과기능 장 자격증 보유",
    career3:"베이커리를 위한 요소 관리사 보유",
    career4:" 베이커리 페어 경연대회 심사위원",
})

const info3=ref({
    award1:"(현) 얌얌 베이킹 클래스 강사",
    award2:"제과기능 장 자격증 보유",
    
})
</script>

<style scoped>
</style>