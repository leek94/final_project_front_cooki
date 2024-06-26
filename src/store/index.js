import { createStore } from 'vuex';
import axiosConfig from '@/apis/axiosConfig';

// store 객체를 생성
export default createStore({
  // 루트 상태를 정의
  state: {
    userId: "",
    accessToken: ""
  },

  // 루트 상태를 읽는 메소드 정의
  getters: {
    getUserId(state, getters, rootState, rootGetters){
      return state.userId;
    },

    getAccesstoken(state, getters, rootState, rootGetters){
      return state.accessToken;
    }
  },

  // 루트 상태를 변경하는 메소드 정의 (동기 방식)
  mutations: {
    setUserId(state, payload){
      state.userId = payload;
    },

    setAccessToken(state, payload) {
      state.accessToken = payload;
    }
  },

  actions: {
   loadAuth(context,payload){
    context.commit("setUserId",localStorage.getItem("userId") || "");
    const accessToken = localStorage.getItem("accessToken") || "";
    context.commit("setAccessToken",accessToken);
    if(accessToken !==""){
      axiosConfig.addAuthHeader(accessToken);
    }
   },
   saveAuth(context, payload){
    context.commit("setUserId",payload.userId);
    context.commit("setAccessToken", payload.accessToken);
    localStorage.setItem("userId", payload.userId);
    localStorage.setItem("accessToken", payload.accessToken);
    axiosConfig.addAuthHeader(payload.accessToken);
   },
   deleteAuth(context, payload){
    context.commit("setUserId","");
    context.commit("setAccessToken","");
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    axiosConfig.removeAuthHeader();
   }
  },
  modules: {
  }
})
