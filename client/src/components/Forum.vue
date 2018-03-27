<template>
    <div>
        <div id="title-bar">
            <a id="back-button" href="#" @click="back">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
            <div class="created-time-wrapper animation-intro">
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

        <div class="content animation-intro">
            <!-- forum header -->
            <div id="forum-header">
                <h4>
                    <b>Title: </b>{{ forum.title }}
                </h4>
                <p class="lead" v-html="preProcessText(forum.desc)"></p>
            </div>

            <div id="forum-comment">
                <h4 class="text-center">
                    <span class="glyphicon glyphicon-comment"></span>&nbsp;&nbsp;Comments
                </h4>
                <hr>

                <div class="well">
                    <p>Here is some comments......</p>

                    <p class="text-right">created 1 minute ago</p>
                </div>
            </div>
        </div>

        <button id="comment-button" class="btn btn-warning" data-toggle="modal">Add Comment</button>
    </div>
</template>

<script>
    const moment = require("moment");

    export default {
      methods: {
        moment(date) {
          return moment(date).fromNow();
        },
        preProcessText(text) {
          const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
          return text.replace(exp, "<a target='_blank' href='$1'>$1</a>").replace(/\n\r?/g, "<br />");
        },
        back() {
          this.$store.commit("changeCurrentSelectedForum", {}); //clear selection
          this.$store.commit("switchView", {
            view: this.CourseView,
            needRefresh: false
          });
        }
      },
      computed: {
        forum() {
          return this.$store.state.currentSelectedForum;
        },
        CourseView() {
          return this.$store.state.Course;
        }
      }
    };
</script>

<style scoped>
    @keyframes intro {
      from {
        opacity: 0;
        zoom: 0;
      }
      to {
        opacity: 1;
        zoom: 1;
      }
    }

    .animation-intro {
      animation-name: intro;
      animation-duration: 0.5s;
    }

    a#back-button {
      text-decoration: none;
      padding: 0 8px;
    }

    #title-bar {
      padding-top: 16px;
      background-color: white;
      /* position: -webkit-sticky;
                                      position: sticky; */
      position: fixed;
      top: 64px;
      right: 10%;
      left: 10%;
    }

    @media screen and (max-width: 1500px) {
      #title-bar {
        top: 64px;
        right: 2%;
        left: 2%;
      }
    }

    #title-bar span,
    #title-bar p {
      font-size: 20px;
      display: inline;
    }

    #title-bar hr {
      border-top-width: 2px;
      margin-bottom: 0;
    }

    #title-bar .owner-image {
      max-width: 30px;
    }

    .content {
      margin-top: 80px;
    }

    .created-time-wrapper {
      float: right;
    }

    .created-time-wrapper p {
      font-size: 13px !important;
    }

    .created-time-wrapper::after {
      content: "";
      display: block;
      clear: both;
    }

    #forum-header {
      margin-bottom: 50px;
    }

    #forum-header p {
      word-wrap: break-word;
      font-size: 20px;
    }

    #forum-comment hr {
      border-top-width: 2px;
      width: 30%;
    }

    #comment-button {
      position: fixed;
      right: 30px;
      bottom: 30px;
    }
</style>
