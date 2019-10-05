import axios from "axios"
const url = "https://louis-chen-webapi.netlify.com/.netlify/functions/server/datas"
const    state = {
        "model": []
    }
    //取得屬性
const  getters ={
        dataLength(state) {
            return state.model.length + 1
        },
        noDelData(state) {
            return state.model.filter(element => element.isdelete === 0)
        }
    }
    //註冊要update值的方法類似event,用commit呼叫
const  mutations = {
        //取得初始資料
        initData(state, data) {
            state.model = data
        },
        delObject(state, no) {
            let delObj = state.model.find(element => element.no === no)
            delObj.isdelete = 1
        },
        addObject(state, obj) {
            state.model.push(obj)
        },
        setIsDetailOpen(state, objBool) {
            state.model.forEach(element => element.isDetailOpen = objBool);
        }
    }

const actions = {
        //取得初始資料
        initData(context) {
            axios.get(url)
            .then(response => {
                context.commit("initData",response)
            })
            .catch(err => console.log(err))
        },
}    

export default{
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}