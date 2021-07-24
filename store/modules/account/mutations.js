import * as _ from "lodash";

const SET_ACCOUNT = (state, data) => {
  state.account = {
    ...state.account,
    ...data
  };
};

const SET_ACCOUNT_INFO = (state, data) => {
  state.accountInfo = data;
};

export default {
  SET_ACCOUNT,
  SET_ACCOUNT_INFO
};
