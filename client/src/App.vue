<template>
  <div>
    <app-header v-bind:user="user"></app-header>
    <section class="container">
        <app-content v-bind:user="user"></app-content>
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
  data() {
    return {
      user: {
        name: "",
        thumnail: "",
        role: -1
      }
    };
  },
  created() {
    this.$http.get("/auth/user").then(data => {
      this.user.name = data.body.name;
      this.user.thumnail = data.body.thumnail;
      switch (data.body.role) {
        case 0:
          this.user.role = "Administrator";
          break;

        case 1:
          this.user.role = "Lecture";
          break;

        case 2:
          this.user.role = "Student";
          break;
      }
    });
  }
};
</script>
