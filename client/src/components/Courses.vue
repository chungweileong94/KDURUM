<template>
    <div class="container-fluid">
        <div class="flex-container">
            <div class="courseItem col-md-3 col-sm-5 col-xs-12" v-for="c in courses">
                <div class="panel panel-default">
                    <div class="panel-body">
                        {{ c.title }}
                    </div>
                </div>
            </div>
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
                        <button class="btn btn-success" type="button" data-dismiss="modal" v-bind:disabled="courseTitleInput.trim().length==0" v-on:click="addCourse">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ["user", "courses"],
  data() {
    return {
      courseTitleInput: ""
    };
  },
  methods: {
    getAllCourses: function() {
      this.$http
        .get("/courses/all")
        .then(data => {
          return data.json();
        })
        .then(data => {
          let coursesArray = [];
          for (let key in data) {
            coursesArray.push(data[key]);
          }
          this.courses = coursesArray;
        });
    },
    addCourse: function() {
      if (this.user.roleIndex == 0) {
        this.$http
          .post("/courses/add", {
            title: this.courseTitleInput
          })
          .then(data => {
            return data.status;
          })
          .then(status => {
            if (status == 200) {
              alert("Course added");
              this.getAllCourses();
            } else {
              alert("Error");
            }
          });
      } else {
        alert("Permission Deniel");
      }
    }
  },
  created() {
    this.getAllCourses();
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
  line-height: 150px;
  font-weight: bold;
}

.courseItem .panel:hover {
  background-color: #0c84e4;
  color: white;
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