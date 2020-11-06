<template>
  <div class="">
    <input type="text" v-model="code" @blur="login" />
    <img :src="url" alt="" style="height:80px;width:100px" />
  </div>
</template>

<script>
import * as api from "@/api/login";
import { setLocal } from "@/utils/local";
export default {
  data() {
    return {
      url: "",
      code: ""
    };
  },
  components: {},
  created() {
    api.getCodeImg().then(res => {
      this.url = "data:image/gif;base64," + res.img;
      this.uuid = res.uuid;
    });
  },
  methods: {
    login() {
      api.login("admin", "admin123", this.code, this.uuid).then(res => {
        setLocal("token", res.token);
        this.$router.push("/");
      });
    }
  }
};
</script>

<style scoped></style>
