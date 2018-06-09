<template>
  <div class="container">
    <div class="alert" v-for="message in messages" :key="message.id" :class="{
      'alert-success': message.type === 'success',
      'alert-danger': message.type === 'danger' }"
    >
      <button @click="close(message.id)" class="close"><span>&times;</span></button>
      {{message.text}}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      messages: state => state.messages.messages
    })
  },
  methods: {
    close(id) {
      this.$store.dispatch('removeMessage', id);
    }
  }
};
</script>
