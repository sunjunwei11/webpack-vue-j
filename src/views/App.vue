<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <el-button @click="count++">Click</el-button>
  <div class="count">You clicked me {{ count }} times.</div>
</template>

<style scoped>
.count {
  color: pink;
}
</style>
