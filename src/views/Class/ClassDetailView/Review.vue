<template>
    <h4 class="fw-bold m-5">리뷰</h4>
    <!-- 평점 -->
    <div class="d-flex py-1 px-4" style="align-items: center;">
        <h5 class="m-2 d-flex align-content-center" style="font-weight: bold;"> 클래스 평점</h5>
        <div class="star">
            <img src="/images/photos/ic_star.png">
            <img src="/images/photos/ic_star.png">
            <img src="/images/photos/ic_star.png">
        </div>
    </div>

    <!-- 댓글 등록 -->
    <!-- 로그인 한 유저만 등록 가능 v-show로 -->
    <div class="d-flex p-2 m-2 border rounded bg-light">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3">
             <div class="d-flex mb-1">
                  <div class="me-3" style="font-weight: bold;">닉네임</div>
             </div>
            <form>
                <!-- onclick 이벤트로 클릭스 하얀별에서 노란별로 바뀌고 폼 저장할 때 별점도 입력되게 하기 -->
                <div class="d-flex pb-2" style="align-items: center;">
                    <div class="star">
                        <img src="/images/photos/ic_star_white.png">
                        <img src="/images/photos/ic_star_white.png">
                        <img src="/images/photos/ic_star_white.png">
                        <img src="/images/photos/ic_star_white.png">
                        <img src="/images/photos/ic_star_white.png">
                    </div>
                    <h6 class="m-2">평점을 입력해주세요</h6>
                </div>
                <div class="w-100 row pe-5">
                     <textarea class="p-3 ms-3 me-3 border rounded" style="color: grey;" placeholder="리뷰 내용을 입력해주세요."></textarea>
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

            <h6 class="m-1"><RouterLink to="/Member/LoginView">로그인</RouterLink> 하시고 리뷰를 남겨보세요.</h6>
        </div>
    </div>    
    
    <!-- 리뷰 -->
    <div class="d-flex p-1">
        <img class="m-3 rounded-circle" src="/images/photos/profile.png" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 row my-3">
            <div class="d-flex mb-1">
                <div class="me-3" style="font-weight: bold;">닉네임</div>
                <div class="star-group me-3">
                    <img src="/images/photos/ic_star.png"><img src="/images/photos/ic_star.png">
                </div>
                <div style="color: grey; font-size: small">년-월-일 시:분</div>
            </div>
            <div style="color: grey;">
                리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용
                리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용
                리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용
                리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용
            </div>
            <!-- 작성자에게만 보여야 하는 버튼 -->
            <div class=" text-end mt-3 pe-5">
                <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;">수정</button>
                <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;">삭제</button>
            </div>
            
            <!-- <div class="flex-grow-1 row justify-content-end">
                <div class="text-end">
                    <button class="px-2 mx-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;">수정</button>
                    <button class="px-2 border rounded bg-white" style="font-size: small; color: grey; font-weight: bold;">삭제</button>
                </div>
            </div> -->


        </div>
    </div>

</template>

<script setup>
</script>

<style scoped>
</style>