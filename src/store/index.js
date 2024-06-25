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
    
  },
  modules: {
  }
})
