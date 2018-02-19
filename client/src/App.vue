<template>
  <div>
    <app-header :user="user"></app-header>
    <section class="container" style="margin-top: 70px;">
        <app-content></app-content>
    </section>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Content from "./components/Content.vue";

export default {
  components: {
    "app-header": Header,
    "app-content": Content
  },
  methods: {
    init() {
      this.$store.dispatch("getUserData").then(() => {
        this.$store.dispatch("getCoursesAndEnrollment");
      });
    }
  },
  created() {
    this.init();
  }
};
</script>
