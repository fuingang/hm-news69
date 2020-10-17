<template>
  <div>
    <hm-header>文档/视频</hm-header>
    <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },
  async created() {
    let res = await this.$axios.get('/user_star')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.list = data
      console.log(data)
    }
  },
}
</script>

<style></style>
