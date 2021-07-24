import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ encodingType: "rc4", isCompression: false });

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: "1998-cinema-store",
      paths: ["movie", "masterData", "account", "booking"],
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })(store);
  });
};
