<template>
  <div class="entry">
    <div class="columns">
      <div class="column is-3 image is-hidden-mobile">
        <picture-input
          ref="pictureInput"
          @change="val => image = val"
          @prefill="image = images[entry.id]"
          class="upload-picture"
          :prefill="prefill"
          radius="50"
          width="200"
          height="200"
          margin="16"
          hideChangeButton
          size="0.2">
        </picture-input>
      </div>
      <div class="column is-9 main-content">
        <div class="columns is-multiline">
          <div class="column is-12 controls-top">
            <button
              @click="goBack"
              class="button button-back"
              type="button">
              <i class="mdi mdi-arrow-left"></i>
            </button>
            <div v-show="entry.id" class="delete-container">
              <span class="is-hidden-mobile">Delete</span>
              <button
                @click="destroy"
                class="button button-entry-delete"
                type="button">
                <i class="mdi mdi-trash-can-outline"></i>
              </button>
            </div>
          </div>
          <div class="column is-12 image is-hidden-tablet">
            <picture-input
              ref="pictureInput"
              @change="val => image = val"
              @prefill="image = images[entry.id]"
              :prefill="prefill"
              class="upload-picture"
              radius="50"
              width="200"
              height="200"
              margin="16"
              hideChangeButton
              size="0.2">
            </picture-input>
          </div>
          <form @submit.prevent="saveEntry" class="column is-12">
            <div class="is-divider"></div>
            <div class="field full-name">
              <div class="label-container">
                <i class="mdi mdi-account-outline"></i>
                <label class="label">full name</label>
              </div>
              <div
                :class="{ 'is-active': focused === 'name' }"
                class="control">
                <input
                  v-model="entry.name"
                  @click="focus('name')"
                  class="input"
                  type="text"
                  placeholder="Name">
              </div>
            </div>
            <div class="is-divider"></div>
            <div class="field email">
              <div class="label-container">
                <i class="mdi mdi-email-outline"></i>
                <label class="label">email</label>
              </div>
              <div
                :class="{ 'is-active': focused === 'email' }"
                class="control">
                <input
                  v-model="entry.email"
                  @click="focus('email')"
                  class="input"
                  type="email"
                  placeholder="Email">
              </div>
            </div>
            <div class="is-divider divider-full"></div>
            <div class="field phone columns is-multiline">
              <div class="column is-12">
                <div class="label-container">
                  <i class="mdi mdi-phone-outline"></i>
                  <label class="label">numbers</label>
                </div>
              </div>
              <div
                v-for="(number, index) in entry.numbers"
                :key="index"
                :class="{ 'is-active': focused === `numbers-${index}` }"
                class="column is-12 items">
                <div class="field number-name">
                  <div class="control">
                    <input
                      v-model="entry.numbers[index].label"
                      @click="focus(`numbers-${index}`)"
                      class="input"
                      type="text"
                      placeholder="Number">
                  </div>
                </div>
                <div class="field digits">
                  <div class="control">
                    <input
                      v-model="entry.numbers[index].digits"
                      @click="focus(`numbers-${index}`)"
                      class="input"
                      type="text"
                      placeholder="Cell">
                  </div>
                  <button
                    @click="removeNumber(index)"
                    :disabled="entry.numbers.length === 1 || index !== entry.numbers.length - 1"
                    class="button button-remove"
                    type="button">
                    <i class="mdi mdi-close-circle-outline"></i>
                  </button>
                </div>
              </div>
              <div class="column is-12 add-number-control">
                <button
                  @click="addNumber"
                  class="button button-add"
                  type="button">
                  <i class="mdi mdi-plus-circle-outline"></i>
                </button>
                <span class="add-button-label">Add number</span>
              </div>
            </div>
            <div class="controls field is-grouped">
              <button
                @click="goBack"
                class="control button cancel is-marginless"
                type="button">
                Cancel
              </button>
              <button
                class="control button save is-marginless"
                type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
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
      image: '',
      focused: ''
    };
  },
  computed: {
    ...mapState('contacts', ['images']),
    prefill() {
      const dummy = require('../../static/assets/dummy.png');
      return this.images[this.entry.id] || dummy;
    }
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
    focus(focused) {
      this.focused = focused;
    },
    goBack() {
      this.$router.go(-1);
    },
    removeNumber(index) {
      this.entry.numbers.splice(index, 1);
      if (this.focused === `number-${index}`) this.focused = '';
    },
    saveEntry() {
      this.entry.id = this.entry.id || cuid();
      this.save(this.entry);
      if (this.image !== this.images[this.entry.id]) {
        this.saveImage({ entry: this.entry, image: this.image });
      }
      this.goBack();
    }
  },
  components: { ConfirmationModal, PictureInput }
};
</script>

