<template>
<section-edit title="文件資訊">
    <box title="請購單查詢明細區">
        <div class="row">
            <div class="col-sm-3 content-box">
                <div class="w100 title"><b class="float-left">供應商</b><b class="required-icon">*</b></div>
                <disable-text placeHolder="請點選右方【選擇】鈕選擇供應商" :text="supplierName"></disable-text>
            </div>
            <div class="col-sm-1 content-box">
                <div class="w100 title">
                    <b class="float-left">選擇</b>
                </div>
                <Remodal remodalId="remodal-02" title="供應商查詢" v-on:accept="acceptResult">
                    <div class="col-sm-12 m-top10">
                        <selecter v-model="supplier" :optionData="supplierDatas" @change="supplierChange($event)"
                            :smallSize=true>
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
                    <text-string v-model="itemDescription" placeHolder="請填寫品名描述"></text-string>
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
                    <table-base :tableData="noDelData" :dataObj="dataObj" @addObject="addData" @delObject="delData"
                        :addIcon="showAddIcon" :delIcon="showDelIcon">
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
                                <input type="checkbox" class="DetailCheckbox" v-model="data.sel" />
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
                            <td colspan="2"><input type="checkbox" class="InnerDetailCheckbox" v-model="subdata.raChk"
                                    @change="deliveryChange(data,subdata)" />{{subdata.receiveAmount}}</td>
                            <td colspan="2" v-text="subdata.paymentDep"></td>
                            <td colspan="4" v-text="subdata.receiveDep"></td>
                        </template>
                    </table-base>
                    <div class="btn-02-add" @click="genPo()"><a>
                            <p><b>建立明細</b></p>
                        </a></div>
                    <pre style="margin-top: 25px" v-show="trace">{{this.noDelData}}</pre>
                </div>
            </div>
        </box>
    </transition>
    <transition name="fade">
        <box title="採購資訊區" v-show="PO">
            <div class="row">
                <div class="col-sm-4 content-box">
                    <div class="w100 title"><b class="float-left">供應商</b></div>
                    <disable-text text="家樂福(12345)"></disable-text>
                </div>
                <div class="col-sm-8 content-box">
                    <div class="w100 title"><b class="float-left">發票地點</b></div>
                    <disable-text text="10491台北市中山區撫順街41巷13號"></disable-text>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4 content-box">
                    <div class="w100 title">聯絡人</div>
                    <text-string placeHolder="請填寫聯絡人資訊"></text-string>
                </div>
                <div class="col-sm-8 content-box">
                    <div class="w100 title">聯絡人郵件地址</div>
                    <text-string placeHolder="請填寫郵件地址"></text-string>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-3 content-box">
                    <div class="w100 title"><b class="float-left">請購單號</b></div>
                    <disable-text text="PR201801010001"></disable-text>
                </div>
                <div class="col-sm-3 content-box">
                    <div class="w100 title"><b class="float-left">報價單號</b></div>
                    <disable-text text="QO201802010001"></disable-text>
                </div>
                <div class="col-sm-3 content-box">
                    <div class="w100 title">報價單幣別</div>
                    <disable-text text="USD"></disable-text>
                </div>
                <div class="col-sm-3 content-box">
                    <div class="w100 title"><b class="float-left">發票管理人</b><b class="required-icon">*</b></div>
                    <div id="invoice" class="area-1">
                        <links-peo :selText="invoiceEmp"></links-peo>
                        <ButtonAction bgColor="btn-02-blue" iconName="icon-plus" @click="openRemodal('remodal-03')">選擇人員</ButtonAction>
                        <Remodal remodalId="remodal-03" title="發票管理人查詢" @accept="acceptEmpResult">
                            <div class="col-sm-12 m-top10">
                                <selecter v-model="invoiceEmpId" :optionData="invoiceDatas" @change="invoiceChange($event)" :smallSize="false" ></selecter>
                            </div>
                        </Remodal>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 content-box">
                    <div class="w100 title">
                        採購備註<br>
                    </div>
                    <textarea class="tt" placeholder="請填寫採購備註(限1000字內)"></textarea>
                </div>
            </div>
        </box>
    </transition>
    <transition name="fade">
        <box title="採購明細區" v-show="PODetail">
            <div class="row">
                <div class="col-sm-4 content-box">
                    <div class="w100 title">採購總金額</div>
                    <disable-text text="" placeHolder="系統自動帶入"></disable-text>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 content-box">
                    <div class="w100 title">明細表</div>
            <table-base :tableData="noDelData" :addIcon="showAddIcon" :delIcon="showDelIcon">
                        <template slot="FirstHead">
                                <th class="th-title w5">編號</th>
                                <th class="th-title">採購分類</th>
                                <th class="th-title w25">品名描述</th>
                                <th class="th-title w10">數量</th>
                                <th class="th-title w5">單位</th>
                                <th class="th-title w15">議價單價</th>
                                <th class="th-title w15">
                                    明細金額
                                </th>
                        </template>
                        <template v-slot:FirstDetail="{ data,index }">
                                <td rowspan="999" class="DetailSerno text-center">
                                    1
                                </td>
                                <td>辦公室用具</td>
                                <td>桌子</td>
                                <td>6</td>
                                <td>張</td>
                                <td>
                                    <input type="text" class="input h30" placeholder="請輸入金額">
                                </td>
                                <td>
                                    <b class="undone-text">系統自動帶入</b>
                                </td>
                        </template>
                        <template v-slot:SecondDetailHead>
                                <th class="th-title-1" colspan="3">原幣報價單價</th>
                                <th class="th-title-1" colspan="4">最低報價</th>
                        </template>
                        <template v-slot:SecondDetail="{ data }">
                                <td colspan="2">7,845,123</td>
                                <td colspan="4">是</td>
                        </template>
                        <template v-slot:ThirdHead="{ data }">
                                <th class="th-title-1">送貨數量</th>
                                <th class="th-title-1">明細金額</th>
                                <th class="th-title-1" colspan="2">掛帳單位</th>
                                <th class="th-title-1" colspan="2">
                                    收貨單位
                                </th>
                        </template>
                        <template v-slot:ThirdDetail="{data, subdata,index }">
                                <td>
                                    <input type="text" placeholder="請輸入數量" class="input h30">
                                </td>
                                <td>
                                    <b class="undone-text">系統自動帶入</b>
                                </td>
                                <td colspan="3">1399-ZZ分行</td>
                                <td colspan="2">1399-ZZ分行</td>
                        </template>
                    </table-base>
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
import LinksPeo from '../components/LinksPeo.vue'
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
        TableBase,
        LinksPeo
    },
    data(){
        return {
                trace:false,
                PO:false,
                PODetail:false,
                supplierResult:false,
                searchResult:false,
                showAddIcon:false,
                showDelIcon:false,
                prNum:"",
                quoteEmp:"",
                invoiceEmpId:"",
                invoiceEmp:"",
                itemDescription:"",
                seletData:"",
                supplier:"",
                supplierName:"",
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
            this.PO = false
            this.PODetail = false
        }
    },
    supplierChange(e){
        console.log(e)
    },
    invoiceChange(e){
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
        this.PO = true
        this.PODetail = true
        this.searchResult = false
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
    acceptEmpResult(e){
        const sel = this.invoiceDatas.find(item =>  item.value === this.invoiceEmpId)
        this.invoiceEmp = `${sel.text}(${sel.value})`
        console.log(`發票管理人選擇結果：${sel.value} - ${sel.text}`)
    },
    deliveryChange(data,subdata){
        if (subdata.raChk === false){
            data.sel = false
        }
    }
    },
    computed:{...mapGetters('po',['noDelData','addressDatas','prDatas','quoteDatas','supplierDatas','invoiceDatas'])}
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
