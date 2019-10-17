<template>
    <table class="table table-hover table-bordered tbody-hover-outline">
        <thead>
            <tr>
                <slot name="FirstHead"></slot>
                <!-- 最上層右邊的按鈕 -->
                <th class="th-title w10">
                    Actions
                    <div class="btn-01-add"><a class="p-all0" v-on:click="setAllOpenStatus()">
                            <div v-bind:class="[isAllOpen?'list-close-icon':'list-open-icon']"></div>
                        </a></div>
                    <div class="p-left5 btn-01-add"><a v-on:click="addNewObject()">
                            <div class="icon-plus bt-icon-size-1"></div>
                        </a></div>
                </th>
            </tr>
        </thead>
        <tbody v-for="(data,index) in noDelDatas" v-bind:key="index">
            <tr>
                <slot name="FirstDetail" v-bind:data="data" v-bind:index="index"></slot>
                <!-- 明細層右邊的按鈕 -->
                <td>
                    <div class="btn-01-add ExpandDetail"><a v-on:click="data.isDetailOpen = !data.isDetailOpen">
                            <div class="glyphicon"
                                v-bind:class="[data.isDetailOpen?'glyphicon-chevron-up':'glyphicon-chevron-down']">
                            </div>
                        </a></div>
                    <div class="icon-cross icon-remove-size" v-on:click="alertConfirm(data.no)"></div>
                </td>
            </tr>
            <tr v-show="data.isDetailOpen">
                <slot name="SecondDetailHead" v-bind:data="data"></slot>
            </tr>
            <tr v-show="data.isDetailOpen">
                <slot name="SecondDetail" v-bind:data="data"></slot>
            </tr>
            <tr v-show="data.isDetailOpen">
                <slot name="ThirdHead" v-bind:data="data"></slot>
                <!-- 最子層右邊的按鈕 -->
                <th class="th-title-2" colspan="2">
                    子項目
                    <div class="btn-01-add float-right"><a v-on:click="data.isSubOpen = !data.isSubOpen"><span v-text="data.isSubOpen?'收合':'展開'"></span></a></div>
                </th>
            </tr>
                <!-- 不展開時的顯示畫面 -->
            <tr class="InnerDetailShowBar" v-show="data.isDetailOpen && !data.isSubOpen">
                <td colspan="7" class="text-center">
                    <b class="undone-text">請展開檢視更多項目...</b>
                </td>
            </tr>
            <tr v-for="(subdata,index) in data.subDatas" v-show="data.isDetailOpen && data.isSubOpen"
                v-bind:key="index">
                <slot name="ThirdDetail" v-bind:subdata="subdata" v-bind:index="index"></slot>
            </tr>
        </tbody>
    </table>
</template>
<script>
import tableData from '../data/codegentable.json'
import  _ from 'lodash'
export default {
        props:{tableData:Array,dataObj:Object,addObject:Function,delObject:Function},
        data(){
        return {isAllOpen: true,datas:[]}
        },
        mounted(){
            this.datas = this.tableData
        },
        computed:{
            noDelDatas(){
                    this.datas = this.tableData
                    return this.datas.filter(element => element.isdelete === 0)
            }
        },
        methods:{
        setAllOpenStatus() {
                this.isAllOpen = !this.isAllOpen
                this.datas.forEach(element => element.isDetailOpen = this.isAllOpen);
   //設定明細跟隨isAllOpen的狀態
            },
        addNewObject: function () {
                    let no = this.datas.length + 1
                    var obj = _.cloneDeep(this.dataObj);  //深層複製
                    obj.no = no
                    // this.datas.push(obj)
                    this.addObject(obj)
            },
        alertConfirm: function (no) {
        var text = `是否刪除，編號：${no} ?`
        // Trigger a confirmation dialog
        let self = this
        this.$dialog
        .confirm(text)
        .then(function(dialog) {
            let delObj = self.datas.find(element => element.no === no)
            delObj.isdelete = 1
            self.delObject(delObj)
        })
        .catch(function() {
            console.log('Clicked on cancel');
        });
     },
    }
}
</script>
