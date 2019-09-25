<template>
<SectionEdit title="文件資訊">
    <Box title="請購單查詢明細區">
        <div class="row">        
            <div class="col-sm-3 content-box">
                <div class="w100 title">
                    <b class="float-left">供應商</b>
                    <b class="required-icon">*</b>
                </div>                    
                <DisableText v-model="supplier" placeHolder="請點選右方【選擇】鈕選擇供應商"></DisableText>
            </div>         
            <div class="col-sm-1 content-box">
                <div class="w100 title">
                    <b class="float-left">選擇</b>
                </div>                    
                <Popup bgColor="btn-02-blue"  iconName="icon-search"  remodalId="choice" title="彈出視窗" buttonName="按鈕"></Popup>
            </div>         
            <div class="col-sm-8 content-box">
                <div class="w100 title">
                    <b class="float-left">發票地點1</b>
                    <b class="required-icon">*</b>
                </div>                    
                <Selecter v-model="invoice"></Selecter>
            </div>         </div>
        <div class="row">        
            <div class="col-sm-3 content-box">
                <div class="w100 title">
                    <b class="float-left">請購單號</b>
                </div>                    
                <Selecter v-model="purchaseId"></Selecter>
            </div>         
            <div class="col-sm-3 content-box">
                <div class="w100 title">
                    <b class="float-left">報價經辦</b>
                </div>                    
                <Selecter v-model="quoteEmpId"></Selecter>
            </div>         
            <div class="col-sm-3 content-box">
                <div class="w100 title">
                    <b class="float-left">請購單品名描述</b>
                </div>                    
                <TextString v-model="description" placeHolder="請填寫品名描述"></TextString>
            </div>         
            <div class="col-sm-3 content-box">
                <div class="w100 title">
                    <b class="float-left">按鈕群</b>
                    <b class="required-icon">*</b>
                </div>                    
                    <ButtonAction bgColor="btn-02-gray"  iconName="glyphicon glyphicon-remove">清除</ButtonAction>
                    <ButtonAction bgColor="btn-02-blue"  iconName="icon-search">查詢</ButtonAction>
            </div>         </div>
    </Box>
    <Box title="table_查詢結果">
        
    <TableBase v-bind:tableData="noDelData">
        <template slot="FirstHead">
            <th class="th-title w5">no</th>
            <th class="th-title w15">選項按鈕</th>
            <th class="th-title w15">檢查按鈕</th>
            <th class="th-title w15">發票地點</th>
            <th class="th-title w15">數字欄位</th>
            <th class="th-title w15">灰階欄位</th>
        </template>
        <template v-slot:FirstDetail = "{ data,index }">
            <td v-text="index + 1" rowspan="200"></td>
            <td> 
                <RadioButton v-model="data.supplier1"></RadioButton>
</td>
            <td> 
                <CheckBox v-model="data.choice1" title="檢查按鈕"></CheckBox>
</td>
            <td> 
                <Selecter v-model="data.invoice1"></Selecter>
</td>
            <td> 
                <TextNumber v-model="data.number1"></TextNumber>
</td>
            <td> 
                <DisableText v-model="data.disable1" placeHolder="None"></DisableText>
</td>
        </template>
        <template v-slot:SecondDetailHead>
            <th class="th-title-1 w15">選項按鈕</th>
            <th class="th-title-1 w15">檢查按鈕</th>
            <th class="th-title-1 w15">發票地點</th>
            <th class="th-title-1 w15">文字欄位</th>
            <th class="th-title-1 w15" colspan="2">灰階欄位</th>
        </template>
        <template v-slot:SecondDetail= "{ data }">
                <td>
                <RadioButton v-model="data.supplier2"></RadioButton>
</td>
                <td>
                <CheckBox v-model="data.choice2" title="檢查按鈕"></CheckBox>
</td>
                <td>
                <Selecter v-model="data.invoice2"></Selecter>
