<template>
  <div id="app">
    <navigation />
    <transition name="fade" mode="out-in">
      <router-view class="container"></router-view>
    </transition>
  </div>
</template>

<script>
import Navigation from './components/navigation';

export default {
  components: {
    Navigation
  }
};
</script>

<style lang="stylus">
  #app
    .fade
      &-enter
      &-leave-to
        opacity: 0
      &-enter-active
      &-leave-active
        transition: opacity .3s
</style>
