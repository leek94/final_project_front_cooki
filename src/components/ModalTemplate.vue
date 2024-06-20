<template>
    <div class="modal" tabindex="-1">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    <slot name="header">제목</slot>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <slot name="body">
                    <p>다이얼로그 내용</p>
                </slot>
                <div class="modal-footer">
                    <slot name="footer">
                        <button type="button" class="btn btn-success btn-sm" data-bs-dismiss="modal">확인</button>
                        <button type="button" class="btn btn-success btn-sm" data-bs-dismiss="modal">닫기</button>
                    </slot>
                </div>
            </div>

        </div>
    </div>
  <div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>