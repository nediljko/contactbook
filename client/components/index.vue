<template>
  <div class="app-container">
    <header class="app-header">
      <span class="title">{{ name }}</span>
    </header>
    <main class="app-content container">
      <section class="section">
        <router-view />
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'home',
  computed: {
    name() {
      const name = 'typeqast';
      return name.toUpperCase();
    }
  },
  methods: {
    ...mapActions('contacts', ['fetch', 'fetchImages'])
  },
  created() {
    this.fetch();
    this.fetchImages();
  }
};
</script>

<style lang="scss" scoped>
@import '../stylesheets/main';
@import '../stylesheets/theme';

.app-header {
  background: $twitter-header-gradient;
  overflow: auto;

  .title {
    display: block;
    color: $white;
    text-align: center;
    font-size: 1.5rem;
    padding: 0.5rem;
    margin-bottom: 0.4rem;
    background: $twitter-title-gradient;
  }
}
</style>
