<template>
  <div id="body" >
    <div id="container">
      <img class="png" src="../assets/404/404.png" />
      <img class="png msg" src="../assets/404/404_msg.png" />
      <router-link to="/main">
        <p><img class="png" src="../assets/404/404_to_index.png" /></p>
      </router-link>
    </div>
    <div id="cloud" class="png"></div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
  #body {
    position:absolute;
    background: url("../assets/404/error_bg.jpg") repeat-x scroll 0 0 #67ACE4;
    height: 100%;
    width: 100%;
  }
  #container {
    margin: 0 auto;
    padding-top: 50px;
    text-align: center;
    width: 560px;
  }
  #container img {
    border: medium none;
    margin-bottom: 50px;
  }
  #container.error {
    height: 200px;
    position: relative;
  }
  #container .error img {
    bottom: -50px;
    position: absolute;
    right: -50px;
  }
  #container .msg {
    margin-bottom: 65px;
  }
  #cloud {
    background: url("../assets/404/error_cloud.png") repeat-x scroll 0 0 transparent;
    bottom: 0;
    height: 170px;
    position: absolute;
    width: 100%;
  }
</style>
