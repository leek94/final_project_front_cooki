<template>
<ModalTemplate>
    <template v-slot:header>
        로그인 실패
    </template>
    <template v-slot:body>
        정확한 이메일과 비밀 번호를 입력해 주세요
    </template>
    <template v-slot:footer> 
        <button type="button" class="btn btn-success btn-sm" data-bs-dismiss="modal" @click="$emit('close')">확인</button>
    </template>

   
</ModalTemplate>
</template>

<script setup>
import ModalTemplate from '@/components/ModalTemplate.vue'

const emit = defineEmits(['close'])
</script>

<style scoped>
</style>