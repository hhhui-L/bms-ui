<template>
  <div class="areaSelect flex">
    <el-select
      :disabled="disabled"
      v-model="province"
      :size="size"
      placeholder="省"
      @change="changeCode($event,0)"
    >
      <el-option
        v-for="item in provinceList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-select
      :disabled="disabled"
      class="center_select"
      v-model="city"
      placeholder="市"
      @change="changeCode($event,1)"
    >
      <el-option
        v-for="item in cityList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-select
      :disabled="disabled"
      v-model="area"
      placeholder="区"
      @change="changeCode($event,2)"
    >
      <el-option
        v-for="item in areaList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'global-city'
}
</script>

<style scoped>

</style>
