import axios from "axios";
function getSearchClass(search, pageNo=1){
    return axios.post("/ClassSearch",search,{params:{pageNo}})
}

export default{
    getSearchClass,
}