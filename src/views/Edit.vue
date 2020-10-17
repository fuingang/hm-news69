<template>
  <div class="edit">
    <hm-header>编辑资料</hm-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      <van-uploader class="upload" :after-read="afterRead" />
    </div>
    <van-cell-group>
      <van-cell
        title="昵称"
        :value="info.nickname"
        is-link
        @click="showNickName"
      />
      <van-cell title="密码" value="*****" is-link />
      <van-cell
        title="性别"
        @click="showGender"
        :value="info.gender == 1 ? '男' : '女'"
        is-link
      />
    </van-cell-group>
    <van-dialog
      @confirm="confirmNickName"
      v-model="show"
      title="请输入新昵称"
      show-cancel-button
    >
      <van-field placeholder="请输入用户名" v-model="nickname" />
    </van-dialog>
    <!-- 性别修改弹出框 -->
    <van-dialog
      @confirm="confirmGender"
      v-model="isShow"
      title="请选择性别"
      show-cancel-button
    >
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="男" clickable @click="radio = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="radio = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      isShow: false,
      info: {},
      nickname: "",
      radio: 0,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      const userid = localStorage.getItem("userid");
      this.$axios.get(`/user/${userid}`).then((res) => {
        // console.log(res.data);
        const { message, statusCode, data } = res.data;
        if (statusCode === 200) {
          this.info = data;
        } else {
          this.$toast(message);
        }
      });
    },
    showNickName() {
      this.show = true;
      this.nickname = this.info.nickname;
    },
    confirmNickName() {
      if (this.nickname === this.info.nickname) {
        this.$toast("新旧昵称不能一样");
        return;
      }
      // const userid = localStorage.getItem("userid");
      // this.$axios
      //   .post(`/user_update/${userid}`, {
      //     nickname: this.nickname,
      //   })
      //   .then((res) => {
      //     console.log(res.data);
      //     const { message, statusCode, data } = res.data;
      //     if (statusCode === 200) {
      //       this.getInfo();
      //     }
      //   });
      this.ul_editUser({
        nickname: this.nickname,
      });
    },
    showGender() {
      this.isShow = true;
      this.radio = this.info.gender;
    },
    confirmGender() {
      if (this.radio === this.info.gender) {
        this.$toast("性别重复");
        return;
      }
      // const userid = localStorage.getItem("userid");
      // this.$axios
      //   .post(`/user_update/${userid}`, {
      //     gender: this.radio,
      //   })
      //   .then((res) => {
      //     // console.log(res.data)
      //     const { message, statusCode } = res.data;
      //     if (statusCode === 200) {
      //       this.getInfo();
      //     }
      //   });
      this.ul_editUser({
        gender: this.radio,
      });
    },
    afterRead(data) {
      // 此时可以自行将文件上传至服务器

      let formdata = new FormData();
      formdata.append("file", data.file);
      this.$axios.post("/upload", formdata).then((res) => {
        // const userid = localStorage.getItem("userid");
        // this.$axios
        //   .post(`/user_update/${userid}`, {
        //     head_img: res.data.data.url,
        //   })
        //   .then((res) => {
        //     // console.log(res.data)
        //     const { message, statusCode } = res.data;
        //     if (statusCode === 200) {
        //       this.getInfo();
        //     }
        //   });
        this.ul_editUser({
          head_img: res.data.data.url,
        });
      });
    },
    ul_editUser(data) {
      const userid = localStorage.getItem("userid");
      this.$axios.post(`/user_update/${userid}`, data).then((res) => {
        // console.log(res.data)
        const { message, statusCode } = res.data;
        if (statusCode === 200) {
          this.getInfo();
          this.$toast(message);
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.avatar {
  text-align: center;
  margin: 20px 0;
  position: relative;
  img {
    height: 70px;
    width: 70px;
    border-radius: 50%;
    object-fit: cover;
  }
  .upload {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
