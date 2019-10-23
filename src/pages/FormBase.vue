<template>
    <SectionEdit title="文件資訊">
        <Box title="基本控件">
            <div class="row">
                <div class="col-md-3 content-box">
                    <div class="w100 title">選擇欄位</div>
                    <Selecter v-model="val"></Selecter>
                    <div class="error-text" v-show="submitted && !$v.val.required && $v.val.greaterThan"><span class="icon-error icon-error-size"></span>未完成填寫</div>
                </div>
                <div class="col-md-3 content-box">
                    <div class="w100 title">日期欄位</div>
                    <DatePicker v-model="myDate"></DatePicker>
                    <div class="error-text" v-show="submitted && !$v.myDate.required"><span class="icon-error icon-error-size"></span>未完成填寫</div>
                </div>
                <div class="col-md-3 content-box">
                    <div class="w100 title">數字欄位</div>
                    <TextNumber v-model="numValue"></TextNumber>
                    <div class="error-text"  v-show="submitted && !$v.numValue.required"><span class="icon-error icon-error-size"></span>未完成填寫</div>
                </div>
                <div class="col-md-3 content-box">
                    <div class="w100 title">檢查框欄位</div>
                    <CheckBox v-model="check" title="檢查欄位"></CheckBox>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4 content-box">
                    <div class="title w100">選項按鈕</div>
                    <RadioButton v-model="picker"></RadioButton>
                </div>
                <div class="col-sm-4 content-box">
                    <div class="title w100">顯示文字</div>
                    <DisableText placeHolder="請點選右方【選擇】鈕選擇供應商"></DisableText>
                </div>
                <div class="col-sm-4 content-box">
                    <div class="title w100">文字欄位</div>
                    <TextString v-model="val"></TextString>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6 m-top20">
                        <!-- btn-02-blue,btn-02-gray -->
                        <div class="area-1">
                            <ButtonAction bgColor="btn-02-gray"  iconName="glyphicon glyphicon-remove" @click="submit()">Submit</ButtonAction>
                            <Remodal remodalId="remodal-02" title="供應商查詢">
                                <div class="col-sm-12 m-top10">
                                    <div class="popup-input-title">簽核意見(最多50字)</div>
                                    <textarea class="tt resize-none" id="remodalSendDescription" placeholder="請填寫意見說明"></textarea>
                                </div>
                            </Remodal> 
                            <ButtonAction bgColor="btn-02-blue"  iconName="icon-search" @click="openRemodal('remodal-02')">客制化Remodal一</ButtonAction>
                            <Remodal remodalId="remodal-03" title="客制化">
                                <div class="col-sm-12 m-top10">
                                    <div class="popup-input-title">簽核意見(最多50字)</div>
                                    <textarea class="tt resize-none" id="remodalSendDescription" placeholder="請填寫意見說明"></textarea>
                                </div>
                            </Remodal> 
                            <ButtonAction bgColor="btn-02-blue"  iconName="icon-search" @click="openRemodal('remodal-03')">客制化Remodal二</ButtonAction>
                        </div>
                        <!-- icon-search,icon-plus,glyphicon glyphicon-remove- -->
                </div>
            </div>
            <pre style="margin-top: 25px">{{$v}}</pre>
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
    import Remodal from '../components/Remodal.vue'
    import { required } from 'vuelidate/lib/validators'
    import { mapMutations } from 'vuex'

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
            Remodal
        },
        data() {
            return {
                val: "123",
                numValue: "",
                myDate:"",
                check:false,
                picker:false,
                submitted:false
            };
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
            this.$v.$reset()
        },
        methods:{...mapMutations('forms',['openRemodal']),
            submit(){
                this.submitted = true
                console.log(`輸入檢查不合法：${this.$v.$invalid}`)
            }
        }
        }
</script>

<style>
</style>
