import { isLoggedIn, logOut } from "./shared/utils/auth";

export default {
  state: {
    lastSearch: {
      from: null,
      to: null
    },
    basket: {
      items: [],

    },
    isLoggedIn: false,
    user: {}
  },
  getters: {
    itemsInBasket: (state) => state.basket.items.length,
    inBasketAlready: (state) => {
      return function(id) {
        // c b c c c
        // false false true true ...
        return state.basket.items.reduce((result, item) => {
          return result || item.bookable.id == id
        }, false);
      }
    }
  },
  mutations: {
    setLastSearch(state, payload) {
      state.lastSearch = payload;
    },
    addToBasket(state, payload) {
      state.basket.items.push(payload);
    },
    removeFromBasket(state, payload) {
      state.basket.items = state.basket.items.filter((item) => {
        return item.bookable.id !== payload;
      });
    },
    setBasket(state, payload) {
      state.basket = payload;
    },

    setUser(state, payload) {
      state.user = payload;
    },

    setLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    }
  },
  actions: {
    setLastSearch(context, payload) {
      context.commit('setLastSearch', payload);
      localStorage.setItem('lastSearch', JSON.stringify(payload));
    },
    loadStoreState(context) {
      const lastSearch = localStorage.getItem('lastSearch');

      if(lastSearch) {
        context.commit('setLastSearch', JSON.parse(lastSearch));
      }

      const basket = localStorage.getItem('basket');

      if(basket) {
        context.commit('setBasket', JSON.parse(basket));
      }

      context.commit('setLoggedIn', isLoggedIn());
    },
    addToBasket({ commit, state }, payload) {
      commit('addToBasket', payload);
      localStorage.setItem('basket', JSON.stringify(state.basket));
    },
    removeFromBasket({ commit, state }, payload) {
      commit('removeFromBasket', payload);
      localStorage.setItem('basket', JSON.stringify(state.basket));
    },
    clearBasket({commit, state}, payload) {
      commit('setBasket', { items: [] });
      localStorage.setItem('basket', JSON.stringify(state.basket));
    },
    async loadUser({commit, dispatch}) {
      if(isLoggedIn()) {
        try {
          const user = (await axios.get('/user')).data;
          commit('setUser', user);
          commit('setLoggedIn', true);
        } catch(error) {
          dispatch('logout');

          // If we don't check auhentication globally
          // if(401 === error.resposnse.status) {
          //   dispatch('logout');
          // }
        }
      }
    },
    logout({ commit }) {
      commit('setUser', {});
      commit('setLoggedIn', false);
      logOut();
    }
  }
}
