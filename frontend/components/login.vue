<template>
  <form @submit.prevent="login">
    <h1>Login!</h1>

    <div class="form-group">
      <label class="control-label">Username</label>
      <input
        v-model="model.username"
        type="text"
        name="username"
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label class="control-label">Password</label>
      <input
        v-model="model.password"
        type="password"
        name="password"
        class="form-control"
      />
    </div>

    <div class="form-group">
      <button class="btn btn-primary btn-lg">
        Login
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    login() {
      this.$http.post('users/login', this.model);
    }
  }
};
</script>
