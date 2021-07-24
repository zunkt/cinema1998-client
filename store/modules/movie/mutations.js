import * as _ from "lodash";

const SET_MOVIE_DETAILS = (state, data) => {
  state.movieDetails = data;
};

const SET_MOVIES_DATA = (state, data) => {
  state.moviesData = data;
};

export default {
  SET_MOVIE_DETAILS,
  SET_MOVIES_DATA
};
