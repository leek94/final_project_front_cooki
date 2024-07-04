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
function itemUpdate(itemData) {
    return axios.put("/class/itemUpdate" , itemData);
}

//클래스 커리큘럼 정보 업데이트
function curriculumUpdate(curriculumData, cno) {
    return axios.put("/class/curriculumUpdate", curriculumData);
}

//클래스 썸네일 이미지 갯수 세기
function getThumbimgCount(cno){
    return axios.get(`/class/getThumbimgCount/${cno}`);
}

//클래스 기본 정보 읽기
function classRead(cno) {
    return axios.get("/class/classDetail/" + cno);
}

//클래스 현재 인원 정보 읽기
function classNowPerson(cno) {
    return axios.get("/class/classNowPerson/" + cno);
}

// 현재 인원 수가 넘었는 지 체크
function classOverPerson(cno, cpersoncount){
    return axios.get(`/class/classOverPerson/${cno}/${cpersoncount}`);
}

// 신청을 했었는 지 확인
function isParticipant(cno){
    return axios.get("/class/isParticipant/"+cno);
}

// 클래스 신청하기
//querystring 방식으로 값을 전달할 경우 두번째 인자에는 객체가 오고 세번째 인자에 파라미터 값을 전달 
function SetClassApply(cno){
    return axios.post("/class/classApply",null,{params:{cno}});
}

function deleteClassApply(cno){
    return axios.delete("/class/deleteClassApply/"+cno)
}

function qnaRegister(qnaData){
    return axios.post("/class/qnaRegister", qnaData);
}

function qnaRead(cno){
    return axios.get("/class/qnaList/" + cno);
}

function qnaUpdate(qnaData){
    return axios.put("/class/qnaUpdate", qnaData);
}

function qnaDelete(qno){
    return axios.delete("/class/qnaDelete/" + qno);
}
function getClassList(pageNo=1){
    return axios.get("/class/getClassList", {params:{pageNo}})
}
function getSearchClass(search){
    return axios.post("/ClassSearch",search)
}

function qreplyUpdate(qreplyData){
    return axios.put("/class/qreplyUpdate", qreplyData)
}

function getReviewCount(cno){
    return axios.get("/class/reviewCount/"+cno)
}


function reviewRegister(reviewData) {
    return axios.post("/class/reviewRegister", reviewData)
}

function reviewRead(cno){
    return axios.get("/class/reviewList/" + cno)
}

function reviewUpdate(reviewData){
    return axios.put("/class/reviewUpdate", reviewData)
}

export default {
    classRegister,
    itemRegister,
    curriculumRegister,
    getClassList,
    classRead,
    curriculumAndItemRead,
    classUpdate,
    getThumbimgCount,
    SetClassApply,
    deleteClassApply,
    itemUpdate,
    curriculumUpdate,
    classNowPerson,
    isParticipant,
    classOverPerson,
    qnaRegister,
    qnaRead,
    qnaUpdate,
    qnaDelete,
    getSearchClass,
    getReviewCount,
    qreplyUpdate,
    reviewRegister,
    reviewRead,
    reviewUpdate,

}
