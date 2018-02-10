import {$get, $post, $put, $del} from '@/plugins/axios';

const state = {
  userExchanges: [],
  selectedExchange: null
};

const mutations = {
  setUserExchanges: function(state, exchanges) {
    state.userExchanges = exchanges;
  },
  updateExchange: function(state, {index, exchange}) {
    state.userExchanges.splice(index, 1, exchange);
  },
  addExchange: function(state, photo) {
    state.userExchanges.push(photo);
  },
  setSelectedExchange(state, content) {
    state.selectedExchange = content;
  },
  removeExchange: function(state, exchangeId) {
    const exchangeIndex = state.userExchanges.findIndex((c) => {
      return c.id === exchangeId;
    });
    state.userExchanges.splice(exchangeIndex, 1);
  }
};

const actions = {
  fetchExchanges({commit}) {
    return $get('/exchanges')
      .then((res) => {
        commit('setUserExchanges', res);
      })
      .catch((error) => {
        throw new Error(JSON.stringify(error));
      });
  },

  fetchExchange({commit}, id) {
    return $get(`/exchanges/${id}`)
      .then((res) => {
        commit('setSelectedExchange', res);
      })
      .catch((error) => {
        throw new Error(JSON.stringify(error));
      });
  },

  addExchange({commit}, exchange) {
    return $post('/exchanges', exchange)
      .then((res) => {
        commit('addExchange', res);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },

  editExchange: function({commit, state}, exchange) {
    return $put(`/exchanges/${exchange.id}`, exchange)
      .then((res) => {
        const index = state.userExchanges.findIndex((p) => {
          return p.id === exchange.id;
        });
        commit('updateExchange', {index, exchange: res});
      })
      .catch((error) => {
        throw new Error(error);
      });
  },

  removeExchange({commit}, exchangeId) {
    return $del(`/exchanges/${exchangeId}`)
      .then((res) => {
        commit('removeExchange', exchangeId);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
};

export default {
  state,
  actions,
  mutations
};
