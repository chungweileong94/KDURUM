<template>
    <div>
        <app-header :user="user"></app-header>
        <!-- show the content only when user data is loaded -->
        <section class="container" style="margin-top: 70px;" v-if="user._id.trim().length!=0">
            <!-- <keep-alive>
                <transition name="fade"> -->
            <component :is="currentView"></component>
            <!-- </transition>
            </keep-alive> -->
        </section>

        <app-loading v-if="user._id.trim().length==0" style="height:100%; width:100%; z-index:100;"></app-loading>
    </div>
</template>

<script>
    import Header from "./components/Header.vue";
    import Loading from "./components/Loading.vue";

    export default {
      components: {
        "app-header": Header,
        "app-loading": Loading
      },
      methods: {
        init() {
          this.$store.commit("switchView", {
            view: this.MainView,
            needRefresh: true
          });
          this.$store.dispatch("getUserData").then(() => {
            //if the user is lecture
            if (this.$store.state.user.roleIndex == 1) {
              this.$store.dispatch("getCoursesForLecture");
            } else {
              //if the user is admin
              if (this.$store.state.user.roleIndex == 0) {
                this.$store.dispatch("getAllLecturers");
              }
              this.$store.dispatch("getCourses");
            }
          });
        }
      },
      created() {
        this.init();
      },
      computed: {
        user() {
          return this.$store.state.user;
        },
        MainView() {
          return this.$store.state.MainView;
        },
        currentView() {
          return this.$store.state.currentView;
        }
      }
    };
</script>

<style>
    .navbar-toggle {
      border: none;
    }
</style>


