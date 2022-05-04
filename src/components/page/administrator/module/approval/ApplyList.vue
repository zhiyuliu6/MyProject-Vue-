<template>
<div class="main">
        <div class="setting">
                <el-button icon="el-icon-circle-check"  type="primary" :disabled="!isSelect" @click="permit(null)">Batch Accept</el-button>
                <el-button icon="el-icon-circle-close" type="danger" :disabled="!isSelect" @click="forbid(null)">Batch Forbid</el-button>
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
                                prop="staffName"
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
                                                @click="permit(scope.row.id)">Permit</el-button>
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                @click="forbid(scope.row.id)">Forbid</el-button>
                                </template>
                        </el-table-column>
                </el-table>
        </div>

</div>
</template>

<script>
import {acceptApply, allApply0, rejectApply} from "@/api/approval";

export default {
        name: "ApplyList",
        data(){
                return{
                        checked:false,
                        tableData: [],
                        multipleSelection: [],
                        isSelect:false
                }
        },
        methods:{
                handleSelectionChange(val) {
                        this.multipleSelection=[]
                        this.isSelect = val.length !== 0;
                        val.forEach(item=>{
                                this.multipleSelection.push(item.id)
                        })
                },
                permit(id){
                        const a = []
                        if (id){ a.push(id)}
                        this.$confirm('This application will be approved after confirmation', 'Note', {
                                confirmButtonText: 'Confirm',
                                cancelButtonText: 'Cancel',
                                type: 'info'
                        }).then(() => {
                                acceptApply(id? a : this.multipleSelection).then(()=>{
                                        if (id){
                                                this.tableData = this.tableData.filter((p)=>{
                                                        return p.id !== id
                                                })
                                        }else {
                                                this.tableData = this.tableData.filter((p)=>{
                                                        return this.multipleSelection.indexOf(p.id)===-1
                                                })
                                                this.multipleSelection = []
                                        }

                                        this.$message({
                                                message: 'This application has been approved',
                                                type: 'success'
                                        });
                                })
                        }).catch(() => {
                                this.multipleSelection = []
                        });
                },
                forbid(id){
                        const a = []
                                if (id){ a.push(id)}
                                this.$confirm('This application will be rejected after confirmation', 'Note', {
                                        confirmButtonText: 'Confirm',
                                        cancelButtonText: 'Cancel',
                                        type: 'warning'
                                }).then(() => {
                                        rejectApply(id? a : this.multipleSelection).then(() => {
                                                if (id){
                                                        this.tableData = this.tableData.filter((p)=>{
                                                                return p.id !== id
                                                        })
                                                }else {
                                                        this.tableData = this.tableData.filter((p)=>{
                                                                return this.multipleSelection.indexOf(p.id)===-1
                                                        })
                                                        this.multipleSelection = []
                                                }
                                                this.$message({
                                                        message: 'This application has been rejected',
                                                        type: 'success'
                                                });
                                        })
                                }).catch(() => {
                                        this.multipleSelection = []
                                });
                },
        },
        mounted() {
                allApply0().then(res=>{
                        this.tableData = res.data
                })
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