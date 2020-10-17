<template>
  <div>
    <hm-header>关注的用户</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
        </div>
        <div class="center">
          <div class="nickname">{{ item.nickname }}</div>
          <div class="date">{{ item.create_date | date }}}}</div>
        </div>
        <div class="right" @click="cancelFollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.getFollows()
  },
  methods: {
    async getFollows() {
      let res = await this.$axios.get('/user_follows')
      // console.log(res.data)
      const { message, statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async cancelFollow(id) {
      await this.$dialog.confirm({
        title: '标题',
        message: '你确定删除此关注？',
      })
      let res = await this.$axios.get(`/user_unfollow/${id}`)
      this.getFollows()
    },
  },
}
</script>

<style scoped lang="less">
.list {
  .item {
    height: 90px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .left {
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .center {
      flex: 1;
      padding-left: 20px;
      height: 50px;
      line-height: 25px;
      .nickname {
        font-size: 14px;
      }
      .date {
        color: #999;
      }
    }

    .right {
      background: #ddd;
      padding: 0 20px;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      color: #000;
    }
  }
}
</style>
