<template>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
        <div class="navbar-header">
            <button class="navbar-toggle collapsed" type="button" data-target="#bs-example-navbar-collapse-2" data-toggle="collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">KDURUM</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a class="dropdown-toggle" role="button" aria-expanded="false" href="#" data-toggle="dropdown">
                        <img id="profileImage" class="img-circle" v-bind:src="user.thumnail">
                        {{ user.name }}
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li>
                            <h6>
                                <b>{{ user.role }}</b>
                            </h6>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="/auth/logout">
                                <span class="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;Logout
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        thumnail: "",
        role: ""
      }
    };
  },
  created() {
    this.$http.get("/auth/user").then(data => {
      console.log(data);
      this.user.name = data.body.name;
      this.user.thumnail = data.body.thumnail;
      switch (data.body.role) {
        case 0:
          this.user.role = "Administrator";
          break;

        case 1:
          this.user.role = "Lecture";
          break;

        case 2:
          this.user.role = "Student";
          break;
      }
    });
  }
};
</script>

<style scoped>
.navbar-inverse .navbar-toggle .icon-bar {
  background-color: white !important;
}

img#profileImage {
  max-width: 40px;
  margin: -10px 7px;
}

ul li h6 {
  padding: 3px 20px;
}

@media (max-width: 991px) {
  .navbar-inverse .navbar-nav .open .dropdown-menu > li > h6 {
    color: #b2dbfb;
  }
}
</style>

