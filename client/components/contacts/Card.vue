<template>
  <div v-if="isNew" class="card">
    <router-link
      :to="{ name: 'contact-entry' }"
      class="button"
      tag="button">
      <i class="mdi mdi-plus"></i>
      Add new
    </router-link>
  </div>
  <div v-else class="card">
    <img
      :src="images[content.id]"
      :alt="`${content.name} image`"
      width="300"
      height="300"
      class="image"/>
    <span>{{ content.name }}</span>
    <button
      @click="like"
      class="button"
      type="button">
      <i class="mdi mdi-cards-heart"></i>
    </button>
    <router-link
      :to="{ name: 'contact-entry', params: content }"
      tag="button"
      class="button">
      <i class="mdi mdi-pencil"></i>
    </router-link>
    <button
      @click="destroy"
      class="button"
      type="button">
      <i class="mdi mdi-trash-can-outline"></i>
    </button>
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

.image {
  border-radius: 100%;
}
</style>
