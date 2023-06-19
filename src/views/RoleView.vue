<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="addRole">
                    添加角色
                </el-button>
            </el-form-item>
        </el-form>

        <el-table :data="list" style="width: 100%">
            <el-table-column prop="roleId" label="roleId" width="180" />
            <el-table-column prop="roleName" label="角色" width="180" />
            <el-table-column prop="action" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="changeAuthority(scope.row)">
                        修改权限
                    </el-button>
                </template>
            </el-table-column>>
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getRoleList } from '../http/api'
import { DataInt } from "../types/role"
import type { listInt } from "../types/role"
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import {useRouter} from "vue-router"

export default defineComponent({
    setup() {
        onMounted(() => {
            getRoleList().then(res => {
                data.list = res.data
            })
        })
        const data = reactive(new DataInt)
        const router = useRouter()
        const changeAuthority = (row:listInt) => {
            router.push({
                name:'authority',
                query:{
                    roleId:row.roleId,
                    authority:row.authority.join(',')
                }
            })
        }
        const addRole = () => {
            ElMessageBox.prompt('请输入角色名称', '添加角色', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                    if (value) {
                        data.list.push({
                            authority: [],
                            roleId: data.list.length + 1,
                            roleName: value
                        })
                        ElMessage({
                        type: 'success',
                        message: `${value}角色添加成功！`,
                    })
                    }  
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '操作取消！',
                    })
                })
        }
        return {
            ...toRefs(data),
            changeAuthority,
            addRole
        }
    }
})
</script>

<style scoped></style>