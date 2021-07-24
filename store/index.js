import Vuex from "vuex";
import movieModule from "./modules/movie";
import masterModule from "./modules/masterData";
import accountModule from "./modules/account";
import bookingModule from "./modules/booking";
import billModule from "./modules/bill";

const createStore = () => {
  return new Vuex.Store({
    state: {},
    modules: {
      movie: movieModule,
      masterData: masterModule,
      account: accountModule,
      booking: bookingModule,
      bill: billModule
    },
    actions: {},
    mutations: {}
  });
};

export default createStore;
