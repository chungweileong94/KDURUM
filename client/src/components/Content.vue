<template>
  <div>
  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active"><a class="text-center" href="#enrollment" aria-controls="enrollment" role="tab" data-toggle="tab">Enrollment</a></li>
    <li role="presentation"><a class="text-center" href="#courses" aria-controls="courses" role="tab" data-toggle="tab">Courses</a></li>
    <li role="presentation"><a class="text-center" href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane fade in active" id="enrollment">Enrollment</div>
    <div role="tabpanel" class="tab-pane fade" id="courses">Courses</div>
    <div role="tabpanel" class="tab-pane fade" id="profile">
      <content-profile v-bind:user="user"></content-profile>
    </div>
  </div>
</div>
</template>

<script>
import Profile from "./Profile.vue";

export default {
  components: {
    "content-profile": Profile
  },
  props: ["user"]
};
</script>

<style scoped>
.nav-tabs > li {
  width: 33.33%;
}

/* @media (max-width: 766px) {
  .nav-tabs > li {
    width: 100%;
    float: none;
  }
} */
</style>

