<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="标题">
                    <el-input v-model="selectData.title" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="selectData.body" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="list" style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="title" label="标题" width="180" />
    <el-table-column prop="body" label="内容" />
  </el-table>
  <el-pagination layout="prev, pager, next" :total="selectData.count" @current-change="pageChange"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs,reactive, onMounted } from 'vue'
import { inintData } from '@/types/orderTypes';
import type {  listData } from '@/types/orderTypes';
import {getList} from '../http/api'

export default defineComponent({
    setup() {
        const data = reactive( new inintData() )
        onMounted(()=>{
            // getList({page:data.selectData.page}).then( res=>{
            //     console.log(res);
            //     data.selectData.count = res.data.length
            //     data.list = res.data
            // }    
            // )
            getListData()
        })
        const getListData = ()=>{
            getList({page:data.selectData.page}).then( res=>{
                console.log(res);
                data.dataList = res.data
                // const currentPage = data.selectData.page
                // data.selectData.count = res.data.length
                // const start = currentPage*10-9 -1
                // const end = currentPage*10 > data.selectData.count ? data.selectData.count : currentPage*10-1
                
                // data.list = res.data.slice(start,end+1)
                sliceData(res.data)
            }    
            )
        }
        const sliceData = (listData:listData[]) =>{
            const currentPage = data.selectData.page
            data.selectData.count = listData.length
            const start = currentPage*10-9 -1
            const end = currentPage*10 > data.selectData.count ? data.selectData.count : currentPage*10-1
            data.list = listData.slice(start,end+1) 
        }
        const pageChange = (page:number)=>{
            console.log(page,'page');
            data.selectData.page = page
            getListData()
        }
        const onSubmit = ()=>{
            let arr:listData[] = []
            if(data.selectData.title){
                arr = data.dataList.filter(item => item.title.indexOf(data.selectData.title)!==-1)
            }
            if(data.selectData.body){
                arr = data.dataList.filter(item => item.body.indexOf(data.selectData.body)!==-1)
            }
            sliceData(arr)
        }
        return {
            ...toRefs(data),
            pageChange,
            onSubmit
        }
    }
})
</script>

<style scoped></style>