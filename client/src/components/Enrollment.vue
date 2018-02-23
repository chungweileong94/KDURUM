<template>
    <div class="container-fluid">
        <div class="flex-container" v-if="enrollment.length!=0">
            <div class="course-item col-md-3 col-sm-5 col-xs-12" v-for="c in enrollment" :key="c._id">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <h5>{{ c.title }}</h5>

                        <div>
                            <div class="btn-group">
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
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center" style="padding-top: 150px;" v-else>
            <h3>Empty</h3>
            <p class="lead">You haven't join any courses yet</p>
        </div>
    </div>
</template>

<script>
    export default {
      methods: {
        refresCoursesAndEnrollment() {
          this.$store.dispatch("getUserData").then(() => {
            this.$store.dispatch("getCoursesAndEnrollment");
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
        enrollment() {
          return this.$store.state.enrollment;
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
</style>

