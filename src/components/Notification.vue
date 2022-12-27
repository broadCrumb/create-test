<template>
  <div class="notification">
    <v-alert @input="deleteNotification" dismissible :type="notification.type">
      {{ notification.text }}
    </v-alert>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "NotificationMessage",
  data() {
    return {
      timeoutId: null,
    };
  },
  computed: {
    ...mapState("notification", ["notification"]),
  },
  beforeDestroy() {
    clearTimeout(this.timeoutId);
  },
  mounted() {
    this.timeoutId = setTimeout(() => {
      this.deleteNotification();
    }, this.notification.timeout);
  },
  methods: {
    ...mapActions("notification", ["deleteNotification"]),
  },
};
</script>
<style lang="scss" scoped>
.notification {
  position: fixed;
  bottom: 10px;
  right: 15px;
}

.notification::v-deep .v-alert {
  position: relative;
  width: 330px;
  padding: 15px 20px;
  padding-right: 35px;
  margin-bottom: 0;
}

.notification::v-deep .v-alert__wrapper {
  display: grid;
  grid-template-columns: 30px 1fr;
}

.notification::v-deep .v-alert__dismissible {
  position: absolute;
  top: 22px;
  right: 14px;
}
</style>
