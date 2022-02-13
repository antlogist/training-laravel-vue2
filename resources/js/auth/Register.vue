<template>
  <div>
    <div class="w-50 m-auto">
      <div class="card card-body">
        <form>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              class="form-control"
              v-model="user.name"
              :class="[{'is-invalid': errorFor('name')}]">
              <ValidationErrors :errors="errorFor('name')"></ValidationErrors>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              class="form-control"
              v-model="user.email"
              :class="[{'is-invalid': errorFor('email')}]">
              <ValidationErrors :errors="errorFor('email')"></ValidationErrors>
          </div>

          <div class="form-group mt-3">
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              class="form-control"
              v-model="user.password"
              :class="[{'is-invalid': errorFor('password')}]">
              <ValidationErrors :errors="errorFor('password')"></ValidationErrors>
          </div>

          <div class="form-group mt-3">
            <label for="password_confirmation">Re-type Password</label>
            <input
              name="password_confirmation"
              type="password"
              placeholder="Confirm your password"
              class="form-control"
              v-model="user.password_confirmation"
              :class="[{'is-invalid': errorFor('password_confirmation')}]">
              <ValidationErrors :errors="errorFor('password_confirmation')"></ValidationErrors>
          </div>

          <button @click.prevent="register" :disabled="loading" class="btn btn-primary w-100 mt-3" type="submit">Register</button>

          <hr>

          <div>
            Already have an account?
            <router-link :to="{name: 'login'}">Log-in</router-link>
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
      user: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
      },
      loading: false
    }
  },
  methods: {
    async register() {
      this.loading = true;
      this.errors = null;

      try {
        const response = await axios.post('/register', this.user);

        if(201 === response.status) {
          logIn();
          this.$store.dispatch('loadUser');
          this.$router.push({ name: 'home' });
        }

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
