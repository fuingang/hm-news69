<template>
  <div class="register">
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <van-cell-group>
      <van-field
        v-model="username"
        required
        label="用户名"
        placeholder="请输入用户名"
        :error-message="usernameerrmsg"
        clearable
        @input="checkUsername"
        @clear="clearUsername"
      />
      <van-field
        v-model="nickname"
        required
        label="昵称"
        placeholder="请输入昵称"
        :error-message="nicknameerrmsg"
        clearable
        @input="checkNickname"
        @clear="clearNickname"
      />
      <van-field
        v-model="password"
        required
        label="密码"
        placeholder="请输入密码"
        :error-message="passworderrmsg"
        clearable
        @input="checkPassword"
        @clear="clearPassword"
      />
    </van-cell-group>
    <hm-button @click.native="startRegister">注册</hm-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      usernameerrmsg: "",
      nickname: "",
      nicknameerrmsg: "",
      password: "",
      passworderrmsg: "",
    };
  },
  methods: {
    checkUsername() {
      const reg = /^1\d{3,5}$/;
      if (reg.test(this.username)) {
        this.usernameerrmsg = "";
      } else {
        this.usernameerrmsg = "用户名格式错误";
      }
    },
    clearUsername() {
      this.username = "";
      this.usernameerrmsg = "";
    },
    checkNickname() {
      const reg = /^[\u4e00-\u9fa5]{3,7}$/;
      if (reg.test(this.nickname)) {
        this.nicknameerrmsg = "";
      } else {
        this.nicknameerrmsg = "昵称格式错误";
      }
    },
    clearNickname() {
      this.nickname = "";
      this.nicknameerrmsg = "";
    },
    checkPassword() {
      const reg = /^\d{3,12}$/;
      if (reg.test(this.password)) {
        this.passworderrmsg = "";
      } else {
        this.passworderrmsg = "密码格式错误";
      }
    },
    clearPassword() {
      this.password = "";
      this.passworderrmsg = "";
    },
    startRegister() {
      if (
        this.username !== "" &&
        this.usernameerrmsg === "" &&
        this.nickname !== "" &&
        this.nicknameerrmsg === "" &&
        this.password !== "" &&
        this.passworderrmsg === ""
      ) {
        axios
          .post("/register", {
            username: this.username,
            nickname: this.nickname,
            password: this.password,
          })
          .then((res) => {
            const { message, statusCode } = res.data;
            if (statusCode === 200) {
              this.$toast.success(message);
              this.$router.push({
                name: "/login",
                params: {
                  username: this.username,
                  password: this.password,
                },
              });
            } else {
              this.$toast.fail(message);
            }
          });
      } else {
        this.$toast.fail("校验不通过");
      }
    },
  },
};
</script>

<style></style>
