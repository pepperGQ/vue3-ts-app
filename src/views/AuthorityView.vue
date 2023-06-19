<template>
    <div>
        <!-- <el-tree
    :data="data"
    show-checkbox
    node-key="id"
    :default-expanded-keys="[2, 3]"
    :default-checked-keys="[5]"
    :props="defaultProps"
  /> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import {useRoute} from "vue-router"
import { DataInt } from '@/types/authority'
import {getAuthorityList} from "../http/api"

export default defineComponent({
    setup () {
        const route = useRoute()
        const query:any = route.query
        const data = reactive(new DataInt(query.authority.split(','),query.roleId))
        onMounted(()=>{
            getAuthorityList().then(res=>{
                console.log(res);
                
            })
        })

        return {
            ...toRefs(data)
        }
    }
})
</script>

<style scoped>

</style>