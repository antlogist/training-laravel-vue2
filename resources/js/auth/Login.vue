<template>
  <div>
    <div class="w-50 m-auto">
      <div class="card card-body">
        <form>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              class="form-control"
              v-model="email"
              :class="[{'is-invalid': errorFor('email')}]">
              <ValidationErrors :errors="errorFor('email')"></ValidationErrors>
          </div>

          <div class="form-group mt-3">
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              class="form-control"
              v-model="password"
              :class="[{'is-invalid': errorFor('password')}]">
              <ValidationErrors :errors="errorFor('password')"></ValidationErrors>
          </div>

          <button @click.prevent="login()" :disabled="loading" class="btn btn-primary w-100 mt-3" type="submit">Log-in</button>

          <hr>

          <div>
            No account yet?
            <router-link :to="{name: 'register'}">Register</router-link>
          </div>
          <div>
            Forgotten password?
            <router-link :to="{name: 'home'}">Reset Password</router-link>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import validationErrors from '../shared/mixins/validationErrors'
import { logIn } from "../shared/utils/auth";
export default {
  mixins: [validationErrors],
  data() {
    return {
      email: null,
      password: null,
      loading: false
    }
  },
  methods: {
    async login() {
      this.loading = true;
      this.errors = null;

      try {
        await axios.get('/sanctum/csrf-cookie');
        await axios.post('/login', {
            email: this.email,
            password: this.password
        });

        logIn();
        this.$store.dispatch('loadUser');
        this.$router.push({ name: 'home' });

      } catch(error) {
        console.log(error);
        this.errors = error.response &&
        error.response.data.errors;
      }

      this.loading = false;
    }
  }
}
</script>
