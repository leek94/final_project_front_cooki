<template>

<ModalTemplate>
    <template v-slot:header >
        신청 취소
    </template>

    <template v-slot:body >
        <p class="text-center" style="font-size: 20px; font-weight: bold">
            신청을 취소하시겠습니까
        </p>
    </template>
    <template v-slot:footer>
        <button class="btn btn-md " style="background-color:rgb(243, 243, 243); color:black" @click="emit('cancel')">확인</button>
        <button class="btn btn-md btn-success" data-bs-dismiss="modal">취소</button>
    </template>
</ModalTemplate>

</template>

<script setup>
import ModalTemplate from "../../../components/ModalTemplate.vue";
const emit=defineEmits(['cancel']);

</script>

<style scoped>
</style>