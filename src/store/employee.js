export default {
        namespaced:true,

        mutations:{
                STORE_LEADERS(state,value){
                        state.staffLeaders = value
                },
                ADD_MEMBER(state,value){
                        const id = value.id
                        const index = state.staffLeaders.findIndex((item)=>{
                                if (item.id===id){
                                        return true
                                }
                        })
                        state.staffLeaders[index].members.push(value.member)
                },
                DELETE_MEMBER(state,value){
                        const lId = value.lId
                        const index = state.staffLeaders.findIndex((item)=>{
                                if (item.id===lId){
                                        return true
                                }
                        })
                        state.staffLeaders[index].members.splice(value.mIndex,1)
                },
                DELETE_ALL(state,value){
                        const index = state.staffLeaders.findIndex((item)=>{
                                if (item.id===value){
                                        return true
                                }
                        })
                        state.staffLeaders[index].members = []
                },
                UPDATE_STAFFBYREGION(state,value){
                        const id = value.id
                        const index = state.staffLeaders.findIndex((item)=>{
                                if (item.id===id){
                                        return true
                                }
                        })
                        state.staffLeaders[index] = value
                }
        },

        state:{
                staffLeaders:[],
        },
}