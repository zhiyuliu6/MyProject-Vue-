<template>
        <div style="height: 100%">
                <Home v-if="isRouterAlive"/>
        </div>
</template>

<script>
import Home from "@/components/page/administrator/Home";
import {mapMutations} from "vuex";
export default {
        name: 'App',
        data(){
                return{
                        isRouterAlive:true,
                        requestUrl:'http://localhost:8080',
                }
        },
        provide(){
                return{
                        reload:this.reload
                }
        },
        components: {Home},
        methods:{
                ...mapMutations('employee',{storeLeaders:'STORE_LEADERS'}),
                ...mapMutations('regional',{storeRegional:'GET_BIGREGION'}),
                reload(){
                        this.isRouterAlive = false
                        this.$nextTick(function (){
                                this.isRouterAlive = true
                        })
                }
        },
        created() {
                this.axios.get(`${this.requestUrl}/allStaffLeader`).then((response)=>{
                        this.storeLeaders(response.data)
                }).catch((reason)=>{
                        console.log(reason)
                })

                this.axios.get(`${this.requestUrl}/getAllRegion`).then((response)=>{
                        this.storeRegional(response.data)
                }).catch((reason)=>{
                        console.log(reason)
                })


        },
}
</script>

<style>

</style>
