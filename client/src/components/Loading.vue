<template>
    <div id="loading-screen">
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped>
    #loading-screen {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(200, 200, 200, 0.5);
      width: 100%;
      height: 100%;
    }

    .spinner {
      width: 80px;
      height: 80px;
      position: relative;
      margin: 0 auto;
      top: 50%;
      margin-top: -20px;
    }

    .double-bounce1,
    .double-bounce2 {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: royalblue;
      position: absolute;
      top: 0;
      left: 0;
      -webkit-animation: sk-bounce 2s infinite ease-in-out;
      animation: sk-bounce 2s infinite ease-in-out;
    }

    .double-bounce2 {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }

    @-webkit-keyframes sk-bounce {
      0%,
      100% {
        -webkit-transform: scale(0);
        background-color: royalblue;
      }

      50% {
        -webkit-transform: scale(1);
        background-color: crimson;
      }
    }
</style>

