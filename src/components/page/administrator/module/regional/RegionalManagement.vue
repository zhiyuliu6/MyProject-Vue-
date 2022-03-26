<template>
        <div class="main">
                <div style="height: 100%" v-if="isAddSubmit">
                <div class="bigRegional">
                        <el-button :class="{selectStyle:bigSelect===index}" @click="selectBigRegion(r,index)" round v-for="(r,index) in bigRegion" :key="index">{{ r.name }}</el-button>
                </div>

                <div class="smallRegional">
                        <div :class="{selectStyle:smallSelect===index}" class="RegionItem" @click="selectSmallRegion(s,index)" v-for="(s,index) in currentBig.smallRegions" :key="index">
                                        <p>{{ s.smallName }}</p>
                        </div>
                        <div style="font-size: 30px;color: #509dfd"  class="RegionItem" @click="addSmall">
                                <i class="el-icon-plus"></i>
                        </div>
                </div>


                        <div class="leaderInfo">
                                <div>
                                        <el-empty v-show="StaffLeaderEmpty" description="Not Bound">
                                                <el-button @click="bindLeader" v-show="StaffLeaderEmpty" style="float: right;font-size: 5px;line-height: 1;" type="primary" icon="el-icon-plus" circle></el-button>
                                        </el-empty>

                                        <el-descriptions v-if="!StaffLeaderEmpty" class="margin-top" title="Staff Leader's Information" :column="3"  border>
                                                <template slot="extra">
                                                        <el-button @click="remove" type="danger" size="small">Delete</el-button>
                                                </template>
                                                <el-descriptions-item>
                                                        <template slot="label">
                                                                <i class="el-icon-user"></i>
                                                                Name
                                                        </template>
                                                        {{ currentStaffLeader.name }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                        <template slot="label">
                                                                <i class="el-icon-mobile-phone"></i>
                                                                Phone Number
                                                        </template>
                                                        {{ currentStaffLeader.phone }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                        <template slot="label">
                                                                <i class="el-icon-notebook-1"></i>
                                                                Age
                                                        </template>
                                                        {{ currentStaffLeader.age }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                        <template slot="label">
                                                                <i class="el-icon-time"></i>
                                                                Hired Date
                                                        </template>
                                                        {{ currentStaffLeader.hiredate }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                        <template slot="label">
                                                                <i class="el-icon-office-building"></i>
                                                                Address
                                                        </template>
                                                        {{ currentStaffLeader.address }}
                                                </el-descriptions-item>
                                        </el-descriptions>
                                        <el-divider><i class="el-icon-user-solid"></i></el-divider>
                                        <div v-if="!StaffLeaderEmpty" style="height:50%;overflow-y: auto;">
                                                <h4 style="margin-left:30px ">Team members list</h4>
                                                <el-table
                                                        :data="currentStaffLeader.members"
                                                        stripe
                                                        style="width: 100%;">
                                                        <el-table-column
                                                                prop="mebName"
                                                                label="Name"
                                                                width="180">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="mebAge"
                                                                label="Age"
                                                                width="180">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="phone"
                                                                label="Phone Number">
                                                        </el-table-column>
                                                </el-table>
                                        </div>
                                </div>
                        </div>


                <el-dialog title="To Bind StaffLeader" :visible.sync="dialogFormVisible">
                        <el-form>
                                <el-form-item label="The StaffLeader To Bind" :label-width="formLabelWidth">
                                        <el-select v-model="bindVal"  placeholder="Please select Staff Leader">
                                                <el-option v-for="(p,index) in noBind" :label="p.name" :value="p" :key="index"></el-option>
                                        </el-select>
                                </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">Cancel </el-button>
                                <el-button type="primary" @click="bindSubmit">Enter&nbsp;</el-button>
                        </div>
                </el-dialog>

                <el-dialog title="To Add Small Regional" :visible.sync="addFormVisible">
                        <el-form>
                                <el-form-item label="Small Regional Name" :label-width="formLabelWidth">
                                        <el-input v-model="newSRegional.smallName" placeholder="Please Enter The Content"></el-input>
                                </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                                <el-button @click="addFormVisible = false">Cancel </el-button>
                                <el-button type="primary" @click="isAddSubmit=false">Enter&nbsp;</el-button>
                        </div>
                </el-dialog>
                </div>
<!--                <Map v-if="ad" :currentBig="currentBig"/>-->
                <Map v-if="!isAddSubmit" :currentBig="currentBig" :newSRegional="newSRegional" :endSubmit="endSubmit" :returnM="returnM"/>
        </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import Map from "@/components/page/administrator/module/regional/Map";
export default {
        components: {Map},
        inject:['reload'],
        name: "RegionalManagement",
        data(){
                return{
                        requestUrl:'http://localhost:8080',
                        bigRegion:[],
                        currentBig:{},
                        currentSmall:{},
                        currentStaffLeader:{
                                name:'',
                                age:'',
                                phone:'',
                                hiredate: '',
                                address:''
                        },
                        bigSelect:0,
                        smallSelect:0,
                        StaffLeaderEmpty:false,
                        dialogFormVisible:false,
                        formLabelWidth:'300px',
                        bindVal:null,
                        addFormVisible:false,
                        newSRegional:{
                                smallName:'',
                                regionId:''
                        },
                        isAddSubmit:true
                }
        },
        methods:{
                ...mapMutations('employee',{updateLeader:'UPDATE_STAFFBYREGION'}),
                ...mapMutations('regional',{addSmallR:'GET_BIGREGION'}),
                selectBigRegion(r,index){
                        this.currentBig = r
                        this.bigSelect = index
                },
                selectSmallRegion(r,index){
                        if (r.staffLeader){
                                this.currentStaffLeader = r.staffLeader
                        }else {
                                this.currentStaffLeader = {}
                        }
                        this.currentSmall = r
                        this.smallSelect = index
                },
                bindLeader(){
                        this.bindVal = null
                        this.dialogFormVisible = true
                },
                bindSubmit(){
                        if (this.bindVal){
                                const time = this.bindVal.hiredate
                                this.bindVal.regionSoilId = this.currentSmall.id
                                this.bindVal.hiredate = new Date(this.bindVal.hiredate).getTime()
                                console.log(this.bindVal.regionSoilId)
                                this.axios.post(`${this.requestUrl}/updateStaffLeader`,this.bindVal).then(()=>{
                                        this.bindVal.hiredate = time
                                        this.updateLeader(this.bindVal)

                                        this.bigRegion[this.bigSelect].smallRegions[this.smallSelect].staffLeader = this.bindVal
                                        this.addSmallR(this.bigRegion)

                                        this.dialogFormVisible = false
                                        this.$notify({
                                                title: 'Successful',
                                                message: 'Binding Staff Leader Successfully',
                                                type: 'success'
                                        });
                                        this.reload()
                                })
                        }else {
                                this.$message({
                                        message: 'The selection should not be empty',
                                        type: 'warning'
                                });
                        }
                },
                remove(){
                        this.$confirm('This operation will permanently unbind. Do you want to continue?', 'Warning', {
                                confirmButtonText: 'Confirm',
                                cancelButtonText: 'Cancel',
                                type: 'warning'
                        }).then(() => {
                                const send = JSON.parse(JSON.stringify(this.currentStaffLeader));
                                const time = send.hiredate
                                send.hiredate = new Date(send.hiredate).getTime()
                                this.axios.post(`${this.requestUrl}/unBindRegion`,send).then(()=>{
                                        send.hiredate = time
                                        this.$delete(send,'regionSoilId')
                                        this.updateLeader(send)

                                        this.$delete(this.bigRegion[this.bigSelect].smallRegions[this.smallSelect],'staffLeader')
                                        this.addSmallR(this.bigRegion)

                                        this.dialogFormVisible = false
                                        this.$notify({
                                                title: 'Successful',
                                                message: 'Binding Staff Leader Successfully',
                                                type: 'success'
                                        });
                                        this.currentStaffLeader = {}
                                        this.reload()
                                        this.$message({
                                                type: 'success',
                                                message: 'Unbind Successful!'
                                        });
                                })
                        }).catch(() => {
                                this.$message({
                                        type: 'info',
                                        message: 'Unbind Canceled'
                                });
                        });
                },
                addSmall(){
                        this.addFormVisible=true
                        this.newSRegional.regionId = this.currentBig.regionId
                },
                returnM(){
                        this.isAddSubmit = true
                },
                endSubmit(paths){
                        this.$set(this.newSRegional,'points',paths)
                        this.bigRegion[this.bigSelect].smallRegions.push(this.newSRegional)
                        this.currentBig = this.bigRegion[0]
                        this.addSmallR(this.bigRegion)
                        this.isAddSubmit = true
                        this.reload()
                }
        },
        watch:{
                currentBig:{
                        deep:true,
                        handler(){
                                if (this.currentBig.smallRegions.length===0){
                                        this.currentSmall = {}
                                        this.currentStaffLeader ={}
                                }else {
                                        this.currentSmall = this.currentBig.smallRegions[0]
                                        if (this.currentBig.smallRegions[0].staffLeader){
                                                this.currentStaffLeader = this.currentBig.smallRegions[0].staffLeader
                                        }else {
                                                this.currentStaffLeader = {}
                                        }
                                         this.StaffLeaderEmpty = this.currentStaffLeader === {};
                                }
                        }
                },
                currentStaffLeader(){
                        this.StaffLeaderEmpty = Object.keys(this.currentStaffLeader).length === 0;
                }
        },
        computed:{
                ...mapState('employee',['staffLeaders']),
                noBind(){
                        return this.staffLeaders.filter((item)=>{
                                return !item.regionSoilId
                        })
                }
        },
        beforeMount() {
                        this.bigRegion = this.$store.state.regional.bigRegion
                        this.currentBig =  this.bigRegion[0]
                        this.currentSmall = this.currentBig.smallRegions[0]
                        this.currentStaffLeader = this.currentSmall.staffLeader
        },
}
</script>

<style scoped>
.selectStyle{
        background-color: #edf5ff;
        border-color: #d9eaff;
        color: #509dfd;
}
.main{
        width: 100%;
        height: 100%;
}
.bigRegional{
        background-color: white;
        padding-left: 25px;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.14);
}
.el-dialog__body .el-input{
        width: 50%;
}
.smallRegional{
        float: left;
        width: 20%;
        height: 90%;
        margin-top: 10px;
        text-align: center;
        background-color: white;
        overflow-y: auto;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.14);
}
.leaderInfo{
        float: right;
        width: 76%;
        height: 90%;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: 10px;
        background-color: white;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.14);
}
.el-divider--horizontal{
        margin-top: 36px;
}
/deep/.el-descriptions__header{
        margin-left: 30px;
}
.RegionItem{
        height: 10%;
        margin-top: 10px;
        margin-left: 2%;
        width: 95%;
        text-align: center;
        box-shadow: 1px 1px 5px rgba(0,0,0,0.14);
        cursor:pointer;
}
</style>