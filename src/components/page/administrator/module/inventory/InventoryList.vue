<template>
<div>
        <div>
                <div class="setting">
                        <el-button icon="el-icon-circle-plus-outline" type="primary" @click="addItem">Add Goods</el-button>
                        <el-button icon="el-icon-delete" type="danger" :disabled="!isSelect" @click="deleteAll">Batch Delete</el-button>
                        <el-select style="margin-left: 50px" v-model="selectType" placeholder="Please Choose">
                                <el-option
                                        v-for="item in allType"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                </el-option>
                        </el-select>
                        <el-button style="margin-left: 20px" type="primary" icon="el-icon-refresh-left" circle @click="selectType=null"></el-button>
                </div>
                <div>
                        <div>
                                <el-table
                                        height="750"
                                        ref="multipleTable"
                                        :data="filterData"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        @selection-change="handleSelectionChange">
                                        <el-table-column
                                                disabled="ture"
                                                type="selection"
                                                width="55">
                                        </el-table-column>
                                        <el-table-column
                                                prop="type"
                                                label="Type"
                                                width="250">
                                        </el-table-column>
                                        <el-table-column
                                                prop="name"
                                                label="Name"
                                                width="250">
                                        </el-table-column>
                                        <el-table-column label="Picture" width="250">
                                                <template slot-scope="scope">
                                                                <el-image
                                                                        style="width: 100px; height: 100px"
                                                                        :src="scope.row.picUrl"
                                                                        fit="contain">
                                                                </el-image>
                                                </template>
                                        </el-table-column>
                                        <el-table-column
                                                prop="number"
                                                label="Number"
                                                width="250">
                                        </el-table-column>
                                        <el-table-column
                                                label="Note"
                                                width="200">
                                                <template slot-scope="scope">
                                                        <el-popover
                                                                placement="left"
                                                                title="Details"
                                                                width="200"
                                                                trigger="click"
                                                                :content="scope.row.note">
                                                                <el-link type="primary" slot="reference">View Details</el-link>
                                                        </el-popover>
                                                </template>
                                        </el-table-column>
                                        <el-table-column label="Operations">
                                                <template slot-scope="scope">
                                                        <el-button
                                                                size="mini"
                                                                type="primary"
                                                                @click="purchase(scope.row)">Purchase</el-button>
                                                        <el-button
                                                                size="mini"
                                                                type="danger"
                                                                @click="clear(scope.row.id)">&nbsp;Delete&nbsp;</el-button>
                                                </template>
                                        </el-table-column>
                                </el-table>



                        </div>
                        <el-dialog title="Add The Inventory" :visible.sync="edit.dialogFormVisible">
                                <el-form>
                                        <el-form-item label="Type Of Goods" :label-width="edit.formLabelWidth">
                                                <p style="font-size: 18px;margin-left: 10px">{{edit.item.type}}</p>
                                        </el-form-item>
                                        <el-form-item label="Name Of Goods" :label-width="edit.formLabelWidth">
                                                <p style="font-size: 18px;margin-left: 10px">{{edit.item.name}}</p>
                                        </el-form-item>
                                        <el-form-item label="Quantity In" :label-width="edit.formLabelWidth">
                                                <el-input-number v-model="edit.number" ></el-input-number>
                                        </el-form-item>
                                        <el-form-item label="Total Money" :label-width="edit.formLabelWidth">
                                                <el-input style="width: 100px" v-model="edit.totalMoney" ></el-input>
                                        </el-form-item>

                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                        <el-button @click="edit.dialogFormVisible = false">Cancel</el-button>
                                        <el-button type="primary" @click="addNum">Confirm</el-button>
                                </div>
                        </el-dialog>

                        <el-dialog title="Add The Inventory" :visible.sync="add.dialogFormVisible">
                                <el-form>
                                        <el-form-item label="Type Of Goods" :label-width="add.formLabelWidth">
                                                <el-input style="width: 250px" v-model="add.item.type" placeholder="Please enter the type of item"></el-input>
                                        </el-form-item>
                                        <el-form-item label="Name Of Goods" :label-width="add.formLabelWidth">
                                                <el-input style="width: 250px"  v-model="add.item.name" placeholder="Please enter the name of item"></el-input>
                                        </el-form-item>
                                        <el-form-item label="Number Of Goods" :label-width="add.formLabelWidth">
                                                <el-input-number v-model="add.item.number"></el-input-number>
                                        </el-form-item>
                                        <el-form-item label="Cost Of This" :label-width="add.formLabelWidth">
                                                <el-input style="width: 250px"  v-model="add.totalMoney" placeholder="Please enter the name of item"></el-input>
                                        </el-form-item>
                                        <el-form-item label="Details Of Goods" :label-width="add.formLabelWidth">
                                                <el-input style="width: 250px"  v-model="add.item.note" type="textarea" :rows="2" placeholder="Please enter the name of item"></el-input>
                                        </el-form-item>

                                        <el-form-item label="Picture Of Goods" :label-width="add.formLabelWidth">
                                                <el-upload
                                                        ref="upload"
                                                        class="upload-demo"
                                                        :auto-upload="false"
                                                        accept=".jpg,.jpeg,.png"
                                                        :on-change="handleChange"
                                                        :on-remove="handleChange"
                                                        :before-upload="beforeUpload"
                                                        action="http://localhost:8080/Storages/uploadPic">
                                                        <el-button v-if="!add.picture" size="small" type="primary">Select Image</el-button>
                                                </el-upload>

                                        </el-form-item>

                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                        <el-button @click="add.dialogFormVisible = false">Cancel</el-button>
                                        <el-button type="primary" @click="submitData">Confirm</el-button>
                                </div>
                        </el-dialog>

                </div>
        </div>

