<template>

    <div>
        <h1>출석 명단</h1>
        <div class="check-table">
            <table class="table text-center">
                <thead>
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">이름</th>
                        <th scope="col">클래스명</th>
                        <th scope="col">날짜</th>
                        <th scope="col">시작 시간</th>
                        <th scope="col">이메일</th>
                        <th scope="col">출결 현황</th>

                    </tr>
                </thead>
                <tbody class="table-group-divider align-middle">
                    <tr v-for="(cookClass, cno) in cookClasses" :key="cno">
                        <th scope="row">{{ cookClass.cno }}</th>
                        <td>{{ cookClass.name }}</td>
                        <td>{{ cookClass.classname }}</td>
                        <td>{{ cookClass.cdate }}</td>
                        <td>{{ cookClass.starttime }}</td>
                        <td>{{ cookClass.email }}</td>
                        <td><button class="btn btn-md" 
                            :class="{active: cookClass.isActive }" 
                            @click="changeData(cno)">{{ cookClass.attendence }}</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

function changeData(index) {
    const cookClass = cookClasses.value[index];
    cookClass.attendence = cookClass.attendence === "결석" ? "출석" : "결석";
    cookClass.isActive = !cookClass.isActive;

    //test
    const today = new Date();
    const cday = new Date(cookClasses.value[0].cdate);
    console.log(cookClasses.value[0].cdate);
    const diff = today - cday;
    console.log(diff);
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    console.log(diffDays);
    console.log(`현재 날짜와 cdday 사이의 차이는 ${diffDays}일 입니다.`);
    
}

const cookClasses = ref([
    {cno:1, name:"손혜선", classname: "쿠키쿠킹클래스", cdate:"2024-06-19", starttime:"14:00", email:"heaSon@naver.com",attendence:"결석", isActive: false },
    {cno:2, name:"손혜선", classname: "쿠키쿠킹클래스", cdate:"2024.06.19", starttime:"14:00", email:"heaSon@naver.com",attendence:"결석", isActive: false },
    {cno:3, name:"손혜선", classname: "쿠키쿠킹클래스", cdate:"2024.06.19", starttime:"14:00", email:"heaSon@naver.com",attendence:"결석", isActive: false },
    {cno:4, name:"손혜선", classname: "쿠키쿠킹클래스", cdate:"2024.06.19", starttime:"14:00", email:"heaSon@naver.com",attendence:"결석", isActive: false },
    {cno:5, name:"손혜선", classname: "쿠키쿠킹클래스", cdate:"2024.06.19", starttime:"14:00", email:"heaSon@naver.com",attendence:"결석", isActive: false },
    {cno:6, name:"손혜선", classname: "쿠키쿠킹클래스", cdate:"2024.06.19", starttime:"14:00", email:"heaSon@naver.com",attendence:"결석", isActive: false },
    {cno:7, name:"손혜선", classname: "쿠키쿠킹클래스", cdate:"2024.06.19", starttime:"14:00", email:"heaSon@naver.com",attendence:"결석", isActive: false },
    {cno:8, name:"손혜선", classname: "쿠키쿠킹클래스", cdate:"2024.06.19", starttime:"14:00", email:"heaSon@naver.com",attendence:"결석", isActive: false },
    {cno:9, name:"손혜선", classname: "쿠키쿠킹클래스", cdate:"2024.06.19", starttime:"14:00", email:"heaSon@naver.com",attendence:"결석", isActive: false },
    {cno:10, name:"손혜선", classname: "쿠키쿠킹클래스", cdate:"2024.06.19", starttime:"14:00", email:"heaSon@naver.com",attendence:"결석", isActive: false },
])


</script>

<style scoped>
.check-table{
    margin:3rem 2rem;
    border: 1px solid;
    border-radius: 10px;
    overflow: hidden; /* 오버플로우 제어 */
}
h1 {
    margin:3rem 2rem 0 2rem;
    text-align: center;
}

.table{
    margin-bottom: 0;
}

.active{
    background-color: green!important;
}
.btn{
    background-color: #c02727;
    color:#fff;
}

</style>