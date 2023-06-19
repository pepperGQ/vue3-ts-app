<template>
    <div class="login-box">
        <el-form ref="ruleFormRef" :model="loginForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
            <h1>后台管理系统</h1>
            <el-form-item label="账号" prop="userName">
                <el-input v-model="loginForm.userName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit(ruleFormRef)">Submit</el-button>
                <el-button>Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs,ref } from 'vue'
import { initData } from '../types/types'
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '../http/api'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const ruleFormRef = ref<FormInstance>()
        const data = reactive(new initData())
        const Router = useRouter()
        const rules = {
            userName: [
                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 3, max: 10, message: '账号的长度为3到10', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 10, message: '密码的长度为3-10', trigger: 'blur' },
            ],
        }
        const submit = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate((valid, fields) => {
                if (valid) {
                    // console.log('submit!')
                    login( data.loginForm ).then(res=>{
                        console.log(res)
                        localStorage.setItem('token',res.data.token)
                        Router.push('/')
                    })
                } else {
                    console.log('error submit!', fields)
                }
            })
        }
        return { ...toRefs(data), rules, submit,ruleFormRef }
    }
})
</script>

<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100%;
    background-color: #211d48;
    padding: 1px;

    .h1 {
        text-align: center;
    }

}

.demo-ruleForm {
    width: 500px;
    margin: 200px auto;
    background-color: #fff;
    padding: 20px;

}
</style>