<template>
    <div class="myRecipe" style="width:80%;  margin:auto auto;padding:50px 0 0">
     <h3 class="fw-bold text-start mb-4" >마이 클래스 </h3>
     <h5 class="text-start mb-4" > - 내가 신청한 클래스 </h5>
         <div class="d-flex" style="font-size:20px">
             <p>총 &ensp;</p>
             <p style="color:darkseagreen"> {{countClass}}</p>
             <p>개</p>
         </div>
 
         <hr class="mt-0"/>
         <div class="d-flex" style="flex-wrap: wrap;" >
            <div class="qcard" v-for="(ccards,index) in cookClasses" :key="index">
                    <MypageClassCard :objectProp="ccards"/>
            </div>
        </div>

    </div>
 </template>
 
 <script setup>
import memberAPI from '@/apis/memberAPI';
import classAPI from '@/apis/classAPI';
import MypageClassCard from '@/components/MypageClassCard.vue';
import { computed, ref } from 'vue';
import { useRoute, useStore } from 'vuex';
const cookClasses = ref ([]);

//dateFormating (2024-06-28)
function dateFormat(date) {
    let dateFormat = date.getFullYear() +
    '-' + ((date.getMonth() +1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? "0" + date .getDate() : date.getDate());
    return dateFormat;
}


const countClass=computed(()=> cookClasses.value.length)

const store = useStore();

//const route = useRoute();
//const cno = route.query.cno;
//let nowPerson = ref()

async function myNowClassRead() {
    let mid = store.state.userId;
    console.log("내아이디: ", mid)
    //console.log("cno", cno)
    try{
        const response1 = await memberAPI.myNowClass(mid);
        cookClasses.value = response1.data.myClassList;
        //const response2 = await classAPI.classNowPerson(cno);
        //nowPerson.value = response2.data.nowPerson;
        //console.log("신청한 사람수", response2.data.nowPerson)
        console.log("cdday", dateFormat(new Date(cookClasses.value[1].cdday)))
        for(let i=0; i<cookClasses.value.length; i++) {
            cookClasses.value[i].cdday = dateFormat(new Date(cookClasses.value[i].cdday));
            
        }
    } catch(error) {
        console.log(error);
    }
    console.log("내가 신청한 클래스 리스트", JSON.parse(JSON.stringify(cookClasses.value)));
}

myNowClassRead();

 </script>
 
 <style scoped>
 </style>