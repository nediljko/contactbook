<template>
  <div class="columns is-multiline">
    <div class="column is-12 tabs">
      <div class="columns is-mobile">
        <div class="column is-6 has-text-right contacts-tab is-paddingless">
          <button
            @click="tab = tabs.ALL_CONTACTS"
            :class="{ 'is-not-active': tab !== tabs.ALL_CONTACTS }"
            class="tab-button">
            {{ allContacts }}
          </button>
        </div>
        <div class="column is-6 favorites-tab is-paddingless">
          <button
            @click="tab = tabs.FAVORITES"
            :class="{ 'is-not-active': tab !== tabs.FAVORITES }"
            class="tab-button">
            {{ favoriteContacts }}
          </button>
        </div>
      </div>
    </div>
    <div class="column is-12 filter">
      <div class="field">
        <p class="control has-icons-left">
          <input v-model="query" class="input is-medium" type="text">
          <span class="icon is-left">
            <i class="mdi mdi-magnify"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="column is-12 items">
      <div class="columns is-multiline">
        <div v-if="tab === tabs.ALL_CONTACTS" class="column is-3">
          <card :content="{}" isNew></card>
        </div>
        <div v-for="contact in contactList" :key="contact.id" class="column is-3">
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
import filter from 'lodash/filter';
import some from 'lodash/some';

const ALL_CONTACTS = 'All contacts';
const FAVORITES = 'My favorites';

export default {
  name: 'contact-list',
  data() {
    return {
      tab: ALL_CONTACTS,
      focused: {},
      query: ''
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
    contactList() {
      const { query, tab, contacts, favorites } = this;
      const list = tab === ALL_CONTACTS ? contacts : favorites;
      if (!query) return list;
      const neutralQuery = query.toUpperCase();
      return filter(list, ({ name, email, numbers }) => {
        const matchName = name.toUpperCase().includes(neutralQuery);
        const matchEmail = email.toUpperCase().includes(neutralQuery);
        if (matchName || matchEmail) return true;
        return some(numbers, ({ label, digits }) => {
          const matchLabel = label.toUpperCase().includes(neutralQuery);
          const matchDigits = digits.toUpperCase().includes(neutralQuery);
          return matchLabel || matchDigits;
        });
      });
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
  margin: 2rem 0 2rem 1rem;
  padding: 0 1rem;
  color: $twitter;
  font-size: 1rem;
  font-weight: 500;
  background-color: inherit;
  border: none;

  &:hover {
    cursor: pointer;
  }
}

.is-not-active {
  color: $tab-inactive;
}

.filter {
  padding: 0.75rem 2rem;

  .mdi {
    padding-top: 0.5rem;
    font-size: 1.6rem;
  }

  input {
    box-shadow: 0 0 14px 3px rgba(176,162,176,0.29);
  }

  @media screen and (min-width: $tablet) {
    padding: 0.75rem;

    .field {
      max-width: 50%;
      margin: 1rem auto 2rem;
    }
  }
}

.tabs {
  padding: 0.75rem 3rem;

  @media screen and (min-width: $tablet) {
    padding: 0.75rem;
  }
}

.items {
  @media screen and (min-width: $tablet) {
    padding: 0.75rem 3rem;
  }
}

.contacts-tab .tab-button {
  border-right: 1px solid grey;
}

.contacts-tab, .favorites-tab {
  border-bottom: 2px solid $twitter;
}
</style>
