import axios from "axios";
import qs from "qs"
function join(member){
    /*   
    member = {
        mid:"angel1004@naver.com",
        mname:"손혜선",
        mpassword:"12345",
        mrole:"ROLE_USER", 
        mnickname:"화이트쿠키",
        mphonenum:"010-0000-0000"
    }
        */
    //    console.log(member);
      
    return axios.post("/member/join",member);
}

function setCareer(careers){
    /*
    careers= {
        cano:1,
        cacontent:"",
        mid:""
    }
     */
    //값을 하나씩 보낸다 
   
    return axios.post( "/member/setCareers" ,careers);
}

function setAwards(awards){
    return axios.post( "/member/setAwards" ,awards);
}

function getCreatorInfo(cno){
    return axios.get("/member/getCreatroInfo/"+cno);
}

function login(member){
    
    /*
    member = {
        mid:"",
        mpassword:""
    }
    */

   return axios.post("/member/login",member);

}

function getEditorProfile(mid,mrole){
    return axios.get("member/editorProfile/" + mid + "/" + mrole);
} 

function getMyProfile(mid){
    return axios.get("member/myProfile/" + mid);
} 

function updateNickname(member){
    return axios.put("member/updateNickname", member);
}

function updatePassword(member){
    return axios.put("member/updatePassword", member);
}

export default{
    join,
    setCareer,
    setAwards,
    getCreatorInfo,
    login,
    getEditorProfile,
    getMyProfile,
    updateNickname,
    updatePassword,
}