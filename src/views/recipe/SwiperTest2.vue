<template>
    <div class="position-relative vh-100">
      <!-- Additional required wrapper -->
      <swiper-container loop="true" class="swiper-container" style="width: 50%; height: 50%;">
        <swiper-slide>
          <img src="/images/photos/semi2.jpg" class="slide-image">
        </swiper-slide>
        <swiper-slide>
          <img src="/images/photos/semi2.jpg" class="slide-image">
        </swiper-slide>
        <swiper-slide>
          <img src="/images/photos/semi2.jpg" class="slide-image">
        </swiper-slide>
        <swiper-slide>
          <img src="/images/photos/semi2.jpg" class="slide-image">
        </swiper-slide>
      </swiper-container>
  
      <button class="prevBtn btn btn-lg position-absolute top-50 start-0 translate-middle-y">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button class="nextBtn btn btn-lg position-absolute top-50 end-0 translate-middle-y">
        <i class="fa-solid fa-chevron-right"></i>
      </button> 
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  // import function to register Swiper custom elements
  import { register } from 'swiper/element/bundle';
  // register Swiper custom elements
  register();
  
  onMounted(()=>{
    const swiperEl = document.querySelector('.swiper-container');
    const nextBtn = document.querySelector('.nextBtn');
    const prevBtn = document.querySelector('.prevBtn');
  
    nextBtn.addEventListener('click', () => {
      swiperEl.swiper.slideNext();
    });
    prevBtn.addEventListener('click', () => {
      swiperEl.swiper.slidePrev();
    });
  });
  </script>
  
  <style scoped>
  .position-relative {
    position: relative;
  }
  
  .vh-100 {
    height: 100vh;
  }
  
  .swiper-container {
    position: absolute;
    width: 50%;
    height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease-out;
  }
  
  .slide-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .prevBtn, .nextBtn {
    z-index: 10;
  }
  </style>
  