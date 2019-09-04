import Vue from 'vue';

export const removeContact = (state, contact) => {
  Vue.delete(state.contacts, contact.id);
};

export const setContact = (state, contact) => {
  state.contacts[contact.id] = contact;
};

export const setContacts = (state, contacts) => {
  state.contacts = contacts;
};

export const setImage = (state, { entry, image }) => {
  state.images[entry.id] = image;
};

export const setImages = (state, images) => {
  console.log('set images');
  state.images = images;
};

export const setFavorite = (state, contact) => {
  state.contacts[contact.id] = contact;
};

export const setIsLoading = (state, val) => {
  state.isLoading = val;
};
