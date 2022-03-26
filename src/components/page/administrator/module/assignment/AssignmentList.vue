<template>
<div class="main">
        <div v-if="!isSelect" style="height: 50%">
                <h1 class="title">Select the type of task you want to view</h1>
                <el-card @click.native="selectType('watering')" style="background-color: rgba(31,123,255,0.76);margin-left: 350px;" shadow="hover">
                        <h2 class="cardH2">Watering</h2>
                        <img style="margin-left: 20px" src="../../../../../assets/picture/watering.png" alt="" width="85%" height="85%">
                </el-card>
                <el-card @click.native="selectType('planting')" style="background-color: #67c241" shadow="hover">
                        <h2 class="cardH2">Planting</h2>
                        <img style="margin-left: 20px" src="../../../../../assets/picture/tree.png" alt="" width="85%" height="85%">
                </el-card>
                <el-card @click.native="selectType('pruning')" style="background-color: #e3a343" shadow="hover">
                        <h2 class="cardH2">Pruning</h2>
                        <img style="margin-left: 40px" src="../../../../../assets/picture/scissors.png" alt="" width="58%" height="58%">
                </el-card>
        </div>
        <div v-if="isSelect">
                <el-button @click="back" style="font-size: 16px;font-weight: bold;margin-left: 30px" type="primary" class="el-icon-back">Back</el-button>
                <el-switch
                        style="margin-left: 50px"
                        v-model="isFinished"
                        active-text="Finished"
                        inactive-text="Unfinished">
                </el-switch>
                <div v-if="!loading" style="width: 100%">
                        <el-card class="list box-card" v-for="(task,index) in filterTask" :key="task.id" ref="task">
                                <el-collapse v-model="activeName" accordion>
                                        <el-collapse-item class="collapse" :title="task.taskList.staffLeader.bigName+'------------->'+task.taskList.staffLeader.smallName" :name="index">

                                                <el-descriptions :column="4" title="Staff Leader 's Information">
                                                        <el-descriptions-item label="Staff Leader">{{task.taskList.staffLeader.leaderName}}</el-descriptions-item>
                                                        <el-descriptions-item label="Phone Number">{{task.taskList.staffLeader.phone}}</el-descriptions-item>
                                                        <el-descriptions-item label="Age">{{task.taskList.staffLeader.age}}</el-descriptions-item>
                                                        <el-descriptions-item label="Address">{{task.taskList.staffLeader.address}}</el-descriptions-item>
                                                </el-descriptions>
                                                <el-divider><i class="el-icon-s-custom"></i></el-divider>
                                                <el-descriptions :column="4" title="Task Detail's Information">
                                                        <el-descriptions-item v-if="type==='planting'" label="Planting Number">{{task.treeNum}}</el-descriptions-item>
                                                        <el-descriptions-item v-if="type==='planting'" label="Tree Type">{{task.treeType}}</el-descriptions-item>
                                                        <el-descriptions-item label="Task StartDate">{{task.taskList.startDate}}</el-descriptions-item>
                                                        <el-descriptions-item label="Task timeRange">{{task.taskList.timeRange}}(day)</el-descriptions-item>
                                                        <el-descriptions-item v-if="type==='pruning'" label="Trim type">{{task.type}}</el-descriptions-item>
                                                        <el-descriptions-item v-if="type==='watering'" label="Watering Times">{{task.times}}</el-descriptions-item>
                                                </el-descriptions>
                                                <h3 style="color: coral">The taskNote: &nbsp;&nbsp;&nbsp;{{task.taskList.taskNote}}</h3>
                                                <el-steps style="margin-top: 20px;width: 30%;float: left" :space="200" :active="task.taskList.finished" finish-status="success">
                                                        <el-step title="Accepted"></el-step>
                                                        <el-step title="Upload"></el-step>
                                                </el-steps>
                                                <el-button @click="toShow(task.taskList.picUil)" v-if="task.taskList.finished===0" style="margin-top: 10px;margin-left: -20px" class="el-icon-download" type="primary">View the result</el-button>
                                                <el-image-viewer
                                                        v-if="showViewer"
                                                        :on-close="()=>{showViewer=false}"
                                                        :url-list="piclist"/>
                                        </el-collapse-item>
                                </el-collapse>
                        </el-card>
                </div>
        </div>


</div>
</template>

<script>
export default {
        name: "AssignmentList",
        components: {
                'el-image-viewer':()=>import('element-ui/packages/image/src/image-viewer')
        },
        data(){
                return{
                        requestUrl:'http://localhost:8080',
                        isSelect:false,
                        isFinished:false,
                        activeName:-1,
                        type:null,
                        taskList:[],
                        filterTask:[],
                        showViewer:false,
                        loading:true,
                        piclist:[]
                }
        },
        methods:{
                toShow(list){
                        this.showViewer = true
                        this.piclist = list
                },
                back(){
                        this.isSelect = false
                },
                selectType(type){
                        this.isSelect = !this.isSelect
                        this.type = type
                        this.axios.get(`${this.requestUrl}/assignment/${type}`).then((response)=>{
                                this.taskList = response.data
                                this.filterTask = this.taskList.filter((item)=>{
                                        return item.taskList.finished === 0
                                })
                                this.loading = false
                        })
                }
        },
        watch:{
                isFinished(){
                        if (this.isFinished===true){
                                this.filterTask = this.taskList.filter((item)=>{
                                        return item.taskList.finished === 2
                                })
                        }else {
                                this.filterTask = this.taskList.filter((item)=>{
                                        return item.taskList.finished === 0
                                })
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
/deep/.el-card.is-hover-shadow:hover{
        box-shadow: 0 2px 20px 5px rgba(155,155,155,0.6);
}
/deep/.el-card{
        cursor: pointer;
        width: 15%;
        height: 100%;
        float: left;
        margin-left: 50px;
        border-radius: 15px;
        border: none;
}

.title {
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        color: #969696;
        margin-top: 50px;
        margin-bottom: 50px
}
.el-collapse{
        border-top: none;
}
/deep/.el-collapse-item__header{
        border-bottom: none;
        line-height: 2;
        font-size: 20px;
        padding-left: 2%;
}
/deep/.el-collapse-item__wrap{
        border-bottom: none;
}
.cardH2 {
        text-align: center;
        color: white;
        margin-bottom: 100px
}
.list{
        cursor: auto;
        margin-top: 15px;
        width: 95%;
        margin-left: 30px;
}
</style>