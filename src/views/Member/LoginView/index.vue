<template>
    <form>

        <div class="d-flex" style="justify-content: center;">
                <div class="row mx-5 p-5 " style="width: 500px; justify-content: center;">
                    <h3 class="mb-5" style="font-weight: bold; text-align: center">로그인</h3>
                    <input class="p-2 mb-3 border" placeholder="이메일 형식의 아이디"/>
                    <input class="p-2 mb-4 border" placeholder="비밀번호"/>
                    <button class="btn p-2 w-100 rounded">로그인</button>
                </div>        
        </div>
    </form>

    <div class="d-flex row mb-5" style="justify-content: center;">
        <RouterLink class="linkJoin" to="/Member/JoinView" style="text-align: center;">회원가입 하기</RouterLink>
    </div>
</template>

<script setup>
</script>

<style scoped>
.btn {
    font-weight: bold; 
    background-color: #15a775;
    color: white;
}

.btn:hover {
    background-color: #D9EDBF;
    color: black;
}

.btn:active {
    background-color: #D9EDBF;
    color: black;
}

.linkJoin:link {
    color: #15a775;
}

.linkJoin:visited {
    color: #15a775;
}

.linkJoin:hover {
    color: #D9EDBF;
}

.linkJoin:active {
    color: #D9EDBF;
} 
</style>