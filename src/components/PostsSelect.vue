<template>
  <div>
    <v-select
      v-model="selectedPost"
      :items="allPosts"
      @change="change"
      label="filter by post"
      item-text="title"
      :loading="isLoadingPosts"
      item-value="id"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "PostsSelect",
  computed: {
    ...mapState(["isLoadingPosts", "selectedPost"]),
    ...mapGetters(["allPosts"]),
  },
  methods: {
    change(id) {
      this.$emit("change", id);
    },
  },
};
</script>

<style scoped></style>
