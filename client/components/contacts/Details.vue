<template>
  <div class="columns content">
    <div class="column is-narrow is-hidden-mobile tablet-image">
      <figure class="image-container is-marginless">
        <img
          :src="image"
          alt="Profile image."
          class="image"/>
      </figure>
    </div>
    <div class="column is-8 details-container">
      <div class="columns is-multiline">
        <div class="column is-12 controls-top">
          <div class="grouped-left">
            <button
              @click="goBack"
              class="button button-back"
              type="button">
              <i class="mdi mdi-arrow-left"></i>
            </button>
            <span class="is-hidden-mobile contact-name">{{ contact.name }}</span>
          </div>
          <div class="grouped-right">
            <button
              class="button button-like"
              type="button">
              <i
                :class="favorite ? 'mdi-cards-heart' : 'mdi-heart-outline'"
                class="mdi">
              </i>
            </button>
            <router-link
              :to="{ name: 'contact-entry', params: contact }"
              tag="button"
              class="button button-edit">
              <i class="mdi mdi-pencil"></i>
            </router-link>
          </div>
        </div>
        <div class="column is-12 image-container is-hidden-tablet">
          <figure class="is-marginless">
            <img
              :src="image"
              alt="Profile image."
              class="image"/>
          </figure>
          <span class="contact-name">{{ contact.name }}</span>
        </div>
        <div class="column is-12 divider-container">
          <div class="is-divider"></div>
        </div>
        <div class="column is-12 details">
          <div class="columns is-multiline">
            <div class="column is-12 email">
              <div class="columns is-multiline">
                <div class="column is-12-mobile is-4-tablet is-3-desktop label-container">
                  <i class="mdi mdi-email-outline"></i>
                  <label class="label">email</label>
                </div>
                <span class="column is-12-mobile is-6-tablet email-content">
                  {{ contact.email }}
                </span>
              </div>
            </div>
            <div class="column is-12 numbers">
              <div class="columns is-multiline">
                <div class="column is-12-mobile is-4-tablet is-3-desktop label-container">
                  <i class="mdi mdi-phone-outline"></i>
                  <label class="label">numbers</label>
                </div>
                <ul class="column is-7-mobile is-6-tablet is-5-desktop">
                  <li
                    v-for="(number, index ) in contact.numbers"
                    :key="index">
                    <span class="name">{{ number.label.toUpperCase() }}</span>
                    <span class="digits">{{ number.digits }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'contact-details',
  computed: {
    ...mapState('contacts', ['contacts', 'images']),
    contact() {
      return this.contacts[this.$route.params.id];
    },
    favorite() {
      return this.contact.favorite;
    },
    image() {
      const dummy = require('../../static/assets/dummy.png');
      return this.images[this.contact.id] || dummy;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../stylesheets/main';
@import '../../stylesheets/theme';

.content {
  width: 100%;
  margin: 0 auto !important;

  @media screen and (min-width: $tablet) {
    width: 85%;
  }
}

.contact-name {
  font-size: 1.5rem;
}

.contact-name, .name {
  font-weight: bold;
}

.tablet-image {
  padding-right: 0;
}

.details-container {
  @media screen and (min-width: $tablet) {
    padding-top: 4rem;
    padding-left: 0;
  }
}

.details {
  padding-left: 4rem;
}

.email-content {
  display: flex;
  align-items: center;
}

.divider-container {
  padding: 0 1rem;
}

.is-divider {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 1px solid $twitter;

  @media screen and (min-width: $tablet) {
    margin-bottom: 2.5rem;
  }
}

.image-container {
  display: flex;
  align-items: center;
  padding: 1rem 1rem 0;

  span {
    margin-left: 1rem;
    font-size: 2rem;
  }
}

.content ul {
  width: 65%;
  margin: 0 0 0 2.5rem;
  list-style-type: none;

  @media screen and (min-width: $tablet) {
    margin: 0;
    padding-top: 1rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }
}

.email {
  padding-bottom: 2rem;

  span {
    margin-left: 2.5rem;

    @media screen and (min-width: $tablet) {
      margin-left: 0;
    }
  }
}

.digits {
  text-decoration: underline;
}

img {
  border-radius: 100%;
  width: 6rem;
  height: 6rem;
  border: 0.3rem solid $image-border;

  @media screen and (min-width: $tablet) {
    width: 10rem;
    height: 10rem;
  }
}

.label-container {
  display: flex;
  align-items: center;
  height: fit-content;
  color: $twitter;

  .mdi {
    padding-top: 7px;
    font-size: 1.5rem;
  }

  .label {
    margin-left: 1rem;
    color: $twitter;
  }
}

.button-back {
  .mdi {
    font-size: 2rem;
  }
}

.button-like, .button-edit {
  .mdi {
    font-size: 1.5rem;
  }
}

.button-back,  .button-like, .button-edit {
  padding: 0;
  color: $card-icons;
  border: none;

  &:hover {
    color: $card-icons;
  }
}

.controls-top {
  display: flex;
  margin: 0 -0.75rem;
  justify-content: space-between;
  border-bottom: 2px solid $card-border;

  .button-back {
    height: fit-content;
  }

  @media screen and (min-width: $tablet) {
    margin: 0;
    padding-bottom: 0;
    border: 0;
  }
}

.grouped-right, .grouped-left {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.grouped-right {
  width: 6rem;
}

.grouped-left {
  margin-left: 1rem;
  font-size: 2rem;

  span {
    margin-left: 1rem;
  }
}
</style>
