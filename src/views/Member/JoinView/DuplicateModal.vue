<template>
    <ModalTemplate>
        <template v-slot:header>
            회원가입 실패
        </template>
        <template v-slot:body>
            아이디 중복검사를 실행해 주세요
        </template>
        <template v-slot:footer> 
            <button type="button" class="btn btn-success btn-sm" data-bs-dismiss="modal" >확인</button>
        </template>
    
       
    </ModalTemplate>
    </template>
    
    <script setup>
    import ModalTemplate from '@/components/ModalTemplate.vue'
    
    </script>
    
    <style scoped>
    </style>