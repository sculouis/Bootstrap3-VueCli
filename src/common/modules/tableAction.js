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
            state.model.push(data)
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

export default{
    namespaced: true,
    state,
    mutations,
    getters,
}