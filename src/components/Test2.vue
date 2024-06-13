<template>
  <div class="main_swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="/images/galaxy_s5.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="/images/galaxy_s6.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="/images/galaxy_s7.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="/images/galaxy_s8.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="/images/galaxy_s9.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="/images/galaxy_s10.jpg" alt="">
        </div>
      </div>
      <div class="main_nav">
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>

  <div class="sub_swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="/images/s5.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="/images/s6.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="/images/s7.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="/images/s8.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="/images/s9.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="/images/s10.jpg" alt="">
        </div>
      </div>
      <div class="sub_nav">
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Swiper, { Navigation, Pagination, Controller } from 'swiper';
import 'swiper/swiper-bundle.css';

onMounted(() => {
  Swiper.use([Navigation, Pagination, Controller]);

  var MainSwiper = new Swiper('.main_swiper .swiper-container', {
    navigation: {
      nextEl: '.main_swiper .swiper-button-next',
      prevEl: '.main_swiper .swiper-button-prev',
    },
    pagination: {
      el: '.main_swiper .swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });

  var SubSwiper = new Swiper('.sub_swiper .swiper-container', {
    pagination: {
      el: '.sub_swiper .swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.sub_swiper .swiper-button-next',
      prevEl: '.sub_swiper .swiper-button-prev',
    },
  });

  // MainSwiper.controller.control = SubSwiper;
  // SubSwiper.controller.control = MainSwiper;
});
</script>

<style scoped>
.swiper-container {
  width: 600px;
  text-align: center;
}

.swiper-container img {
  width: 100%;
}
</style>
