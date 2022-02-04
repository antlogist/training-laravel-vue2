<template>
  <div class="row">

    <div
      :class="[
      { 'col-md-4': loading || !alreadyReviewed },
      { 'd-none': !loading && alreadyReviewed }
    ]">

    <div class="card">
      <div class="card-body">
        <div v-if="loading">Loading...</div>
        <div v-else>
          <p>
            Stayed at <router-link
                      :to="{
                        name: 'bookable',
                        params: { id: booking.bookable.bookable_id }
                      }">{{ booking.bookable.title }}</router-link>
         </p>
         <p>From {{ booking.from }} to {{ booking.to }}</p>
        </div>
      </div>
    </div>

    </div>

    <div
      :class="[
        { 'col-md-8': loading || !alreadyReviewed },
        { 'col-md-12': !loading && alreadyReviewed }
    ]">

      <div v-if="loading">Loading...</div>

      <div v-else>

        <div v-if="alreadyReviewed">

          <h3>You've already left a review for this booking!</h3>

        </div>

        <div v-else>

          <div class="form-group">
            <label class="text-muted">
              Select thhe star rating (1 is worst - 5 is best)
            </label>
            <StarRating
              v-model="review.rating"
              class="fa-3x">
            </StarRating>
          </div>

          <div class="form-group mt-3">
            <label for="content" class="text-muted">Describe your experience with</label>
            <textarea
              name="content"
              cols="30" rows="10"
              class="form-control"
              v-model="review.content">
            </textarea>
          </div>

          <div class="d-grid mt-1">
            <button class="btn btn-primary btn-lg btn-block">Submit</button>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      review: {
        rating: 4,
        content: null
      },
      existingReview: null,
      loading: false,
      booking: null
    }
  },
  created() {
    this.loading = true;
    axios.get(`/api/reviews/${this.$route.params.id}`)
         .then((response) => {
           this.existingReview = response.data.data;
          })
         .catch(err => {
           if(err.response
           && err.response.status
           && 404 === err.response.status) {
          return axios
            .get(`/api/booking-by-review/${this.$route.params.id}`)
            .then((response) => {
              this.booking = response.data.data;
            });
           }
         })
         .then(() => {
           this.loading = false;
         })
  },
  computed: {
    alreadyReviewed() {
      return this.hasReview || !this.booking;
    },
    hasReview() {
      return this.existingReview !== null;
    },
    hasBooking() {
      return this.booking !== null;
    }
  }
}
</script>
