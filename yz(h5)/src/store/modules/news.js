// import {post} from '../../lib/api';
// import { stat } from 'fs';

const state = {
  newsInfo:[]

};

const getters = {

};
const mutations = {
 newVal(state,payload){
   state.newsInfo=payload
   console.log( state.newsInfo)
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
