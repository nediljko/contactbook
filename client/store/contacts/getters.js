import filter from 'lodash/filter';

export const favorites = state => {
  return filter(state.contacts, 'favorite');
};
