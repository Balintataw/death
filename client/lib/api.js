import axios from 'axios'
import store from '../store'

const instance = axios.create()

// instance.tokenPath = '/login'
// instance.registerPath = '/registration'
// instance.token = window.localStorage.getItem('token') || null

instance.new = function(url = '/') {
  this.defaults.baseURL = url

//   if (this.token) {
//     this.tokenInterceptor = this.interceptors.request.use(config => {
//       config.headers['Authorization'] = 'Bearer ' + this.token
//       return config
//     })
//   }
}

instance.setTokenPath = function(path) {
  this.tokenPath = path
}

instance.getTokenPath = function() {
  return this.tokenPath
}

instance.setRegisterPath = function(path) {
  this.registerPath = path
}

instance.getRegisterPath = function() {
  return this.registerPath
}

export default instance