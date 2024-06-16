<template>
   <div>
      <p><RouterLink :to="`/Class/ClassDetail`">첫번째 캐러셀 ClassDetail</RouterLink></p>
      <p><RouterLink :to="`/Class/ClassList`">두번째 캐러셀 ClassList</RouterLink></p>

   </div>

</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style>

</style>