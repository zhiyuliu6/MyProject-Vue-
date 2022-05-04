<template>
<div class="main">
        <div class="setting">
                <el-button icon="el-icon-circle-check"  type="primary" :disabled="!isSelect">Batch Accept</el-button>
                <el-button icon="el-icon-circle-close" type="danger" :disabled="!isSelect">Batch Cancelled</el-button>
        </div>
        <div>
                <el-table
                        height="500"
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                                disabled="ture"
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                label="Date"
                                width="250">
<!--                                <template slot-scope="scope">{{ scope.row.date }}</template>-->
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="Name"
                                width="250">
                        </el-table-column>
                        <el-table-column
                                prop="applyType"
                                label="Goods Name"
                                width="250">
                        </el-table-column>
                        <el-table-column
                                prop="number"
                                label="Number"
                                width="250">
                        </el-table-column>
                        <el-table-column
                                prop="note"
                                label="Note"
                                width="200">
                        </el-table-column>
                        <el-table-column label="Operations">
                                <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                @click="handleEdit(scope.$index, scope.row)">Permit</el-button>
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                @click="handleDelete(scope.$index, scope.row)">Forbid</el-button>
                                </template>
                        </el-table-column>
                </el-table>
        </div>

</div>
</template>

<script>
export default {
        name: "ApplyList",
        data(){
                return{
                        checked:false,
                        tableData: [{
                                date: '2016-05-03',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                                date: '2016-05-02',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                                date: '2016-05-04',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                                date: '2016-05-01',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                                date: '2016-05-08',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                                date: '2016-05-06',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                                date: '2016-05-07',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1518 弄'
                        }],
                        multipleSelection: [],
                        isSelect:false
                }
        },
        methods:{
                handleSelectionChange(val) {
                        this.multipleSelection=[]
                        this.isSelect = val.length !== 0;
                        val.forEach(item=>{
                                //**********
                                this.multipleSelection.push(item.date)
                        })
                }
        }
}
</script>

<style scoped>
.main{

}
.setting{
        background-color: white;
        padding-left: 20px;
        margin-bottom: 15px;
}
</style>