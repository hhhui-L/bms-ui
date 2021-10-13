<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted () {
    window.addEventListener('unload', this.savaState)
  },
  methods: {
    savaState () {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state.user))
    }
  }
}
</script>
<style>
  .el-table--border th.gutter:last-of-type {
    display: block!important;
    width: 17px!important;
  }
  html,body,#app{
    height: 100%;
    margin: 0;
  }
</style>
