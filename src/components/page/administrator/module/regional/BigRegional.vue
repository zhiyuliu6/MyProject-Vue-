<template>
        <div style="width: 100%;height: 100%">

                <div class="cardStyle">
                        <i class="el-icon-s-data"></i>
                        <div style="height: 100%;width: 80%;text-align: center;float: right;padding-top: 25px">
                                <p style="line-height: 1;color: white">The total number of trees</p>
                                <p style="line-height: 1;color: white;font-size: 40px">{{ totalTrees }}</p>
                        </div>
                </div>

                <div style="background-color: rgba(15,114,255,0.45)" class="cardStyle">
                        <i class="el-icon-money"></i>
                        <div style="height: 100%;width: 80%;text-align: center;float: right;padding-top: 25px">
                                <p style="line-height: 1;color: white">Local ecological forest areas</p>
                                <p style="line-height: 1;color: white;font-size: 40px">{{ smallRegionNum }}</p>
                        </div>
                </div>
                <div id="area"/>

                <div class="weather">
                        <div id="temp">
                        </div>
                        <div style="float: right;width: 50%;margin-top: 25px;margin-right: 25px">
                                <el-descriptions class="margin-top" :column="1" border>
                                        <el-descriptions-item>
                                                <template slot="label">
                                                        The current direction of the wind
                                                </template>
                                                {{ currentWeather.windDir }}
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                                <template slot="label">
                                                        Current weather conditions
                                                </template>
                                                {{ currentWeather.text }}
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                                <template slot="label">
                                                        Current external temperature
                                                </template>
                                                {{ currentWeather.temp }}℃
                                        </el-descriptions-item>
                                </el-descriptions>
                        </div>
                </div>
                <div id="rainFall"/>
                <div id="tree"/>
        </div>
</template>

