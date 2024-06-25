<template>

<ModalTemplate>

    <template v-slot:header>
        신청 확인
        <!-- <h4 class="text-center mb-4">class 신청 완료</h4> -->
    </template>

    <template v-slot:body>
        <div class="text-center border-bottom pb-3 mb-3" style="font-size: 20px; font-weight: bold">
        신청을 완료하시겠습니까?
        </div>
        <div style="color: gray;">
            <div class="text-center m-2" style="font-weight: bold; font-size: 18px;">* 주의 사항 *</div>
            <!-- <pre style="overflow: hidden; white-space: pre-wrap;"> -->
            <div style="font-size: 13px;">
            “예약확정”일 경우, 청약체결된 상태이므로 이용자의 취소요청 시, 청약철회에 대한 취소수수료가 발생하거나 발생하지 않을 수 있습니다.
            </div>    
            <!-- </pre> -->
            <div class="m-2" style="font-weight: bold; font-size: 16px;">
            환불 되는경우
            </div>
            <div style="font-size: 13px;">
            “예약일” 7일전 취소 요청 시
            ”예약확정” 완료 시간 기준, 1시간 이내 취소 요청 시
            판매자의 사정으로, “예약일” 구매한 서비스를 제공받지 못하였거나, 안내 받은 경우
            </div>
            <div class="m-2" style="font-weight: bold; font-size: 16px;">
            환불이 불가능한 경우
            </div>
            <div style="font-size: 13px;">
            ”이용자”의 사정으로, “예약일” 당일, 이후 취소 요청시
            </div>
        </div>
        
    </template>
    <template v-slot:footer>
        <button class="btn btn-success" style="width:80px;height:40px" @click="emit('close')">확인</button>
    </template>
</ModalTemplate>

</template>

<script setup>
import ModalTemplate from "../../../components/ModalTemplate.vue";
const emit=defineEmits(['close']);

</script>

<style scoped>
</style>