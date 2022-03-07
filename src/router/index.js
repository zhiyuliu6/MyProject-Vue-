// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import Employee from "@/components/page/administrator/module/user/Employee";
import Account from "@/components/page/administrator/module/user/Account";
import Members from "@/components/page/administrator/module/user/Members";
import RegionalManagement from "@/components/page/administrator/module/regional/RegionalManagement";
import RegionalInfo from "@/components/page/administrator/module/regional/RegionalInfo";


//创建并暴露一个路由器
export default new VueRouter({
                routes:[
                        {
                                path:'/account',
                                component: Account
                        },
                        {
                                path:'/employee',
                                component:Employee
                        },
                        {
                                path:'/members',
                                component:Members
                        },
                        {
                                path:'/regionalManagement',
                                component:RegionalManagement
                        },
                        {
                                path:'/regionalInfo',
                                component:RegionalInfo
                        }
                ]
})
