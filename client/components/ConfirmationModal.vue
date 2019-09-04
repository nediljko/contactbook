<template>
  <div class="modal is-active">
    <div class="modal-content">
      <p class="title is-4">{{ message }}</p>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button @click.stop="close" class="button">No</button>
        </div>
        <div class="control">
          <button @click.stop="execute" class="button is-danger">Yes</button>
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
    message: { type: String, default: 'Are you sure?' }
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
.title {
  margin: 1rem 0.8rem;
}

.modal {
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: scroll !important;
  overflow-x: hidden;
  background: rgba(black, 0.86);
}
</style>
