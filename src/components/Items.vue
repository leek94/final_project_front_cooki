 <template>
    <!-- 재료 -->
    <div class="ingredient-box d-flex ss">
        <ul class="ingredient-title d-flex ss">
            <li class="green-point" style="font-size:1.125rem; font-weight: bold">주재료</li>
            <li class="green-point" style="font-size:0.875rem;color:#666;list-style: none; margin-left: 8px">Main ingredient</li>
        </ul>
        <div class="ingredient-content ss">
            <div class="checker-parent d-flex" style="align-content: center">
                <img src="/images/photos/li_checker.png" style="width:25px;height:25px;margin-right: 12px"/>
                <div class="align-middle" style="color:#666">완숙토마토 2개(300g)</div>
            </div>
            <div class="checker-parent d-flex" style="align-content: center">
                <img src="/images/photos/li_checker.png" style="width:25px;height:25px;margin-right: 12px"/>
                <div class="align-middle" style="color:#666">돼지고기 (잡채용) 150g</div>
            </div>
            <div class="checker-parent d-flex" style="align-content: center">
                <img src="/images/photos/li_checker.png" style="width:25px;height:25px;margin-right: 12px"/>
                <div class="align-middle" style="color:#666">완숙토마토 2개(300g)</div>
            </div>
            <div class="checker-parent d-flex" style="align-content: center">
                <img src="/images/photos/li_checker.png" style="width:25px;height:25px;margin-right: 12px"/>
                <div class="align-middle" style="color:#666">돼지고기 (잡채용) 150g</div>
            </div>
            <div class="checker-parent d-flex" style="align-content: center">
                <img src="/images/photos/li_checker.png" style="width:25px;height:25px;margin-right: 12px"/>
                <div class="align-middle" style="color:#666">완숙토마토 2개(300g)</div>
            </div>
            <div class="checker-parent d-flex" style="align-content: center">
                <img src="/images/photos/li_checker.png" style="width:25px;height:25px;margin-right: 12px"/>
                <div class="align-middle" style="color:#666">돼지고기 (잡채용) 150g</div>
            </div>
        </div>
    </div>
</template>
<script setup>

</script>
<style scoped>
.ingredient-box{
    padding: 2.5rem;
    margin-top:3.75rem;
    border:1px solid #e5e5e5
}

.ingredient-title{
    width: 50%;
    text-align: left;
    flex: 1;
}

.ingredient-content{
    width: 50%;
    text-align: left;
    flex: 1;
}

.green-point::marker {
    color: #15a775;
}


</style>