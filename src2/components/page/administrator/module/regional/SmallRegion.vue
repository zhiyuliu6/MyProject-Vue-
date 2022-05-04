<template>
        <div class="smallRegion">
                <div class="picture">
                        <h2 style="font-family: 新蒂小丸子体,serif;margin-left: 150px;line-height: 2">Image from the current area live</h2>
                        <el-carousel style="box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.26);width: 100%;height: 40%;">
                                <el-carousel-item v-for="item in currentPic" :key="item">
                                        <el-image
                                                :src="item"
                                                :fit="fit">
                                        </el-image>
                                </el-carousel-item>
                        </el-carousel>
                </div>

                <div class="cardStyle">
                        <i class="icon el-icon-s-data"></i>
                        <div style="height: 100%;width: 80%;text-align: center;float: right;padding-top: 25px">
                                <p style="line-height: 2;color: white">The average Height of trees</p>
                                <p style="line-height: 1;color: white;font-size: 40px">{{ state.height }}cm</p>
                        </div>
                </div>
                <div class="cardStyle">
                        <i class="icon el-icon-s-opportunity"></i>
                        <div style="height: 100%;width: 80%;text-align: center;float: right;padding-top: 25px">
                                <p style="line-height: 2;color: white">The average Girth of trees</p>
                                <p style="line-height: 1;color: white;font-size: 40px">{{ state.treeRounds }}</p>
                        </div>
                </div>
                <div class="cardStyle">
                        <i class="icon el-icon-pie-chart"></i>
                        <div style="height: 100%;width: 80%;text-align: center;float: right;padding-top: 25px">
                                <p style="line-height: 2;color: white">Tree survival rate</p>
                                <p style="line-height: 1;color: white;font-size: 40px">{{ state.survival }}</p>
                        </div>
                </div>
                <div class="cardStyle">
                        <i class="icon el-icon-document"></i>
                        <div style="height: 100%;width: 80%;text-align: center;float: right;padding-top: 25px">
                                <p style="line-height: 2;color: white">Kinds of tree</p>
                                <p style="line-height: 1;color: white;font-size: 35px">{{ state.type }}</p>
                        </div>
                </div>

                <el-descriptions style="padding-top: 20px;float: left;" :column="4" title="Detailed Information">
                        <el-descriptions-item label="Alive Trees">{{ state.aliveTrees }}</el-descriptions-item>
                        <el-descriptions-item label="Died Trees">{{ state.deadTrees }}</el-descriptions-item>
                        <el-descriptions-item label="Soil PH">{{ state.ph }}</el-descriptions-item>
                        <el-descriptions-item label="Forest's Area">{{ state.area }}m²</el-descriptions-item>
                        <el-descriptions-item label="Planting Date">{{ state.planDate?state.planDate:"Null" }}</el-descriptions-item>
                        <el-descriptions-item label="Fertility Of Land">{{ state.fertility }}</el-descriptions-item>
                        <el-descriptions-item label="Land Humidity">{{ state.humidity }}</el-descriptions-item>
                </el-descriptions>
                <div style="width: 100%;float: left">
                        <h3 style="margin-left: 50px;">The latest work report</h3>
                        <i class="el-icon-warning-outline"></i>
                        <p style="float: left;line-height: 1">woijasijdohafoiagfpg</p>
                </div>

        </div>
</template>

<script>
export default {
        name: "SmallRegion",
        props:['currentSmall'],
        data() {
                return {
                        currentPic: ['http://localhost:8080/image/currentRegionImage/20210404-215938_t019fb6c06be0f8607b.jpg',
                                'http://localhost:8080/image/currentRegionImage/20210404-215952_t01dcfa259d43745cd7.jpg',
                                'http://localhost:8080/image/currentRegionImage/20210404-220003_t012343cca9644b30cb.jpg',
                                'http://localhost:8080/image/currentRegionImage/20210404-220141_t01a2bbc4f47c3ac58d.jpg'],
                        fit: 'fit',
                        state:{
                                height:this.currentSmall.treeState.height,
                                treeRounds:this.currentSmall.treeState.treeRounds,
                                survival:((this.currentSmall.treeState.liTreeNum/(this.currentSmall.treeState.liTreeNum+this.currentSmall.treeState.deTreeNum))*100).toFixed(2)+'%',
                                type:this.currentSmall.treeState.type,
                                aliveTrees:this.currentSmall.treeState.liTreeNum,
                                deadTrees:this.currentSmall.treeState.deTreeNum,
                                ph:this.currentSmall.soilQuality.ph,
                                area:this.currentSmall.soilQuality.acreage,
                                planDate:this.currentSmall.treeState.plantingTime,
                                fertility:this.currentSmall.soilQuality.nutrient,
                                humidity:this.currentSmall.soilQuality.wetness+'%'
                        }
                }
        },
        watch:{
                currentSmall:{
                        deep:true,
                        handler(){
                                this.state = {
                                        height:this.currentSmall.treeState.height,
                                        treeRounds:this.currentSmall.treeState.treeRounds,
                                        survival:((this.currentSmall.treeState.liTreeNum/(this.currentSmall.treeState.liTreeNum+this.currentSmall.treeState.deTreeNum))*100).toFixed(2)+'%',
                                        type:this.currentSmall.treeState.type,
                                        aliveTrees:this.currentSmall.treeState.liTreeNum,
                                        deadTrees:this.currentSmall.treeState.deTreeNum,
                                        ph:this.currentSmall.soilQuality.ph,
                                        area:this.currentSmall.soilQuality.acreage,
                                        planDate:this.currentSmall.treeState.plantingTime,
                                        fertility:this.currentSmall.soilQuality.nutrient,
                                        humidity:this.currentSmall.soilQuality.wetness+'%'
                                }
                        }
                }
        }
}
</script>

<style scoped>
.smallRegion{
        width: 100%;
        height: 100%;
}
.picture {
        float: left;
        width: 50%;
        padding-left: 10px;
}
.cardStyle{
        margin-top: 55px;
        margin-left: 35px;
        padding-left: 20px;
        float: left;
        border-radius: 10px;
        background-color: #b4c0d0;
        width: 20%;
        height: 15%;
}
.icon{
        margin-left: 15px;
        padding-top: 20%;
        float: left;
        font-size: 40px;
        font-weight: 300;
        color: white;
}
/deep/.el-descriptions__header{
        margin-left: 50px;
}
/deep/.el-descriptions__title{
        font-size: 20px;
        line-height: 2;
}
/deep/.el-descriptions__body{
        margin-left: 30px;
}
/deep/.el-descriptions-item__content{
        font-size: 17px;
        color: #509dfd;
}
/deep/.el-descriptions-item__label:not(.is-bordered-label){
        font-size: 17px;
}
.el-icon-warning-outline{
        float: left;
        margin-left: 20px;
        font-size: 20px;
        color: red;
}
</style>