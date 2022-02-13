<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand mr-auto" :to="{name: 'home'}">Home</router-link>

        <div>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'basket'}">
                Basket
                <transition name="fade">
                  <span
                    v-if="itemsInBasket"
                    class="badge bg-secondary">{{ itemsInBasket }}
                  </span>
                </transition>
              </router-link>
            </li>

            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" :to="{name: 'register'}">Register</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" :to="{name: 'login'}">Sign-in</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link" href="#" @click.prevent="logout()">Logout</a>
            </li>
          </ul>
        </div>
      </div>

    </nav>

    <div class="container mt-4 mb-4 pr-4 pl-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {

    }
  },
  methods: {
    async logout() {
      try {
        axios.post('/logout');
        this.$store.dispatch('logout');
      } catch(error) {
        this.$store.dispatch('logout');
      }
    }
  },
  computed: {
    ...mapState( ['isLoggedIn'] ),
    ...mapGetters(['itemsInBasket'])
  }
}
</script>

<style scoped>
.navbar-nav {
  flex-direction: row;

}
.navbar-nav li.nav-item a {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}
</style>
