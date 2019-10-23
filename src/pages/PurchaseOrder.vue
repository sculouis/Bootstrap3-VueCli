<template>
<section-edit title="文件資訊">
    <box title="請購單查詢明細區">
        <div class="row">
            <div class="col-sm-3 content-box">
                <div class="w100 title"><b class="float-left">供應商</b><b class="required-icon">*</b></div>
                <disable-text placeHolder="請點選右方【選擇】鈕選擇供應商" v-if="supplierEmpty"></disable-text>
                <disable-text v-else  v-text="supplierName"></disable-text>
            </div>
            <div class="col-sm-1 content-box">
                <div class="w100 title">
                    <b class="float-left">選擇</b>
                </div>
                <Remodal remodalId="remodal-02" title="供應商查詢" v-on:accept="acceptResult">
                    <div class="col-sm-12 m-top10">
                        <selecter v-model="supplier" :optionData="supplierDatas" @change="supplierChange($event)">
                        </selecter>
                    </div>
                </Remodal>
                <ButtonAction bgColor="btn-02-blue" iconName="icon-search" @click="openRemodal('remodal-02')">選擇
                </ButtonAction>
            </div>
            <div class="col-sm-8 content-box">
                <div class="w100 title"><b class="float-left">發票地點</b><b class="required-icon">*</b></div>
                <div class="w100 text-box">
                    <selecter v-model="seletData" :optionData="addressDatas" @change="addressChange($event)">
                    </selecter>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="row" v-show="supplierResult">
                <div class="col-sm-3 content-box">
                    <div class="w100 title"><b class="float-left">請購單號</b></div>
                    <div class="w100 text-box">
                        <selecter v-model="prNum" :optionData="prDatas"></selecter>
                    </div>
                </div>
                <div class="col-sm-3 content-box">
                    <div class="w100 title"><b class="float-left">報價經辦</b></div>
                    <div class="w100 text-box">
                        <selecter v-model="quoteEmp" :optionData="quoteDatas"></selecter>
                    </div>
                </div>
                <div class="col-sm-4 content-box">
                    <div class="w100 title">
                        <b class="float-left">請購單品名描述</b>
                    </div>
                    <text-string v-model="itemDescription"></text-string>
                </div>
                <div class="col-sm-2 content-box">
                    <div class="title"></div>
                    <div class="area-1">
                        <button-action iconName="glyphicon glyphicon-remove" bgColor="btn-02-gray btn-left">清除
                        </button-action>
                        <button-action iconName="icon-search" bgColor="btn-02-blue btn-left" @click="search()">查詢
                        </button-action>
                    </div>
                </div>
            </div>
        </transition>
    </box>
    <transition name="fade">
        <box title="查詢結果" v-show="searchResult">
            <div class="row">
                <div class="col-sm-12 content-box">
                    <div class="w100 title m-top10">
                        <b class="float-left">請購單明細</b>
                    </div>
                    <table-base :tableData="noDelData" :dataObj="dataObj" @addObject="addData" @delObject="delData" :addIcon="showAddIcon" :delIcon="showDelIcon">
                        <template slot="FirstHead">
                            <th class="th-title w5">選擇</th>
                            <th class="th-title w10">請購單號</th>
                            <th class="th-title w10">報價單號</th>
                            <th class="th-title">採購分類</th>
                            <th class="th-title w25">品名描述</th>
                            <th class="th-title w10">數量</th>
                            <th class="th-title w10">單位</th>
                            <th class="th-title w10">
                                最低報價
                            </th>
                        </template>
                        <template v-slot:FirstDetail="{ data,index }">
                            <td class="DetailSerno" rowspan="200">
                                <input type="checkbox" class="DetailCheckbox" v-model="data.sel"/>
                            </td>
                            <td v-text="data.prNum"></td>
                            <td v-text="data.quoteNum"></td>
                            <td v-text="data.category"></td>
                            <td v-text="data.itemDescription"></td>
                            <td v-text="data.amount"></td>
                            <td v-text="data.unitName"></td>
                            <td v-text="data.minQuote?'是':'否'"></td>
                        </template>
                        <template v-slot:SecondDetailHead>
                            <th class="th-title-1">幣別</th>
                            <th class="th-title-1" colspan="2">原幣報價單價</th>
                            <th class="th-title-1">報價經辦</th>
                            <th class="th-title-1" colspan="4">發票管理人</th>
                        </template>
                        <template v-slot:SecondDetail="{ data }">
                            <td v-text="data.currency"></td>
                            <td colspan="2" v-text="data.originalQuote"></td>
                            <td v-text="data.quoteEmp">游OO(17962)</td>
                            <td colspan="4" v-text="data.invoiceEmp"></td>
                        </template>
                        <template v-slot:ThirdHead="{ data }">
                            <th class="th-title-1" colspan="2">送貨數量</th>
                            <th class="th-title-1" colspan="2">掛帳單位</th>
                            <th class="th-title-1" colspan="3">
                                收貨單位
                            </th>
                        </template>
                        <template v-slot:ThirdDetail="{data, subdata,index }">
                            <td colspan="2" ><input type="checkbox" class="InnerDetailCheckbox" v-model="subdata.raChk"  @change="deliveryChange(data,subdata)"/>{{subdata.receiveAmount}}</td>
                            <td colspan="2" v-text="subdata.paymentDep"></td>
                            <td colspan="4" v-text="subdata.receiveDep"></td>
                        </template>
                    </table-base>
                    <div class="btn-02-add" @click="genPo()"><a>
                            <p><b>建立明細</b></p>
                        </a></div>
                    <pre style="margin-top: 25px">{{this.noDelData}}</pre>
                </div>
            </div>
        </box>
    </transition>
