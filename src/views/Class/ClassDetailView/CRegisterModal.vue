<template>

<ModalTemplate>
    <template v-slot:header>
        class 신청 완료
    </template>

    <template v-slot:body>
        <pre style="overflow: hidden; text-wrap: wrap">
**주의 사항

“예약확정”일 경우, 청약체결된 상태이므로 이용자의 취소요청 시, 청약철회에 대한 취소수수료가 발생하거나 발생하지 않을 수 있습니다.
환불 되는경우
“예약일” 7일전 취소 요청 시
”예약확정” 완료 시간 기준, 1시간 이내 취소 요청 시
판매자의 사정으로, “예약일” 구매한 서비스를 제공받지 못하였거나, 안내 받은 경우

환불이 불가능한 경우
”이용자”의 사정으로, “예약일” 당일, 이후 취소 요청시
        </pre>
    </template>
    <template v-slot:footer>
        <button class="btn btn-success btn-md" @click="emit('close')">확인</button>
    </template>
</ModalTemplate>

</template>

<script setup>
import ModalTemplate from "../../../components/ModalTemplate.vue";
const emit=defineEmits(['close']);

</script>

<style scoped>
</style>