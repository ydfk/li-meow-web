/*
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-09-16 21:00:09
 * @LastEditors: ydfk
 * @LastEditTime: 2021-09-16 21:00:09
 */
import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

//@ts-ignore
const modules = import.meta.globEager("./**/*.ts");

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes("/_")) {
    return;
  }
  mockModules.push(...modules[key].default);
});

export function setupProdMockServer() {
  createProdMockServer([...mockModules]);
}
