<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

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
