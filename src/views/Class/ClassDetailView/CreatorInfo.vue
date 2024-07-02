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
           <p v-for="(value,index) in careerinfo" :key="index">
            {{ value.cacontent}}
           </p>
        </div>
        <div class="ms-5" style="width:30%"> 
            <h5 class="fw-bold">수상</h5>
            <p v-for="(value,index) in awardinfo" :key="index">
            {{ value.acontent }}
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
import { useRoute } from 'vue-router';

const route= useRoute();

let cno =  route.query.cno;

const mnickname=ref();

const careerinfo=ref({
    career:""
})

const awardinfo=ref({
    award:""
    
});
info(cno);
async function info(cno){
    const response=await memberAPI.getCreatorInfo(cno);
    careerinfo.value=response.data.career;
    console.log("sef"+response.data.career)
    awardinfo.value=response.data.awards;
    mnickname.value= response.data.mnickname;
}

</script>

<style scoped>
</style>