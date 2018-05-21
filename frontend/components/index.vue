<template>
  <div class="jumbotron">
    hello
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  },
  async mounted() {
    this.users = await this.$http.get('/users');
  }
};
</script>

<style lang="stylus">
  .hello
    color: red
</style>
