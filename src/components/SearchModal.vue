<template>
<ModalTemplate>
    <template v-slot:header>
        검색
    </template>
    <template v-slot:body>
        검색어를 입력해주세요
    </template>
    <template v-slot:footer> 
        <button type="button" class="btn btn-success btn-sm" data-bs-dismiss="modal" @click="$emit('close')">확인</button>
    </template>

   
</ModalTemplate>
</template>

<script setup>
import ModalTemplate from './ModalTemplate.vue'

const emit = defineEmits(['close'])
</script>

<style scoped>
</style>