import axios from 'axios'
import { ElMessage } from 'element-plus'

enum MSG  {
    "请求成功！" = 200,
    "请求失败"
}
// 创建http实例
const $http = axios.create({
    baseURL:"https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api",
    timeout:2000,
    headers:{
        "Content-Type":"application/json;charset=utf-8"
    }
})


// 请求拦截
$http.interceptors.request.use(config =>{
    config.headers = config.headers || {}
    if(localStorage.getItem('token')){
        config.headers.token = localStorage.getItem('token') || ''
    }
    return config 
})

// 响应拦截
$http.interceptors.response.use(res =>{
    // res:{
    //     code:200,
    //     mag:'',
    //     data:
    // }
    const code:number = res.data.code
    if(code != 200){
        
        ElMessage.error(MSG[code])
        return Promise.reject(res.data)
    }
    return res.data
},err=>{
    console.log(err)
    
})

export default $http