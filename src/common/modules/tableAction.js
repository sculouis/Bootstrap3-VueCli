import axios from "axios"
// const url = "/api/datas"
const url = "https://louis-chen-webapi.netlify.com/.netlify/functions/server/datas"
const urladd = "/api/"
const urldel= "/api/delete"
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
        initData(state, res) {
            state.model = res.data
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
        // 新增一筆資料
        addData(context,obj) {
            axios.post(urladd,obj)
            .then(response => {
                console.log(`add data response:${response}`)
                context.commit("addObject",obj)
            })
            .catch(err => console.log(err))
        },
        //刪除資料
        delData(context,obj) {
            axios.delete(urldel, {data:{
                no:obj.no
              }})
            .then(response => {
                console.log(`delete data response:${response}`)
                context.commit("delObject",obj.no)
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