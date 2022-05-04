export default {
        namespaced:true,

        mutations:{
                GET_BIGREGION(state,value){
                        state.bigRegion = value
                }
        },
        state:{
                bigRegion:[]
        },
}