<style lang="scss" scoped>
@import '../../stylesheets/main';
@import '../../stylesheets/theme';

.entry {
  @media screen and (min-width: $tablet) {
    width: 90%;
  }
}

input {
  color: $grey !important;
}

.is-active {
  input {
    border-color: $twitter !important;
    border-width: 2px;
  }

  i {
    color: $twitter !important;
  }
}

.label {
  display: inline-block;
  color: $twitter;
}

.label-container {
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  color: $twitter;

  .mdi {
    font-size: 1.5rem;
  }

  .label {
    margin-left: 1rem;
  }
}

.main-content {
  @media screen and (min-width: $tablet) {
    padding: 7rem 0.75rem 0.75rem 0;
  }
}

.upload-picture {
  /deep/ {
    canvas {
      border-radius: 100%;
      border: 0.3rem solid $image-border;
    }
  }
}

.image {
  padding-top: 2rem;

  @media screen and (min-width: $tablet) {
    padding: 2rem 0 0;
  }
}

.add-number-control {
  display: flex;
  align-items: center;

  button, span {
    color: $twitter !important;
  }
}

.is-divider {
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid $twitter;
}

.divider-full {
  margin-right: -1.75rem;

  @media screen and (min-width: $tablet) {
    margin-right: 0;
  }
}

.button-delete, .button-remove, .button-back, .button-entry-delete, .button-add {
  border: none;
}

.button-add {
  height: auto;
  padding: 0;

  .mdi {
    font-size: 2rem;
  }
}

.items {
  display: flex;
  flex-wrap: wrap;

  .number-name {
    flex-basis: 100%;
  }

  .digits {
    display: flex;
    align-items: center;
    flex-basis: 100%;

    .control {
      flex-basis: 90%;
    }
  }

  .button-remove {
    height: 100%;
    margin-left: 0.5rem;
    padding: 0;

    .mdi {
      color: $grey;
      font-size: 2rem;
    }
  }

  @media screen and (min-width: $tablet) {
    justify-content: space-between;

    .number-name {
      flex-basis: 50%;
      margin: 0;
    }

    .digits {
      flex-basis: 48%;
    }

    .button-remove {
      margin-left: 1.5rem;
    }
  }
}

.controls-top {
  display: flex;
  margin: 0 -0.75rem;
  justify-content: space-between;
  border-bottom: 2px solid $card-border;

  .button-back {
    height: fit-content;
    padding: 0;

    .mdi {
      color: $grey;
      font-size: 2rem;
    }
  }

  .delete-container {
    display: flex;
    align-items: center;

    .button {
      height: fit-content;

      .mdi {
        color: $grey;
        font-size: 1.5rem;
      }
    }
  }

  @media screen and (min-width: $tablet) {
    margin: 0;
    padding-bottom: 0;
    border: 0;
  }
}

.controls.field.is-grouped {
  padding-top: 3rem;
  justify-content: space-around;

  .button {
    border-radius: 1rem;
    flex-basis: 48%;
    color: white;
  }

  .save {
    background: $twitter;
  }

  .cancel {
    background: $grey;
  }

  @media screen and (min-width: $tablet) {
    justify-content: space-between;

    .button {
      flex-basis: 15%;
    }
  }
}

.full-name, .email {
  padding-bottom: 1rem;

  @media screen and (min-width: $tablet) {
    width: 50%;
  }
}

.add-button-label {
  padding: 1rem;
}

.phone {
  .label-container {
    padding: 0;
  }
}

.field .control input {
  height: 4rem;
}
</style>
