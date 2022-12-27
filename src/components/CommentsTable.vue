<template>
  <div class="comments-table">
    <v-data-table
      :headers="headers"
      :items="comments"
      :items-per-page="20"
      :loading="isLoadingComments"
      item-key="custom-class"
      :disable-sort="true"
    >
      <template #top>
        <PostsSelect @change="change" />
      </template>
      <template v-slot:[`item.email`]="{ item }">
        {{ item.email }}
        <div class="mt-2">
          <v-btn @click="copyToClipBoard(item.email)" depressed>
            Copy email
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PostsSelect from "@/components/PostsSelect";

export default {
  name: "CommentsTable",
  components: { PostsSelect },
  data() {
    return {
      headers: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "User Id",
          value: "id",
        },
        {
          text: "Post Id",
          value: "postId",
        },
        { text: "Email", value: "email" },
        { text: "Description", value: "body" },
      ],
      prevCopyEmail: null,
    };
  },
  computed: {
    ...mapState(["comments", "isLoadingComments"]),
  },
  methods: {
    ...mapActions("notification", ["createNotification"]),
    copyToClipBoard(email) {
      if (this.prevCopyEmail === email) return;

      const text = `${email} copied successfully`;

      navigator.clipboard.writeText(email);
      this.createNotification({
        text: text,
        type: "success",
        duration: this.$constants.NOTIFY_DURATION,
      });

      this.prevCopyEmail = email;
    },
    change(id) {
      this.$emit("change", id);
    },
  },
};
</script>

<style scoped>
.comments-table::v-deep .v-data-table tr th {
  min-width: 80px;
}

.comments-table::v-deep .v-data-table tr td {
  padding: 15px 10px;
}
</style>
