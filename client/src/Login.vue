<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2" style="margin-top: 150px; text-align:center;">
                <h2 class="text-center">
                    <small>Welcome to</small> KDURUM</h2>
                <hr>
                <a class="btn btn-lg btn-primary" href="/auth/facebook">
                    <img :src="facebookLogoImg" aria-hidden="true">&nbsp;&nbsp;
                    <p style="vertical-align: middle; display: inline;">Login with Facebook</p>
                </a>
            </div>
        </div>
        <br>
        <br>
        <div class="row">
            <div class="col-xs-12 text-center">
                <h5>
                    <small>Developed by
                        <b>AI Expert</b>
                    </small>
                </h5>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          facebookLogoImg: require("./assets/f-logo.png")
        };
      }
    };
</script>
