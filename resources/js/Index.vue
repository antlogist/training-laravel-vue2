<template>
  <div>
    <nav class="navbar bg-white border-bottom">
      <router-link class="navbar-brand mr-auto" :to="{name: 'home'}">Home</router-link>

      <router-link class="btn nav-butto" :to="{name: 'home'}">
        Basket
        <transition name="fade">
          <span
            v-if="itemsInBasket"
            class="badge bg-secondary">{{ itemsInBasket }}
          </span>
        </transition>

      </router-link>
    </nav>

    <div class="container mt-4 mb-4 pr-4 pl-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['itemsInBasket'])
  }
}
</script>
