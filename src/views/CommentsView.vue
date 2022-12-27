<template>
  <div class="comments">
    <Transition name="slide-fade">
      <NotificationMessage v-if="notification" />
    </Transition>
    <h1>Comments</h1>
    <CommentsTable @change="change" />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import NotificationMessage from "@/components/Notification";
import CommentsTable from "@/components/CommentsTable";
import constants from "@/common/constants";

export default {
  name: "CommentsView",
  components: { CommentsTable, NotificationMessage },
  data() {
    return {
      selectedPost: constants.POST_ALL,
    };
  },
  computed: {
    ...mapState("notification", ["notification"]),
    ...mapGetters(["allPosts"]),
    queryPostId() {
      return this.$route.query.postId;
    },
    isPostIdFetch() {
      return this.queryPostId && this.queryPostId !== this.$constants.POST_ALL;
    },
  },
  async created() {
    await this.fetchUserPosts();
    this.fetchUpdatedComments();

    if (this.isPostIdFetch) {
      const post = this.findCurrentPost();
      this.setSelectedPost(post);
    }
  },
  methods: {
    ...mapActions([
      "fetchUserComments",
      "fetchUserPosts",
      "fetchUserCommentsById",
      "setSelectedPost",
    ]),
    findCurrentPost() {
      return this.allPosts.find((post) => post.id === Number(this.queryPostId));
    },
    change(id) {
      this.setQuery(id);
      this.fetchUpdatedComments();
    },
    setQuery(postId) {
      this.$router.push({
        query: { postId },
      });
    },
    fetchUpdatedComments() {
      if (this.isPostIdFetch) {
        this.fetchUserCommentsById(this.queryPostId);
        return;
      }

      this.fetchUserComments();
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(50px);
  opacity: 0;
}
</style>
