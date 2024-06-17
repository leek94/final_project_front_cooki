<template>
    <div class="card mt-5">
            <Items></Items>
    </div>
    <div class="curriculum d-flex mt-5">
        <div class="cimg">
            <img style="width:350p; height:160px" src="https://cdn.class101.net/images/874e5958-dc3d-43c4-b6d3-ab420e0a4968/1920xauto.webp">
        </div>
        <div class="cinfo" style=" text-align: left;">
            <span>WELCOME</span>
            <div class="ctitle">안녕하세요! 리화쌤입니다</div>
            <textarea style="resize: none; width:450px; border-style: none; text-align: left;">
                1. 안녕하세요 샐러드 선생님 리화쌤입니다.
                2. 키트를 살펴 볼까요?
            </textarea>
        </div>
    </div>
</template>

<script setup>
import Items from '@/components/Items.vue'
</script>

<style scoped>
</style>