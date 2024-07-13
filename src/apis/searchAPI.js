import axios from "axios";

function getSearchClass(search, pageNo=1,perPage){
    return axios.post("/total/ClassSearch",search,{params:{pageNo,perPage}})
}
function getTotalCount(search){
    return axios.post("/total/getTotalCount",search)
}

function getBestClassRecipe(number){
    return axios.get("/total/bestClassesRecipe", {params:{number}});
}

export default{
    getSearchClass,
    getTotalCount,
    getBestClassRecipe,
}