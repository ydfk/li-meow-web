/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-24 17:24:45
 * @LastEditors: ydfk
 * @LastEditTime: 2021-10-29 15:49:25
 */
import { ConfigEnv, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { viteMockServe } from "vite-plugin-mock";
import WindiCSS from "vite-plugin-windicss";
import pkg from "./package.json";
import dayjs from "dayjs";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Inspect from "vite-plugin-inspect";

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), ".", dir);
};

export default ({ mode, command }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  const isBuild = command === "build";

  const mockPlugin =
    env.VITE_USE_MOCK &&
    viteMockServe({
      ignore: /^\_/,
      mockPath: "mock",
      localEnabled: command === "serve",
      prodEnabled: command !== "serve" && isBuild,
      injectCode: `
        import { setupProdMockServer } from '../mock/_createProductionServer';
        setupProdMockServer();
      `,
    });

  return defineConfig({
    plugins: [
      vue({ refTransform: true }),
      Inspect(),
      Components({
        dts: "types/components.d.ts",
        resolvers: [
          AntDesignVueResolver(),
          IconsResolver({
            componentPrefix: "",
            // enabledCollections: ['carbon']
          }),
        ],
      }),
      AutoImport({
        imports: ["vue", "vue-router"],
        dts: "types/auto-imports.d.ts",
      }),
      Icons({
        autoInstall: true,
      }),
      WindiCSS(),
      mockPlugin,
    ],
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: pathResolve("src") + "/",
        },
        {
          find: /#\//,
          replacement: pathResolve("types") + "/",
        },
      ],
    },
    base: "./",
    server: {
      port: Number(env.VITE_PORT), // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域

      // 设置代理，根据我们项目实际情况配置
      proxy: {
        "/api": {
          target: env.VITE_PROXY_HOST,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/var.scss";`,
        },
      },
    },

    build: {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },

    optimizeDeps: {
      include: ["vue", "vue-router", "lodash-es"],
      exclude: ["vue-demi"],
    },

    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  });
};
