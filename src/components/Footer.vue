<template>
    <div class="footer d-flex justify-content-between">
        <div class="inner">
            <div class="footer_left">
                <ul class="footer_link ">
                    <li><a href="https://member.sempio.com/legal/terms-and-condition">이용약관</a></li>
                    <li><a href="https://member.sempio.com/legal/privacy-policy">개인정보처리방침</a></li>
                    <li><a href="/userguide">이용 가이드</a></li>
                    <li><a href="/aboutus">ABOUT US</a></li>
                </ul>
            </div>
        <div class="address d-flex" style="color: #666; font-size: 13px">
            <div>샘표식품(주)</div>
            <div>서울특별시 송파구 중대로 135 아이티벤처타워 (우편번호: 04557)</div>
        </div>
            <div class="mt-2" style="color: #666; font-size: 12px; text-align: center;">Copyright © 샘표식품, All Rights Reserved.</div>
        </div>
        <div class="footer_right" style="margin-right:8rem">
            <ul style="color: #666; font-size: 13px">
                <ul class="d-flex">
                    <li class="me-4">손혜선</li>
                    <li class="mb-1"> github: https://github.com/shyeseon</li>
                </ul>
                <ul class="d-flex">
                    <li class="me-4">손혜선</li>
                    <li class="mb-1"> github: https://github.com/shyeseon</li>
                </ul>
                <ul class="d-flex">
                    <li class="me-4">손혜선</li>
                    <li class="mb-1"> github: https://github.com/shyeseon</li>
                </ul>
                <ul class="d-flex">
                    <li class="me-4">손혜선</li>
                    <li> github: https://github.com/shyeseon</li>
                </ul>
            </ul>
        </div>

    </div>

</template>

<script setup>

</script>

<style scoped>
.footer{
    position:relative;
    bottom:0px;
    left:0px;
    height:180px;
    background-color: #f2f2f2;
    width:100%;
    margin:0 auto;
    padding:2.75rem 12rem;
    min-width: 1300px;
}
.footer_link{
    margin-bottom: 2.25rem;
    display:flex;
    
}
li{
    list-style-type: none;
}
a{
    margin-right:30px;
    color:black;
    text-decoration: none;
    font-size:14px;
    font-weight: bold;
}
</style>