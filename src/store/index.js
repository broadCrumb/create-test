import Vue from "vue";
import Vuex from "vuex";
import { request } from "@/common/utils/request";
import notification from "@/store/modules/notification";
import constants from "@/common/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notification,
  },
  state: {
    comments: [],
    posts: [],
    isLoadingComments: false,
    isLoadingPosts: false,
    selectedPost: constants.POST_ALL,
  },
  mutations: {
    SET_USER_COMMENTS(state, comments) {
      state.comments = comments;
    },
    SET_USER_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_LOADING_COMMENTS(state, status) {
      state.isLoadingComments = status;
    },
    SET_LOADING_POSTS(state, status) {
      state.isLoadingPosts = status;
    },
    SET_SELECTED_POST(state, data) {
      state.selectedPost = data;
    },
  },
  actions: {
    async makeRequest(
      { commit },
      { url, loadingCallbackName, setDataCallbackName }
    ) {
      try {
        commit(loadingCallbackName, true);

        const body = await request(url);

        commit(setDataCallbackName, body);
        commit(loadingCallbackName, false);
      } catch (e) {
        commit(loadingCallbackName, false);
      }
    },
    async fetchUserComments({ dispatch }) {
      await dispatch("makeRequest", {
        url: "comments",
        loadingCallbackName: "SET_LOADING_COMMENTS",
        setDataCallbackName: "SET_USER_COMMENTS",
      });
    },
    async fetchUserPosts({ dispatch }) {
      await dispatch("makeRequest", {
        url: "posts",
        loadingCallbackName: "SET_LOADING_POSTS",
        setDataCallbackName: "SET_USER_POSTS",
      });
    },
    async fetchUserCommentsById({ dispatch }, id) {
      await dispatch("makeRequest", {
        url: `comments?postId=${id}`,
        loadingCallbackName: "SET_LOADING_COMMENTS",
        setDataCallbackName: "SET_USER_COMMENTS",
      });
    },
    setSelectedPost({ commit }, data) {
      commit("SET_SELECTED_POST", data);
    },
  },
  getters: {
    allPosts(state) {
      const defaultPost = {
        title: "All",
        id: constants.POST_ALL,
      };

      return state.posts.length ? [defaultPost, ...state.posts] : [];
    },
  },
});
