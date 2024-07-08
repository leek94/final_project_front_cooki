import axios from "axios";
function getSearchClass(search, pageNo=1){
    return axios.post("/ClassSearch",search,{params:{pageNo}});
}

function getBestClassRecipe(){
    return axios.get("/bestClassesRecipe");
}
export default{
    getSearchClass,
    getBestClassRecipe,
}