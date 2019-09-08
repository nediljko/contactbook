<template>
  <div v-if="isNew" class="empty">
    <div class="button-container">
      <router-link
        :to="{ name: 'contact-entry' }"
        class="button has-text-primary"
        tag="button">
        <i class="mdi mdi-plus"></i>
      </router-link>
      <span class="button-label">Add new</span>
    </div>
  </div>
  <div v-else :class="{ 'is-focused': isFocused }" class="card">
    <figure @click="goToDetails" class="image-container">
      <img
        :src="image"
        alt="Profile image."
        class="image"/>
      <span>{{ content.name }}</span>
    </figure>
    <div class="controls">
      <button
        @click="like"
        class="button"
        type="button">
        <i
          :class="content.favorite ? 'mdi-cards-heart' : 'mdi-heart-outline'"
          class="mdi">
        </i>
      </button>
      <div class="optional-controls">
        <router-link
          v-show="isFocused"
          :to="{ name: 'contact-entry', params: content }"
          tag="button"
          class="button">
          <i class="mdi mdi-pencil"></i>
        </router-link>
        <button
          v-show="isFocused"
          @click="destroy"
          class="button"
          type="button">
          <i class="mdi mdi-trash-can-outline"></i>
        </button>
      </div>
    </div>
    <confirmation-modal
      v-show="!!deleteContext"
      @close="deleteContext = null"
      :action="deleteContext"
      message="Are you sure you want to delete this contact?"
      title="Delete"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ConfirmationModal from '../ConfirmationModal';

export default {
  name: 'contact-card',
  props: {
    content: { type: Object, required: true },
    isFocused: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false }
  },
  data() {
    return {
      deleteContext: null
    };
  },
  computed: {
    ...mapState('contacts', ['images']),
    image() {
      const dummy = require('../../static/assets/dummy.png');
      return this.images[this.content.id] || dummy;
    }
  },
  methods: {
    ...mapActions('contacts', ['remove', 'setFavorite']),
    goToDetails() {
      this.$router.push({ name: 'contact-details', params: { id: this.content.id } });
    },
    like() {
      const flag = !this.content.favorite;
      this.setFavorite(Object.assign({}, this.content, { favorite: flag }));
    },
    destroy() {
      this.deleteContext = () => this.remove(this.content);
    }
  },
  components: { ConfirmationModal }
};
</script>

<style lang="scss" scoped>
@import '../../stylesheets/main';
@import '../../stylesheets/theme';

.image {
  border-radius: 100%;
}

.button {
  border: none;
}

.empty {
  display: flex;
  align-items: center;
  height: 6.2rem;
  border: 1px dashed $card-border-focused;
  border-radius: 0.3rem;

  .button-container {
    display: flex;
    align-items: center;
  }

  .button {
    height: auto;
    margin-left: 1rem;
  }

  .button-label {
    height: max-content;
    color: $twitter;
  }

  .mdi {
    padding-top: 0.5rem;
    color: $twitter;
    font-size: 3rem;
  }

  @media screen and (min-width: $tablet) {
    height: 100%;
    min-height: 13rem;

    .button-container {
      display: block;
      margin: auto;
    }

    .button {
      display: block;
      text-align: center;
      margin-left: 0;
    }

    .button-label {
      display: block;
      text-align: center;
      color: $twitter;
    }

    .mdi {
      padding-top: 0.5rem;
      color: $twitter;
      font-size: 3rem;
    }
  }
}

.card.is-focused {
  border: 1px solid $card-border-focused;
}

.card {
  display: flex;
  align-items: center;
  color: $grey !important;
  font-weight: bold !important;
  border: 1px solid $card-border;
  justify-content: space-between;
  box-shadow: none;
  border-radius: 0.3rem;

  @media screen and (min-width: $tablet) {
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    padding-bottom: 1rem;
  }
}

.image-container {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;

  img {
    width: 5rem;
    height: 5rem;
    border: 0.3rem solid $image-border;
  }

  span {
    padding-left: 2rem;
  }

  @media screen and (min-width: $tablet) {
    order: 2;
    flex-basis: 100%;
    flex-direction: column;

    img {
      width: 6rem;
      height: 6rem;
    }

    span {
      padding-top: 1rem;
      padding-left: 0;
    }
  }
}

.controls {
  display: flex;
  height: auto;

  .mdi {
    color: $card-icons;
    font-size: 1.5rem;
  }

  @media screen and (min-width: $tablet) {
    order: 1;
    justify-content: space-between;
    flex-basis: 100%;
  }
}
</style>
