export interface selectData{
    title:string,
    body:string,
    page:number,
    count:number
}
 export interface listData{
    id:number,
    userId:number,
    title:string,
    body:string,
 }
export class inintData  {
    selectData: selectData ={
        title: '',
        body: '',
        page:1,
        count:0
    }
    list:listData[] = []
    dataList:listData[] = []
}