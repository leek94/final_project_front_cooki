<template>
    <div class="img-li ss">
        <div class="router-div d-flex">
            <div class="image">
                <img src="/images/photos/140114575djmw.jpg">
            </div>
            <h4>맛있는 행복한 시간</h4>
            <div>
        
                <div class="name me-2">이경환</div>
                <div class="date border-left-solid">2024.06.09 16:43</div>
      
            <div class="text text-start">
                <div class="d-flex justify-content-end">
                    <div class="me-2">좋아요</div>
                    <div class="">히트카운트</div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
/* 레시피 카드 */


.image{
    overflow: hidden;
    position: relative;
    width: 300px;
    padding-top: 90%; /* 자식 요소의 세로 길이를 부모 요소의 너비에 맞춤 */
    border-radius: 20px;
}

.image > img{
    position: absolute;
    width: 100%;
    height: auto;
    top: 50%;
    left: 50%;
    object-fit: cover;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease-out;
}

.name{
    color: #c4c4c4;
    font-size: 0.75rem;
}

.date{
    color: #c4c4c4;
    font-size: 0.75rem;
    border-left: 1px solid black;
    border-color: #c4c4c4;
    padding-left: 0.5rem;
}

.text{
    padding: 1.25rem 0 2rem;
}
/* 레시피 카드 끝 */
</style>