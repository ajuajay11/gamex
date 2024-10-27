import { createStore } from 'vuex';
import { vuexLocal } from '../localstorage'; // Adjust the import path as necessary

export default createStore({
  state: {
    user: null,
    isAuth:false
  },
  getters: {
    // getUser: state => state.user,
    // getUserAvatar: state => state.user_avatar,
    // getToken: state => state.token,
    // isAuthenticated: state => state.isAuthenticated,
    // getThemeMode: (state) => state.theme_mode,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    isAuthenticated(state, user) {
        state.isAuth = user;
      },
  },
  actions: {
    // logout({ commit }) {
    //   commit('SET_USER', null);
    //   commit('SET_USER_AVATAR', null);
    //   commit('SET_TOKEN', null);
    //   commit('SET_AUTHENTICATED', false);
    //   commit('SELL_TYPEGAMES', []);
    // },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});