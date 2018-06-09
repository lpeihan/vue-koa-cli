<template>
  <div class="row">
    <div class="col-sm-3"></div>
    <div class="col-sm-6">
      <form @submit.prevent="login" >
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
        password: ''
      }
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', this.model);

        this.$store.dispatch('addMessage', {
          text: 'login success'
        });

        this.$router.push('/');
      } catch (e) {
        this.$store.dispatch('addMessage', {
          type: 'danger',
          text: 'login failed'
        });
      }
    }
  }
};
</script>
