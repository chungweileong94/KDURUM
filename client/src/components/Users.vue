<template>
    <table class="table table-striped table-hover" style="margin-top:8px;">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user._id">
                <td>{{ user._id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.role==0?"Administrator":user.role==1?"Lecture":"Student" }}</td>
                <td>{{ user.email }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
      data() {
        return {
          users: []
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
        }
      },
      created() {
        this.getAllusers();
      }
    };
</script>

<style scoped>

</style>
