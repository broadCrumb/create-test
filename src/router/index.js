import Vue from "vue";
import VueRouter from "vue-router";
import CommentsView from "@/views/CommentsView";
import constants from "@/common/constants";

Vue.use(VueRouter);

const routes = [
  {
    path: "/comments",
    name: "comments",
    component: CommentsView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.path !== constants.COMMENTS_PAGE_URL) {
    next({ name: "comments" });
    return;
  }

  next();
});

export default router;
