<template>
<ModalTemplate>
    <template v-slot:header >
        모집 마감 
    </template>

    <template v-slot:body >
        <p class="text-center" style="font-size: 20px; font-weight: bold">
            신청 인원 초과되었습니다. 
            다른 클래스를 신청해주세요
        </p>
    </template>
    <template v-slot:footer>
        <button class="btn btn-md btn-success" data-bs-dismiss="modal">확인</button>
    </template>
</ModalTemplate>
</template>

<script setup>
import ModalTemplate from "../../../components/ModalTemplate.vue";
</script>

<style scoped>
</style>