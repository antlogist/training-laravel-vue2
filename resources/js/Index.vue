<template>
  <div>
    <nav class="navbar bg-white border-bottom navbar-light">
      <router-link class="btn nav-button" to="/">Home</router-link>
      <router-link  class="btn nav-button" to="/contact">Contact</router-link>

      <router-link class="btn nav-button" :to="{name: 'home'}">Home</router-link>
      <router-link class="btn nav-button" :to="{name: 'contact'}">Contact</router-link>

      <router-link class="btn nav-button" v-bind:to="{name: 'home'}">Home</router-link>
      <router-link class="btn nav-button" v-bind:to="{name: 'example'}">Example</router-link>
    </nav>

    <div class="container mt-4 mb-4 pr-4 pl-4">
      <router-view></router-view>
    </div>

  </div>
</template>
