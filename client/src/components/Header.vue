<template>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button class="navbar-toggle collapsed" type="button" data-target="#bs-example-navbar-collapse-2"
                        data-toggle="collapse">
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
                            <img id="profile-image" class="img-circle" :src="user.thumnail"> {{ user.name }}
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
        computed: {
            user() {
                return this.$store.state.user;
            }
        }
    };
</script>

<style scoped>
    .navbar {
        box-shadow: 0 1px 10px grey;
    }

    .navbar-inverse .navbar-toggle .icon-bar {
        background-color: white !important;
    }

    img#profile-image {
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

