<template>
  <div class="entry">
    <button
      @click="goBack"
      class="button"
      type="button">
      <i class="mdi mdi-arrow-left"></i>
    </button>
    <button
      v-show="entry.id"
      @click="destroy"
      class="button"
      type="button">
      Delete
      <i class="mdi mdi-trash-can-outline"></i>
    </button>
    <form @submit.prevent="saveEntry">
      <div class="field">
        <div class="control">
          <picture-input
            ref="pictureInput"
            @change="val => image = val"
            @prefill="image = images[entry.id]"
            :prefill="images[entry.id]"
            radius="50"
            width="200"
            height="200"
            margin="16"
            hideChangeButton
            size="0.2">
          </picture-input>
        </div>
      </div>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input v-model="entry.name" class="input" type="text" placeholder="Name">
        </div>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input v-model="entry.email" class="input" type="email" placeholder="Email">
        </div>
      </div>
      <label class="label">Numbers</label>
      <div v-for="(number, index) in entry.numbers" :key="index">
        <div class="field">
          <div class="control">
            <input
              v-model="entry.numbers[index].label"
              class="input"
              type="text"
              placeholder="Number">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input
              v-model="entry.numbers[index].digits"
              class="input"
              type="text"
              placeholder="Cell">
          </div>
        </div>
        <button
          @click="removeNumber(index)"
          :disabled="entry.numbers.length === 1"
          class="button"
          type="button">
          <i class="mdi mdi-close-circle-outline"></i>
        </button>
      </div>
      <button
        @click="addNumber"
        class="button"
        type="button">
        <i class="mdi mdi-plus"></i>
      </button>
      <div class="controls field is-grouped">
        <button @click="goBack" class="control button" type="button">Cancel</button>
        <button class="control button is-primary" type="submit">Save</button>
      </div>
    </form>
    <confirmation-modal
      v-show="!!deleteContext"
      @close="deleteContext = null"
      :action="deleteContext"
      message="Are you sure you want to unenroll this Contact?"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import ConfirmationModal from '../ConfirmationModal';
import cuid from 'cuid';
import isEmpty from 'lodash/isEmpty';
import PictureInput from 'vue-picture-input';

const resetNumber = () => ({ label: '', digits: '' });
const resetEntry = () => ({
  name: '',
  email: '',
  numbers: [resetNumber()],
  favorite: false
});

export default {
  name: 'contact-entry',
  data() {
    return {
      deleteContext: null,
      entry: isEmpty(this.$route.params) ? resetEntry() : cloneDeep(this.$route.params),
      image: ''
    };
  },
  computed: {
    ...mapState('contacts', ['images'])
  },
  methods: {
    ...mapActions('contacts', ['remove', 'save', 'saveImage']),
    addNumber() {
      this.entry.numbers.push(resetNumber());
    },
    destroy() {
      this.deleteContext = () => this.remove(this.entry)
        .then(() => (this.entry = resetEntry()));
    },
    goBack() {
      this.$router.go(-1);
    },
    removeNumber(index) {
      this.entry.numbers.splice(index, 1);
    },
    saveEntry() {
      this.entry.id = this.entry.id || cuid();
      this.save(this.entry);
      if (this.image !== this.images[this.entry.id]) {
        this.saveImage({ entry: this.entry, image: this.image });
      }
    }
  },
  components: { ConfirmationModal, PictureInput }
};
</script>

<style lang="scss" scoped>
@import '../../stylesheets/main';
</style>
