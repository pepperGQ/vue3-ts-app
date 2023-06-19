import $http from './index'

interface loginData {
    userName:string,
    password:string
}
interface listParam {
    page:number
}
export const login = (data:loginData)=>$http({url:'/login',method:'post',data})
export const getList = (data:listParam)=>$http({url:'/getList',method:'get',data})
export const getRoleList = ()=>$http({url:'/getRoleList',method:'get'})
export const getUserList = ()=>$http({url:'/getUserList',method:'get'})
export const getAuthorityList = ()=>$http({url:'/getAuthorityList',method:'get'})