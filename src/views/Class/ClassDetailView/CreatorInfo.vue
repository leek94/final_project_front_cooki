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
import classAPI from '@/apis/classAPI';
import memberAPI from '@/apis/memberAPI';
import store from '@/store';
import { onMounted, ref } from 'vue';


let mid= store.state.classes.userId;
let cno =  store.state.classes.cno;

const mnickname=ref();

const careerinfo=({
    career:""
})

const awardinfo=({
    award:""
    
});

async function info(mid){
    const response=await memberAPI.getCreatorInfo(mid);
    careerinfo.value=response.data.career;
    awardinfo.value=response.data.awards;
}

</script>

<style scoped>
</style>