</td>
                <td>
                <TextString v-model="data.number2" placeHolder="None"></TextString>
</td>
                <td>
                <DisableText v-model="data.disable2" placeHolder="None"></DisableText>
</td>
        </template>
        <template v-slot:ThirdHead="{ data }">
            <th class="th-title-1">選項按鈕</th>
            <th class="th-title-1">檢查按鈕</th>
            <th class="th-title-1">發票地點</th>
            <th class="th-title-1">文字欄位</th>
            <th class="th-title-1">灰階欄位</th>
        </template>
        <template v-slot:ThirdDetail="{ subdata,index }">
                <td>
                <RadioButton v-model="subdata.supplier3"></RadioButton>
</td>
                <td>
                <CheckBox v-model="subdata.choice3" title="檢查按鈕"></CheckBox>
</td>
                <td>
                <Selecter v-model="subdata.invoice3"></Selecter>
</td>
                <td>
                <TextString v-model="subdata.number3" placeHolder="None"></TextString>
</td>
                <td>
                <DisableText v-model="subdata.disable3" placeHolder="None"></DisableText>
</td>
        </template>
        </TableBase>

    </Box>
    <Box title="採購單主檔">
        <div class="row">        
            <div class="col-sm-3 content-box">
                <div class="w100 title">
                    <b class="float-left">選項按鈕</b>
                    <b class="required-icon">*</b>
                </div>                    
                <RadioButton v-model="supplier1"></RadioButton>
            </div>         
            <div class="col-sm-3 content-box">
                <div class="w100 title">
                    <b class="float-left">檢查按鈕</b>
                    <b class="required-icon">*</b>
                </div>                    
                <CheckBox v-model="choice1" title="檢查按鈕"></CheckBox>
            </div>         
            <div class="col-sm-3 content-box">
                <div class="w100 title">
                    <b class="float-left">發票地點</b>
                    <b class="required-icon">*</b>
                </div>                    
                <Selecter v-model="invoice1"></Selecter>
            </div>         
            <div class="col-sm-3 content-box">
                <div class="w100 title">
                    <b class="float-left">日期欄位</b>
                </div>                    
                <DatePicker v-model="date1"></DatePicker>
            </div>         </div>
    </Box>
</SectionEdit>
</template>
<script>
    import SectionEdit from '../components/SectionEdit.vue'
    import Box from '../components/Box.vue'
    import Selecter from '../components/Selecter.vue'
    import TextNumber from '../components/TextNumber.vue'
    import TextString from '../components/TextString.vue'
    import DatePicker from '../components/DatePicker.vue'
    import CheckBox from '../components/CheckBox.vue'
    import RadioButton from '../components/RadioButton.vue'
    import ButtonAction from '../components/ButtonAction.vue'
    import DisableText from '../components/DisableText.vue'
    import Popup from '../components/Popup.vue'
    import TableBase from '../components/TableBase.vue'
    import { required } from 'vuelidate/lib/validators'
    import { mapGetters, mapMutations } from 'vuex'
    import mainData from '../data/codegen.json'
    import tableData from '../data/codegentable.json'

export default {
            components: {
            SectionEdit,
            Box,
            Selecter,
            TextNumber,
            TextString,
            DatePicker,
            CheckBox,
            RadioButton,
            ButtonAction,
            DisableText,
            Popup,
            TableBase
        },
        data() {
            return mainData
        },
        validations:{
                val:{
                        required,
                        greaterThan(value){
                            if (value !== ""){
                                return Number(value) > -1
                            }else {
                                return true
                            }
                        }
            },
                numValue:{
                        required,
            },
            myDate:{
                        required,
            }
        },
        mounted(){
            console.log(this.$v.$reset())
            this.initData(tableData)    
    },
    computed:{...mapGetters('table',['noDelData'])},
    methods:{...mapMutations('table',['initData']),
            submit(){
                this.submitted = true
            }
        }
}
</script>

