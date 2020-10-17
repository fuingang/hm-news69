<template>
  <div class="user">
    <hm-header>个人中心</hm-header>
    <div class="info">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" />
      </div>
      <div class="center">
        <div class="nickname">
          <i class="iconfont iconxingbienv"></i>
          {{ info.nickname }}
        </div>
        <div class="date">{{ info.create_date | date }}</div>
      </div>
    </div>
    <van-cell-group>
      <van-cell
        @click="$router.push('/my-follow')"
        title="我的关注"
        is-link
        value="关注的人"
      />
      <van-cell
        @click="$router.push('/my-comment')"
        title="我的跟帖"
        is-link
        value="跟帖与回复"
      />
      <van-cell
        @click="$router.push('/my-star')"
        title="我的收藏"
        is-link
        value="文档与视频"
      />
      <van-cell title="设置" is-link @click="edit" />
      <van-cell @click="logout" title="退出" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
    }
  },
  created() {
    const id = localStorage.getItem('userid')
    this.$axios.get(`/user/${id}`).then(res => {
      // console.log(res.data)
      const { message, statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    })
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          titiel: '温馨提示',
          message: '你确定退出账号？',
        })
        .then(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('token')
          this.$toast('退出成功')
          this.$router.push('/login')
        })
        .catch(() => {})
    },
    edit() {
      this.$router.push('/edit')
    },
  },
}
</script>

<style scoped lang="less">
.info {
  height: 100px;
  border-bottom: 2px solid #cccccc;

  display: flex;
  padding: 0 20px;
  align-items: center;

  .left {
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .center {
    flex: 1;
    padding-left: 20px;
    height: 50px;
    line-height: 25px;
    font-size: 14px;
  }
}
</style>
