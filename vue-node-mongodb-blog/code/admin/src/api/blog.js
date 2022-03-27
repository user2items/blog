import axios from "utils/request";

/** 2022-3-20
 * 获取博客日访问，likes等信息
 * @param data
 * @returns {AxiosPromise}
 */
 export function apiGetVisitInfo(params) {
  return axios.get("/blog/getVisitInfo", params);
}


/** 2022-3-16
 * 博客统计信息存储：博客pv, likes, comments, numblog
 * @param data
 * @returns {AxiosPromise}
 */
 export function apiAddVisitInfo(params) {
  return axios.get("/blog/addVisitInfo", params);
}


/**
 * 获取博客列表
 * @param data
 * @returns {AxiosPromise}
 */
export function apiGetBlogList(params) {
  return axios.get("/blog/list", params);
}

/**
 * 获取博客详情
 * @param data
 * @returns {AxiosPromise}
 */
export function apiGetBlogDetail(params) {
  return axios.get("/blog/info", params);
}

/**
 * 新增博客
 * @param data
 * @returns {AxiosPromise}
 */
export function apiAddBlog(params) {
  return axios.postFile("/blog/add", params);
}
/**
 * 修改博客
 * @param data
 * @returns {AxiosPromise}
 */
export function apiUpdateBlog(params) {
  return axios.postFile("/blog/update", params);
}
/**
 * 删除博客
 * @param data
 * @returns {AxiosPromise}
 */
export function apiDelBlog(params) {
  return axios.get("/blog/del", params);
}
