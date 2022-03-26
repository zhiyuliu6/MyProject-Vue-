<template>
        <div class="employee">

                <div class="setting">
                        <el-input v-model="keyWord" @keyup.enter.native="searchUser" placeholder="Please Enter The Staff Leader Name"></el-input>
                        <el-button @click="searchUser" type="primary" icon="el-icon-search">Search</el-button>
                        <el-button @click="reset" type="primary" icon="el-icon-refresh-left">Reset</el-button>
                        <el-button @click="addAcount" style="float: right;margin-right: 30px;margin-top: 14.5px" type="primary" icon="el-icon-circle-plus-outline">Add</el-button>
                </div>
                <div class="card">
                        <transition-group appear name="animate__animated animate__bounce" enter-active-class="animate__bounceInRight" leave-active-class="animate__bounceOutLeft">
                        <el-card class="box-card" v-for="(people,index) in filstaffLeaders" :key="people.id">
                                <el-collapse v-model="activeName" accordion>
                                        <el-collapse-item class="collapse" :title="people.name" :name="index">
                                                        <el-button size="mini" style="float: right;margin-right: 10px" @click="handleDelete(people,index)" type="danger">&nbsp;Delete&nbsp;</el-button>
                                                        <el-button size="mini" style="float: right;margin-right: 10px" @click="handleEdit(people,index)" type="primary">&nbsp;&nbsp;Edit&nbsp;&nbsp;</el-button>
                                                <el-descriptions :column="5" title="Staff Leader 's Information">
                                                        <el-descriptions-item label="Staff Leader">{{people.name}}</el-descriptions-item>
                                                        <el-descriptions-item label="Phone Number">{{people.phone}}</el-descriptions-item>
                                                        <el-descriptions-item label="Hired Date">{{people.hiredate}}</el-descriptions-item>
                                                        <el-descriptions-item label="Age">{{people.age}}</el-descriptions-item>
                                                        <el-descriptions-item label="Address">{{people.address}}</el-descriptions-item>
                                                </el-descriptions>
                                                <el-divider><i class="el-icon-s-custom"></i></el-divider>
                                                <h3>Employee Members</h3>
                                                <el-table
                                                        :data="people.members"
                                                        stripe
                                                        style="width: 100%">
                                                        <el-table-column
                                                                prop="mebName"
                                                                label="Name"
                                                                width="180">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="phone"
                                                                label="Phone"
                                                                width="180">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="mebAge"
                                                                label="Age">
                                                        </el-table-column>
                                                </el-table>
                                        </el-collapse-item>
                                </el-collapse>
                        </el-card>
                        </transition-group>
                        <el-empty v-show="isSearchEmpty" description="Sorry, I Didn't Find Any Relevant Data"></el-empty>
                </div>
                <el-backtop target=".card" :visibility-height="100"  style="font-size: 28px">
                </el-backtop>

                <el-dialog title="Information Change" :visible.sync="dialogFormVisible">
                        <el-form>
                                <el-form-item label="Name" :label-width="formLabelWidth">
                                        <el-input v-model="people.name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Phone Number" :label-width="formLabelWidth">
                                        <el-input v-model="people.phone" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Age" :label-width="formLabelWidth">
                                        <el-input v-model="people.age" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Address" :label-width="formLabelWidth">
                                        <el-input v-model="people.address" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Hired Date" :label-width="formLabelWidth">
                                        <el-input :disabled="true" v-model="people.hiredate" autocomplete="off"></el-input>
                                </el-form-item>

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                                <el-button @click="EditCancel">Cancel</el-button>
                                <el-button type="primary" @click="submit">Enter&nbsp;</el-button>
                        </div>
                </el-dialog>

                <el-dialog title="Employee Leader Add" :visible.sync="addFormVisible">
                        <el-form>
                                <el-form-item label="Name" :label-width="formLabelWidth">
                                        <el-input v-model="people.name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Phone Number" :label-width="formLabelWidth">
                                        <el-input v-model="people.phone" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Age" :label-width="formLabelWidth">
                                        <el-input v-model="people.age" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Address" :label-width="formLabelWidth">
                                        <el-input v-model="people.address" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Hired Date" :label-width="formLabelWidth">
                                        <el-input :disabled="true" v-model="currentTime" autocomplete="off"></el-input>
                                </el-form-item>

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                                <el-button @click="EditCancel">Cancel</el-button>
                                <el-button type="primary" @click="addSubmit">Enter&nbsp;</el-button>
                        </div>
                </el-dialog>
        </div>
</template>

