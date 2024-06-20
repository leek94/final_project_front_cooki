<template>

<ModalTemplate>
    <template v-slot:header>
        신청 취소 확인
    </template>

    <template v-slot:body>
        <p class="text-center" style="font-size: 18px; font-weight: bold">
            신청을 취소하시겠습니까
        </p>
    </template>
    <template v-slot:footer>
        <button class="btn btn-success btn-md" @click="emit('close')">확인</button>
        <button class="btn btn-success btn-md" @click="emit('close')">취소</button>
    </template>
</ModalTemplate>

</template>

<script setup>
import ModalTemplate from "../../../components/ModalTemplate.vue";
const emit=defineEmits(['close']);

</script>

<style scoped>
</style>