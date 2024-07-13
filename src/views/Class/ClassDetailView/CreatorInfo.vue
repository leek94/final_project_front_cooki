<template>
    <h4 class="fw-bold m-5">크리에이터</h4>
    <div class="d-flex w-100">
        <div class="d-flex" style="margin: 20px; width:30%">
            <div class="justify-content-center" style="align-content: center;">
                <img class="rounded-circle" style=" width:70px; height:70px; margin-right: 30px;" 
                src="/images/photos/profile.png" v-if="!mimgoname">
                <img class="rounded-circle" style=" width:70px; height:70px; margin-right: 30px;" 
                :src="`${axios.defaults.baseURL}/member/mattach/${mid}`" v-if="mimgoname">
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
import axios from 'axios';

const route= useRoute();

let cno =  route.query.cno;

const mid = ref();

const mimgoname=ref();

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
    awardinfo.value=response.data.awards;
    mid.value = response.data.mid;
    mnickname.value= response.data.mnickname;
    mimgoname.value = response.data.mimgoname;
}

</script>

<style scoped>
</style>