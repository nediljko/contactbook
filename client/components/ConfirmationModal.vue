<template>
  <div class="modal is-active">
    <div class="modal-content">
      <p class="modal-title">{{ title }}</p>
      <p class="modal-message">{{ message }}</p>
      <div class="field is-grouped">
        <div class="control">
          <button @click.stop="close" class="button cancel">Cancel</button>
        </div>
        <div class="control">
          <button @click.stop="execute" class="button confirm">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'confirmation-modal',
  props: {
    show: { type: Boolean, default: false },
    action: { type: Function, default: () => {} },
    message: { type: String, default: 'Are you sure?' },
    title: { type: String, default: 'Title' }
  },
  methods: {
    execute() {
      this.action().then(() => {
        this.$emit('executed');
        this.close();
      });
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../stylesheets/main';
@import '../stylesheets/theme';

.modal {
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100000 !important;
  overflow-y: scroll !important;
  overflow-x: hidden;
  background: rgba(black, 0.45);
}

.modal-content {
  width: 80%;
  font-size: 1.5rem;
  background: $white;
  border-radius: 0.5;
  box-shadow: 0 0 14px 3px rgba(173, 174, 187, 1);

  .modal-title {
    padding: 2rem 2rem;
    border-bottom: 1px solid grey;
  }

  .modal-message {
    padding: 3rem;
    text-align: center;
  }

  .field.is-grouped {
    flex-direction: column;
    align-items: center;
    padding: 2rem;

    .control {
      width: 60%;
      margin: 0;
      padding: 1rem;

      .button {
        border-radius: 1rem;
        width: 100%;
      }
    }
  }

  @media screen and (min-width: $tablet) {
    width: fit-content;

    .modal-title {
      padding: 1rem 2rem;
    }

    .field.is-grouped {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
    }

    .control {
      flex-basis: 40%;
    }
  }

  .cancel, .confirm {
    color: white;
  }

  .cancel {
    background: $grey;
  }

  .confirm {
    background: $twitter;
  }
}
</style>
