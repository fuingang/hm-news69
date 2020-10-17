<template>
  <div class="login">
    <hm-header>登录</hm-header>
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
    <hm-button @click.native="startLogin">登录</hm-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      usernameerrmsg: "",
      passworderrmsg: "",
    };
  },
  created() {
    const { username, password } = this.$route.params;
    this.username = username;
    this.password = password;
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
    startLogin() {
      if (
        this.username !== "" &&
        this.usernameerrmsg === "" &&
        this.password !== "" &&
        this.passworderrmsg === ""
      ) {
        axios
          .post("/login", {
            username: this.username,
            password: this.password,
          })
          .then((res) => {
            const { message, statusCode, data } = res.data;
            if (statusCode === 200) {
              localStorage.setItem("token", data.token);
              localStorage.setItem("userid", data.user.id);
              this.$toast.success(message);
              this.$router.push("/user");
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
