<template>
    <div>
        <div id="title-bar">
            <a id="back-button" href="#" @click="back(false)">
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
                <p class="lead" v-html="preProcessText(forum.desc)" v-if="!forum.isMarkdown"></p>
                <p class="lead" v-html="compiledMarkdown(forum.desc)" v-else></p>

                <div class="container"
                     v-if="(forum.owner!=null && forum.owner._id===user._id) || user.roleIndex===0 || (course.lecturer!=null && course.lecturer._id===user._id && course.lecturer.role===1)">
                    <div class="row">
                        <div class="btn-group pull-right">
                            <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#edit-forum-modal"
                                    @click="editForum_Click">Edit
                            </button>
                            <button class="btn btn-sm btn-danger" data-toggle="modal" data-target="#delete-forum-modal">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="forum-comments">
                <h4 class="text-center">
                    <span class="glyphicon glyphicon-comment"></span>&nbsp;&nbsp;Comments
                </h4>
                <hr>

                <!-- comments section -->
                <div v-if="comments.length!==0">
                    <div class="animation-intro" v-for="c in comments" :key="c._id">
                        <div class="well">
                            <p>
                                <img class="comment-user-image img-circle" :src="c.user.thumnail" v-if="c.user!=null">
                                <b>{{ c.user==null ? "Unknown" : c.user.name }}</b>
                            </p>
                            <p v-html="preProcessText(c.content)"></p>

                            <div>
                                <button :class="[{likedButton:c.isLiked}, 'like-button']"
                                        @click="likeComment($event, c)">
                                    <span class="glyphicon glyphicon-thumbs-up text-left"></span> {{c.likes.length}}
                                </button>
                                <p style="float:right;">commented {{moment(c.createDateTime)}}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- empty message -->
                <div class="text-center" v-else>
                    <h4 class="lead">- No Comments -</h4>
                </div>
            </div>
        </div>

        <button id="comment-button" class="btn btn-warning" data-toggle="modal" data-target="#add-comment-modal">Add
            Comment
        </button>

        <!-- add comment dialog -->
        <div id="add-comment-modal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">
                            <span class="glyphicon glyphicon-th-list"></span>&nbsp;&nbsp;Add Comment
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-horizontal">
                            <!-- comment -->
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <textarea class="form-control" id="forum-comment-input" rows="3"
                                              v-model="commentInput"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
                        <button class="btn btn-success" type="button" data-dismiss="modal"
                                :disabled="commentInput.trim().length===0" @click="addComment_Click">Add
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- edit forum dialog -->
        <div id="edit-forum-modal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">
                            <span class="glyphicon glyphicon-th-list"></span>&nbsp;&nbsp;Edit Post
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
                                @click="editForumDialog_Click">Save
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- delete modal -->
        <div id="delete-forum-modal" class="modal fade"
             v-if="(forum.owner!=null && forum.owner._id===user._id) || user.roleIndex===0">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">
                            <span class="glyphicon glyphicon-trash"></span>&nbsp;&nbsp;Delete post
                        </h4>
                    </div>
                    <div class="modal-body">
                        <p>Are you to remove the post?</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal">No</button>
                        <button class="btn btn-danger" type="button" data-dismiss="modal" @click="removeForum_Click">
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment";
    import marked from "marked";


    export default {
        data() {
            return {
                comments: "",
                commentInput: "",
                forumTitleInput: "",
                forumDescInput: "",
                forumIsMarkdownInput: false,
                bakForum: {
                    title: "",
                    desc: "",
                    isMarkdown: false
                },
                isDisable: false
            };
        },
        methods: {
            moment(date) {
                return moment(date).fromNow();
            },
            preProcessText(text) {
                const link_exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
                const email_exp = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/gi;

                return text
                    .replace(link_exp, "<a target='_blank' href='$1'>$1</a>")
                    .replace(
                        email_exp,
                        "<a target='_blank' href='mailto:$1@$2$6$7'>$1@$2$6$7</a>"
                    )
                    .replace(/\n\r?/g, "<br />");
            },
            compiledMarkdown(text) {
                return marked(text, {sanitize: true});
            },
            back(needRefresh) {
                this.$store.commit("changeCurrentSelectedForum", {}); //clear selection
                this.$store.commit("switchView", {
                    view: this.CourseView,
                    needRefresh: needRefresh
                });
            },
            editForum_Click() {
                this.forumTitleInput = this.bakForum.title = this.forum.title;
                this.forumDescInput = this.bakForum.desc = this.forum.desc;
                this.forumIsMarkdownInput = this.bakForum.isMarkdown = this.forum.isMarkdown;
            },
            editForumDialog_Click() {
                this.$http
                    .put("/forum/update", {
                        id: this.forum._id,
                        title: this.forumTitleInput,
                        desc: this.forumDescInput,
                        isMarkdown: this.forumIsMarkdownInput
                    })
                    .then(data => {
                        return data.status;
                    })
                    .then(status => {
                        if (status === 200) {
                            this.forum.title = this.forumTitleInput;
                            this.forum.desc = this.forumDescInput;
                            this.forum.isMarkdown = this.forumIsMarkdownInput;
                            this.$store.commit("showMessage", "Post updated!");
                        } else {
                            this.forum.title = this.bakForum.title;
                            this.forum.desc = this.bakForum.desc;
                            this.forum.isMarkdown = this.bakForum.isMarkdown;
                            alert("error");
                        }
                    });
            },
            removeForum_Click() {
                this.$http
                    .delete(`/forum/remove/${this.forum._id}`)
                    .then(data => {
                        return data.status;
                    })
                    .then(status => {
                        if (status === 200) {
                            this.back(true);
                            this.$store.commit("showMessage", "Post removed!");
                        } else {
                            alert("Error");
                        }
                    });
            },
            addComment_Click() {
                this.$http
                    .post("/forum/comment/add", {
                        forumId: this.forum._id,
                        content: this.commentInput
                    })
                    .then(data => {
                        return data.status;
                    })
                    .then(status => {
                        if (status === 200) {
                            this.refreshComments();
                        } else {
                            alert("Error");
                        }
                    });
            },
            likeComment(event, comment) {
                if (this.isDisable) return;

                this.isDisable = true;
                if (comment.isLiked) {
                    this.$http
                        .put(`/forum/comment/unlike/${comment._id}`)
                        .then(data => {
                            return data.status;
                        })
                        .then(status => {
                            if (status === 200) {
                                this.isDisable = false;
                                comment.isLiked = false;
                                comment.likes.splice(comment.likes.indexOf(this.user._id), 1);
                                event.target.className.toggle("likedButton");
                            } else {
                                this.isDisable = false;
                                alert("Error");
                            }
                        });
                } else {
                    this.$http
                        .put(`/forum/comment/like/${comment._id}`)
                        .then(data => {
                            return data.status;
                        })
                        .then(status => {
                            if (status === 200) {
                                this.isDisable = false;
                                comment.isLiked = true;
                                comment.likes.push(this.user._id);
                                event.target.className.toggle("likedButton");
                            } else {
                                this.isDisable = false;
                                alert("Error");
                            }
                        });
                }
            },
            refreshComments() {
                this.$http
                    .get(`/forum/comment/all/${this.forum._id}`)
                    .then(data => {
                        return data.json();
                    })
                    .then(data => {
                        this.comments = data;

                        this.comments.forEach((comment, index) => {
                            comment.isLiked = comment.likes.find(userId => {
                                return userId === this.user._id;
                            });

                            if (comment.isLiked === undefined) comment.isLiked = false;
                        });
                    });
            }
        },
        computed: {
            course() {
                return this.$store.state.currentSelectedCourse;
            },
            forum() {
                return this.$store.state.currentSelectedForum;
            },
            CourseView() {
                return this.$store.state.Course;
            },
            user() {
                return this.$store.state.user;
            }
        },
        created() {
            this.refreshComments();
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
        position: fixed;
        top: 62px;
        right: 10%;
        left: 10%;
        z-index: 10;
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

    #forum-comments hr {
        border-top-width: 2px;
        width: 30%;
    }

    .comment-user-image {
        max-width: 30px;
    }

    #comment-button {
        position: fixed;
        right: 30px;
        bottom: 30px;
        -webkit-box-shadow: 0 1px 10px gray;
        -moz-box-shadow: 0 1px 10px gray;
        box-shadow: 0 1px 10px gray;
    }

    .like-button {
        text-decoration-style: none;
        color: black;
        text-decoration: none;
        cursor: pointer;
        border: none;
        background-color: transparent;
    }

    .likedButton {
        color: #149c82;
    }
</style>

<style>
    /*this has to be global*/
    #forum-header img {
        max-width: 100%;
        height: auto;
        display: block;
    }
</style>
