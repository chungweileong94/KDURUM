<template>
    <div class="container-fluid">
        <div id="title-bar">
            <a id="back-button" href="#" @click="back">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
            <div class="created-time">
                <p>
                    created {{ moment(forum.createDateTime) }} &nbsp;
                    <b>
                        <i>by</i>
                    </b>
                    &nbsp;
                    <img class="owner-image img-circle" :src="forum.owner.thumnail" v-if="forum.owner!=null">
                    <b>{{ forum.owner==null ? "Unknown" : forum.owner.name }}</b>
                </p>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
const moment = require("moment");

export default {
  methods: {
    moment(date) {
      return moment(date).fromNow();
    },
    back() {
      this.$store.commit("changeCurrentSelectedForum", {}); //clear selection
      this.$store.commit("switchView", this.CourseView);
    }
  },
  computed: {
    forum() {
      return this.$store.state.currentSelectedForum;
    },
    CourseView() {
      return this.$store.state.Course;
    }
  },
  created() {
    console.log(this.forum.owner);
  }
};
</script>

<style scoped>
a#back-button {
  text-decoration: none;
  padding: 0 8px;
}

#title-bar {
  padding-top: 16px;
  background-color: white;
  position: -webkit-sticky;
  position: sticky;
  top: 64px;
}

#title-bar span,
#title-bar p {
  font-size: 20px;
  display: inline;
}

#title-bar hr {
  border-top-width: 2px;
}

#title-bar .owner-image {
  max-width: 30px;
}

.created-time {
  float: right;
}

.created-time p {
  font-size: 13px !important;
}

.created-time::after {
  content: "";
  display: block;
  clear: both;
}
</style>
