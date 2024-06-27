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

//클래스 기본 정보 업데이트
function classUpdate(classItems) {
    return axios.put("/class/classUpdate", classItems);
}

//클래스 재료 정보 업데이트
function itemUpdate(itemData, cno) {
    return axios.put("/class/itemUpdate/" + cno, itemData);
}

//클래스 커리큘럼 정보 업데이트
function curriculumUpdate(curriculumData, cno) {
    return axios.put("/class/curriculumUpdate/" + cno, curriculumData);
}

//클래스 썸네일 이미지 갯수 세기
function getThumbimgCount(cno){
    return axios.get(`/class/getThumbimgCount/${cno}`)
}
//querystring 방식으로 값을 전달할 경우 두번째 인자에는 객체가 오고 세번째 인자에 파라미터 값을 전달 
function SetClassApply(cno, cpersoncount){
    return axios.post("/class/classApply",null,{params:{cno,cpersoncount}});
}

function deleteClassApply(cno){
    return axios.delete("/class/deleteClassApply/"+cno)
}
export default {
    classRegister,
    itemRegister,
    curriculumRegister,
    classRead,
    curriculumAndItemRead,
    classUpdate,
    getThumbimgCount,
    SetClassApply,
    deleteClassApply,
    itemUpdate,
    curriculumUpdate,
}