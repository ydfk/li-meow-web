<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-24 17:24:45
 * @LastEditors: ydfk
 * @LastEditTime: 2021-10-29 15:47:22
-->
<template>
  <router-view />
</template>

<style lang="scss">
  html {
    @apply h-full w-full bg-[rgb(247,248,250)];

    font-family: $fontFamily;
  }

  body {
    @apply h-full w-full;

    touch-action: pan-x pan-y;
  }

  #app {
    @apply h-full w-full;
  }
</style>
