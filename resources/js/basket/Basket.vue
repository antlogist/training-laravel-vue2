<template>
  <div>
    <Success v-if="success">
      Congratulations on your purchase!
    </Success>
    <div v-else class="row">
      <div class="col-md-8" v-if="itemsInBasket">
        <form class="row g-3">
          <div class="col-md-6">
            <label for="firstName" class="form-label">First Name</label>
            <input v-model="customer.first_names" type="text" class="form-control" id="firstName" name="firstName"
              :class="[{'is-invalid': errorFor('customer.first_names')}]">
            <ValidationErrors :errors="errorFor('customer.first_names')"></ValidationErrors>
          </div>
          <div class="col-md-6">
            <label for="lastName" class="form-label">Last name</label>
            <input v-model="customer.last_name" type="text" class="form-control" id="lastName" name="lastName"
              :class="[{'is-invalid': errorFor('customer.last_name')}]">
            <ValidationErrors :errors="errorFor('customer.last_name')"></ValidationErrors>
          </div>
          <div class="col-12">
            <label for="email" class="form-label">Email</label>
            <input v-model="customer.email" type="email" class="form-control" id="email" name="email"
              :class="[{'is-invalid': errorFor('customer.email')}]">
            <ValidationErrors :errors="errorFor('customer.email')"></ValidationErrors>
          </div>
          <div class="col-md-6">
            <label for="street" class="form-label">Street</label>
            <input v-model="customer.street" type="text" class="form-control" id="street" name="street"
              :class="[{'is-invalid': errorFor('customer.street')}]">
            <ValidationErrors :errors="errorFor('customer.street')"></ValidationErrors>
          </div>
          <div class="col-md-6">
            <label for="city" class="form-label">City</label>
            <input v-model="customer.city" type="text" class="form-control" id="city" name="city"
              :class="[{'is-invalid': errorFor('customer.city')}]">
            <ValidationErrors :errors="errorFor('customer.city')"></ValidationErrors>
          </div>
          <div class="col-md-6">
            <label for="country" class="form-label">Country</label>
            <input v-model="customer.country" type="text" class="form-control" id="country" name="country"
              :class="[{'is-invalid': errorFor('customer.country')}]">
            <ValidationErrors :errors="errorFor('customer.country')"></ValidationErrors>
          </div>
          <div class="col-md-4 select-col">
            <label for="inputState" class="form-label">State</label>
            <select required v-model="customer.state" id="inputState" class="form-select"
              :class="[{'is-invalid': errorFor('customer.state')}]">
              <option selected>NY</option>
              <option>...</option>
            </select>
            <ValidationErrors :errors="errorFor('customer.state')"></ValidationErrors>
          </div>
          <div class="col-md-2">
            <label for="zip" class="form-label">Zip</label>
            <input v-model="customer.zip" type="text" class="form-control" id="zip" name="zip"
              :class="[{'is-invalid': errorFor('customer.zip')}]">
            <ValidationErrors :errors="errorFor('customer.zip')"></ValidationErrors>
          </div>
          <hr class="my-4">
          <div class="col-12">
            <button type="submit" class="btn btn-primary w-100" @click.prevent="book" :disabled="loading">Book now</button>
          </div>
        </form>
      </div>

      <div v-else class="col-md-8">
        <div class="p-5 mb-4 bg-light rounded-3">
          <div class="container-fluid text-center">
            <h1>Empty</h1>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="d-flex justify-content-between">
          <h6 class="text-uppercase text-secondary fw-bolder">
            Your Cart
          </h6>
          <h6 class="badge bg-secondary text-uppercase">
            <span v-if="itemsInBasket">Items {{itemsInBasket}}</span>
            <span v-else>Empty</span>
          </h6>
        </div>

        <transition-group name="fade">
          <div v-for="item in basket" :key="item.bookable.id">
            <div class="pt-2 pb-2 border-top d-flex justify-content-between">
              <span>
                <router-link
                  :to="{name: 'bookable', params: { id: item.bookable.id}}">
                  {{ item.bookable.title }}
                </router-link>
              </span>

              <span class="fw-bold">
                {{ item.price.total }}
              </span>
            </div>

            <div class="pt-2 pb-2 d-flex justify-content-between">
              <span>
                From {{ item.dates.from }}
              </span>

              <span>
                To {{ item.dates.to}}
              </span>
            </div>


            <div class="pt-2 pb-2 text-end">
              <button
                @click="$store.dispatch('removeFromBasket', item.bookable.id)"
                class="btn btn-sm btn-outline-secondary">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </transition-group>


      </div>

    </div>
  </div>
</template>

<script>

import {mapGetters, mapState} from 'vuex';
import validationErrors from './../shared/mixins/validationErrors';

export default {
  mixins: [validationErrors],
  data() {
    return {
      loading: false,
      bookingAttempted: false,
      customer: {
        first_names: null,
        last_name: null,
        email: null,
        street: null,
        city: null,
        country: null,
        state: null,
        zip: null
      }
    }
  },
  computed: {
    ...mapGetters(['itemsInBasket']),
    ...mapState({
      basket: state => state.basket.items,
    }),
    success() {
      return !this.loading && 0 === this.itemsInBasket
        && this.bookingAttempted;
    }
  },
  methods: {
    async book() {
      this.loading = true;
      this.bookingAttempted = false;
      this.errors = null;
      try {
        await axios.post('/api/checkout', {
          bookings: this.basket.map((basketItem)=>({
            bookable_id: basketItem.bookable.id,
            from: basketItem.dates.from,
            to: basketItem.dates.to,
          })),
          customer: this.customer
        });
        this.$store.dispatch('clearBasket');
      } catch(error) {
        this.errors = error.response && error.response.data.errors;
      }

      this.loading = false;
      this.bookingAttempted = true;
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: #000;
  text-decoration: none;
}
</style>
