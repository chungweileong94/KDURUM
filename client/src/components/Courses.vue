<template>
    <div class="container-fluid">
        <div class="flex-container" v-if="courses.length!=0">
            <div class="courseItem col-md-3 col-sm-5 col-xs-12" v-for="c in courses" :key="c._id">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <h5>{{ c.title }}</h5>

                        <!-- non-admin buttons -->
                        <div v-if="user.roleIndex!=0">
                            <a href="#" class="btn btn-md btn-primary" v-if="!c.isJoined" @click="joinCourse((c._id))">Join</a>
                            <div class="btn-group" v-if="c.isJoined">
                                <a href="#" class="btn btn-success">Explore</a>
                                <a href="#" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="#" @click="leaveCourse(c._id)">Leave</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- admin buttons -->
                        <div v-else>
                            <a href="#" class="btn btn-md btn-success">Explore</a>
                            <a href="#" class="btn btn-md btn-danger" @click="deleteCourseAlert(c)" data-toggle="modal" data-target="#deleteCourseModal">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- empty message -->
        <div class="text-center" style="padding-top: 150px;" v-else>
            <h3>Empty</h3>
            <p class="lead" v-if="user.roleIndex==0">You haven't add any courses yet</p>
            <p class="lead" v-else>There is no courses available yet</p>
        </div>

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
                                    <input class="form-control" id="courseTitleInput" type="text" v-model="courseTitleInput">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
                        <button class="btn btn-success" type="button" data-dismiss="modal" :disabled="courseTitleInput.trim().length==0" @click="addCourse">Add</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- delete modal -->
        <div id="deleteCourseModal" class="modal fade" v-if="user.roleIndex==0">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal" @click="deleteCourseCancel">&times;</button>
                        <h4 class="modal-title">Delete "{{ selectedDeleteCourse.title }}"</h4>
                    </div>
                    <div class="modal-body">
                        <p>
                            <b>WARNING! This action will permanent delete course together with all the forum data.</b>
                        </p>
                        <div class="form-group">
                            <label class="control-label" for="deleteNameInput">Please enter the course title</label>
                            <input class="form-control" id="deleteNameInput" type="text" v-model="courseTitleDeleteInput">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal" @click="deleteCourseCancel">Cancel</button>
                        <button class="btn btn-danger" type="button" data-dismiss="modal" :disabled="courseTitleDeleteInput!=selectedDeleteCourse.title" @click="deleteCourse(selectedDeleteCourse.id)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          courseTitleInput: "",
          courseTitleDeleteInput: "",
          selectedDeleteCourse: {
            id: "",
            title: ""
          }
        };
      },
      methods: {
        refresCoursesAdnEnrollment() {
          this.$store.dispatch("getUserData").then(() => {
            this.$store.dispatch("getCoursesAndEnrollment");
          });
        },
        addCourse() {
          this.$http
            .post("/courses/add", {
              title: this.courseTitleInput
            })
            .then(data => {
              return data.status;
            })
            .then(status => {
              if (status == 200) {
                this.refresCoursesAdnEnrollment();
                alert("Course added");
              } else {
                alert("Error");
              }
            });
        },
        deleteCourseAlert(course) {
          this.selectedDeleteCourse.id = course._id;
          this.selectedDeleteCourse.title = course.title;
        },
        deleteCourseCancel() {
          this.selectedDeleteCourse.id = "";
          this.selectedDeleteCourse.title = "";
          this.courseTitleDeleteInput = "";
        },
        deleteCourse(id) {
          this.$http
            .delete(`/courses/delete/${id}`)
            .then(data => {
              return data.status;
            })
            .then(status => {
              if (status == 200) {
                this.refresCoursesAdnEnrollment();
                this.deleteCourseCancel();
                alert("Course deleted");
              } else {
                alert("Error");
              }
            });
        },
        joinCourse(id) {
          this.$http
            .put(`/courses/join/${id}`)
            .then(data => {
              return data.status;
            })
            .then(status => {
              if (status == 200) {
                this.refresCoursesAdnEnrollment();

                alert("Joined course");
              } else {
                alert("Error");
              }
            });
        },
        leaveCourse(id) {
          this.$http
            .put(`/courses/leave/${id}`)
            .then(data => {
              return data.status;
            })
            .then(status => {
              if (status == 200) {
                this.refresCoursesAdnEnrollment();

                alert("Left course");
              } else {
                alert("Error");
              }
            });
        }
      },
      computed: {
        user() {
          return this.$store.state.user;
        },
        courses() {
          return this.$store.state.courses;
        }
      }
    };
</script>

<style scoped>
    .flex-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 8px;
    }

    .courseItem {
      margin: 0;
      padding: 8px;
      text-align: center;
    }

    .courseItem .panel {
      margin: 0;
      transition: background-color 0.2s, color 0.2s;
    }

    .courseItem h5 {
      font-weight: 300;
    }

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