import axios from 'axios';

import router from '../router';
import message from '../utils/message';


// http://zhtc.natapp1.cc
const BASE_URL = process.env.NODE_ENV === 'product' ? 'https://clockin.youcode123.com/' : ''

const request = axios.create({
  baseURL: BASE_URL,
});

request.interceptors.request.use(
  config => {
    config.withCredentials = true
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

request.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    switch (err.response.status) {
      case 400:
        message('error', '账号或密码错误')
        break
      case 401:
        message('error', '未登录状态')
        router.push('/login')
        break;
      case 404:
        message('error', '请求不存在')
        break;
      case 500:
        message('error', '服务器错误')
        break
      default:
        break
    }
    return Promise.reject(err);
  }
);

export default request;