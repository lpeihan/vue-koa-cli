<template>
  <div class="row">
    <div class="col-sm-3"></div>
    <div class="col-sm-6">
      <form @submit.prevent="signup">
        <h1>Join our community!</h1>

        <div class="form-group">
          <label class="control-label">Username</label>
          <input
            v-model="model.username"
            type="text"
            name="username"
            class="form-control"
            :class="{ 'is-invalid': errors.username }"
          />
          <span class='form-text text-muted' v-if="errors.username">{{errors.username}}</span>
        </div>

        <div class="form-group">
          <label class="control-label">Email</label>
          <input
            v-model="model.email"
            type="email"
            name="email"
            class="form-control"
            :class="{ 'is-invalid': errors.email }"
          />
          <span class='form-text text-muted' v-if="errors.email">{{errors.email}}</span>
        </div>

        <div class="form-group">
          <label class="control-label">Password</label>
          <input
            v-model="model.password"
            type="password"
            name="password"
            class="form-control"
            :class="{ 'is-invalid': errors.password }"
          />
          <span class='form-text text-muted' v-if="errors.password">{{errors.password}}</span>
        </div>

        <div class="form-group">
          <label class="control-label">Password Confirmation</label>
          <input
            v-model="model.passwordConfirmation"
            type="password"
            name="passwordConfirmation"
            class="form-control"
            :class="{ 'is-invalid': errors.passwordConfirmation }"
          />
          <span class='form-text text-muted' v-if="errors.passwordConfirmation">{{errors.passwordConfirmation}}</span>
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    </div>
    <div class="col-sm-3"></div>
  </div>
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
      },
      errors: {}
    };
  },
  methods: {
    async signup() {
      try {
        const response = await this.$http.post('users/signup', this.model);
        console.dir(response);
      } catch (err) {
        this.errors = err.response.data;
      }
    }
  }
};
</script>
