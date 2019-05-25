import axios from "axios";
import Vue from "vue"
import commonUtil from "./commonUtil.js"

axios.defaults.timeout=60000

let path = ""
if (process.env.NODE_ENV === 'development') {
  path = ' https://easy-mock.com/mock/5ce893b1aa0d9228ec8a8028/example_copy_copy/'
}else if(process.env.NODE_ENV === 'pred') {
  path = "https://ndsite.allhome.com.cn/"
} else {
  path = "https://ndsite.allhome.com.cn/"
}
axios.defaults.baseURL = path

axios.interceptors.request.use((config)=>{
    var token=commonUtil.getCookie("token")
    if(token){
        config.headers.token=token
    }
    config.headers["Content-Type"]="application/json"
    return config
},(error)=>{
    return Promise.reject(error)
})
axios.interceptors.response.use((res)=>{
    return res
},(error)=>{
    return error
})

export default axios
