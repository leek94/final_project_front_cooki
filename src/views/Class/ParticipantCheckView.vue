<template>

    <div>
        <div class="d-flex align-items-end justify-content-between">
            <h1>출석 명단</h1>
            <button class="btn btn-md btn_grey me-5" @click="saveAttendence"> 출석 저장</button>
        </div>
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
                    <tr v-for="(cookClass, index) in cookClasses" :key="index">
                        <th scope="row">{{ index+1 }}</th>
                        <td>{{ cookClass.mname }}</td>
                        <td>{{ cookClass.ctitle }}</td>
                        <td>{{ cookClass.cdday }}</td>
                        <td>{{ cookClass.cstarttime }}</td>
                        <td>{{ cookClass.mid }}</td>
                        <td><button class="btn_red btn btn-md" v-if="cookClass.isParticipant==='0'"  @click="changeDataFalse(index)">결석</button>
                            <button class="btn_red btn btn-md active" v-if="cookClass.isParticipant==='1'"  @click="changeDataTrue(index)">출석</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import classAPI from '@/apis/classAPI';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const classNum = route.query.cno;
console.log("클래스 넘버: " + classNum);

const cookClasses = ref([
    {
        mname:"", 
        ctitle: "", 
        cdday:"", 
        cstarttime:"", 
        mid:"", 
        isActive: false,
        isParticipant:"0",
    }
])

async function saveAttendence(){
    for(let i =0 ; i<cookClasses.value.length; i++){
        cookClasses.value[i].cno = route.query.cno;
        await classAPI.saveAttedenceList(JSON.parse(JSON.stringify(cookClasses.value[i])));
    }
   
}

getParticpantList(classNum);
async function getParticpantList(classNum){
    const response = await classAPI.getParticpantList(parseInt(classNum));
    cookClasses.value = response.data.participantList;

    for(let i=0;i<cookClasses.value.length;i++){
        let date = new Date(cookClasses.value[i].cdday);
        cookClasses.value[i].cdday= dateFormat(date);
    }
}

// isparticipant가 1이면 출석 0 이면 결석
function changeDataFalse(index){
    cookClasses.value[index].isParticipant  = '1';
}

function changeDataTrue(index){
    cookClasses.value[index].isParticipant  = '0';
}

function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}


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
    background-color: green !important;
}
.btn_red{
    background-color: #c02727;
    color:#fff;
}

.btn_grey{
    background-color: #BDBDBD;
    font-weight: bold;
    width: 100px;
    height: 50px;
}

</style>