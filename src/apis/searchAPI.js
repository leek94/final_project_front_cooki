import axios from "axios";
function getSearchClass(search, pageNo=1,perPage){
    return axios.post("/ClassSearch",search,{params:{pageNo,perPage}})
}
function getTotalCount(search){
    return axios.post("/getTotalCount",search)
}

function getBestClassRecipe(){
    return axios.get("/bestClassesRecipe");
}
export default{
    getSearchClass,
    getTotalCount,
    getBestClassRecipe,
}