<template>
    <div>
        <app-header :user="user"></app-header>
        <section class="container" style="margin-top: 70px;">
            <component :is="currentView"></component>
        </section>
    </div>
</template>

<script>
    import Header from "./components/Header.vue";

    export default {
      components: {
        "app-header": Header
      },
      methods: {
        init() {
          this.$store.commit("switchView", this.MainView);
          this.$store.dispatch("getUserData").then(() => {
            this.$store.dispatch("getCoursesAndEnrollment");
          });
        }
      },
      created() {
        this.init();
      },
      computed: {
        MainView() {
          return this.$store.state.MainView;
        },
        currentView() {
          return this.$store.state.currentView;
        }
      }
    };
</script>
