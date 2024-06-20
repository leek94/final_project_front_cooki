<template>
            <Items></Items>
    <h4 class="fw-bold" style="margin-top:80px">커리큘럼</h4>
    <div class="curriculum mt-5 ">
        <div class="d-flex mb-5" v-for="(cs,index) in curriculum" :key="index">
            <div class="cimg">
                <img style= "width:140p; height:140px; border-radius: 20px" src="https://d1x9f5mf11b8gz.cloudfront.net/class%2F20230604%2Fd432deb8-5ab6-42af-8a90-8fde121ae88c.jpg">
            </div>
            <div class="cinfo" style=" text-align: left; margin-left: 50px; align-content: center">
                <div>
                    <span style="color:rgb(91, 91, 91)">CHAPTER</span>
                    <span style="color:rgb(91, 91, 91)">{{cs.cuorder}}</span>
                </div>
                <div class="cutitle fw-bold h5" > {{ cs.cutitle }} </div>
                <p class="cucontent">{{ cs.cucontent }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import Items from '@/components/Items.vue'
import { ref } from 'vue';

const curriculum=ref([
    {
        cuorder:1,
        cutitle:"반죽만들기",
        cucontent:"쿠키 반죽을 만들고 구운 후 마시멜로우에 데코해줍니다"
    },
    {
        cuorder:2,
        cutitle:"반죽만들기",
        cucontent:"쿠키 반죽을 만들고 구운 후 마시멜로우에 데코해줍니다"
    },
    {
        cuorder:3,
        cutitle:"예쁘게 포장하기",
        cucontent:"구워진 쿠키를 식힌 후 예쁘게 포장합니다."
    },
])
</script>

<style scoped>
img{
    max-width: 140px;
    max-height: 140px;
}
</style>