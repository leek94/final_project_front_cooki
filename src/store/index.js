import { createStore } from 'vuex';
import classes from "./classes";
import axiosConfig from '@/apis/axiosConfig';

// store 객체를 생성
const store= createStore({
  // 루트 상태를 정의
  state: {
    userId: "",
    accessToken: "",
    mrole:"",
    mimgoname:"",
    mnickname:"",
  },

  // 루트 상태를 읽는 메소드 정의
  getters: {
    getUserId(state, getters, rootState, rootGetters){
      return state.userId;
    },
    getAccesstoken(state, getters, rootState, rootGetters){
      return state.accessToken;
    },
    getMrole(state, getters, rootState, rootGetters){
      return state.mrole;
    },
    getMimgoname(state, getters, rootState, rootGetters){
      return state.mimgoname;
    },
    getMnickname(state, getters, rootState, rootGetters){
      return state.mnickname;
    }
  },

  // 루트 상태를 변경하는 메소드 정의 (동기 방식)
  mutations: {
    setUserId(state, payload){
      state.userId = payload;
    },

    setAccessToken(state, payload) {
      state.accessToken = payload;
    },
    setMrole(state, payload) {
      state.mrole = payload;
    },
    setMimgoname(state, payload){
      state.mimgoname = payload;
    },
    setMnickname(state, payload){
      state.mnickname = payload;
    }
  },

  actions: {
   loadAuth(context,payload){
    context.commit("setUserId",localStorage.getItem("userId") || "");
    const accessToken = localStorage.getItem("accessToken") || "";
    context.commit("setAccessToken",accessToken);
    context.commit("setMrole",localStorage.getItem("mrole") || "");
    context.commit("setMimgoname",localStorage.getItem("mimgoname") || "");
    context.commit("setMnickname",localStorage.getItem("mnickname") || "");
    if(accessToken !==""){
      axiosConfig.addAuthHeader(accessToken);
    }
   },
   saveAuth(context, payload){
    context.commit("setUserId",payload.userId);
    context.commit("setAccessToken", payload.accessToken);
    context.commit("setMrole",payload.mrole);
    context.commit("setMimgoname", payload.mimgoname)
    context.commit("setMnickname", payload.mnickname)
    localStorage.setItem("userId", payload.userId);
    localStorage.setItem("accessToken", payload.accessToken);
    localStorage.setItem("mrole",payload.mrole);
    localStorage.setItem("mimgoname",payload.mimgoname);
    localStorage.setItem("mnickname",payload.mnickname);
    axiosConfig.addAuthHeader(payload.accessToken);
   },
   deleteAuth(context, payload){
    context.commit("setUserId","");
    context.commit("setAccessToken","");
    context.commit("setMrole","");
    context.commit("setMimgoname","")
    context.commit("setMnickname","")
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("mrole");
    localStorage.removeItem("mimgoname");
    localStorage.removeItem("mnickname");
    axiosConfig.removeAuthHeader();
   },
   changeMrole(context, payload){
    context.commit("setMrole",payload.mrole);
    localStorage.setItem("mrole",payload.mrole);
   },
  },
  modules: {
    classes:classes
  }
});
export default store;