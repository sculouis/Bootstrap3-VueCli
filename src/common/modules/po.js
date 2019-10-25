import axios from "axios"
// const url = "/api/datas"
const url = "https://louis-chen-webapi.netlify.com/.netlify/functions/server/"
const urlPrResult = url + "pr/datas"
const urlCodeResult = url + "codeitem"

const state = {
        model: [],
        addressDatas:[],
        prDatas:[],
        quoteDatas:[],
        supplierDatas:[],
        invoiceDatas:[]
    }
    //取得屬性
const  getters ={
        dataLength(state) {
            return state.model.length + 1
        },
        purchaseDatas(state) {
            //明細選擇後送貨層資料全部選擇
            state.model.forEach(element => {
                if (element.sel === true){
                     element.subDatas.forEach(item => item.raChk = true)       
                }
            });
            //明細取消選擇後送貨層資料全部取消選擇
            // state.model.forEach(element => {
            //     if (element.sel === false){
            //          element.subDatas.forEach(item => item.raChk = false)       
            //     }
            // });
            // state.model.forEach(element => {
            //          element.subDatas.forEach(item => {
            //              if (item.raChk === false){
            //                  element.sel = false
            //              }
            //             })       
            // });
            return state.model.filter(element => element.isdelete === 0)
        },
        //供應商資料
        supplierDatas(state){
            return state.supplierDatas
        },
        //供應商住址資料
        addressDatas(state){
            return state.addressDatas
        },
        //請購單編號資料
        prDatas(state){
            return state.prDatas
        },
        //報價經辦資料
        quoteDatas(state){
            return state.quoteDatas
        },
        //發票管理人資料
        invoiceDatas(state){
            return state.invoiceDatas
        }
    }
    //註冊要update值的方法類似event,用commit呼叫
const  mutations = {
        //請購單資料填入
        purchaseData(state, res) {
            state.model = res.data
            $.unblockUI('')
        },
        //供應商資料
        supplier(state,res){
            state.supplierDatas = res.data
            $.unblockUI('')
        },
        //供應商住址
        address(state,res){
            state.addressDatas = res.data
            $.unblockUI('')
        },
        //請購單編號
        prNums(state,res){
            state.prDatas = res.data
        },
        //報價經辦
        quote(state,res){
            state.quoteDatas = res.data
            $.unblockUI('')
        },
        //發票管理人
        invoice(state,res){
            state.invoiceDatas = res.data
        }
    }
    const actions = {
        //取得查詢請購單資料
        getPurchase(context) {
            axios.get(urlPrResult)
            .then(response => {
                context.commit("purchaseData",response)
            })
            .catch(err => console.log(err))
        },
        getSupplier(context){
            //供應商
            axios.get(urlCodeResult +'?kind=supplier')
            .then(response => {
                context.commit("supplier",response)
            })
            .catch(err => console.log(err))
        },
        getAddress(context){
            //供應商住址
            axios.get(urlCodeResult +'?kind=address')
            .then(response => {
                context.commit("address",response)
            })
            .catch(err => console.log(err))
        },
        //取得查詢List資料
        searchListDatas(context){
            //請購單編號    
            axios.get(urlCodeResult +'?kind=prNum')
            .then(response => {
                context.commit("prNums",response)
            })
            .catch(err => console.log(err))
            //報價經辦
            axios.get(urlCodeResult +'?kind=quote')
            .then(response => {
                context.commit("quote",response)
            })
            .catch(err => console.log(err))
            //發票管理人
            axios.get(urlCodeResult +'?kind=invoice')
            .then(response => {
                context.commit("invoice",response)
            })
            .catch(err => console.log(err))
        }
}    

export default{
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}