</div>
</template>

<script>
import {allInventory, deleteItem, updateItem, deleteList, allType} from '@/api/inventory'

export default {
        name: "InventoryList",
        inject:['reload'],
        data(){
                return{
                        tableData:[],
                        isSelect:false,
                        filterData:[],
                        edit:{
                                formLabelWidth:"250px",
                                dialogFormVisible:false,
                                item:{},
                                number:null,
                                totalMoney:null
                        },
                        add:{
                                picture: false,
                                formLabelWidth:"250px",
                                dialogFormVisible:false,
                                item:{
                                        name:'',
                                        type:'',
                                        number:null,
                                        picUrl:'',
                                        note:''
                                },
                                totalMoney:null
                        },
                        allType:[],
                        selectType:'',
                        multipleSelection:[]
                }
        },
        methods:{
                handleSelectionChange(val) {
                        this.multipleSelection=[]
                        this.isSelect = val.length !== 0;
                        val.forEach(item=>{
                                this.multipleSelection.push(item.id)
                        })
                },
                purchase(item){
                        this.edit.item = {}
                        this.edit.dialogFormVisible = true
                        this.edit.item = item
                },
                addItem(){
                        this.add.dialogFormVisible = true
                },
                addNum(){
                        this.$confirm('Determines whether to modify the inventory of this warehouse item?', 'Note', {
                                confirmButtonText: 'Confirm',
                                cancelButtonText: 'Cancel',
                                type: 'warning'
                        }).then(() => {
                                const data = JSON.parse(JSON.stringify(this.edit.item))
                                data.number = this.edit.number
                                this.edit.dialogFormVisible = false
                                updateItem(data).then(()=>{
                                        this.$message({
                                                type: 'success',
                                                message: 'Update successfully!'
                                        });
                                        this.reload()
                                })
                                }).catch(() => {
                        });
                },
                clear(id){
                        this.$confirm('After confirmation, the inventory will delete all the information of this item. Are you sure?', 'Note', {
                                confirmButtonText: 'Confirm',
                                cancelButtonText: 'Cancel',
                                type: 'warning'
                        }).then(() => {
                                console.log(id)
                                deleteItem(id).then(()=>{
                                        this.$message({
                                                type: 'success',
                                                message: 'Delete Successfully!'
                                        });
                                        this.reload()
                                })
                        }).catch(() => {
                        });
                },
                deleteAll(){
                        this.$confirm('This action will delete all selected item information. Are you sure?', 'Note', {
                                confirmButtonText: 'Confirm',
                                cancelButtonText: 'Cancel',
                                type: 'warning'
                        }).then(() => {
                                deleteList(this.multipleSelection).then(()=>{
                                        this.$message({
                                                type: 'success',
                                                message: 'Delete Successfully!'
                                        });
                                        this.reload()
                                })
                        }).catch(() => {
                        });
                },
                handleChange(file, fileList){
                        this.add.picture = fileList.length > 0;
                },
                beforeUpload(file){
                        const isJPG =
                                file.type === "image/jpeg" ||
                                file.type === "image/jpg" ||
                                file.type === "image/png";
                        // 限制只能100M以内的图片
                        const isLt100M = file.size / 1024 / 1024 < 100;
                        if (!isJPG) {
                                this.$message.error("Images can only be JPG or PNG!");
                        }
                        if (!isLt100M) {
                                this.$message.error("The size of uploaded profile picture cannot exceed 100MB!");
                        }
                        if (isJPG && isLt100M){
                                this.add.picture = true
                        }
                        return isJPG && isLt100M;
                },
                submitData(){
                        this.$refs.upload.submit()
                }
        },
        mounted() {
                allInventory().then(response=>{
                        this.tableData = response.data
                        this.filterData = this.tableData
                })
                allType().then(res=>{
                        this.allType = res.data
                })
        },
        watch:{
                selectType(){
                        if (this.selectType!==null){
                                this.filterData = this.tableData.filter(item=>{
                                        return item.type === this.selectType
                                })
                                console.log(this.filterData)
                        }else {
                                this.filterData = this.tableData
                        }
                }
        }
}
</script>

<style scoped>
.setting{
        background-color: white;
        padding-left: 20px;
        margin-bottom: 15px;
}
</style>