<template>
            <Items></Items>
    <h4 class="fw-bold" style="margin-top:80px">커리큘럼</h4>
    <div class="curriculum mt-5 ">
        <div class="d-flex mb-5">
            <div class="cimg">
                <img style= "width:140p; height:140px; border-radius: 20px" src="https://d1x9f5mf11b8gz.cloudfront.net/class%2F20230604%2Fd432deb8-5ab6-42af-8a90-8fde121ae88c.jpg">
            </div>
            <div class="cinfo" style=" text-align: left; margin-left: 50px; align-content: center">
                <span style="color:rgb(91, 91, 91)">CHAPTER 1</span>
                <div class="ctitle fw-bold h5" > 반죽만들기 </div>
                <p>쿠키 반죽을 만들고 구운 후 마시멜로우에 데코해줍니다
                </p>
            </div>
        </div>
        <div class="d-flex mb-5">
            <div class="cimg">
                <img style="width:140p; height:140px; border-radius: 20px" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS4wQF_yLJIU7jFeWclZNAfYQMPnfzilmR9sYvGnMd4NdjSg6MW">
            </div>
            <div class="cinfo" style=" text-align: left; margin-left: 50px; align-content: center">
                <span style="color:rgb(91, 91, 91)">CHAPTER 2</span>
                <div class="ctitle fw-bold h5" > 재료 설명 및 커리큘럼 안내 </div>
                <p>재료에 대해 설명해드립니다. </p>
            </div>
        </div>
        <div class="d-flex mb-5">
            <div class="cimg">
                <img style="width:140p; height:140px; border-radius: 20px" src="https://d1x9f5mf11b8gz.cloudfront.net/class%2F20230604%2F6a067331-7e04-4c04-b5be-dcc14be70743.jpg">
            </div>
            <div class="cinfo" style=" text-align: left; margin-left: 50px; align-content: center">
                <span style="color:rgb(91, 91, 91)">CHAPTER 3</span>
                <div class="ctitle fw-bold h5" > 포장</div>
                <p>충분히 쿠키가 식은 후 opp봉투에 담아 꾸민 도시락에 포장해갑니다 </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import Items from '@/components/Items.vue'
</script>

<style scoped>
img{
    max-width: 140px;
    max-height: 140px;
}
</style>