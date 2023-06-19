<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="selectData.nikeName" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="selectData.role" placeholder="请选择">
                        <el-option label="全部" :value="0" />
                        <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                            :value="item.roleId" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label="id" width="180" />
            <el-table-column prop="nikeName" label="姓名" width="180" />
            <el-table-column prop="role" label="角色">
                <template #default="scope">
                    <el-button v-for="item in scope.row.role" :key="item.role" link size="small">
                        {{ item.roleName }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="action" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="changeUser(scope.row)">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="isShow" title="编辑信息">
            <el-form :model="active">
                <el-form-item label="姓名" label-width="50px">
                    <el-input v-model="active.nikeName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色" label-width="50px">
                    <el-select multiple v-model="active.role" placeholder="请选择">
                        <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                            :value="item.roleId" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="isShow = false">取消</el-button>
                    <el-button type="primary" @click="onEdit">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted } from 'vue'
import { inintData } from '@/types/user';
import type { listData } from '@/types/user';
import { getRoleList, getUserList } from '../http/api'

export default defineComponent({
    setup() {
        const data = reactive(new inintData())
        onMounted(() => {
            getListData()
            getRoleData()
        })
        const getListData = () => {
            getUserList().then(res => {
                console.log(res);
                data.list = res.data
            }
            )
        }
        const getRoleData = () => {
            getRoleList().then(res => {
                data.roleList = res.data
            })
        }


        const onSubmit = () => {


        }
        const changeUser = (row: listData) => {
            console.log(row);
            
            data.isShow = true
            data.active = {
                id: row.id,
        nikeName: row.nikeName,
        userName:row.userName,
        role:row.role.map(item => item.role), 
            }
            console.log(data.active,row.role.map(item => item.role));
               
        }
        const onEdit=()=>{
            const index:number = data.list.findIndex(item => item.id== data.active.id )
            const editData = {
                id: data.active.id,
        nikeName: data.active.nikeName,
        userName:data.active.userName,
        role:data.roleList.map(item => {
            if(data.active.role.includes(item.roleId)){
                return {
                    role:item.roleId,
                    roleName:item.roleName
                }
            }
        }
        ).filter(Boolean), 
            }
            console.log(editData,'@@@');
            
            data.list.splice(index,1,{...editData})
            // console.log(data.roleList,data.roleList.filter(item => data.active.role.includes(item.roleId)),data.list);
            
            data.isShow = false    
        }
        return {
            ...toRefs(data),
            onSubmit,
            changeUser,
            onEdit
        }
    }
})
</script>

<style scoped></style>