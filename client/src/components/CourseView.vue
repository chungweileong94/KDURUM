<template>
    <div class="container-fluid">
        <div id="title-bar" class="well well-sm">
            <a id="back-button" href="#" @click="back">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
            <p>
                <b>{{ course.title }}</b>
            </p>
        </div>

        <button id="create-button" class="btn btn-primary">Create Post</button>
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
    a#back-button {
      text-decoration: none;
      padding: 0 8px;
    }

    #title-bar span,
    #title-bar p {
      font-size: 20px;
      display: inline;
    }

    #create-button {
      position: fixed;
      right: 30px;
      bottom: 30px;
    }
</style>
