<template>
                <el-menu unique-opened="unique-opened" collapse-transition router>
                <el-submenu index="1">
                        <template slot="title">
                                <i class="nav el-icon-user">&nbsp; &nbsp;&nbsp; &nbsp;User </i>
                        </template>
                                <el-menu-item index="/account">Account List</el-menu-item>
                                <el-menu-item index="/employee">Employees List</el-menu-item>
                                <el-menu-item index="/members">Members Modified</el-menu-item>
                </el-submenu>

                <el-submenu index="2">
                        <template slot="title">
                                <i class="nav el-icon-s-flag">&nbsp; &nbsp;&nbsp; &nbsp;Regional</i>
                        </template>
                                <el-menu-item  index="/regionalManagement">Partition Management</el-menu-item>
                                <el-menu-item  index="/regionalInfo">Partition Information</el-menu-item>
                </el-submenu>

                <el-submenu index="3">
                        <template slot="title"><i class="nav el-icon-s-order">&nbsp; &nbsp;&nbsp; &nbsp;Assignment</i></template>
                                <el-menu-item  index="/assignmentList">Assignment List</el-menu-item>
                                <el-menu-item  index="/addAssignment">Post Assignment</el-menu-item>

                </el-submenu>

                <el-submenu index="5">
                                <template slot="title"><i class="nav el-icon-document-checked">&nbsp; &nbsp;&nbsp; &nbsp;Approval</i></template>

                                        <el-menu-item  index="/applyList">Apply List</el-menu-item>
                                        <el-menu-item  index="5-2">Approval History</el-menu-item>
                        </el-submenu>

                <el-submenu index="6">
                                <template slot="title"><i class="nav el-icon-takeaway-box">&nbsp; &nbsp;&nbsp; &nbsp;Inventory</i></template>
                                        <el-menu-item  index="6-1">Inventory list</el-menu-item>
                                        <el-menu-item  index="6-2">Goods Add</el-menu-item>
                                        <el-menu-item  index="6-3">Inventory Records</el-menu-item>
                </el-submenu>
                <el-submenu index="7">
                                <template slot="title"><i class="nav el-icon-money">&nbsp; &nbsp;&nbsp; &nbsp;Capital Flow</i></template>
                                        <el-menu-item  index="7-1">Total Money</el-menu-item>
                                        <el-menu-item  index="7-2">Spending Record</el-menu-item>
                                        <el-menu-item  index="7-3">Economic Benefit</el-menu-item>
                </el-submenu>



                        <el-submenu index="8">
                                <template slot="title"><i class="nav el-icon-setting">&nbsp; &nbsp;&nbsp; &nbsp;System Record</i></template>
                                <el-menu-item  index="8-1">System Record</el-menu-item>
                        </el-submenu>

        </el-menu>
</template>

<script>
export default {
        name: "Navigation",

}
</script>

<style scoped>
.basic{
        border-left: 10px solid #d4dce6 ;
}

.nav{
        float: left;
        line-height: 50px;
        font-size: 15px;
        padding-right: 70px;
}
/*.el-menu-item{*/
/*        background-color: #e9eef3;*/
/*}*/
.el-submenu{
        background-color: #d4dce6;
}
.el-submenu__title i{
        color: #333333;
}
</style>