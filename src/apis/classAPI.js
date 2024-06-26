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

//클래스 기본 정보 읽기
function classRead(cno) {
    return axios.get("/class/classDetail/" + cno);
}

//클래스 커리큘럼, 재료 읽기
function curriculumAndItemRead(cno) {
    //pathVariable 로 데이터 전송 (경로상에 데이터를 실어줌)
    return axios.get("/class/getCurriculumAndItem/" + cno);
}

//클래스 정보 업데이트
function classUpdate() {
    return axios.put("/class/classUpdate/");
}

export default {
    classRegister,
    itemRegister,
    curriculumRegister,
    classRead,
    curriculumAndItemRead,
    classUpdate
}