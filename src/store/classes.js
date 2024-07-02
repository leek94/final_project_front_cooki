export default{
    namespaced:true,

    state: {
        userId: "",
        cno: 0
      },
    
      // 루트 상태를 읽는 메소드 정의
      getters: {
        getUserId(state, getters, rootState, rootGetters){
          return state.userId;
        },
    
        getCno(state, getters, rootState, rootGetters){
          return state.cno;
        }
      },
    
      // 루트 상태를 변경하는 메소드 정의 (동기 방식)
      mutations: {
        setUserId(state, payload){
          state.userId = payload;
        },
    
        setCno(state, payload) {
          state.cno = payload;
        }
      },

      actions: {
        getClassInfo(context, payload){
            context.commit("setUserId",payload.userId);
            context.commit("setCno",payload.cno);
        }
      }
}