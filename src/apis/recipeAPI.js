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
function recipeRead(rno){
    return axios.get("/recipe/recipeDetail/"+rno)
}
function processandItemRead(rno){
    return axios.get("/recipe/getRecipeItemAndProcess/"+rno)
}
function recipeUpdate(recipeFormdata){
    return axios.put("/recipe/recipeUpdate",recipeFormdata)
}
function processUpdate(processFormdata){
    return axios.put("/recipe/recipeProcessUpdate",processFormdata)
}
function itemUpdate(recipeItems){
    return axios.put("/recipe/recipeItemUpdate", recipeItems)
}

function recipeLike(likes){
    return axios.post("/recipe/addLike", likes);
}

function recipeDislike(likes){
    return axios.post("/recipe/deleteLike", likes);
}

export default{
    recipeRegister,
    recipeItemRegister,
    recipeProcessRegister,
    recipeRead,
    processandItemRead,
    recipeUpdate,
    processUpdate,
    itemUpdate,
    recipeLike,
    recipeDislike
}