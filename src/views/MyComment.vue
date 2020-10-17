<template>
  <div>
    <hm-header>跟帖/回复</hm-header>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="item" v-for="item in list" :key="item.id">
        <div class="date">{{ item.create_date }}</div>
        <div class="parent" v-if="item.parent">
          <div class="parent-nickname">
            回复 : {{ item.parent.user.nickname }}
          </div>
          <div class="parent-content line2">
            {{ item.parent.content }}
          </div>
        </div>
        <div class="content">{{ item.content }}</div>
        <div class="post">
          <div class="title line1">
            {{ item.post.title }}
          </div>
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      loading: false,
      finished: false,
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    async getComments() {
      let res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: 5,
        },
      })
      console.log(res.data)
      const { message, statusCode, data } = res.data
      if (statusCode === 200) {
        this.loading = false
        if (data.length < 5) {
          this.finished = true
        }
        this.list = [...this.list, ...data]
      }
    },
    onLoad() {
      console.log('到底了')
      this.pageIndex++
      this.getComments()
    },
  },
}
</script>

<style scoped lang="less">
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  .date {
    line-height: 20px;
    height: 20px;
    color: #999;
  }
  .parent {
    background: #ddd;
    padding: 10px;
    color: #999;
    &-nickname {
      height: 20px;
      line-height: 20px;
    }
    &-content {
      font-size: 14px;
      line-height: 25px;
    }
  }
  .content {
    font-size: 14px;
    padding: 10px 0;
  }
  .post {
    display: flex;
    color: #999;
    .title {
      flex: 1;
    }
    .iconfont {
      width: 20px;
      text-align: center;
    }
  }
}
</style>