</section-edit>
</template>
<script>
import SectionEdit from '../components/SectionEdit'
import Box from '../components/Box.vue'
import DisableText from '../components/DisableText.vue'
import ButtonAction from '../components/ButtonAction.vue'
import Selecter from '../components/Selecter.vue'
import Remodal from '../components/Remodal.vue'
import TextString from '../components/TextString.vue'
import TableBase from '../components/TableBase.vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
    components:{
        SectionEdit,
        Box,
        DisableText,
        ButtonAction,
        Selecter,
        Remodal,
        TextString,
        TableBase
    },
    data(){
        return {
                prNum:"",
                quoteEmp:"",
                itemDescription:"",
                seletData:"",
                supplier:"",
                supplierName:"",
                supplierEmpty:true,
                supplierResult:false,
                searchResult:false,
                showAddIcon:false,
                showDelIcon:false,
                 searchResultDatas:[],
                 dataObj:{}
                 }
    },
    mounted(){
        this.getSupplier()
    },
    methods:{...mapMutations('forms',['openRemodal']),...mapActions('po',['prData','getAddress','searchListDatas','getSupplier']),
    addressChange(e){
        if (Number(e) > 0 ){
            this.supplierResult = true
            $.blockUI({message:"請購報價資料讀取中...."})
            this.searchListDatas()
        }else{
            this.supplierResult = false
            this.searchResult = false
        }
    },
    supplierChange(e){
        console.log(e)
    },
    search(){
        $.blockUI({message:"資料讀取中...."})
        this.prData()
        this.searchResult = true
    },
    addData(){

    },
    delData(){

    },
    genPo(){
        console.log(this.$store)
    },
    acceptResult(e){
        const sel = this.supplierDatas.find(item =>  item.value === this.supplier)
        this.supplierEmpty = false
        this.supplierName = `${sel.text}(${sel.value})`
        console.log(`供應商選擇結果：${sel.value} - ${sel.text}`)
        $.blockUI({message:"供應商住址讀取中...."})
        this.getAddress()
    },
    deliveryChange(data,subdata){
        if (subdata.raChk === false){
            data.sel = false
        }
    }
    },
    computed:{...mapGetters('po',['noDelData','addressDatas','prDatas','quoteDatas','supplierDatas'])}
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
