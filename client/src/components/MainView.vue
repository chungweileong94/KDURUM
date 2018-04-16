<template>
    <div>
        <!-- Nav tabs -->
        <ul :class="{'nav':true, 'nav-tabs':true, 'nav-tabs-lecture':user.roleIndex===1}" role="tablist">
            <li role="presentation" :class="{active:user.roleIndex===2}" v-if="user.roleIndex===2">
                <a class="text-center" href="#enrollment" aria-controls="enrollment" role="tab" data-toggle="tab">Enrollment</a>
            </li>
            <li role="presentation" :class="{active:user.roleIndex!==2}">
                <a class="text-center" href="#courses" aria-controls="courses" role="tab" data-toggle="tab">{{user.roleIndex===1
                    ? "Courses" : "Catalog"}}</a>
            </li>
            <li role="presentation" v-if="user.roleIndex===0">
                <a class="text-center" href="#users" aria-controls="users" role="tab" data-toggle="tab">Users</a>
            </li>
            <li role="presentation">
                <a class="text-center" href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a>
            </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade" :class="{in:user.roleIndex===2,active:user.roleIndex===2}"
                 v-if="user.roleIndex!==0" id="enrollment">
                <content-enrollment></content-enrollment>
            </div>
            <div role="tabpanel" class="tab-pane fade" :class="{in:user.roleIndex!==2,active:user.roleIndex!==2}"
                 id="courses">
                <content-courses></content-courses>
            </div>
            <div role="tabpanel" class="tab-pane fade" v-if="user.roleIndex===0" id="users">
                <content-users></content-users>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="profile">
                <content-profile></content-profile>
            </div>
        </div>
    </div>
</template>

<script>
    import Profile from "./Profile.vue";
    import Courses from "./Courses.vue";
    import Enrollment from "./Enrollment.vue";
    import Users from "./Users.vue";

    export default {
        components: {
            "content-profile": Profile,
            "content-courses": Courses,
            "content-enrollment": Enrollment,
            "content-users": Users
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        }
    };
</script>

<style scoped>
    .nav-tabs li {
        width: 33.33%;
    }

    .nav-tabs-lecture li {
        width: 50%;
    }

    .nav {
        position: -webkit-sticky;
        position: sticky;
        top: 60px;
        padding-top: 6px;
        background: white;
        z-index: 100;
    }

    .tab-content {
        margin-top: 8px;
        z-index: -1;
    }
</style>