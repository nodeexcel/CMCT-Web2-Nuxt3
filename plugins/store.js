import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      counter: 0,
    };
  },
  mutations: {
    increment(state, payload) {
      state.counter += payload;
    },
    decrement(state, payload) {
      state.counter -= payload;
    },
    resetCounter(state) {
      state.counter = 0;
    },
  },
  actions: {
    increment({ commit }, payload) {
      commit("increment", payload);
    },
    decrement(context, payload) {
      context.commit("decrement", payload);
    },
    resetCounter(context) {
      context.commit("resetCounter");
    },
  },
//   modules: {
//     // Add modules here
//     theme: theme,
//   },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});