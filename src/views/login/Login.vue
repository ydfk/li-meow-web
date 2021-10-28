<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 09:16:24
 * @LastEditors: ydfk
 * @LastEditTime: 2021-10-27 14:40:17
-->
<template>
  <div class="login">
    <div class="flex justify-center">这是登录</div>
    <p>{{ user }}</p>
    <router-link :to="{ name: 'dashboard' }"> 主页 </router-link>
  </div>
</template>

<script lang="ts">
  import { loginApi } from "@/apis/login";

  import { defineComponent, onMounted, ref } from "vue";

  export default defineComponent({
    setup() {
      const user = ref({});

      onMounted(async () => {
        user.value = await loginApi("u", "p");
      });

      return {
        user: user,
      };
    },
  });
</script>
