<template>
    <div class="container-fluid">
        <div class="row">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="u in users" :key="u._id" data-toggle="modal" data-target="#userModal" @click="userSelected(u)">
                        <td>{{ u._id }}</td>
                        <td>{{ u.name }}</td>
                        <td>{{ u.role==0?"Administrator":u.role==1?"Lecture":"Student" }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- user detail modal -->
        <div id="userModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">User's Detail</h4>
                    </div>
                    <div class="modal-body">
                        <img class="img-circle center-block" style="width:100px; margin-bottom:10px;" :src="selectedUser.thumnail">

                        <div class="form-horizontal">
                            <!-- id-->
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="userId">
                                    <b>ID</b>
                                </label>
                                <div class="col-sm-9">
                                    <p class="form-control-static" id="userId">{{ selectedUser._id }}</p>
                                </div>
                            </div>
                            <!-- name-->
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="name">
                                    <b>Name</b>
                                </label>
                                <div class="col-sm-9">
                                    <p class="form-control-static" id="name">{{ selectedUser.name }}</p>
                                </div>
                            </div>
                            <!-- email-->
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="email">
                                    <b>Email</b>
                                </label>
                                <div class="col-sm-9">
                                    <p class="form-control-static" id="email">{{ (!selectedUser.email || selectedUser.email.length==0) ? "-" : selectedUser.email }}</p>
                                </div>
                            </div>
                            <!-- role-->
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="role">
                                    <b>Role</b>
                                </label>
                                <div class="col-sm-9">
                                    <p class="form-control-static" id="role">{{ selectedUser.role==0?"Administrator":selectedUser.role==1?"Lecture":"Student" }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal">Close</button>
                        <button class="btn btn-danger" type="button" v-if="selectedUser._id!=user._id" data-dismiss="modal" data-toggle="modal" data-target="#deleteModal">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- delete account dialog -->
        <div id="deleteModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal" @click="deleteCancelClick">&times;</button>
                        <h4 class="modal-title">Delete "{{ selectedUser.name }}"</h4>
                    </div>
                    <div class="modal-body">
                        <p>
                            <b>WARNING! This action will permanent delete the account including the data.</b>
                        </p>
                        <div class="form-group">
                            <label class="control-label" for="deleteNameInput">Please enter the user name</label>
                            <input class="form-control" id="deleteNameInput" type="text" v-model="deleteNameInput">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal" @click="deleteCancelClick">Cancel</button>
                        <button class="btn btn-danger" type="button" data-dismiss="modal" :disabled="!(deleteNameInput == selectedUser.name)" @click="deleteUser(selectedUser._id)">Delete</button>
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
          users: [],
          selectedUser: {},
          deleteNameInput: ""
        };
      },
      methods: {
        getAllusers() {
          this.$http
            .get("/users/all")
            .then(data => {
              return data.json();
            })
            .then(data => {
              this.users = data;
            });
        },
        userSelected(user) {
          this.selectedUser = user;
        },
        deleteUser(id) {
          this.$http.delete(`/users/delete/${id}`).then(data => {
            if (data.status == 200) {
              alert("Account deleted");
              this.getAllusers();
            } else {
              alert("Error");
            }
          });
        },
        deleteCancelClick() {
          this.deleteNameInput = "";
        }
      },
      computed: {
        user() {
          return this.$store.state.user;
        }
      },
      created() {
        this.getAllusers();
      }
    };
</script>

<style scoped>
    table tbody tr {
      cursor: pointer;
    }
</style>
