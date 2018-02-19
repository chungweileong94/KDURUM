<template>
    <div class="container-fluid">
        <div class="flex-container">
            <div class="courseItem col-md-3 col-sm-5 col-xs-12" v-for="c in enrollment">
                <div class="panel panel-default">
                    <div class="panel-body">
                        {{ c.title }}
                    </div>
                </div>
            </div>
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

