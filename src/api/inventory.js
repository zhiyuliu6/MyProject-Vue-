import axios from "@/utils/http";

export function allInventory(){
        return axios({
                method:"GET",
                url:"/Storages/selectAll",
        })
}

export function updateItem(data){
        return axios({
                method:"POST",
                url:"/Storages/updateNumber",
                data: data,
        })
}

export function deleteItem(data){
        return axios({
                method:"GET",
                url:"/Storages/deleteItem",
                params: {
                        id:data
                },
        })
}

export function deleteList(data){
        return axios({
                method:"POST",
                url:"/Storages/deleteList",
                data: data,
        })
}

export function allType(){
        return axios({
                method:"GET",
                url:"/Storages/allType",
        })
}