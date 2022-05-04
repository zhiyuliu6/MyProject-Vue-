<template>
        <div class="main">
                <div class="setting">
                                <el-date-picker
                                        v-model="search.timeRange"
                                        type="daterange"
                                        range-separator="TO"
                                        start-placeholder="Start Date"
                                        end-placeholder="Ending Date">
                                </el-date-picker>
                        <el-input
                                style="width: 15%;margin-left: 50px"
                                prefix-icon="el-icon-search"
                                placeholder="Please input Item name"
                                v-model="search.itemName"
                                clearable>
                        </el-input>

                        <el-input
                                style="width: 18%;margin-left: 50px"
                                prefix-icon="el-icon-search"
                                placeholder="Please input Staff Leader name"
                                v-model="search.staffName"
                                clearable>
                        </el-input>

                        <el-button style="margin-left: 50px" type="primary" icon="el-icon-refresh-left" @click="reset">Reset</el-button>
                        <el-button icon="el-icon-delete" type="danger" :disabled="!isSelect" @click="deleteApply">Delete</el-button>
                </div>
                <div>
                        <el-table
                                height="500"
                                ref="multipleTable"
                                :data="filterData"
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
                                <el-table-column
                                        prop="applyStatus"
                                        label="State">
                                        <template slot-scope="scope">
                                                <el-tag
                                                        :type="scope.row.applyStatus === 1? 'primarydanger' : 'danger'"
                                                        disable-transitions>{{scope.row.applyStatus===1? "Consent":"Refused"}}</el-tag>
                                        </template>
                                </el-table-column>
                        </el-table>
                </div>

        </div>
</template>

<script>
import {allApplyNo0,deleteApply} from "@/api/approval";

export default {
        name: "ApplyHistory",
        data(){
                return{
                        checked:false,
                        tableData: [],
                        filterData:[],
                        multipleSelection: [],
                        isSelect:false,
                        search:{
                                timeRange:'',
                                itemName:'',
                                staffName:''
                        }
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
                reset(){
                        this.filterData = this.tableData
                        this.search = {
                                timeRange:'',
                                itemName:'',
                                staffName:''
                        }
                },
                deleteApply(){
                        this.$confirm('This operation will permanently delete the data,Continue?', 'Warning', {
                                confirmButtonText: 'Confirm',
                                cancelButtonText: 'Cancel',
                                type: 'warning'
                        }).then(() => {
                                deleteApply(this.multipleSelection).then(()=>{
                                        this.$message({
                                                type: 'success',
                                                message: 'Delete Successfully!'
                                        });
                                        this.tableData = this.tableData.filter((p)=>{
                                                return this.multipleSelection.indexOf(p.id)===-1
                                        })
                                        this.multipleSelection = []
                                })
                        }).catch(() => {});
                }
        },
        mounted() {
                allApplyNo0().then(response=>{
                        this.tableData = response.data
                        this.filterData = this.tableData
                })
        },


        watch:{
                search:{
                        deep:true,
                        handler(){

                                if (this.search.timeRange===''||this.search.itemName===''||this.search.staffName===''){
                                        this.filterData = this.tableData
                                }

                                if (this.search.timeRange){
                                        this.filterData = this.filterData.filter((p)=>{
                                                return new Date(this.search.timeRange[0]).getTime()<new Date(p.date).getTime()&&new Date(p.date).getTime()<new Date(this.search.timeRange[1]).getTime()
                                        })
                                }

                                if (this.search.itemName){
                                        this.filterData = this.filterData.filter((p)=>{
                                                return p.applyType.indexOf(this.search.itemName)!==-1
                                        })
                                }

                                if (this.search.staffName){
                                        this.filterData = this.filterData.filter((p)=>{
                                                return p.staffName.indexOf(this.search.staffName)!==-1
                                        })
                                }
                        }
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