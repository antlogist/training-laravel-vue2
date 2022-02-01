<template>
  <div>

    <div class="form-group">
      <label class="text-muted">Select thhe star rating (1 is worst - 5 is best)</label>
      <StarRating :rating="review.rating" class="fa-3x" @rating:changed="review.rating = $event"></StarRating>
    </div>

    <div class="form-group mt-3">
      <label for="content" class="text-muted">Describe your experience with</label>
      <textarea name="content" cols="30" rows="10" class="form-control"></textarea>
    </div>

    <div class="d-grid mt-1">
      <button class="btn btn-primary btn-lg btn-block">Submit</button>
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
      }
    }
  },
}
</script>
