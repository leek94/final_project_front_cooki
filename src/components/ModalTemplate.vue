<template>
    <div class="modal fade" tabindex="-1" style="border:none">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header" style="border:none; background-color: #fcf6de;">
            <h4 class="modal-title d-flex" style="font-weight: bold; justify-content: center; align-items: center;">
              <img src="/images/photos/ic_star_pink.png" style="width: 35px; height: 35px;">
              <!-- slot -->
              <slot name="header">제목</slot>
              <img src="/images/photos/ic_star_pink.png" style="width: 35px; height: 35px;">
            </h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" style="padding-bottom: 0; padding-top:30px">
            <!-- slot -->
            <slot name="body">
              <p>다이얼로그 내용</p>
            </slot>
          </div>
          <div class="modal-footer" style="border:none;padding-right:20px;justify-content: center;">
            <slot name="footer">
              <!-- slot -->
              <button type="button" class="btn btn-info btn-sm" data-bs-dismiss="modal">확인</button>
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">닫기</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>