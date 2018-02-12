<template>
  <div class="container-fluid">
      <div class="row">
          <div class="col-sm-12">
              <img class="img-circle center-block" style="width:100px;" v-bind:src="user.thumnail">
          </div>
      </div>
      <div class="row">
          <div class="col-sm-12">
              <h4 class="text-center"><b>{{ user.name }}</b></h4>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ["user"]
};
</script>

<style scoped>
.container-fluid {
  margin-top: 20px;
}
</style>

