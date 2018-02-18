<template>
  <div>
    <app-header :user="user"></app-header>
    <section class="container" style="margin-top: 70px;">
        <app-content :user="user"></app-content>
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
        role: "",
        roleIndex: -1,
        enrollment: []
      }
    };
  },
  created() {
    this.$http.get("/auth/user").then(data => {
      this.user.name = data.body.name;
      this.user.thumnail = data.body.thumnail;
      this.user.roleIndex = data.body.role;
      this.user.enrollment = data.body.enrollment;
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
