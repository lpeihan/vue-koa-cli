<template>
  <div class="hello">
    {{users}}
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
