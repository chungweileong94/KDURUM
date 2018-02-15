<template>
    <div class="container-fluid">
        <button class="btn btn-success btn-lg roundButton" v-if="user.roleIndex==0" type="button" data-toggle="modal" data-target="#addCourseModal">
            <span class="glyphicon glyphicon-plus"></span>
        </button>

        <!-- add course dialog -->
        <div id="addCourseModal" class="modal fade" v-if="user.roleIndex==0">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add Course</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-2 control-label" for="courseTitleInput">
                                    <b>Title</b>
                                </label>
                                <div class="col-sm-10">
                                    <input class="form-control" id="courseTitleInput" type="text" v-model="course.title">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
                        <button class="btn btn-success" type="button" v-bind:disabled="course.title.trim().length==0">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["user"],
        data() {
            return {
                course: {
                    title: ""
                }
            };
        },
        methods: {
            addCourse: function () {
                if (this.user.roleIndex == 0) {
                    //this.$http.post("")
                } else {
                    alert("Permission Deniel");
                }
            }
        },
        created() {
            this.$http.get("/courses/all").then(data => {
                console.log(data);
            });
        }
    };
</script>

<style scoped>
    .roundButton {
        position: fixed;
        right: 30px;
        bottom: 30px;
        height: 50px;
        width: 50px;
        border-radius: 100%;
        padding: 0;
        padding-top: 2px;
        padding-left: 2px;
    }
</style>