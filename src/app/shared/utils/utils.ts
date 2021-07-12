/*
 * @Author: Stevie
 * @Date: 2021-07-08 10:13:19
 * @LastEditTime: 2021-07-12 15:20:37
 * @LastEditors: Stevie
 * @Description:
 */
export function firstUpperCase(str: string) {
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}