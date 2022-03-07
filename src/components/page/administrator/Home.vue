<template>
<div  class="index">

        <el-container class="index">
                <el-aside width="220px">
                        <div class="logo">
                                <p>Public Welfare Forest </p>
                        </div>
                        <hr>
                        <div class="photo">
                                <el-avatar :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                                </el-avatar>
                                <p>Public welfare forest management system</p>
                        </div>
                        <hr>
                        <Navigation/>
                </el-aside>
                        <el-container>
                                <el-header>
                                        <Header/>
                                </el-header>
                                <el-main>
                                        <Main/>
                                </el-main>
                                <el-footer>Footer</el-footer>
                        </el-container>

        </el-container>

</div>
</template>

<script>
import Header from "@/components/page/administrator/Header";
import Navigation from "@/components/page/administrator/Navigation";
import Main from "@/components/page/administrator/Main";
export default {
        name: "Home",
        components:{Navigation, Header,Main}
}
</script>

<style scoped>
.index{
        height: 100%;
        width: 100%;
}
.logo{
        line-height: 60px;
}
.logo p{
        text-shadow: 5px 5px 5px #161311;
        font-size: 22px;
}
.photo{
        padding-top: 10px;
        line-height: 30px;
}
.photo p{
        line-height: 20px;
}
.el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
}

.el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
}

.el-main {
        padding: 10px;
        background-color: #E9EEF3;
        color: #333;
        /*text-align: center;*/
        /*line-height: 160px;*/
}

body > .el-container {
        margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
        line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
        line-height: 320px;
}
</style>