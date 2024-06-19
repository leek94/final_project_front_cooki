<template>
    <!-- 클래스 카드 -->
    <li class="class-img-li ss">
        <div class="router-div">
            <div class="class-image">
                <img src="/images/photos/semi2.jpg">
            </div>
            <div class="text-start">
                <div class="class-text text-start">
                    <h4>생선을 활용한 쿠킹 클래스</h4>
                </div>
                <div>
                    <h6>모집강사 : 김진영</h6>
                </div>
                <div>
                    <h6>모집인원 : 17/25</h6>
                </div>
                <div class="info d-flex mb-3">
                    <div class="class-date border-left-solid me-3">강의날짜 : 2024.06.21</div>
                    <div class="dday-box">D-5</div>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <div class="class-label text-end">참여하기</div>
            </div>
        </div>
    </li>
                        <!-- 클래스 카드 끝 -->
</template>

<script setup>
</script>

<style scoped>
/* 클래스 카드 시작 */
.class-img-li{
    width: calc(25% - 2rem);
    margin: 0 1rem 4rem;
}

.class-image{
    overflow: hidden;
    position: relative;
    width: 100%;
    padding-top: 100%; /* 자식 요소의 세로 길이를 부모 요소의 너비에 맞춤 */
    border-radius: 20px;
}

.class-image > img{
    position: absolute;
    width: 100%;
    height: auto;
    top: 50%;
    left: 50%;
    object-fit: cover;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease-out;
}

.class-name{
    color: #c4c4c4;
    font-size: 0.75rem;
}

.class-date{
   
    
}

.class-text{
    padding: 1.25rem 0 0.5rem;
}

.dday-box{
    color:red;
}

.class-label{
    display: inline-block;
    margin-bottom: 0.625rem;
    padding: 0.7rem 1rem;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 5px;
    background-color: #0bab6d;
}
/* 클래스 카드 끝 */
</style>