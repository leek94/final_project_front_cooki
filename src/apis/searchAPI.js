import axios from "axios";
function getSearchClass(search, pageNo=1,perPage){
    return axios.post("/ClassSearch",search,{params:{pageNo,perPage}})
}
function getTotalCount(search){
    return axios.post("/getTotalCount",search)
}
export default{
    getSearchClass,
    getTotalCount
}