<template>
    <div class="animation-intro">
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                        <!--<th>ID</th>-->
                        <th>Name</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="u in users" :key="u._id" data-toggle="modal" data-target="#user-modal"
                        @click="user_Selected(u)">
                        <!--<td>{{ u._id }}</td>-->
                        <td>{{ u.name }}</td>
                        <td>{{ u.role===0?"Administrator":u.role===1?"Lecturer":"Student" }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- user detail modal -->
        <div id="user-modal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">
                            <span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;User's Detail
                        </h4>
                    </div>
                    <div class="modal-body">
                        <img class="img-circle center-block" style="width:100px; margin-bottom:10px;"
                             :src="selectedUser.thumnail">

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
                                    <p class="form-control-static" id="email">{{ (!selectedUser.email ||
                                        selectedUser.email.length===0) ? "-" : selectedUser.email }}</p>
                                </div>
                            </div>
                            <!-- role-->
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="role">
                                    <b>Role</b>
                                </label>
                                <div class="col-sm-9">
                                    <p class="form-control-static" id="role">{{
                                        selectedUser.role===0?"Administrator":selectedUser.role===1?"Lecturer":"Student"
                                        }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal">Close</button>
                        <button class="btn btn-primary" type="button" v-if="selectedUser._id!==user._id"
                                data-dismiss="modal" data-toggle="modal" data-target="#change-role-modal">Change Role
                        </button>
                        <button class="btn btn-danger" type="button" v-if="selectedUser._id!==user._id"
                                data-dismiss="modal" data-toggle="modal" data-target="#delete-modal">Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- delete account dialog -->
        <div id="delete-modal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal"
                                @click="deleteUserDialogDismiss_Click">&times;
                        </button>
                        <h4 class="modal-title">
                            <span class="glyphicon glyphicon-trash"></span>&nbsp;&nbsp;Delete "{{ selectedUser.name }}"
                        </h4>
                    </div>
                    <div class="modal-body">
                        <p>
                            <b>WARNING! This action will permanent delete the account including the data.</b>
                        </p>
                        <div class="form-group">
                            <label class="control-label" for="delete-name-input">Please enter the user name</label>
                            <input class="form-control" id="delete-name-input" type="text" v-model="deleteNameInput">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal"
                                @click="deleteUserDialogDismiss_Click">Cancel
                        </button>
                        <button class="btn btn-danger" type="button" data-dismiss="modal"
                                :disabled="!(deleteNameInput === selectedUser.name)"
                                @click="deleteUserDialog_Click(selectedUser._id)">Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- change account role dialog -->
        <div id="change-role-modal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" aria-hidden="true" type="button" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">
                            <span class="glyphicon glyphicon-refresh
                            "></span>&nbsp;&nbsp;Change role - {{ selectedUser.name }}
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="control-label" for="delete-name-input">Please select the role</label>
                            <select class="form-control" v-model="roleSelected">
                                <option disabled value="">Please enter a role</option>
                                <option value="0">Administrator</option>
                                <option value="1">Lecturer</option>
                                <option value="2">Student</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
                        <button class="btn btn-primary" type="button" data-dismiss="modal"
                                @click="changeUserRoleDialog_Click(selectedUser._id)">Save
                        </button>
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
                deleteNameInput: "",
                roleSelected: ""
            };
        },
        methods: {
            getAllUsers() {
                this.$http
                    .get("/users/all")
                    .then(data => {
                        return data.json();
                    })
                    .then(data => {
                        this.users = data;
                    });
            },
            user_Selected(user) {
                this.selectedUser = user;
            },
            deleteUserDialog_Click(id) {
                this.$http.delete(`/users/delete/${id}`).then(data => {
                    if (data.status === 200) {
                        alert("Account deleted");
                        this.getAllUsers();
                        this.$store.dispatch("getAllLecturers");
                    } else {
                        alert("Error");
                    }
                });
            },
            deleteUserDialogDismiss_Click() {
                this.deleteNameInput = "";
            },
            changeUserRoleDialog_Click(id) {
                console.log(this.roleSelected);
                this.$http.put(`/users/role/${id}/${this.roleSelected}`).then(data => {
                    if (data.status === 200) {
                        this.$store.commit("showMessage", "Account role changed!");
                        this.getAllUsers();
                        this.$store.dispatch("getAllLecturers"); //refresh lecture list
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
        },
        created() {
            this.getAllUsers();
        }
    };
</script>

<style scoped>
    .animation-intro {
        -webkit-animation-name: intro;
        -moz-animation-name: intro;
        -o-animation-name: intro;
        animation-name: intro;

        -webkit-animation-duration: 0.5s;
        -moz-animation-duration: 0.5s;
        -o-animation-duration: 0.5s;
        animation-duration: 0.5s;
    }

    table tbody tr {
        cursor: pointer;
    }
</style>
