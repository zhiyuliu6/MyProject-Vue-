<template>
<div class="main">
        <div class="bigRegional">
                <span style="margin-right: 20px" slot="label">Big Region</span>
                <el-select style="margin-right: 150px" v-model="bigSelect" placeholder="Please Select">
                        <el-option
                                v-for="(item,index) in bigRegion"
                                :key="item.regionId"
                                :label="item.name"
                                :value="index">
                        </el-option>
                </el-select>

                <span style="margin-right: 20px" slot="label">Small Region</span>
                <el-select v-model="smallSelect" placeholder="Please Select">
                        <el-option
                                v-for="(item,index) in currentBig? currentBig.smallRegions : []"
                                :key="item.id"
                                :label="item.smallName"
                                :value="index">
                        </el-option>
                </el-select>
        </div>

        <div class="info">
                <BigRegional  v-show="!smallSelect&&smallSelect!==0" :currentBig="currentBig" />
                        <SmallRegion v-if="smallSelect||smallSelect===0" :currentSmall="currentSmall"/>
        </div>

</div>
</template>

<script>
import BigRegional from "@/components/page/administrator/module/regional/BigRegional";
import SmallRegion from "@/components/page/administrator/module/regional/SmallRegion";
export default {
        name: "RegionalInfo",
        components:{
                SmallRegion,
                BigRegional,
        },
        data(){
                return{
                       bigRegion:[],
                        requestUrl:'http://localhost:8080',
                        bigSelect:0,
                        smallSelect:undefined,
                        areaData:[],
                }
        },
        methods:{

        },
        beforeMount() {
                this.axios.get(`${this.requestUrl}/getAllRegionInfo`).then((response)=>{
                          this.bigRegion= response.data
                })
        },
        computed:{
                currentBig(){
                        return this.bigRegion[this.bigSelect]
                },
                currentSmall(){
                        return this.currentBig.smallRegions[this.smallSelect]
                }
        },
        watch:{
                bigSelect(){
                        this.smallSelect = undefined
                },
        }
}
</script>

<style scoped>
.main{
        width: 100%;
        height: 100%;
}
.bigRegional{
        background-color: white;
        padding-left: 25px;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.14);
}
.info{
        margin-top: 10px;
        height: 90%;
        width: 100%;
        background-color: white;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.14);
}

</style>