<script>
import dayjs from 'dayjs'
import {mapState,mapMutations} from 'vuex'
export default {
        name: "employee",
        data(){
                return{
                        requestUrl:'http://localhost:8080',
                        keyWord:'',
                        formLabelWidth:'200px',
                        isEmpty:true,
                        activeName:-1,
                        people:{},
                        dialogFormVisible:false,
                        addFormVisible:false,
                        filstaffLeaders:[],
                        editIndex:'',
                        currentTime:'',
                        // staffLeaders:[]
                }
        },
        methods: {
                ...mapMutations('employee',{storeLeaders:'STORE_LEADERS'}),
                handleEdit(people,index) {
                        this.dialogFormVisible =true
                        this.people = JSON.parse(JSON.stringify(people));
                        this.editIndex = index
                },
                handleDelete(people,index) {
                        this.$confirm('This operation will permanently delete the account. Do you want to continue?', 'Warning', {
                                confirmButtonText: 'Confirm',
                                cancelButtonText: 'Cancel',
                                type: 'warning'
                        }).then(() => {
                                this.axios.post(`${this.requestUrl}/deleteStaffLeader`, {
                                        id:this.staffLeaders[index].id
                                }).then(()=>{
                                        this.axios.post(`${this.requestUrl}/deleteAccount`, {
                                                id:this.staffLeaders[index].accountId
                                        }).then(()=>{
                                                this.staffLeaders.splice(index,1)
                                                this.storeLeaders(this.staffLeaders)
                                                this.searchUser()
                                                this.$message({
                                                        type: 'success',
                                                        message: 'Delete Success'
                                                });
                                        }).catch((reason)=>{
                                                console.log(reason)
                                        })
                                }).catch((reason)=>{
                                        console.log(reason)
                                })
                        }).catch(() => {
                                this.$message({
                                        type: 'info',
                                        message: 'Cancelled Delete'
                                });
                        });
                },
                submit(){
                        this.staffLeaders[this.editIndex] =JSON.parse(JSON.stringify(this.people));
                        this.staffLeaders[this.editIndex].hiredate = new Date(this.staffLeaders[this.editIndex].hiredate).getTime()
                        this.axios.post(`${this.requestUrl}/updateStaffLeader`, this.staffLeaders[this.editIndex])
                        this.dialogFormVisible =false
                        this.storeLeaders(this.staffLeaders)
                        this.searchUser()
                        this.people = {}
                },
                EditCancel(){
                        this.dialogFormVisible =false
                        this.addFormVisible =false
                        this.people = {}
                },
                searchUser(){
                        this.filstaffLeaders = this.staffLeaders.filter((p)=>{
                                return p.name.indexOf(this.keyWord) !== -1
                        })
                },
                reset(){
                        this.keyWord = ''
                        this.searchUser()
                },
                addAcount(){
                        this.addFormVisible = true
                        console.log(this.currentTime)
                        this.currentTime = dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
                        this.people = {
                                id:'',
                                name: '',
                                phone:'',
                                age:'',
                                address:'',
                                hiredate:this.currentTime
                        }
                },
                addSubmit() {
                        this.people.id = this.staffLeaders.length+1
                        for (const attribute in this.people) {
                                if(this.people[attribute].length === 0){
                                        this.isEmpty = true
                                        break
                                }else {
                                        this.isEmpty = false
                                }
                        }
                        if(!this.isEmpty) {
                                this.people.regionSoilId = ''
                                this.people.hiredate = new Date(this.currentTime).getTime()
                                this.axios.post(`${this.requestUrl}/addStaffLeader`, this.people).then(()=>{
                                        this.addFormVisible = false
                                        this.people.hiredate = this.currentTime
                                        this.people.members = []
                                        this.staffLeaders.push(this.people)
                                        this.storeLeaders(this.staffLeaders)
                                        this.people = {}
                                        this.isEmpty = true
                                        this.searchUser()
                                        this.$notify({
                                                title: 'Success',
                                                message: 'Adding Data is Successful',
                                                type: 'success'
                                        });
                                })

                        } else {
                                this.$message({
                                        message: 'The Input Box Cannot Be Empty！',
                                        type: 'warning'
                                })
                                this.isEmpty = true
                        }
                }
        },
        beforeMount() {
                this.searchUser()
        },
        computed:{
                ...mapState('employee',['staffLeaders']),
                isSearchEmpty(){
                        return this.filstaffLeaders.length === 0;
                },
        }

}
</script>

<style scoped>
.employee{
        height: 100%;
        width: 100%;
        background-color: white;
        box-shadow: 2px 2px 15px silver;
        line-height: 70px;
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
.el-collapse{
        border-top: none;
}
/deep/.el-collapse-item__header{
        border-bottom: none;
        line-height: 2;
        font-size: 20px;
        padding-left: 5%;
}
/deep/.el-collapse-item__wrap{
        border-bottom: none;
}
.el-card{
        margin-bottom: 10px;
}
.card{
        height: 90%;
        padding-left: 10px;
        overflow-y: auto;
        overflow-x: hidden;
}

</style>