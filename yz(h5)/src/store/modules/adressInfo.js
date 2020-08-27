// import {post} from '../../lib/api';
// import { stat } from 'fs';

const state = {
   provinceInfo:[]

};

const getters = {

};
const mutations = {
  newVal(state,payload){
    state.provinceInfo=payload
    console.log( state.provinceInfo)
  },

};
const actions = {
    Val(context, payload){
    context.commit('newVal',payload);
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
