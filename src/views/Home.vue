<template>
  <div>
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="right">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <van-tabs v-model="active" sticky>
      <van-tab :title="item.name" v-for="item in navlist" :key="item.id">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="10"
          >
            <hm-post
              v-for="(item, index) in articlelist"
              :key="index"
              :post="item"
            ></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      navlist: [],
      articlelist: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
      isLoading: false,
    };
  },
  async created() {
    let res = await this.$axios.get("/category");
    const { statusCode, data } = res.data;
    if (statusCode === 200) {
      this.navlist = data;
      this.getArticlelist(this.navlist[this.active].id);
    }
  },
  watch: {
    active(newValue) {
      this.pageIndex = 1;
      this.loading = true;
      this.finished = false;
      this.articlelist = [];
      this.getArticlelist(this.navlist[newValue].id);
    },
  },
  methods: {
    async getArticlelist(id) {
      let res = await this.$axios.get("/post", {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      });
      const { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.articlelist = [...this.articlelist, ...data];
      }
      this.loading = false;
      if (data.length < 5) {
        this.finished = true;
      }
      this.isLoading = false;
    },
    onLoad() {
      console.log("触底了");
      this.pageIndex++;
      this.getArticlelist(this.navlist[this.active].id);
    },
    onRefresh() {
      this.pageIndex = 1;
      this.loading = true;
      this.finished = false;
      this.articlelist = [];
      this.getArticlelist(this.navlist[this.active].id);
    },
  },
};
</script>

<style scoped lang="less">
.header {
  height: 70px;
  display: flex;
  background: red;
  align-items: center;
  color: #fff;
  text-align: center;
  .left,
  .right {
    width: 70px;
  }
  .iconnew {
    font-size: 70px;
  }
  .iconwode {
    font-size: 40px;
  }
  .iconsearch {
    margin-right: 20px;
  }
  .center {
    flex: 1;
    background: #888;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
  }
}
</style>