<template>
<div class="row">
  <div class="col-md-8">
    <div class="card">
      <div class="card-body">
        <div v-if="!loading">
          <h2>{{ bookable.title }}</h2>
          <hr>
          <article>{{ bookable.description }}</article>
        </div>
        <div v-else>
          Loading...
        </div>
      </div>
    </div>

    <ReviewList :bookableId="this.$route.params.id"></ReviewList>

  </div>
  <div class="col-md-4">
    <Availability class="mb-4" :bookableId="Number(this.$route.params.id)"
      @availability="checkPrice($event)">
    </Availability>

    <transition name="fade">
      <div class="d-grid" v-if="price">
          <PriceBreakdown :price="price" class="mb-4"></PriceBreakdown>
          <button class="btn btn-outline-secondary"
          :disabled="inBasketAlready"
          @click="addToBasket">Book now</button>
      </div>
    </transition>

    <transition name="fade">
      <div class="d-grid mt-1" v-if="inBasketAlready">
          <button class="btn btn-outline-secondary"
          @click="removeFromBasket">Remove from basket</button>
      </div>
    </transition>

    <div v-if="inBasketAlready" class="mt-4 text-muted warning">
      Seems like you've added this object to basket already.
      If you want to change dates, remove from the basket first.
    </div>

  </div>
</div>
</template>

<script>
import Availability from "./Availability.vue";
import ReviewList from "./ReviewList.vue";
import PriceBreakdown from "./PriceBreakdown.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      bookable: null,
      loading: false,
      price: null
    }
  },
  created() {
    this.loading = true;
    axios.get(`/api/bookables/${this.$route.params.id}`).then(response => {
      this.bookable = response.data.data;
      this.loading = false;
      });
  },
  computed: {
  ...mapState({
      lastSearch: "lastSearch",
    }),
    inBasketAlready() {
      if(null === this.bookable) {
        return false;
      }

      return this.$store.getters.inBasketAlready(this.bookable.id);
    }
  },
  methods: {
    async checkPrice(hasAvailability) {
      if(!hasAvailability) {
        this.price = null;
        return;
      }

      try {
        this.price = (await axios.get(
          `/api/bookables/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`
          )).data.data;
      } catch(err) {
        this.price = null;
      }

    },
    addToBasket() {
      this.$store.commit('addToBasket', {
        bookable: this.bookable,
        price: this.price,
        dates: this.lastSearch
      })
    },
    removeFromBasket() {
      this.$store.commit("removeFromBasket", this.bookable.id);
    }
  },
  components: {
    Availability,
    ReviewList,
    PriceBreakdown
  }
}
</script>

<style scoped>
.warning {
  font-size: 0.7rem;
}
</style>
