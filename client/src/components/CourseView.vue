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

        <div v-if="forums.length!=0">
            <div v-for="f in forums" :key="f._id">
                <div class="forum-item" @click="forumItem_Click(f)">
                    <h4>{{ f.title }}</h4>
                    <p class="lead">{{ f.desc }}</p>

                    <p class="text-right">
                        created {{ moment(f.createDateTime) }} &nbsp;
                        <b>
                            <i>by</i>
                        </b>
                        &nbsp;
                        <img class="owner-image img-circle" :src="f.owner.thumnail">
                        <b>{{ f.owner.name }}</b>
                    </p>
                </div>
                <hr>
            </div>
        </div>

        <!-- empty message -->
        <div class="text-center" style="padding-top: 150px;" v-else>
            <h3>Empty</h3>
            <p class="lead">There is no forum posted yet</p>
        </div>

        <button id="create-button" class="btn btn-primary" data-toggle="modal" data-target="#add-forum-modal">Create Post</button>

        <!-- add forum dialog -->
        <div id="add-forum-modal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">
                            <span class="glyphicon glyphicon-th-list"></span>&nbsp;&nbsp;Add Forum
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-horizontal">
                            <!-- title -->
                            <div class="form-group">
                                <label class="col-sm-2 control-label" for="forum-title-input">
                                    <b>Title</b>
                                </label>
                                <div class="col-sm-10">
                                    <input class="form-control" id="forum-title-input" type="text" v-model="forumTitleInput">
                                </div>
                            </div>

                            <!-- desc -->
                            <div class="form-group">
                                <label class="col-sm-2 control-label" for="forum-desc-input">
                                    <b>Description</b>
                                </label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" id="forum-desc-input" rows="3" v-model="forumDescInput"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
                        <button class="btn btn-success" type="button" data-dismiss="modal" :disabled="forumTitleInput.trim().length==0 || forumDescInput.trim().length==0" @click="addForum_Click">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let moment = require("moment");

    export default {
      data() {
        return {
          forums: [],
          forumTitleInput: "",
          forumDescInput: ""
        };
      },
      methods: {
        moment(date) {
          return moment(date).fromNow();
        },
        back() {
          this.$store.commit("changeCurrentSelectedCourse", {}); //clear selection
          this.$store.commit("switchView", this.MainView);
        },
        refreshForums() {
          this.$http
            .get(`/forum/all/${this.course._id}`)
            .then(data => {
              return data.json();
            })
            .then(data => {
              this.forums = data;
            });
        },
        addForum_Click() {
          this.$http
            .post("/forum/add", {
              title: this.forumTitleInput,
              desc: this.forumDescInput,
              courseId: this.course._id
            })
            .then(data => {
              return data.status;
            })
            .then(status => {
              if (status == 200) {
                this.refreshForums();
                alert("Forum added");
              } else {
                this.refreshForums();
                alert("Error");
              }
            });
        },
        forumItem_Click(forum) {
          this.$store.commit("changeCurrentSelectedForum", forum);
          this.$store.commit("switchView", this.ForumView);
        }
      },
      computed: {
        course() {
          return this.$store.state.currentSelectedCourse;
        },
        MainView() {
          return this.$store.state.MainView;
        },
        ForumView() {
          return this.$store.state.ForumView;
        }
      },
      created() {
        this.refreshForums();
      }
    };
</script>

<style scoped>
    a#back-button {
      text-decoration: none;
      padding: 0 8px;
    }

    #title-bar {
      position: -webkit-sticky;
      position: sticky;
      top: 64px;
    }

    #title-bar span,
    #title-bar p {
      font-size: 20px;
      display: inline;
    }

    .forum-item {
      margin: 0;
      padding: 4px 12px;
      border-radius: 5px;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.2s;
      -moz-transition: all 0.2s;
    }

    .forum-item:hover {
      background: lightgray;
    }

    .forum-item h4,
    .forum-item p {
      text-overflow: ellipsis;
      -ms-text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      overflow: hidden;
    }

    .forum-item .owner-image {
      max-width: 30px;
    }

    #create-button {
      position: fixed;
      right: 30px;
      bottom: 30px;
    }
</style>
