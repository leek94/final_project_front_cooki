<template>
    <div class="d-flex row mx-5 mb-5 px-5" style="justify-content: center; max-width: 1000px">
        <h3 class="text-start" style="font-weight: bold; justify-content: center;" >프로필 관리</h3>
        
        
        <div class="row mx-2 mb-3">
            <li class="green-point m-3" >프로필 사진</li>
            <img class="border rounded p-3 mx-3 mb-3 mt-1 w-25" src="/images/photos/profile.png">
            <div class="input-group w-75">
                <input type="file" class="form-control" id="inputGroupFile" aria-describedby="inputGroupFileAddon" aria-label="파일첨부">
                <button class="btn border" type="button" id="inputGroupFileAddon">변경</button>
            </div>
        </div>

        <div class="row mx-2 mb-3">
            <li class="green-point m-1">아이디(이메일)</li>
            <div class="input-group w-75">
                <input type="text" class="form-control bg-light" placeholder="cooki123@naver.com" aria-label="Recipient's username" aria-describedby="button-addon2" readonly>
            </div>
        </div>

        <div class="flex-grow-1 row mx-2 mb-3">
            <li class="green-point m-1">이름</li>
            <div class="input-group w-75">
                <input type="text" class="form-control" placeholder="김쿠키" aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn border" type="button" id="button-addon2">변경</button>
            </div>
        </div>

        <div class="flex-grow-1 row mx-2 mb-3">
            <li class="green-point m-1">비밀번호</li>
            <div class="input-group w-75">
                <input type="text" placeholder="비밀번호" aria-label="password" class="form-control">
                <input type="text" placeholder="비밀번호 확인" aria-label="passwordCheck" class="form-control">
                <button class="btn border" type="button" id="button-addon2">변경</button>
            </div>
        </div>

        <!-- 에디터한테만 보이는 화면 -->
        <div class="flex-grow-1 row mx-2 mb-3">
            <li class="green-point m-1">경력</li>
            <!-- db에 저장된 수만큼 for문 -->
            <div class="input-group w-75 mb-1">
                <input type="text" class="form-control" placeholder="쿠키호텔 주방장 3년" aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn border" type="button" id="button-addon2">변경</button>
                <button class="btn border" type="button" id="button-addon2">삭제</button>
            </div>
            <div class="input-group w-75 mb-1">
                <input type="text" class="form-control" placeholder="키쿠제과 베이킹 클래스 운영 2년" aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn border" type="button" id="button-addon2">변경</button>
                <button class="btn border" type="button" id="button-addon2">삭제</button>
            </div>
        </div>

        <!-- 에디터한테만 보이는 화면 -->
        <div class="flex-grow-1 row mx-2 mb-3">
            <li class="green-point m-1">수상내역</li>
            <div class="input-group w-75 mb-1">
                <input type="text" class="form-control" placeholder="제3회 쿠키쿠 베이킹 대회 장려상" aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn border" type="button" id="button-addon2">변경</button>
                <button class="btn border" type="button" id="button-addon2">삭제</button>
            </div>
            <div class="input-group w-75 mb-1">
                <input type="text" class="form-control" placeholder="제3회 쿠키 대회 장려상" aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn border" type="button" id="button-addon2">변경</button>
                <button class="btn border" type="button" id="button-addon2">삭제</button>
            </div>
            <div class="input-group w-75 mb-1">
                <input type="text" class="form-control" placeholder="제3회 쿠키 대회 장려상" aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn border" type="button" id="button-addon2">변경</button>
                <button class="btn border" type="button" id="button-addon2">삭제</button>
            </div>
        </div>
    
    
    </div>


</template>

<script setup>

</script>

<style scoped>
.green-point::marker {
    color: #15a775;
}

.green-point {
    font-weight: bold;
}

.btn {
    font-weight: bold;
}

.btn:hover {
    background-color: #15a775;
    color: white;
}
</style>