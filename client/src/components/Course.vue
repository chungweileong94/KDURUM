<template>
    <div>
        <div id="title-bar">
            <a id="back-button" href="#" @click="back">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
            <p class="animation-intro">
                <b>{{ course.title }}</b>
            </p>
            <div class="lecturer-wrapper animation-intro"
                 v-if="course.lecturer!=null && course.lecturer._id!==user._id && course.lecturer.role===1">
                <p>
                    lecture&nbsp;
                    <b>
                        <i>by</i>
                    </b>
                    &nbsp;
                    <img class="lecturer-image img-circle" :src="course.lecturer.thumnail" v-if="course.lecturer!=null">
                    <b>{{ course.lecturer==null ? "Unknown" : course.lecturer.name }}</b>
                </p>
            </div>
            <hr>
        </div>

        <div class="content">
            <div v-if="forums.length!==0">
                <div v-for="f in forums" :key="f._id">
                    <div class="forum-item animation-intro" @click="forumItem_Click(f)">
                        <h4>{{ f.title }}</h4>
                        <p class="lead">{{ f.isMarkdown?"Click to view...":f.desc }}</p>

                        <p class="text-right">
                            created {{ moment(f.createDateTime) }} &nbsp;
                            <b>
                                <i>by</i>
                            </b>
                            &nbsp;
                            <img class="owner-image img-circle" :src="f.owner.thumnail" v-if="f.owner!=null">
                            <b>{{ f.owner==null ? "Unknown" : f.owner.name }}</b>
                        </p>
                    </div>
                    <hr>
                </div>
            </div>

            <!-- empty message -->
            <div class="text-center animation-intro" style="padding-top: 150px;" v-else>
                <h3>Empty</h3>
                <p class="lead">There is no forum posted yet</p>
            </div>
        </div>

        <button id="create-button" class="btn btn-primary" data-toggle="modal" data-target="#add-forum-modal">Create
            Post
        </button>

        <!-- add forum dialog -->
        <div id="add-forum-modal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">
                            <span class="glyphicon glyphicon-th-list"></span>&nbsp;&nbsp;Add Post
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
                                    <input class="form-control" id="forum-title-input" type="text"
                                           v-model="forumTitleInput">
                                </div>
                            </div>

                            <!-- desc -->
                            <div class="form-group">
                                <label class="col-sm-2 control-label" for="forum-desc-input">
                                    <b>Description</b>
                                </label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" id="forum-desc-input" rows="3"
                                              v-model="forumDescInput"></textarea>
                                </div>
                            </div>

                            <!-- isMarkdown -->
                            <div class="form-group">
                                <div class="col-md-offset-2 col-xs-10">
                                    <input type="checkbox" id="forum-isMarkdown-input" v-model="forumIsMarkdownInput"
                                           style="width: 16px; height: 16px;"><label for="forum-isMarkdown-input">&nbsp;&nbsp;<b>Markdown</b></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
                        <button class="btn btn-success" type="button" data-dismiss="modal"
                                :disabled="forumTitleInput.trim().length===0 || forumDescInput.trim().length===0"
                                @click="addForum_Click">Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const moment = require("moment");

    export default {
        data() {
            return {
                forums: [],
                forumTitleInput: "",
                forumDescInput: "",
                forumIsMarkdownInput: false
            };
        },
        methods: {
            moment(date) {
                return moment(date).fromNow();
            },
            back() {
                this.$store.commit("changeCurrentSelectedCourse", {}); //clear selection
                this.$store.commit("switchView", {
                    view: this.MainView,
                    needRefresh: true
                });
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
                        isMarkdown: this.forumIsMarkdownInput,
                        courseId: this.course._id
                    })
                    .then(data => {
                        return data.status;
                    })
                    .then(status => {
                        if (status === 200) {
                            this.refreshForums();
                            this.$store.commit("showMessage", "Forum added!");
                        } else {
                            this.refreshForums();
                            alert("Error");
                        }
                    });
            },
            forumItem_Click(forum) {
                this.$store.commit("changeCurrentSelectedForum", forum);
                this.$store.commit("saveForumList", this.forums);
                this.$store.commit("switchView", {
                    view: this.ForumView,
                    needRefresh: false
                });
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            course() {
                return this.$store.state.currentSelectedCourse;
            },
            MainView() {
                return this.$store.state.MainView;
            },
            ForumView() {
                return this.$store.state.Forum;
            }
        },
        created() {
            if (this.$store.state.needRefresh) {
                this.refreshForums();
            } else {
                this.forums = this.$store.state.forums;
            }
        }
    };
</script>

<style scoped>
    .animation-intro {
        -webkit-animation-name: intro;
        -moz-animation-name: intro;
        -o-animation-name: intro;
        animation-name: intro;

        -webkit-animation-duration: 0.5s;
        -moz-animation-duration: 0.5s;
        -o-animation-duration: 0.5s;
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
        top: 62px;
        right: 10%;
        left: 10%;
    }

    @media screen and (max-width: 1500px) {
        #title-bar {
            top: 60px;
            right: 2%;
            left: 2%;
        }
    }

    #title-bar span,
    #title-bar p {
        font-size: 20px;
        display: inline;
    }

    #title-bar .lecturer-image {
        max-width: 30px;
    }

    #title-bar hr {
        border-top-width: 2px;
        margin-bottom: 0;
    }

    .lecturer-wrapper {
        float: right;
    }

    .lecturer-wrapper p {
        font-size: 13px !important;
    }

    .lecturer-wrapper::after {
        content: "";
        display: block;
        clear: both;
    }

    .content {
        margin-top: 80px;
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
        -webkit-box-shadow: 0 1px 10px gray;
        -moz-box-shadow: 0 1px 10px gray;
        box-shadow: 0 1px 10px gray;
    }
</style>
