import axios from "utils/request";
/* 
    以日为单位统计： 访问量PV, 点赞数, 评论数等
*/


/**
 * 点赞
 * @param data
 * @returns {AxiosPromise}
 */
 export function apiUpdateLikes(params) {
    return axios.post("/blog/updateLikes", params);
  }


  /**
 * 浏览量
 * @param data
 * @returns {AxiosPromise}
 */
export function apiUpdatePV(params) {
    return axios.post("/blog/updatePV", params);
  }