<template>
        <el-header style="text-align: right; font-size: 12px">
                <el-dropdown style="cursor:pointer" trigger="click">
                        <a style="font-size: 30px" class="el-icon-caret-bottom">
                                <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                                </el-avatar>
                        </a>
                  <span class="el-dropdown-link">
                  </span>
                        <el-dropdown-menu style="margin-top: -20px" slot="dropdown">
                                <el-dropdown-item class="clearfix">
                                        评论
                                        <el-badge class="mark" :value="12"/>
                                </el-dropdown-item>
                                <el-dropdown-item class="clearfix">
                                        回复
                                        <el-badge class="mark" :value="3"/>
                                </el-dropdown-item>
                        </el-dropdown-menu>
                </el-dropdown>

        </el-header>
</template>

<script>
export default {
        name: "Header"
}
</script>

<style scoped>

</style>