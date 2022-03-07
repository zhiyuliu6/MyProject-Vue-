<template>
<div class="main">
        <div class="setting">
                <el-input v-model="keyWord" @keyup.enter.native="searchUser"  placeholder="Please Enter The Staff Leader Name"></el-input>
                <el-button @click="searchUser"  type="primary" icon="el-icon-search">Search</el-button>
                <el-button @click="reset" type="primary" icon="el-icon-refresh-left">Reset</el-button>
                <el-switch
                        style="padding-left: 100px"
                        v-model="isFilter"
                        active-text="Filtrate"
                        inactive-text="All Leaders">
                </el-switch>

                <el-tooltip class="item" effect="dark" content="Turn on the switch to filter team leaders who have not yet been assigned employees" placement="right-end">
                        <i style="padding-left: 10px" class="el-icon-info"></i>
                </el-tooltip>

                <el-button @click="Initialization" style="float: right;margin-right: 30px;margin-top: 14.5px" type="info" icon="el-icon-delete">Initialization</el-button>
        </div>

        <div class="showLeaders">
                <el-empty style="padding-top: 100px" v-if="filLeaders.length===0" description="404"></el-empty>
                <div :class="{selectStyle:index===currentSelect}" @click="isSelect(index)" class="LeaderName" v-for="(p,index) in filLeaders" :key="p.id">
                        <p style="flex: auto;line-height: 4;float: left;padding-left: 20px;pointer-events: none;">{{p.name}}</p>
                        <el-button @click="addMember(p)" style="float: right;font-size: 5px;line-height: 1;margin-top: 6%;margin-right: 10px" type="primary" icon="el-icon-plus" circle></el-button>
                </div>
        </div>

        <div class="members">
                <el-empty style="padding-top: 100px" v-show="this.filLeaders.length===0 ? true : this.filLeaders[this.currentSelect].members.length===0" description="The corresponding member is not queried"></el-empty>
                <el-card class="box-card" v-for="(m,index) in (filLeaders.length===0? null : filLeaders[currentSelect].members)" :key="m.id">
                        <el-collapse v-model="activeNames" accordion>
                                <el-collapse-item :title="m.mebName" :name="index">
                                        <el-descriptions class="margin-top" title="Personal Information" :column="3">
                                                <template slot="extra">
                                                        <el-button @click="deleteMember(index,m.id)" type="danger" size="small">Delete</el-button>
                                                </template>
                                                <el-descriptions-item label="Name">{{ m.mebName }}</el-descriptions-item>
                                                <el-descriptions-item label="Age">{{ m.mebAge }}</el-descriptions-item>
                                                <el-descriptions-item label="Phone">{{ m.phone }}</el-descriptions-item>
                                        </el-descriptions>
                                </el-collapse-item>
                        </el-collapse>
                </el-card>
        </div>

        <el-dialog title="Add Member" :visible.sync="dialogFormVisible">
                <el-form>
                        <el-form-item label="Name" :label-width="formLabelWidth">
                                <el-input v-model="addingPeople.mebName"  autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Age" :label-width="formLabelWidth">
                                <el-input v-model="addingPeople.mebAge"  autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Phone" :label-width="formLabelWidth">
                                <el-input v-model="addingPeople.phone"  autocomplete="off"></el-input>
                        </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="addSubmit">Enter&nbsp;</el-button>
                </div>
        </el-dialog>

</div>
</template>

<script>
import {nanoid} from 'nanoid'
import {mapState,mapMutations} from 'vuex'

