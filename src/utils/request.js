import axios from 'axios'

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
      baseURL: process.env.VUE_APP_API,
      timeout: 5000
    }).then((res) => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}
