import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  account: {
    email: "",
    token: "",
    isLoggedIn: ""
  },
  accountInfo: {}
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
