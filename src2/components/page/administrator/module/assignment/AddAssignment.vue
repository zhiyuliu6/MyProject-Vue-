<template>
        <div class="main">
                <h1 style="margin-left: 20px">Distribute the Assignments</h1>
                <el-form :rules="rules" v-if="!loading" :model="addForm" ref="ruleForm" label-width="150px" class="form demo-ruleForm">
                        <el-form-item label="Task County " prop="bigRegion">
                                <el-select v-model="addForm.bigRegion" placeholder="Please Select">
                                        <el-option
                                                v-for="(item,index) in regionRelationship"
                                                :key="item.regionId"
                                                :label="item.name"
                                                :value="index">
                                        </el-option>
                                </el-select>
                        </el-form-item>

                        <el-form-item label="Small Region " prop="leaderId">
                                <el-select @change="selectLeader" v-model="addForm.leaderId" placeholder="Please Select">
                                        <el-option
                                                v-for="item in smallRegions"
                                                :key="item.id"
                                                :label="item.smallName"
                                                :value="item.staffLeader.id">
                                        </el-option>
                                </el-select>
                        </el-form-item>

                        <el-form-item label="Assignment Type" prop="assignmentType">
                                <el-select v-model="addForm.assignmentType" placeholder="Please Select">
                                        <el-option
                                                label="Planting Trees"
                                                value="planting">
                                        </el-option>
                                        <el-option
                                                label="Pruning Trees"
                                                value="pruning">
                                        </el-option>
                                        <el-option
                                                label="Watering Trees"
                                                value="watering">
                                        </el-option>
                                </el-select>
                        </el-form-item>

                        <el-form-item v-if="addForm.assignmentType==='pruning'" label="Trim Type" prop="trimType">
                                <el-select v-model="addForm.trimType" placeholder="Please Select">
                                        <el-option
                                                label="Medium Short Cut"
                                                value="Medium Short Cut">
                                        </el-option>
                                        <el-option
                                                label="Light Short Cut"
                                                value="Light Short Cut">
                                        </el-option>
                                        <el-option
                                                label="Heavy Short Cut"
                                                value="Heavy Short Cut">
                                        </el-option>
                                        <el-option
                                                label="Ponderosity Short Cut"
                                                value="Ponderosity Short Cut">
                                        </el-option>
                                        <el-option
                                                label="Back Spune"
                                                value="Back Spune">
                                        </el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item v-if="addForm.assignmentType==='planting'" label="Tree's Type" prop="treeType">
                                <el-select @change="selectTree" v-model="addForm.treeType" placeholder="Please Select">
                                        <el-option
                                                v-for="tree in storageTrees"
                                                :key="tree.id"
                                                :label="tree.name"
                                                :value="tree.name">
                                        </el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item v-if="addForm.assignmentType==='planting'" label="Tree's Number" prop="treeNumber">
                                <el-input-number :min="10"  v-model="addForm.treeNumber"></el-input-number>
                        </el-form-item>
                        <el-form-item v-if="addForm.assignmentType==='watering'" label="Watering's Times" prop="waterTimes">
                                <el-input-number v-model="addForm.waterTimes" :min="1" :max="10"></el-input-number>
                        </el-form-item>

                        <el-form-item label="Start Time" prop="startDate">
                                <el-date-picker
                                        v-model="addForm.startDate"
                                        type="datetime"
                                        placeholder="Choose a start time">
                                </el-date-picker>
                        </el-form-item>

                        <el-form-item label="Limiting Date" prop="timeRange">
                                <el-input-number :min="1" v-model="addForm.timeRange"></el-input-number>
                        </el-form-item>

                        <el-form-item label="Task specification" prop="taskNote">
                                <el-input style="width: 100%" type="textarea" v-model="addForm.taskNote" placeholder="Please enter the content" :rows="5"></el-input>
                        </el-form-item>
                        <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">Task Distribution</el-button>
                                <el-button @click="resetForm('ruleForm')">Replacement</el-button>
                        </el-form-item>
                </el-form>

                <div style="width: 30%;float: right;margin-right: 30px;z-index: 1">
                        <el-descriptions v-if="currentLeader" class="margin-top" :column="1"  border>
                                <el-descriptions-item>
                                        <template slot="label">
                                                <i class="el-icon-user"></i>
                                                Name
                                        </template>
                                        {{ currentLeader.name }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                        <template slot="label">
                                                <i class="el-icon-mobile-phone"></i>
                                                Phone Number
                                        </template>
                                        {{ currentLeader.phone }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                        <template slot="label">
                                                <i class="el-icon-notebook-1"></i>
                                                Age
                                        </template>
                                        {{ currentLeader.age }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                        <template slot="label">
                                                <i class="el-icon-time"></i>
                                                Hired Date
                                        </template>
                                        {{ currentLeader.hiredate }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                        <template slot="label">
                                                <i class="el-icon-office-building"></i>
                                                Address
                                        </template>
                                        {{ currentLeader.address }}
                                </el-descriptions-item>
                        </el-descriptions>
                </div>
                <el-card v-if="this.addForm.treeType" style="z-index: 1;float: left;margin-left: 33%;margin-top: 15%">
                        <el-image
                                style="width: 200px; height: 200px"
                                :src="currentTree"
                                :fit="fit">
                        </el-image>
                </el-card>

        </div>
</template>

<script>

export default {
        inject:['reload'],
        name: "AddAssignment",
        data() {
                return {
                        requestUrl:'http://localhost:8080',
                        addForm:{
                                bigRegion:null,
                                assignmentType:null,
                                trimType:null,
                                treeType:null,
                                treeNumber:null,
                                waterTimes:null,
                                startDate:null,
                                timeRange:null,
                                taskNote:null,
                                leaderId:null,
                        },
                        fit:"fit",
                        rules:[],
                        regionRelationship:[],
                        loading:true,
                        currentBig:{},
                        smallRegions:[],
                        storageTrees:[],
                        currentLeader:null,
                        currentTree:null,
                };
        },
        methods: {
                selectTree(){
                        const a = this.storageTrees.filter((tree)=>{
                                return tree.name === this.addForm.treeType
                        })
                        this.currentTree = a[0].picUrl
                },
                selectLeader(){
                        const a = this.smallRegions.filter((smallRegion)=>{
                                return smallRegion.staffLeader.id === this.addForm.leaderId
                        })
                        this.currentLeader = a[0].staffLeader
                },
                submitForm(formName) {
                        this.$refs[formName].validate((valid) => {
                                if (valid) {
                                        const send = {}
                                        for (const key in this.addForm) {
                                                if (this.addForm[key]){
                                                        send[key]=this.addForm[key]
                                                }
                                        }
                                        send.startDate = send.startDate.getTime()
                                        this.axios.post(`${this.requestUrl}/assignment/add`,send).then(()=>{
                                                this.$notify({
                                                        title: 'Successful',
                                                        message: 'Mission delivered successfully',
                                                        type: 'success'
                                                });
                                                this.reload()
                                        })
                                } else {
                                        return false;
                                }
                        });
                },
                resetForm(formName) {
                        this.$refs[formName].resetFields();
                }
        },
        mounted() {
                this.axios.get(`${this.requestUrl}/regionRelationship`).then((response)=>{
                        this.regionRelationship=response.data
                        this.loading = false
                })
        },
        watch:{
                loading(){
                        if (!this.loading){
                                this.rules={
                                        bigRegion:[
                                                {required:true,message:'Please select a county',trigger:'change'}
                                        ],
                                        leaderId:[
                                                {required:true,message:'Please select specific area',trigger:'change'}
                                        ],
                                        assignmentType:[
                                                {required:true,message:'You need to determine the type of task',trigger:'change'}
                                        ],
                                        startDate:[
                                                {required:true,message:'Please select a time when the task will start',trigger:'blur'}
                                        ],
                                }
                        }
                },
                'addForm.bigRegion':{
                        handler(){
                                this.addForm.leaderId = null
                                this.currentLeader= null
                                this.addForm.treeType = null
                                if (this.addForm.bigRegion||this.addForm.bigRegion===0){
                                        this.currentBig = this.regionRelationship[this.addForm.bigRegion]
                                        this.smallRegions = this.currentBig.smallRegions.filter((smallRegion)=>{
                                                return smallRegion.staffLeader
                                        })
                                }
                        }
                },
                'addForm.assignmentType':{
                        handler(){
                                this.rules={
                                        bigRegion:[
                                                {required:true,message:'Please select a county',trigger:'change'}
                                        ],
                                        leaderId:[
                                                {required:true,message:'Please select specific area',trigger:'change'}
                                        ],
                                        assignmentType:[
                                                {required:true,message:'You need to determine the type of task',trigger:'change'}
                                        ],
                                        trimType:[
                                                {required:this.addForm.assignmentType==='pruning',message:'Choose the type of tree to trim',trigger:'change'}
                                        ],
                                        treeType:[
                                                {required:this.addForm.assignmentType==='planting',message:'Select the type of tree',trigger:'change'}
                                        ],
                                        startDate:[
                                                {required:true,message:'Please select a time when the task will start',trigger:'blur'}
                                        ],
                                }
                                if (this.addForm.assignmentType==='planting'){
                                        this.addForm.waterTimes=null
                                        this.addForm.trimType=null
                                        this.axios.get(`${this.requestUrl}/Storages/selectAllTree`,{
                                                params:{
                                                        type:"tree"
                                                }
                                        }).then((response)=>{
                                                this.storageTrees = response.data
                                        })
                                }else {
                                        this.addForm.waterTimes=null
                                        this.addForm.trimType=null
                                        this.addForm.treeType=null
                                        this.addForm.treeNumber=null
                                }
                        }
                }
        }
}
</script>

<style scoped>
.main {
        width: 100%;
        height: 100%;
        background-color: white;
}
.form{
        position:absolute;
        z-index: 3;
        float: left;
        width: 50%;
        margin-top: 30px;
        margin-left: 5%;
}
/deep/.el-descriptions__table{
        border-left: solid rgba(19,121,255,0.6);
}
/deep/.el-card__body{
        padding: 10px;
}
/deep/.el-image{
        display: flex;
}
</style>