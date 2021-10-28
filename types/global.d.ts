/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-09-16 20:58:08
 * @LastEditors: ydfk
 * @LastEditTime: 2021-09-16 20:58:09
 */
declare global {
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    };
    lastBuildTime: string;
  };
}
