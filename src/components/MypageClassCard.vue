<template>
    <!-- 클래스 카드 -->
    <div class="d-flex" >
        <div class="qcards d-flex" >
            <div class="card qnaCard mt-3" style="padding:0 ">
                <div class="card-body text-center">
                    <li class="class-img-li ss">
                        <div class="router-div" :style="prop.style">
                            <div class="class-image">
                                <img src="/images/photos/semi2.jpg">
                            </div>
                            <div class="text-start" >
                                <div class="class-text text-start">
                                    <h4>{{ prop.objectProp.ctitle }}</h4>
                                </div>
                                <div>
                                    <h6>모집강사 : {{ prop.objectProp.mname }}</h6>
                                </div>
                                <div>
                                    <h6>모집인원 : 17/{{ prop.objectProp.cpersoncount }}</h6>
                                </div>
                                <div class="info d-flex mb-3">
                                    <div class="class-date border-left-solid me-3">강의날짜 : {{ prop.objectProp.cdday }}</div>
                                    <div class="dday-box" :class="prop.class" >D-5</div>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>
            </div>
        </div>
    </div>
    <!-- 클래스 카드 끝 -->
</template>

<script setup>
const prop= defineProps([ "class","objectProp"])

console.log(prop.style)


</script>

<style scoped>
/* 클래스 카드 시작 */
.class-img-li{
    list-style: none;
    width:100%;
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

.class-text{
    padding: 1.25rem 0 0.5rem;
}

.dday-box{
    color:red;
}

.class-label{
    display: inline-block;
    margin-bottom: 0.625rem;
    padding: 0.4rem 0.8rem;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 5px;
    background-color: #0bab6d;
}
 .qnaCard{
     border:solid 1px #e5e5e5;
     border-radius: 0.7rem;
     box-shadow: 0 2px 20px 0 rgba(0, 0, 3, 0.2);
     margin-top:3.5rem;
     margin:0 1rem;
     width: 245px;
 }

</style>