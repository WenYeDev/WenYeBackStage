import request from '@/utils/request'

// export function fetchList(query) {
//   return request({
//     url: '/vue-element-admin/article/list',
//     method: 'get',
//     params: query
//   })
// }
export function zipList(query) {
  return request({
    url: '/zip/get',
    method: 'get',
    params: query,
    baseURL: 'http://81.70.240.186:1234/wenye'
  })
}
export function dataList(query) {
  return request({
    url: '/data/list',
    method: 'get',
    params: query,
    baseURL: 'http://81.70.240.186:1234/wenye'
  })
}
export function dataGet(query) {
  return request({
    url: '/data/get',
    method: 'post',
    baseURL: 'http://81.70.240.186:1234/wenye',
    data: { query }
  })
}
export function ZipUpload(file) {
  return request({
    url: '/zip/upload',
    method: 'post',
    data: file,
    headers:{
      'Content-Type':'multipart/form-data'
    },
    baseURL: 'http://81.70.240.186:1234/wenye'
  })
}
// export function fetchArticle(id) {
//   return request({
//     url: '/vue-element-admin/article/detail',
//     method: 'get',
//     params: { id }
//   })
// }

// export function fetchPv(pv) {
//   return request({
//     url: '/vue-element-admin/article/pv',
//     method: 'get',
//     params: { pv }
//   })
// }

// export function createArticle(data) {
//   return request({
//     url: '/vue-element-admin/article/create',
//     method: 'post',
//     data
//   })
// }

// export function updateArticle(data) {
//   return request({
//     url: '/vue-element-admin/article/update',
//     method: 'post',
//     data
//   })
// }
