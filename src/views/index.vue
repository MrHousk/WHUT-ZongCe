<template>
  <div class="index">
    <header>
      <z-header></z-header>
    </header>

    <main>
      <transition name="fade" mode="out-in">
        <keep-alive :exclude="[]">
          <router-view :key="$route.path.replace(/\//g, '_')" />
        </keep-alive>
      </transition>
    </main>
  </div>
</template>

<script>
  import zHeader from '@/views/header.vue'
  export default {
    components: {
      zHeader
    }
  }

</script>

<style lang="postcss">
  @import '../styles/vars.css';
  .index {
    display: flex;
    flex-direction: column;
    height: 100vh;
    &>header {
      flex: 0 0 60px;
    }
    &>main {
      flex-grow: 1;
      overflow: hidden;
    }
  }

</style>
