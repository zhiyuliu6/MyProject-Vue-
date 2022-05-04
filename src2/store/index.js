import Vue from 'vue'
import Vuex from 'vuex'
import employee from "@/store/employee";
import createPersistedState from 'vuex-persistedstate'
import regional from "@/store/regional";
Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
        modules:{
                employee,
                regional
        },
        plugins:[createPersistedState()]
})