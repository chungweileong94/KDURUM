<template>
    <div class="container-fluid">
        <div id="titleBar" class="well well-sm">
            <a id="backButton" href="#" @click="back">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
            <p>
                <b>{{ course.title }}</b>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
      methods: {
        back() {
          this.$store.commit("switchView", this.MainView);
        }
      },
      computed: {
        course() {
          return this.$store.state.currentSelectedCourse;
        },
        MainView() {
          return this.$store.state.MainView;
        }
      }
    };
</script>

<style scoped>
    a#backButton {
      text-decoration: none;
      padding: 0 8px;
    }

    #titleBar span,
    #titleBar p {
      font-size: 20px;
      display: inline;
    }
</style>
