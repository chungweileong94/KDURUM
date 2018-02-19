<template>
    <div class="container-fluid">
        <div class="flex-container" v-if="enrollment.length!=0">
            <div class="courseItem col-md-3 col-sm-5 col-xs-12" v-for="c in enrollment" :key="c._id">
                <div class="panel panel-default">
                    <div class="panel-body">
                        {{ c.title }}
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
      computed: {
        enrollment() {
          return this.$store.state.enrollment;
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
      line-height: 150px;
      font-weight: bold;
    }

    .courseItem .panel:hover {
      background-color: #0c84e4;
      color: white;
    }
</style>

