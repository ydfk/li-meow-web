/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-09-16 20:47:49
 * @LastEditors: ydfk
 * @LastEditTime: 2021-09-16 20:47:50
 */
import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";

export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
      colors: {
        ...colors,
        primary: "#0960bd",
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1600px",
      },
    },
  },
});
