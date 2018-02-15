<template>
    <div>
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" v-bind:class="{active:user.roleIndex!=0, adminMode:user.roleIndex==0}" v-if="user.roleIndex!=0">
                <a class="text-center" href="#enrollment" aria-controls="enrollment" role="tab" data-toggle="tab">Enrollment</a>
            </li>
            <li role="presentation" v-bind:class="{active:user.roleIndex==0, adminMode:user.roleIndex==0}">
                <a class="text-center" href="#courses" aria-controls="courses" role="tab" data-toggle="tab">Courses</a>
            </li>
            <li role="presentation" v-bind:class="{adminMode:user.roleIndex==0}">
                <a class="text-center" href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a>
            </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade" v-bind:class="{in:user.roleIndex!=0,active:user.roleIndex!=0}" v-if="user.roleIndex!=0" id="enrollment">Enrollment</div>
            <div role="tabpanel" class="tab-pane fade" v-bind:class="{in:user.roleIndex==0,active:user.roleIndex==0}" id="courses">
                <content-courses v-bind:user="user"></content-courses>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="profile">
                <content-profile v-bind:user="user"></content-profile>
            </div>
        </div>
    </div>
</template>

<script>
import Profile from "./Profile.vue";
import Courses from "./Courses.vue";

export default {
  components: {
    "content-profile": Profile,
    "content-courses": Courses
  },
  props: ["user"]
};
</script>

<style scoped>
.nav-tabs li {
  width: 33.33%;
}

.nav-tabs li.adminMode {
  width: 50%;
}
</style>