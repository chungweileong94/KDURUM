<template>
    <div>
        <app-header :user="user"></app-header>
        <section class="container" style="margin-top: 70px;">
            <!-- <keep-alive>
                <transition name="fade"> -->
            <component :is="currentView"></component>
            <!-- </transition>
            </keep-alive> -->
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

<style scoped>
    /* .fade-enter-active {
          transition: all 0.5s ease;
        } */
    /* .fade-leave-active {
              transition: all 0.2s ease;
            } */
    /* .fade-enter,
        .fade-leave-to {
          opacity: 0;
        } */
</style>

