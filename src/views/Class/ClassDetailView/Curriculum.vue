<template>
       
            <Items :objectProp="citems"/>

    <h4 class="fw-bold" style="margin-top:80px">커리큘럼</h4>
    <div class="curriculum mt-5 ">
        <div class="d-flex mb-5" v-for="(cs,index) in curriculum" :key="index">
            <div class="cimg">
                <img style= "width:140p; height:140px; border-radius: 20px" :src="`${axios.defaults.baseURL}/class/curriculumattach/81/${cs.cuorder}?accessToken=${store.state.accessToken}`">
            </div>
            <div class="cinfo" style=" text-align: left; margin-left: 50px; align-content: center">
                <div>
                    <span style="color:rgb(91, 91, 91)">CHAPTER</span>
                    <span style="color:rgb(91, 91, 91)">{{cs.cuorder}}</span>
                </div>
                <div class="cutitle fw-bold h5" > {{ cs.cutitle }} </div>
                <p class="cucontent">{{ cs.cucontent }}
                </p>
            </div>
        </div>
    </div>
</template> 

<script setup>
import classAPI from '@/apis/classAPI';
import Items from '@/components/ClassItems.vue';
import store from '@/store';
import axios from 'axios';
import { ref} from 'vue';

const curriculum=ref([
    {
        cuorder:null,
        cutitle:"",
        cucontent:""
    }
])

let citems = ref([{
    classItem:""
}])

curri(81);
async function curri(cno){
    const response = await classAPI.curriculumAndItemRead(cno);
    console.log(response.data);
    curriculum.value = response.data.curriculums;
    citems.value = response.data.classItems;
    console.log(response.data.classItems);
}

</script>

<style scoped>
img{
    max-width: 140px;
    max-height: 140px;
}
</style>