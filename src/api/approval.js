import axios from "@/utils/http";

export function allApply0(){
        return axios({
                method:"GET",
                url:"/apply/allApply0",
        })
}

export function allApplyNo0(){
        return axios({
                method:"GET",
                url:"/apply/allApplyNo0",
        })
}

export function acceptApply(data){
        return axios({
                method:"POST",
                url:"/apply/acceptApply",
                data:data,
        })
}

export function rejectApply(data){
        return axios({
                method:"POST",
                url:"/apply/rejectApply",
                data:data,
        })
}

export function deleteApply(data){
        return axios({
                method:"POST",
                url:"/apply/deleteApply",
                data:data,
        })
}