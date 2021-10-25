<template>
  <div style="background-color: white">
    <div v-for="item in realtimeDetails" :key="item.dev_num" style="height: 135px;width: 21%;margin:20px;float: left">
      <span :id="'devId'+ (index+1)" :ref="devId+'index'" style="font-size: 20px">
        {{item.dev_num}}
      </span>
      <img @click="open($event)" :id="'sensor'+ (item.dev_num)" src="../assets/battery/80%.png">
  </div>
  </div>
</template>
<script>
export default {
  name: 'test',
  data () {
    return {
      realtimeDetails: [
        {
          Res: '586',
          dev_num: '001',
          Volt: '2.147',
          Soh: '0.172'
        },
        {
          Res: '586',
          dev_num: '002',
          Volt: '2.147',
          Soh: '0.172'
        },
        {
          Res: '586',
          dev_num: '003',
          Volt: '2.147',
          Soh: '0.172'
        },
        {
          Res: '586',
          dev_num: '004',
          Volt: '2.147',
          Soh: '0.172'
        }
      ]
    }
  },
  methods: {
    getId (index) {
      console.log(JSON.stringify(this.realtimeDetails.splice(index,1)))
    },
    open (a) {
      console.log(a.currentTarget.id)// 1
    }

  }
}
</script>

<style scoped>
</style>
