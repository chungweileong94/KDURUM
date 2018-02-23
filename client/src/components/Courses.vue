<template>
    <div class="container-fluid">
        <div class="flex-container" v-if="courses.length!=0">
            <div class="course-item col-md-4 col-sm-5 col-xs-12" v-for="c in courses" :key="c._id">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <h5>{{ c.title }}</h5>

                        <!-- non-admin buttons -->
                        <div v-if="user.roleIndex!=0">
                            <a href="#" class="btn btn-md btn-primary" v-if="!c.isJoined" @click="joinCourse_Click((c._id))">Join</a>
                            <div class="btn-group" v-if="c.isJoined">
                                <a href="#" class="btn btn-success" @click="exploreCourse_Click(c)">Explore</a>
                                <a href="#" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="#" @click="leaveCourse_Click(c._id)">Leave</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- admin buttons -->
                        <div class="btn-group" v-else>
                            <a href="#" class="btn btn-md btn-success" @click="exploreCourse_Click(c)">Explore</a>
                            <div class="btn-group">
                                <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#update-course-modal" @click="updateCourse_Click(c)">
                                    <span class="glyphicon glyphicon-pencil"></span>&nbsp;&nbsp;Edit
                                </a>
                                <a href="#" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="#" @click="deleteCourse_Click(c)" data-toggle="modal" data-target="#delete-course-modal">Delete</a>
                                    </li>
                                </ul>
                            </div>
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

        <button class="btn btn-success btn-lg round-button" v-if="user.roleIndex==0" type="button" data-toggle="modal" data-target="#add-course-modal">
            <span class="glyphicon glyphicon-plus"></span>
        </button>

        <!-- add course dialog -->
        <div id="add-course-modal" class="modal fade" v-if="user.roleIndex==0">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">
                            <span class="glyphicon glyphicon-blackboard"></span>&nbsp;&nbsp;Add Course
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-2 control-label" for="course-title-input">
                                    <b>Title</b>
                                </label>
                                <div class="col-sm-10">
                                    <input class="form-control" id="course-title-input" type="text" v-model="courseTitleInput">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
                        <button class="btn btn-success" type="button" data-dismiss="modal" :disabled="courseTitleInput.trim().length==0" @click="addCourse_Click">Add</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- update course dialog -->
        <div id="update-course-modal" class="modal fade" v-if="user.roleIndex==0">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">
                            <span class="glyphicon glyphicon-pencil"></span>&nbsp;&nbsp;Update Course
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-2 control-label" for="new-course-title-input">
                                    <b>New Title</b>
                                </label>
                                <div class="col-sm-10">
                                    <input class="form-control" id="new-course-title-input" type="text" v-model="selectedUpdateCourse.title">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
                        <button class="btn btn-success" type="button" data-dismiss="modal" :disabled="!selectedUpdateCourse.title || selectedUpdateCourse.title.trim().length==0" @click="updateCourseDialog_Click">Update</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- delete modal -->
        <div id="delete-course-modal" class="modal fade" v-if="user.roleIndex==0">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal" @click="deleteCourseDialogDismiss_Click">&times;</button>
                        <h4 class="modal-title">
                            <span class="glyphicon glyphicon-trash"></span>&nbsp;&nbsp;Delete "{{ selectedDeleteCourse.title }}"
                        </h4>
                    </div>
                    <div class="modal-body">
                        <p>
                            <b>WARNING! This action will permanent delete course together with all the forum data.</b>
                        </p>
                        <div class="form-group">
                            <label class="control-label" for="delete-name-input">Please enter the course title</label>
                            <input class="form-control" id="delete-name-input" type="text" v-model="courseTitleDeleteInput">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal" @click="deleteCourseDialogDismiss_Click">Cancel</button>
                        <button class="btn btn-danger" type="button" data-dismiss="modal" :disabled="courseTitleDeleteInput!=selectedDeleteCourse.title" @click="deleteCourseDialog_Click(selectedDeleteCourse._id)">Delete</button>
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
          selectedUpdateCourse: {},
          selectedDeleteCourse: {}
        };
      },
      methods: {
        refresCoursesAndEnrollment() {
          this.$store.dispatch("getUserData").then(() => {
            this.$store.dispatch("getCoursesAndEnrollment");
          });
        },
        addCourse_Click() {
          this.$http
            .post("/courses/add", {
              title: this.courseTitleInput
            })
            .then(data => {
              return data.status;
            })
            .then(status => {
              if (status == 200) {
                this.refresCoursesAndEnrollment();
                alert("Course added");
              } else {
                this.refresCoursesAndEnrollment();
                alert("Error");
              }
            });
        },
        updateCourse_Click(course) {
          this.selectedUpdateCourse = course;
        },
        updateCourseDialog_Click() {
          this.$http
            .put("/courses/update", {
              course: this.selectedUpdateCourse
            })
            .then(data => {
              console.log(data);
              return data.status;
            })
            .then(status => {
              if (status == 200) {
                this.refresCoursesAndEnrollment();
                alert("Course updated");
              } else {
                alert("Error");
              }
            });
        },
        deleteCourse_Click(course) {
          this.selectedDeleteCourse = course;
        },
        deleteCourseDialogDismiss_Click() {
          this.selectedDeleteCourse = {};
          this.courseTitleDeleteInput = "";
        },
        deleteCourseDialog_Click(id) {
          this.$http
            .delete(`/courses/delete/${id}`)
            .then(data => {
              return data.status;
            })
            .then(status => {
              if (status == 200) {
                this.refresCoursesAndEnrollment();
                this.deleteCourseDialogDismiss_Click();
                alert("Course deleted");
              } else {
                alert("Error");
              }
            });
        },
        joinCourse_Click(id) {
          this.$http
            .put(`/courses/join/${id}`)
            .then(data => {
              return data.status;
            })
            .then(status => {
              if (status == 200) {
                this.refresCoursesAndEnrollment();

                alert("Joined course");
              } else {
                alert("Error");
              }
            });
        },
        leaveCourse_Click(id) {
          this.$http
            .put(`/courses/leave/${id}`)
            .then(data => {
              return data.status;
            })
            .then(status => {
              if (status == 200) {
                this.refresCoursesAndEnrollment();

                alert("Left course");
              } else {
                alert("Error");
              }
            });
        },
        exploreCourse_Click(course) {
          this.$store.commit("changeCurrentSelectedCourse", course);
          this.$store.commit("switchView", this.CourseView);
        }
      },
      computed: {
        user() {
          return this.$store.state.user;
        },
        courses() {
          return this.$store.state.courses;
        },
        CourseView() {
          return this.$store.state.CourseView;
        }
      }
    };
</script>

<style scoped>
    .flex-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .course-item {
      margin: 0;
      padding: 8px;
      text-align: center;
    }

    .course-item .panel {
      margin: 0;
      transition: background-color 0.2s, color 0.2s;
    }

    .course-item h5 {
      font-weight: 300;
    }

    .round-button {
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