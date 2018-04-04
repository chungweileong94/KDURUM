<template>
    <div>
        <div v-if="user.enrollment.length!=0">
            <!-- favorite course -->
            <div v-if="user.favorites.length!=0">
                <h5>
                    <span class="glyphicon glyphicon-star"></span>&nbsp;&nbsp;Favorite
                </h5>
                <hr>
                <div class="flex-container">
                    <div class="course-item col-md-3 col-sm-5 col-xs-12 animation-intro" v-for="c in user.favorites" :key="c._id">
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
                                                <a href="#" @click="removeFromFavorites(c._id)">Remove from favorites</a>
                                                <a href="#" @click="leaveCourse_Click(c._id)">Leave</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- all enrolled course -->
            <h5>
                <span class="glyphicon glyphicon-stats"></span>&nbsp;&nbsp;All
            </h5>
            <hr>
            <div class="flex-container">
                <div class="course-item col-md-3 col-sm-5 col-xs-12 animation-intro" v-for="c in user.enrollment" :key="c._id">
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
                                            <a href="#" v-if="!user.favorites.find(f => f._id == c._id)" @click="markAsFavorite(c._id)">Mark as favorite</a>
                                            <a href="#" v-else @click="removeFromFavorites(c._id)">Remove from favorites</a>
                                            <a href="#" @click="leaveCourse_Click(c._id)">Leave</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty message -->
        <div class="text-center animation-intro" style="padding-top: 150px;" v-else>
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
            this.$store.dispatch("getCourses");
          });
        },
        markAsFavorite(id) {
          this.$http
            .put(`/courses/favorites/add/${id}`)
            .then(data => {
              return data.status;
            })
            .then(status => {
              if (status == 200) {
                this.refresCoursesAndEnrollment();
              } else {
                alert("Error");
              }
            });
        },
        removeFromFavorites(id) {
          this.$http
            .put(`/courses/favorites/remove/${id}`)
            .then(data => {
              return data.status;
            })
            .then(status => {
              if (status == 200) {
                this.refresCoursesAndEnrollment();
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
          this.$store.commit("switchView", {
            view: this.CourseView,
            needRefresh: true
          });
        }
      },
      computed: {
        user() {
          return this.$store.state.user;
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

    .flex-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
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

