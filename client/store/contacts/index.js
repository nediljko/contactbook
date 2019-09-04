import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

const state = {
  contacts: {},
  images: {}
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
