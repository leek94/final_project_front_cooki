<template>
    <h4 class="fw-bold m-5">Q&A</h4>
    <!-- 댓글 등록 -->
    <!-- 로그인 한 유저만 등록 가능 v-show로 -->
    <div class="d-flex p-2 m-2 border rounded bg-light">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3">
             <div class="d-flex mb-1">
                  <div class="me-3" style="font-weight: bold;">닉네임</div>
             </div>
            <form>
                <div class="w-100 row pe-5">
                     <textarea class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="문의 내용을 입력해주세요."></textarea>
                </div>
                <div class=" text-end mt-3 pe-5">
                    <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;">등록</button>
                     <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;">닫기</button>
                </div>
            </form>
        </div>
    </div>
    <!-- 로그인 안했을 경우 v-if-->
    <div class="d-flex p-2 m-2 border rounded bg-light" style="color: gray;">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3" style="align-items: center;">

            <h6 class="m-1"><RouterLink to="/Member/LoginView">로그인</RouterLink> 하시고 댓글을 남겨보세요.</h6>
        </div>
    </div>    
    
    <!-- 댓글 -->
    <div class="d-flex p-1">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3">
            <div class="d-flex mb-1">
                <div class="me-3" style="font-weight: bold;">닉네임</div>
                <div style="color: grey; font-size: small">년-월-일 시:분</div>
            </div>
            <div style="color: grey;">
                문의내용내용내용문의내용내용내용문의내용내용내용
                문의내용내용내용문의내용내용내용문의내용내용내용
                문의내용내용내용문의내용내용내용문의내용내용내용
                문의내용내용내용문의내용내용내용문의내용내용내용
                문의내용내용내용문의내용내용내용문의내용내용내용
            </div>
            
            <div class="flex-grow-1 row justify-content-between">
                <!-- 에디터한테만 보여야 하는 버튼 -->
                <button class="col-4 border-0 bg-white text-start me-5 pe-5" style="font-size: small; color: grey; font-weight: bold;">
                    <!-- <img src="/images/photos/ic_talk.png"> -->
                    <img src="/images/photos/ic_comment.png">
                    답글달기
                </button>
                <!-- 작성자에게만 보여야 하는 버튼 -->
                <div class="col-4 text-end">
                    <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;">수정</button>
                    <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;">삭제</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 대댓글 -->
    <div class="d-flex ms-5 p-1">
        <img class="m-3 flex-grow-1 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="row my-3">
            <div class="d-flex mb-1">
                <div class="me-3" style="font-weight: bold;">닉네임</div>
                <div style="color: grey; font-size: small">년-월-일 시:분</div>
            </div>
            <div style="color: grey;">
                문의답글내용문의답글내용문의답글내용
                문의답글내용문의답글내용문의답글내용
                문의답글내용문의답글내용문의답글내용
                문의답글내용문의답글내용문의답글내용
                문의답글내용문의답글내용문의답글내용
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
</style>