export default {
        inject:['reload'],
        name: "Members",
        data(){
                return{
                        requestUrl:'http://localhost:8080',
                        keyWord:'',
                        activeNames:-1,
                        currentLeader:{},
                        currentSelect:0,
                        filLeaders:[],
                        isFilter:false,
                        dialogFormVisible:false,
                        formLabelWidth:'200px',
                        addingPeople:{},
                        isEmpty:true
                }
        },
        methods:{
                ...mapMutations('employee',{updateLeader:'ADD_MEMBER',VdeleteMember:'DELETE_MEMBER',DeleteAll:'DELETE_ALL'}),
                isSelect(index){
                       this.currentSelect = index
                       this.activeNames = -1
                },
                searchUser(){
                        if (this.isFilter){
                                this.filLeaders = this.staffLeaders.filter((p)=>{
                                        return p.members.length === 0
                                }).filter((p)=>{
                                        return p.name.indexOf(this.keyWord) !== -1
                                })
                        }else {
                                this.filLeaders = this.staffLeaders.filter((p)=>{
                                        return p.name.indexOf(this.keyWord) !== -1
                                })
                        }
                },
                reset(){
                        this.keyWord = ''
                        this.searchUser()
                },
                addMember(p){
                        this.dialogFormVisible = true
                        this.addingPeople = {
                                id:'',
                                mebAge:'',
                                mebName:'',
                                phone:'',
                                staffLeaderId:''
                        }
                        this.addingPeople.staffLeaderId = p.id
                        this.addingPeople.id = nanoid(5)
                },
                addSubmit(){
                        const send = {
                                id:this.addingPeople.staffLeaderId,
                                member:this.addingPeople
                        }
                        for (const attribute in this.addingPeople) {
                                if(this.addingPeople[attribute].length === 0){
                                        this.isEmpty = true
                                        break
                                }else {
                                        this.isEmpty = false
                                }
                        }
                        if(!this.isEmpty) {
                                this.axios.post(`${this.requestUrl}/addStaffMembers`,this.addingPeople).then(()=>{
                                        this.dialogFormVisible = false
                                        this.updateLeader(send)
                                        this.searchUser()
                                        this.$notify({
                                                title: 'Success',
                                                message: 'Adding Data is Successful',
                                                type: 'success'
                                        });
                                }).catch((reason)=>{
                                        this.$message({
                                                message: reason.message,
                                                type: 'warning'
                                        })
                                })
                        } else {
                                this.$message({
                                        message: 'The Input Box Cannot Be Empty！',
                                        type: 'warning'
                                })
                                this.isEmpty = true
                        }
                },
                deleteMember(index,mId){
                        const selectId = this.filLeaders[this.currentSelect].id
                        const send = {
                                mIndex:index,
                                lId:selectId
                        }

                        this.$confirm('This operation will permanently delete the account. Do you want to continue?', 'Warning', {
                                confirmButtonText: 'Confirm',
                                cancelButtonText: 'Cancel',
                                type: 'warning'
                        }).then(() => {
                                this.axios.post(`${this.requestUrl}/deleteStaffMember`,{
                                        id:mId
                                }).then(()=>{
                                        this.VdeleteMember(send)
                                        this.searchUser()
                                        this.$notify({
                                                title: 'Success',
                                                message: 'Delete Data is Successful',
                                                type: 'success'
                                        });
                                }).catch((reason)=>{
                                        this.$message({
                                                message: reason.message,
                                                type: 'warning'
                                        })
                                })
                        }).catch(() => {
                                this.$message({
                                        type: 'info',
                                        message: 'Cancelled Delete'
                                });
                        });


                },
                Initialization(){
                        this.$confirm('This operation will permanently delete the account. Do you want to continue?', 'Warning', {
                                confirmButtonText: 'Confirm',
                                cancelButtonText: 'Cancel',
                                type: 'warning'
                        }).then(() => {
                                this.axios({
                                        method:'get',
                                        params:{
                                                id:this.filLeaders[this.currentSelect].id
                                        },
                                        url:this.requestUrl+'/deleteAllStaffMember'
                                }).then(()=>{
                                        this.DeleteAll(this.filLeaders[this.currentSelect].id)
                                        this.searchUser()
                                        this.$notify({
                                                title: 'Success',
                                                message: 'Delete Data is Successful',
                                                type: 'success'
                                        });
                                })
                        }).catch(() => {
                                this.$message({
                                        type: 'info',
                                        message: 'Cancelled Delete'
                                });
                        });
                }
        },
        computed:{
                ...mapState('employee',['staffLeaders']),
        },
        beforeMount() {
                this.searchUser()
        },
        watch:{
                isFilter(){
                        if (this.isFilter){
                                this.currentSelect = 0
                                this.filLeaders = this.staffLeaders.filter((p)=>{
                                        return p.members.length === 0
                                })
                        }else {
                                this.filLeaders = this.staffLeaders.filter((p)=>{
                                        return p.name.indexOf(this.keyWord) !== -1
                                })
                        }
                }
        }
}
</script>

<style scoped>
.main{
        height: 100%;
        width: 100%;
        background-color: white;
        box-shadow: 2px 2px 15px silver;
        line-height: 70px;
}
.LeaderName{
        height: 13%;
        margin-top: 10px;
        margin-left: 2%;
        width: 95%;
        /*background-color: #333333;*/
        text-align: center;
        box-shadow: 1px 1px 5px rgba(0,0,0,0.14);
        cursor:pointer;
}
.selectStyle{
        box-shadow: 1px 1px 20px #509dfd;
}
.members{
        float: right;
        width: 80%;
        height: 90%;
        margin-right: 30px;
        box-shadow: 1px 1px 10px rgba(0,0,0,0.25);
        overflow-y: auto;
        line-height: 2;
}
.members>.el-card{
        width: 90%;
        margin: 10px auto;
}
.setting{
        margin-left: 10px;
}
.el-input{
        width: 20%;
        float: left;
}
.showLeaders{
        width: 15%;
        height: 60%;
        overflow-y: auto;
        margin-left: 10px;
        float: left;
}
.showLeaders>.el-card{
        width: 80%;
        height: 10%;
        margin: 10px auto;
}
.el-collapse{
        border-top: none;
}
/deep/.el-collapse-item__header{
        border-bottom: none;
        line-height: 2;
        font-size: 20px;
        padding-left: 46%;
}
/deep/.el-collapse-item__wrap{
        border-bottom: none;
        padding-left: 2%;
}
/deep/.el-card__body{
        padding: 10px;
        /*padding-left: 10px;*/
}
.el-dialog__body .el-input{
        width: 50%;
}
</style>