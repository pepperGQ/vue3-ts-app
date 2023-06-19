export interface selectData {
    nikeName: string,
    role: number
}
interface RoleInt {
    role: number,
    roleName: string,
}
export interface listData {
    id: number,
    nikeName: string,
    userName: string,
    role: RoleInt[],
}
interface RoleListInt {
    roleName: String,
    roleId: number,
    suthorty: number[]
}
interface ActiveInt {
    id: number,
    nikeName: string,
    userName:string,
    role:number[],
}
export class inintData {
    selectData: selectData = {
        nikeName: '',
        role: 0,
    }
    list: [listData][] = []
    roleList: [RoleListInt][] = []
    isShow = false
    active: ActiveInt = {
        id: 0,
        nikeName: '',
        userName:'',
        role:[0],
    }
}