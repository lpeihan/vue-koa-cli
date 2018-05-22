<template>
  <div id="app">
    <navigation />
    <messages />
    <transition name="fade" mode="out-in">
      <router-view class="container"></router-view>
    </transition>
  </div>
</template>

<script>
import Navigation from './components/navigation';
import Messages from './components/messages';

export default {
  components: {
    Navigation,
    Messages
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
