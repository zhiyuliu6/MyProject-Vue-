<template>
                <baidu-map class="bm-view"
                           ak="aDue0Uz9qf7hmOAv9vZYzrdZuGi1BYF9"
                           :center="center"
                           :zoom="zoom"
                           mapType="BMAP_HYBRID_MAP"
                           :map-click="false"
                           @mousemove="syncPolygon"
                           style="height:800px"
                           @click="paintPolygon"
                           @rightclick="newPolygon"
                           @ready="handler">
                        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                        <bm-control>
                                <el-row>
                                        <el-button icon="el-icon-rank" type="primary" @click="toggle('polygonPath')">{{ polygonPath.editing ? 'Stop drawing' : 'Start to draw' }}</el-button>
                                        <el-button icon="el-icon-refresh-left" type="primary" @click="returnM">Return to the previous level</el-button>
                                </el-row>
                        </bm-control>

                        <bm-polygon
                                :path="path"
                                v-for="path of polygonPath.paths"
                                :key="path.toString()"
                                stroke-color="blue"
                                fill-color="blue"
                                :fill-opacity="0.4"
                                :stroke-opacity="0.5"
                                :stroke-weight="2">
                        </bm-polygon>

                        <bm-polygon
                                :path="path"
                                v-for="(path,index) of pointList"
                                :key="index"
                                stroke-color="blue"
                                fill-color="blue"
                                :fill-opacity="0.4"
                                :stroke-opacity="0.5"
                                :stroke-weight="2"
                                @click="alertpath($event,index)">
                        </bm-polygon>


                </baidu-map>
</template>

<script>
import {BaiduMap, BmControl, BmPolygon,BmNavigation} from 'vue-baidu-map'
import GeoUtils from 'bmaplib.geoutils'
export default {
        name: "Map",
        props:['currentBig','newSRegional','endSubmit','returnM'],
        data () {
                return {
                        requestUrl:'http://localhost:8080',
                        pointList:[],
                        center: {lng: 0, lat: 0},
                        zoom: 3,
                        polygonPath: {
                                editing: false,
                                paths: []
                        },
                        clickInfo:{
                                areaName:null,
                                leaderName:null
                        }
                }
        },
        components:{
                BaiduMap,
                BmControl,
                BmPolygon,
                BmNavigation,
        },
        methods: {
                handler ({BMap, map}) {
                        console.log(BMap, map)
                        this.center.lng = 116.404
                        this.center.lat = 39.915
                        this.zoom = 15
                },

                toggle (name) {
                        this.polygonPath.paths = []
                        this[name].editing = !this[name].editing
                },

                syncPolygon (e) {
                        if (!this.polygonPath.editing) {
                                return
                        }
                        const { paths } = this.polygonPath
                        if (!paths.length) {
                                return
                        }
                        const path = paths[paths.length - 1]
                        if (!path.length) {
                                return
                        }
                        if (path.length === 1) {
                                path.push(e.point)
                        }
                        this.$set(path, path.length - 1, e.point)
                },

                newPolygon () {
                        if (!this.polygonPath.editing) {
                                return
                        }
                        this['polygonPath'].editing = !this['polygonPath'].editing
                        const { paths } = this.polygonPath
                        if (!paths.length) {
                                paths.push([])
                        }
                        const path = paths[paths.length - 1]
                        path.pop()
                        if (path.length) {
                                paths.push([])
                        }

                        this.$confirm('Confirm your selection?', 'Note', {
                                confirmButtonText: 'Confirm',
                                cancelButtonText: 'Cancel',
                                type: 'warning'
                        }).then(() => {
                                this.pointList.push(paths[0])
                                this.addSubmit(paths[0])
                                this.$message({
                                        type: 'success',
                                        message: 'Add Successful!'
                                });
                        }).catch(() => {
                                this.polygonPath.paths = []
                                this.$message({
                                        type: 'info',
                                        message: 'Canceled Add'
                                });
                        });
                },
                paintPolygon (e) {
                        if (!this.polygonPath.editing) {
                                return
                        }
                        const { paths } = this.polygonPath
                        !paths.length && paths.push([])
                        paths[paths.length - 1].push(e.point)
                },
                storePoints(id,paths){
                        const send = []
                        for (let i = 0; i < paths.length; i++) {
                                let obj = {
                                        smallRId:id,
                                        lat:paths[i].lat,
                                        lng:paths[i].lng
                                }
                                send.push(obj)
                        }
                        this.axios.post(`${this.requestUrl}/addPoint`,send).then(()=>{
                                this.$message({
                                        message: 'Congratulations,add Successful',
                                        type: 'success'
                                });
                        }).catch((reason)=>{
                                this.$message.error('Sorry,'+reason.message);
                        })
                },
                addSubmit(paths){
                        this.axios.post(`${this.requestUrl}/addSmallRegional`,{
                                regionSoil:this.newSRegional,
                                acreage:parseFloat(GeoUtils.getPolygonArea(paths).toFixed(4))
                        }).then((response)=>{
                                this.$notify({
                                        title: 'Successful',
                                        message: 'Add Small Regional Successfully',
                                        type: 'success'
                                });
                                this.newSRegional.id = response.data
                                this.storePoints(this.newSRegional.id,paths)
                                this.endSubmit(paths)
                        })
                },
                alertpath(e,index){
                        const h = this.$createElement;
                        this.clickInfo.areaName = this.currentBig.smallRegions[index].smallName
                        this.clickInfo.leaderName = this.currentBig.smallRegions[index].staffLeader.name
                        const area = parseFloat(GeoUtils.getPolygonArea(this.currentBig.smallRegions[index].points).toFixed(4))
                        this.$notify({
                                title: 'Information',
                                message: h('i', { style: 'color: teal'}, `The group leader in charge of this small area is called ${this.clickInfo.leaderName},
                                This small Region is called ${this.clickInfo.areaName}
                                This Region's area is ${area} m²
                                `)
                        });
                }
        },
        beforeMount() {
                const a = []
                const lsit = this.currentBig.smallRegions
                console.log(lsit)
                for (let i = 0; i <lsit.length; i++) {
                        console.log(lsit[i].points)
                        a.push(lsit[i].points)
                }
                this.pointList = a
        }
}
</script>

<style scoped>
.bm-view {
        width: 100%;
        height: 100%;
}
/deep/.BMap_cpyCtrl {
        display: none;
}
/deep/.anchorBL {
        display: none;
}
</style>