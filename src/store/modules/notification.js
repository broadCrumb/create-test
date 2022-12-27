import constants from "@/common/constants";

export default {
  namespaced: true,
  state: {
    notification: null,
  },
  mutations: {
    ADD_NOTIFICATION(state, notify) {
      state.notification = notify;
    },
    DELETE_NOTIFICATION(state) {
      state.notification = null;
    },
  },
  actions: {
    addNotification({ commit }, { text, type, duration }) {
      const timeout = duration || constants.NOTIFY_DURATION;
      const message = {
        type,
        text,
        timeout,
      };

      commit("ADD_NOTIFICATION", message);
    },
    async createNotification({ state, dispatch }, message) {
      if (!state.notification) {
        dispatch("addNotification", message);
        return;
      }

      await dispatch("deleteNotification");

      setTimeout(() => {
        dispatch("addNotification", message);
      }, constants.ANIMATION_DELAY_ADD_NOTIFICATION);
    },
    deleteNotification({ commit }) {
      commit("DELETE_NOTIFICATION");
    },
  },
};
