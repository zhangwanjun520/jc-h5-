import Vue from 'vue';

import Vuex from 'vuex';

import adressInfo from './modules/adressInfo';
import news from './modules/news';


import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({

  modules: {

    adressInfo,
    news

  },

  plugins:[createPersistedState()]

})
