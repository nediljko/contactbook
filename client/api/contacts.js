// every store module has an api file where all api calls are made

function fetch() {
  return JSON.parse(window.localStorage.getItem('CONTACTS') || '{}');
}

function fetchImages() {
  return JSON.parse(window.localStorage.getItem('IMAGES') || '{}');
}

function upsert(contact) {
  const contacts = JSON.parse(window.localStorage.getItem('CONTACTS') || '{}');
  contacts[contact.id] = contact;
  return window.localStorage.setItem('CONTACTS', JSON.stringify(contacts));
}

function upsertImage({ entry, image }) {
  const images = JSON.parse(window.localStorage.getItem('IMAGES') || '{}');
  images[entry.id] = image;
  return window.localStorage.setItem('IMAGES', JSON.stringify(images));
}

function destroy(contact) {
  const contacts = JSON.parse(window.localStorage.getItem('CONTACTS') || '{}');
  delete contacts[contact.id];
  window.localStorage.setItem('CONTACTS', JSON.stringify(contacts));
  return Promise.resolve(true);
}

function setFavorite(contact) {
  const contacts = JSON.parse(window.localStorage.getItem('CONTACTS') || '{}');
  contacts[contact.id].favorite = contact.favorite;
  return window.localStorage.setItem('CONTACTS', JSON.stringify(contacts));
}

export default {
  fetch,
  fetchImages,
  setFavorite,
  destroy,
  upsert,
  upsertImage
};
