import axios from "axios";


//클래스 테이블 데이터 백앤드로 보내주는 설정
function classRegister(classData) {
    return axios.post("/class/classRegister", classData);
}

//재료 테이블 데이터 백앤드로 보내주는 설정
function itemRegister(itemData) {
    return axios.post("/class/itemRegister", itemData);
}

//커리큘럼 테이블 데이터 백앤드로 보내주는 설정
function curriculumRegister(curriculumData) {
    return axios.post("/class/curriculumRegister", curriculumData);
}


export default {
    classRegister,
    itemRegister,
    curriculumRegister
}