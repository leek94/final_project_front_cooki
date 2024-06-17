<template>
    <form>

        <div class="d-flex row" style="justify-content: center;">
                <div class="row mx-5 p-5 " style="width: 700px; justify-content: center;">
                    <h3 class="mb-5" style="font-weight: bold; text-align: center">로그인</h3>
                    <input class="p-2 mb-3" placeholder="이메일 형식의 아이디"/>
                    <input class="p-2 mb-4" placeholder="비밀번호"/>
                    <button class="p-2 w-100 bg-dark text-white rounded" style="font-weight: bold;">로그인</button>
                </div>        
        </div>
    </form>

    <div class="d-flex row mb-5" style="justify-content: center;">
        <RouterLink to="/Member/JoinView" style="text-align: center;">회원가입 하기</RouterLink>
    </div>
</template>

<script setup>
</script>

<style scoped>
</style>