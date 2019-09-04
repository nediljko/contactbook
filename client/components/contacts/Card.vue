<template>
  <div v-if="isNew" class="card empty">
    <router-link
      :to="{ name: 'contact-entry' }"
      class="button"
      tag="button">
      <i class="mdi mdi-plus"></i>
      Add new
    </router-link>
  </div>
  <div v-else :class="{ 'is-focused': isFocused }" class="card">
    <div class="controls">
      <button
        @click="like"
        class="button"
        type="button">
        <i class="mdi mdi-cards-heart"></i>
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
    <figure class="image-container">
      <img
        :src="images[content.id]"
        :alt="`${content.name} image`"
        class="image"/>
      <span>{{ content.name }}</span>
    </figure>
    <confirmation-modal
      v-show="!!deleteContext"
      @close="deleteContext = null"
      :action="deleteContext"
      message="Are you sure you want to unenroll this Contact?"/>
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
    ...mapState('contacts', ['images'])
  },
  methods: {
    ...mapActions('contacts', ['remove', 'setFavorite']),
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

.empty {
  border: 2px dotted $twitter;
  color: $twitter;
}

.button {
  border: none;
}

.card.is-focused {
  border: 2px solid $twitter;
}

.card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 1rem;
  border: 2px solid transparent;
}

.controls {
  display: flex;
  justify-content: space-between;
  flex-basis: 100%;
}

.image-container {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  flex-direction: column;

  img {
    width: 6rem;
  }

  span {
    padding-top: 1rem;
  }
}
</style>
