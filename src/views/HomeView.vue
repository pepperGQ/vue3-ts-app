<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <div>
              <img class="logo-img" src="../assets/logo.svg">
            </div>
          </el-col>
          <el-col :span="16">
            <h2 class="header-title">后台系统</h2>
          </el-col>
          <el-col :span="4">
            <el-button class="btn-text" type="primary" link @click="logout">退出登陆</el-button>
          </el-col>
        </el-row>

      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
          router
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="/order"
        text-color="#fff"
      >
        <el-menu-item v-for="item in list" :key="item.path" :index="item.path">
          <el-icon><icon-menu /></el-icon>
          <span>{{item.meta.title}}</span>
        </el-menu-item>
      </el-menu>
        </el-aside>
        <el-main>
          <RouterView/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useRouter} from 'vue-router'
export default defineComponent({
  name:'HomeView',
  components:{},
  setup(){
    const router = useRouter()
    const list = router.getRoutes().filter(item=>item.meta.isShow)
    const logout = ()=>{
      localStorage.removeItem('token')
      router.push('/login')
    }
    return {
      list,
      logout
    }

  }

})
</script>
<style lang="scss" scoped>
.el-header{
  background-color: #535c64;
  height: 80px;
}
.logo-img{
  height: 80px;
}
.header-title{
  height: 80px;
  line-height: 80px;
  text-align: center;
  color: #fff;
  margin: 0px;
}
.btn-text{
  text-align: right;
  height: 80px;
  line-height: 80px;

}
.el-menu{
  height: calc(100vh - 80px);
}
.el-main{
  height: calc(100vh - 80px);
  overflow-y: auto;
}
</style>