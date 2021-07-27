import * as _ from "lodash";

const SET_SUBTITLE_DATA = (state, data) => {
  state.subtitleData = data;
};

const SET_CATEGORY_DATA = (state, data) => {
  state.categoryData = data;
};

const SET_THEATER_DATA = (state, data) => {
  state.theaterData = data;
};

export default {
  SET_SUBTITLE_DATA,
  SET_CATEGORY_DATA,
  SET_THEATER_DATA
};
