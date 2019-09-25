<template>
    <table class="table table-hover table-bordered tbody-hover-outline">
        <thead>
            <tr>
                <slot name="FirstHead"></slot>
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
        <tbody v-for="(data,index) in tableData" v-bind:key="index">
            <tr>
                <slot name="FirstDetail" v-bind:data="data" v-bind:index="index"></slot>
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
                <th class="th-title-1" colspan="2">
                    子項目
                    <div class="btn-01-add float-right"><a v-on:click="data.isSubOpen = !data.isSubOpen"><span v-text="data.isSubOpen?'收合':'展開'"></span></a></div>
                </th>
            </tr>
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
import { mapGetters,mapMutations } from 'vuex'
import tableData from '../data/codegentable.json'

export default {
        props:{tableData:Array},
        data(){
        return {isAllOpen: true}
        },
        mounted(){
            // this.datas = this.tableData
        },
        methods:{...mapMutations('table',['setIsDetailOpen','addObject','delObject']),
        setAllOpenStatus() {
                this.isAllOpen = !this.isAllOpen
                this.setIsDetailOpen(this.isAllOpen) 
   //設定明細跟隨isAllOpen的狀態
            },
        addNewObject: function () {
                    var no = this.dataLength
                    this.addObject(tableData)                
            },
        alertConfirm: function (no) {
        var text = `是否刪除，編號：${no} ?`
        // Trigger a confirmation dialog
        let self = this
        this.$dialog
        .confirm(text)
        .then(function(dialog) {
            self.delObject(no)
        })
        .catch(function() {
            console.log('Clicked on cancel');
        });
     },
    },
    computed:{...mapGetters('table',['dataLength'])},
}
</script>
