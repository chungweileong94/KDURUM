<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <img class="img-circle center-block" style="width:100px;" v-bind:src="user.thumnail">
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <h4 class="text-center">
                    <b>{{ user.name }}</b>
                </h4>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <h5 class="text-center">{{ user.role }}</h5>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-12" style="text-align: center;">
                <a class="btn btn-md btn-danger" href="#" data-toggle="modal" data-target="#deleteModal">Delete Account</a>
            </div>
        </div>

        <!-- delete account dialog -->
        <div id="deleteModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal" v-on:click="deleteCancelClick">&times;</button>
                        <h4 class="modal-title">Delete Account</h4>
                    </div>
                    <div class="modal-body">
                        <p><b>WARNING! This action will permanent delete your account including your data.</b></p>
                        <div class="form-group">
                            <label class="control-label" for="deleteNameInput">Please enter your name</label>
                            <input class="form-control" id="deleteNameInput" type="text" v-model="deleteNameInput">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal" v-on:click="deleteCancelClick">Cancel</button>
                        <button class="btn btn-danger" type="button" v-bind:disabled="!(deleteNameInput == user.name)">Delete</button>
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
      deleteNameInput: ""
    };
  },
  methods: {
    deleteCancelClick: function() {
      this.deleteNameInput = "";
    }
  }
};
</script>

<style scoped>
.container-fluid {
  margin-top: 20px;
}

hr {
  width: 70%;
  border-color: #adadad;
}
</style>