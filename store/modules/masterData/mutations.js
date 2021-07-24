import * as _ from "lodash";

const SET_SUBTITLE_DATA = (state, data) => {
  state.subtitleData = data;
};

const SET_CATEGORY_DATA = (state, data) => {
  state.categoryData = data;
};

export default {
  SET_SUBTITLE_DATA,
  SET_CATEGORY_DATA
};