<script>
import * as echarts from "echarts";
export default {
        name: "BigRegional",
        props:['currentBig'],
        data(){
                return{
                        requestUrl:'http://localhost:8080',
                        areaData:[],
                        weatherData:{
                                date: [],
                                rain : [],
                        },
                        treeType:{
                                type:[],
                                num:[]
                        },
                        smallRegionNum:null,
                        currentWeather:{
                                temp:0,
                                text:'',
                                windDir:''
                        }
                }
        },
        methods:{
                draw(){
                        this.smallRegionNum = this.currentBig.smallRegions.length
                        const data = []
                        for(let j = 0; j < this.currentBig.smallRegions.length; j++) {
                                const obj = {
                                        value:this.currentBig.smallRegions[j].soilQuality.acreage,
                                        name:this.currentBig.smallRegions[j].smallName
                                }
                                data.push(obj)
                        }
                        this.areaData = data
                        const chart1 = document.getElementById("area")
                        const myChart = echarts.init(chart1);
                        const option = {
                                title: {
                                        text: 'Urban ecological forest area ratio',
                                        subtext: 'Current Data',
                                        left: 'center'
                                },
                                tooltip: {
                                        trigger: 'item',
                                        formatter: '{b}：{c} (m²)'
                                },
                                legend: {
                                        orient: 'vertical',
                                        left: 'left'
                                },
                                series: [
                                        {
                                                name: 'Access From',
                                                type: 'pie',
                                                radius: '50%',
                                                data:this.areaData,
                                                emphasis: {
                                                        itemStyle: {
                                                                shadowBlur: 10,
                                                                shadowOffsetX: 0,
                                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                                        }
                                                }
                                        }
                                ]
                        };
                        option && myChart.setOption(option);


                        this.axios.get(`${this.requestUrl}/allRainFell`,{
                                params:{
                                        id: this.currentBig.regionId
                                }
                        }).then((response)=>{
                                this.weatherData = {
                                        date: [],
                                        rain : [],
                                }
                                let a = response.data
                                for(let j = 0; j < a.length; j++) {
                                        this.weatherData.date.push(a[j].date)
                                        this.weatherData.rain.push(a[j].rainFell)
                                }
                                console.log(this.weatherData.date)
                                console.log(this.weatherData.rain)
                                const chart2 = document.getElementById("rainFall")
                                const myChart2 = echarts.init(chart2);
                                const option2 = {
                                        title: {
                                                text: 'Nearly a month\'s rainfall there',
                                                subtext: 'Statistics are made on a daily basis',
                                                left: 'center'
                                        },
                                        grid: {
                                                bottom: 80
                                        },
                                        toolbox: {
                                                feature: {
                                                        dataZoom: {
                                                                yAxisIndex: 'none'
                                                        },
                                                        restore: {},
                                                        saveAsImage: {}
                                                }
                                        },
                                        tooltip: {
                                                trigger: 'axis',
                                                axisPointer: {
                                                        type: 'cross',
                                                        animation: false,
                                                        label: {
                                                                backgroundColor: '#505765'
                                                        }
                                                }
                                        },
                                        legend: {
                                                data: ['Flow', 'Rainfall'],
                                                left: 10
                                        },
                                        xAxis: [
                                                {
                                                        type: 'category',
                                                        boundaryGap: false,
                                                        axisLine: { onZero: false },
                                                        data:this.weatherData.date
                                                }
                                        ],
                                        yAxis: [
                                                {
                                                },
                                                {
                                                        name: 'Rainfall(mm)',
                                                        nameLocation: 'start',
                                                        alignTicks: true,
                                                        type: 'value',
                                                        inverse: true
                                                }
                                        ],
                                        series: [
                                                {
                                                        name: 'Rainfall',
                                                        type: 'line',
                                                        areaStyle: {},
                                                        lineStyle: {
                                                                width: 1
                                                        },
                                                        emphasis: {
                                                                focus: 'series'
                                                        },
                                                        markArea: {
                                                                silent: true,
                                                                itemStyle: {
                                                                        opacity: 0.3
                                                                },
                                                        },
                                                        // prettier-ignore
                                                        data: this.weatherData.rain
                                                },
                                        ]
                                };
                                option2 && myChart2.setOption(option2);
                        })

                        this.axios.get(`${this.requestUrl}/allTypeTree`,{
                                params:{
                                        id: this.currentBig.regionId
                                }
                        }).then((response)=>{
                                this.treeType = {
                                        type:[],
                                        num:[]
                                }
                                let b = response.data
                                for(let j = 0; j < b.length-1; j++) {
                                        this.treeType.type.push(b[j].type)
                                        this.treeType.num.push(b[j].total)
                                }
                                let chartDom = document.getElementById('tree');
                                let myChart3 = echarts.init(chartDom);
                                let option3;
                                option3 = {
                                        color:['#91cc78'],
                                        tooltip:{},
                                        xAxis: {
                                                type: 'category',
                                                data: this.treeType.type
                                        },
                                        yAxis: {
                                                type: 'value'
                                        },
                                        series: [
                                                {
                                                        data: this.treeType.num,
                                                        type: 'bar'
                                                }
                                        ]
                                };
                                option3 && myChart3.setOption(option3);
                        })

                        this.axios.get(`https://devapi.qweather.com/v7/weather/now?location=${this.currentBig.searchId}&lang=en&key=bd3505a985ac48a68fc60fcb61633e65`).then((response)=>{
                                this.currentWeather.temp = response.data.now.temp
                                this.currentWeather.text = response.data.now.text
                                this.currentWeather.windDir = response.data.now.windDir
                                let temp = document.getElementById('temp');
                                let myChart3 = echarts.init(temp);
                                let option3;
                                option3 = {
                                        title:{
                                                subtext:'The current temperature',
                                                left: 'center'
                                        },
                                        series: [
                                                {
                                                        type: 'gauge',
                                                        center: ['50%', '60%'],
                                                        startAngle: 200,
                                                        endAngle: -20,
                                                        min: -30,
                                                        max: 40,
                                                        splitNumber: 10,
                                                        itemStyle: {
                                                                color: '#FFAB91'
                                                        },
                                                        progress: {
                                                                show: true,
                                                                width: 20
                                                        },
                                                        pointer: {
                                                                show: false
                                                        },
                                                        axisLine: {
                                                                lineStyle: {
                                                                        width: 20
                                                                }
                                                        },
                                                        axisTick: {
                                                                distance: -25,
                                                                splitNumber: 2,
                                                                lineStyle: {
                                                                        width: 2,
                                                                        color: '#999'
                                                                }
                                                        },
                                                        splitLine: {
                                                                distance: -33,
                                                                length: 14,
                                                                lineStyle: {
                                                                        width: 3,
                                                                        color: '#999'
                                                                }
                                                        },
                                                        axisLabel: {
                                                                distance: -10,
                                                                color: '#999',
                                                                fontSize: 12
                                                        },
                                                        anchor: {
                                                                show: false
                                                        },
                                                        title: {
                                                                show: false
                                                        },
                                                        detail: {
                                                                valueAnimation: true,
                                                                width: '60%',
                                                                lineHeight: 40,
                                                                borderRadius: 8,
                                                                offsetCenter: [0, '-15%'],
                                                                fontSize: 20,
                                                                fontWeight: 'bolder',
                                                                formatter: '{value} °C',
                                                                color: 'auto'
                                                        },
                                                        data: [
                                                                {
                                                                        value: this.currentWeather.temp
                                                                }
                                                        ]
                                                },
                                                {
                                                        type: 'gauge',
                                                        center: ['50%', '60%'],
                                                        startAngle: 200,
                                                        endAngle: -20,
                                                        min: -30,
                                                        max: 40,
                                                        itemStyle: {
                                                                color: '#FD7347'
                                                        },
                                                        progress: {
                                                                show: true,
                                                                width: 8
                                                        },
                                                        pointer: {
                                                                show: false
                                                        },
                                                        axisLine: {
                                                                show: false
                                                        },
                                                        axisTick: {
                                                                show: false
                                                        },
                                                        splitLine: {
                                                                show: false
                                                        },
                                                        axisLabel: {
                                                                show: false
                                                        },
                                                        detail: {
                                                                show: false
                                                        },
                                                        data: [
                                                                {
                                                                        value: this.currentWeather.temp
                                                                }
                                                        ]
                                                }
                                        ]
                                };
                                option3 && myChart3.setOption(option3);
                        })
                }
        },
        computed:{
                totalTrees(){
                        return  eval(this.treeType.num.join("+"))
                },
        },
        watch:{
                currentBig(){
                        this.draw()
                }
        }
}
</script>

<style scoped>
#area{
        padding-top: 20px;
        float: right;
        height: 47%;
        width: 47%;
}
.cardStyle{
        margin-top: 20px;
        margin-left: 20px;
        padding-left: 20px;
        float: left;
        border-radius: 10px;
        background-color: #b4c0d0;
        width: 20%;
        height: 15%;
        box-shadow: 2px 2px 25px #aaaaaa;
}
.el-icon-money{
        padding-top: 12%;
        float: left;
        font-size: 40px;
        font-weight: 300;
        color: white;
}
.el-icon-s-data{
        padding-top: 12%;
        float: left;
        font-size: 40px;
        font-weight: 300;
        color: white;
}
#rainFall{
        padding-top: 40px;
        float: left;
        width: 50%;
        height: 48%;
}
#tree{
        float: right;
        width: 50%;
        height: 48%;
}
.weather{
        margin-top: 20px;
        margin-left: 20px;
        float: left;
        width: 50%;
        height: 27%;
        box-shadow: 2px 2px 25px #aaaaaa;
        border-radius: 10px;
}
#temp{
        float: left;
        width: 40%;
        height: 110%;
}
</style>