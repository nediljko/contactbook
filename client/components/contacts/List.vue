<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <div class="columns">
        <div class="column is-12">
          <div class="column is-6 has-text-right contacts-tab">
            <button
              @click="tab = tabs.ALL_CONTACTS"
              :class="{ 'is-active': tab === tabs.ALL_CONTACTS }"
              class="tab-button">
              {{ allContacts }}
            </button>
          </div>
          <div class="column is-6 favorites-tab">
            <button
              @click="tab = tabs.FAVORITES"
              :class="{ 'is-active': tab === tabs.FAVORITES }"
              class="tab-button">
              {{ favoriteContacts }}
            </button>
          </div>
        </div>
      </div>
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
    <div class="column is-12">
      <div class="columns is-multiline">
        <div v-if="tab === tabs.ALL_CONTACTS" class="column is-3">
          <card :content="{}" isNew></card>
        </div>
        <div v-for="contact in list" :key="contact.id" class="column is-3">
          <card
            @click.native="focused = contact"
            :content="contact"
            :isFocused="focused.id === contact.id">
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Card from './Card';

const ALL_CONTACTS = 'All contacts';
const FAVORITES = 'Favorites';

export default {
  name: 'contact-list',
  data() {
    return {
      tab: ALL_CONTACTS,
      focused: {}
    };
  },
  computed: {
    ...mapState('contacts', ['contacts']),
    ...mapGetters('contacts', ['favorites']),
    allContacts() {
      return ALL_CONTACTS;
    },
    favoriteContacts() {
      return FAVORITES;
    },
    list() {
      return this.tab === ALL_CONTACTS ? this.contacts : this.favorites;
    },
    tabs() {
      return { ALL_CONTACTS, FAVORITES };
    }
  },
  components: { Card }
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
