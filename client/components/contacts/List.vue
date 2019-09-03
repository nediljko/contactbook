<template>
  <div class="columns is-multiline">
    <div class="column is-5 is-offset-1 has-text-right contacts-tab">
      <button
        @click="tab = tabs.ALL_CONTACTS"
        :class="{ 'is-active': tab === tabs.ALL_CONTACTS }"
        class="tab-button">
        {{ allContacts }}
      </button>
    </div>
    <div class="column is-5 favorites-tab">
      <button
        @click="tab = tabs.FAVORITES"
        :class="{ 'is-active': tab === tabs.FAVORITES }"
        class="tab-button">
        {{ favorites }}
      </button>
    </div>
    <div class="column is-12 filter">
      <div class="field">
        <p class="control has-icons-left has-icons-right is-loading">
          <input class="input" type="text">
          <span class="icon is-left">
            <i class="mdi mdi-magnify"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const ALL_CONTACTS = 'All contacts';
const FAVORITES = 'Favorites';

export default {
  name: 'contact-list',
  data() {
    return {
      tab: ALL_CONTACTS
    };
  },
  computed: {
    allContacts() {
      return ALL_CONTACTS;
    },
    favorites() {
      return FAVORITES;
    },
    tabs() {
      return { ALL_CONTACTS, FAVORITES };
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../stylesheets/main';
@import '../../stylesheets/theme';

.tab-button {
  border: none;
  padding: 0 1rem;

  &:hover {
    cursor: pointer;
  }
}

.contacts-tab .tab-button {
  border-right: 1px solid grey;
}

.contacts-tab, .favorites-tab {
  border-bottom: 1px solid $twitter;
}
</style>
