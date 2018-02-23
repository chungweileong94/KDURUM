<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <img class="img-circle center-block" style="width:100px;" :src="user.thumnail">
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
                <a class="btn btn-md btn-danger" href="#" data-toggle="modal" data-target="#delete-profile-modal">
                    <span class="glyphicon glyphicon-trash"></span>&nbsp;&nbsp;Delete Account
                </a>
            </div>
        </div>

        <!-- delete account dialog -->
        <div id="delete-profile-modal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal" @click="deleteProfileDialogDismiss_Click">&times;</button>
                        <h4 class="modal-title">
                            <span class="glyphicon glyphicon-trash"></span>&nbsp;&nbsp;Delete Account
                        </h4>
                    </div>
                    <div class="modal-body">
                        <p>
                            <b>WARNING! This action will permanent delete your account including your data.</b>
                        </p>
                        <div class="form-group">
                            <label class="control-label" for="delete-name-input">Please enter your name</label>
                            <input class="form-control" id="delete-name-input" type="text" v-model="deleteNameInput">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal" @click="deleteProfileDialogDismiss_Click">Cancel</button>
                        <button class="btn btn-danger" type="button" :disabled="!(deleteNameInput == user.name)" @click="deleteProfile_Click(user._id)">Delete</button>
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
          deleteNameInput: ""
        };
      },
      methods: {
        deleteProfileDialogDismiss_Click() {
          this.deleteNameInput = "";
        },
        deleteProfile_Click(id) {
          this.$http.delete(`/users/delete/${id}`).then(data => {
            if (data.status == 200) {
              alert("Account deleted");
              window.location.href = "/auth/logout";
            } else {
              alert("Error");
            }
          });
        }
      },
      computed: {
        user() {
          return this.$store.state.user;
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