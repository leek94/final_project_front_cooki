import axios from "axios";

function recipeRegister(recipeFormdata){
    return axios.post("/recipe/recipeRegister", recipeFormdata)
}
function recipeItemRegister(recipeItem){
    return axios.post("/recipe/recipeItemRegister",recipeItem)
}
function recipeProcessRegister(rpFormdata){
    return axios.post("/recipe/recipeProcessRegister",rpFormdata)
}
export default{
    recipeRegister,
    recipeItemRegister,
    recipeProcessRegister
}