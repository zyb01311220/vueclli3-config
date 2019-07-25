import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import getList from './service/api'
export default new Vuex.Store({
  state: { num: 123, list:[]},
  mutations: {
    changeList(state,list){
      state.list=list;
    }
  },
  actions: {
    async getInfo({commit}){
      let result=await getList();
      commit('changeList',result);
    }
  }
});
