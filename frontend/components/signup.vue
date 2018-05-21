<template>
  <form @submit.prevent="signup">
    <h1>Join our community!</h1>

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
      <label class="control-label">Email</label>
      <input
        v-model="model.email"
        type="email"
        name="email"
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
      <label class="control-label">Password Confirmation</label>
      <input
        v-model="model.passwordConfirmation"
        type="password"
        name="passwordConfirmation"
        class="form-control"
      />
    </div>

    <div class="form-group">
      <button class="btn btn-primary btn-lg">
        Sign up
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
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    };
  },
  methods: {
    signup() {
      this.$http.post('users/signup', this.model);
    }
  }
};
</script>
