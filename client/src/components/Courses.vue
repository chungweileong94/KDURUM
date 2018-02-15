<template>
    <div class="container-fluid">
        <button class="btn btn-success btn-lg roundButton" v-if="user.roleIndex==0" type="button" data-toggle="modal" data-target="#registerModal">
            <span class="glyphicon glyphicon-plus"></span>
        </button>
    </div>
</template>

<script>
export default {
  props: ["user"]
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