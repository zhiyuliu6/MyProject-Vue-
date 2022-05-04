<template>
        <transition name="animate__animated animate__bounce" appear enter-active-class="animate__fadeIn">
                <div class="First">
                        <div class="setting">
                                <el-input v-model="keyWord" @keyup.enter.native="searchUser" placeholder="Please enter the user name"></el-input>
                                <el-button @click="searchUser" type="primary" icon="el-icon-search">Search</el-button>
                                <el-button @click="reset" type="primary" icon="el-icon-refresh-left">Reset</el-button>
                                <el-button @click="addAcount" style="float: right;margin-right: 30px;margin-top: 14.5px" type="primary" icon="el-icon-circle-plus-outline">Add</el-button>
                                <el-dialog title="Account Add" :visible.sync="addFormVisible">
                                        <el-form v-model="people">
                                                <el-form-item label="Name" :label-width="formLabelWidth">
                                                        <el-input v-model="people.name" autocomplete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="Login Type" :label-width="formLabelWidth">
                                                        <el-select v-model="people.loginType" placeholder="Please Choose">
                                                                <el-option value="Administrator" label="Administrator"></el-option>
                                                                <el-option value="Staff Leader" label="Staff Leader"></el-option>
                                                        </el-select>
                                                </el-form-item>
                                                <el-form-item label="Account" :label-width="formLabelWidth">
                                                        <el-input v-model="people.usr" autocomplete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="PassWord" :label-width="formLabelWidth">
                                                        <el-input v-model="people.psw" autocomplete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="Registration Date" :label-width="formLabelWidth">
                                                        <el-date-picker
                                                                v-model="people.date"
                                                                value-format="yyyy-MM-dd HH:mm:ss"
                                                                type="datetime"
                                                                placeholder="DateTimePicker">
                                                        </el-date-picker>
                                                </el-form-item>

                                                <el-form-item v-show="people.loginType==='Staff Leader'" label="Staff Leader" :label-width="formLabelWidth">
                                                        <el-select v-model="StaffLeaderId" placeholder="Please Choose">
                                                                <el-option
                                                                        v-for="item in emptyAccounts"
                                                                        :key="item.id"
                                                                        :label="item.id+'--'+item.name"
                                                                        :value="item.id">
                                                                </el-option>
                                                        </el-select>
                                                </el-form-item>

                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                                <el-button @click="EditCancel">Cancel</el-button>
                                                <el-button type="primary" @click="addSubmit">Enter&nbsp;</el-button>
                                        </div>
                                </el-dialog>
                        </div>

                        <div style="margin-left: 10px;line-height: 45px">
                                <el-table
                                        :data="filPerons"
                                        :header-cell-style="{fontSize: '18px',color:'#414141'}"
                                        stripe
                                        style="width: 100%;">
                                        <el-table-column type="index" label="Index" width="210"></el-table-column>
                                        <el-table-column prop="name" label="Name" width="210"></el-table-column>
                                        <el-table-column v-if="false" prop="id" label="id"> </el-table-column>
                                        <el-table-column  prop="usr" label="Account" width="210"> </el-table-column>
                                        <el-table-column prop="psw"  label="Password" width="210"> </el-table-column>
                                        <el-table-column prop="loginType" label="Login Type" width="210"> </el-table-column>
                                        <el-table-column prop="date" label="Registration Date"> </el-table-column>

                                        <el-table-column label="Operation" width="180">
                                                <template slot-scope="scope">
                                                        <el-button
                                                                size="mini"
                                                                type="primary"
                                                                @click="handleEdit(scope.$index)">&nbsp;&nbsp;Edit&nbsp;&nbsp;</el-button>
                                                        <el-button
                                                                size="mini"
                                                                type="danger"
                                                                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>

                                                        <el-dialog title="Account Change" :visible.sync="dialogFormVisible">
                                                                <el-form>
                                                                        <el-form-item label="Name" :label-width="formLabelWidth">
                                                                                <el-input v-model="people.name" autocomplete="off"></el-input>
                                                                        </el-form-item>
                                                                        <el-form-item label="Account" :label-width="formLabelWidth">
                                                                                <el-input v-model="people.usr" autocomplete="off"></el-input>
                                                                        </el-form-item>
                                                                        <el-form-item label="PassWord" :label-width="formLabelWidth">
                                                                                <el-input v-model="people.psw" autocomplete="off"></el-input>
                                                                        </el-form-item>
                                                                </el-form>
                                                                <div slot="footer" class="dialog-footer">
                                                                        <el-button @click="EditCancel">Cancel</el-button>
                                                                        <el-button type="primary" @click="submit">Enter&nbsp;</el-button>
                                                                </div>
                                                        </el-dialog>

                                                </template>
                                        </el-table-column>
                                </el-table>
                                <el-empty v-show="isSearchEmpty" description="Sorry, I Didn't Find Any Relevant Data"></el-empty>
                                <el-pagination
                                        :page-size="pageSize"
                                        :current-page.sync="curPage"
                                        background
                                        layout="prev, pager, next"
                                        :total="total"
                                        class="mt-4"
                                >
                                </el-pagination>
                        </div>
                </div>
        </transition>

