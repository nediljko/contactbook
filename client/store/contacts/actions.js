import contactApi from '../../api/contacts';

export const setFavorite = ({ commit }, contact) => {
  contactApi.setFavorite(contact);
  commit('setFavorite', contact);
};

export const remove = ({ commit }, contact) => {
  contactApi.destroy(contact);
  commit('removeContact', contact);
};

export const save = ({ commit }, contact) => {
  contactApi.upsert(contact);
  commit('setContact', contact);
};

export const saveImage = ({ commit }, data) => {
  contactApi.upsertImage(data);
  commit('setImage', data);
};

export const fetch = ({ commit }) => {
  const contacts = contactApi.fetch();
  commit('setContacts', contacts);
};

export const fetchImages = ({ commit }) => {
  const images = contactApi.fetchImages();
  commit('setImages', images);
};