</template>

<script>
export default {
        inject:['reload'],
        name: "First",
        data(){
                return{
                        requestUrl:'http://localhost:8080',
                        keyWord:'',
                        dialogFormVisible:false,
                        addFormVisible:false,
                        formLabelWidth:'200px',
                        tableData:[],
                        filPerons:[],
                        people:{},
                        editIndex:'',
                        date:'',
                        isEmpty:true,
                        curPage:1,
                        total:null,
                        pageSize:5,
                        emptyAccounts:[],
                        StaffLeaderId:null
                }
        },
        methods: {
                handleEdit(index) {
                        this.dialogFormVisible =true
                        this.editIndex = index
                        this.people = JSON.parse(JSON.stringify(this.filPerons[index]));
                },
                handleDelete(index,row) {
                                this.$confirm('This operation will permanently delete the account. Do you want to continue?', 'Warning', {
                                        confirmButtonText: 'Confirm',
                                        cancelButtonText: 'Cancel',
                                        type: 'warning'
                                }).then(() => {
                                        this.tableData.splice(index,1)
                                        this.axios.post(`${this.requestUrl}/deleteAccount`,{
                                                id:row.id
                                        }).then(()=>{
                                                this.searchUser()
                                                this.reload()
                                                this.$message({
                                                        type: 'success',
                                                        message: 'Delete Success'
                                                });
                                        })

                                }).catch(() => {
                                        this.$message({
                                                type: 'info',
                                                message: 'Cancelled Delete'
                                        });
                                });
                        },
                submit(){
                        this.tableData[this.editIndex] =JSON.parse(JSON.stringify(this.people));
                        this.tableData[this.editIndex].date = new Date(this.tableData[this.editIndex].date).getTime()
                        this.axios.post(`${this.requestUrl}/updateAccount`, this.tableData[this.editIndex])
                        this.dialogFormVisible =false
                        this.searchUser()
                        this.people = {}
                },
                EditCancel(){
                        this.dialogFormVisible =false
                        this.addFormVisible =false
                },
                searchUser(){
                        const a = this.tableData.filter((p)=>{
                                return p.name.indexOf(this.keyWord) !== -1
                        })
                        this.filPerons = a.splice(this.curPage*this.pageSize-5,this.curPage*this.pageSize)
                },
                reset(){
                        this.keyWord = ''
                        this.searchUser()
                },
                addAcount(){
                        this.addFormVisible = true
                        this.people = {loginType: '',name:'',usr:'',psw:'',date:''}
                        this.axios.get(`${this.requestUrl}/getEmptyAccount`).then((response)=>{
                                this.emptyAccounts = response.data
                        })
                },
                addSubmit() {
                        for (const attribute in this.people) {
                                if(this.people[attribute].length === 0){
                                        this.isEmpty = true
                                        console.log(this.people)
                                        break
                                }else {
                                        this.isEmpty = false
                                }
                        }
                        if(!this.isEmpty) {
                                this.tableData.push(this.people)
                                this.addFormVisible = false
                                this.people.date = new Date(this.people.date).getTime()
                                this.axios.post(`${this.requestUrl}/addAccount`, this.people).then(()=>{
                                        const map = {
                                                id:this.StaffLeaderId,
                                                accountId:this.people.id
                                        }

                                        if(this.people.loginType==='Administrator'){
                                                this.searchUser()
                                                this.reload()
                                        }else {
                                                this.axios.post(`${this.requestUrl}/updateEmptyAccount`, map).then(()=>{
                                                        this.searchUser()
                                                        this.reload()
                                                })
                                        }
                                })


                                this.people = {}
                                this.isEmpty = true
                                //都不为空时进行的操作
                        } else {  //否则给出提示信息
                                this.$message({
                                        message: 'The Input Box Cannot Be Empty！',
                                        type: 'warning'
                                })
                                this.isEmpty = true
                        }
                }
        },
        beforeMount() {
                this.axios.get(`${this.requestUrl}/allAccount`).then((response)=>{
                        this.tableData = response.data;
                        this.total=this.tableData.length
                        this.searchUser()
                }).catch((reason)=>{
                        console.log(reason)
                })


        },
        mounted() {
                this.searchUser()
        },
        watch:{
                curPage(){
                        this.searchUser()
                }
        },
        computed:{
                isSearchEmpty(){
                        return this.filPerons.length === 0;
                }
        }
}
</script>

<style scoped>
.First{
        height: 100%;
        width: 100%;
        background-color: white;
        box-shadow: 2px 2px 15px silver;
        line-height: 70px;
        /*padding: 10px;*/
}
.el-dialog__body .el-input{
        width: 50%;
}
.setting{
        margin-left: 10px;
}
.el-input{
        width: 20%;
        float: left;
}
</style>