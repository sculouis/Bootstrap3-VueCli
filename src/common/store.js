import Vue from 'vue'
import Vuex from 'vuex'
import  tableAction from './modules/tableAction'
import  forms from './modules/forms'
import po from './modules/po'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        tableAction,
        forms: forms,
        po
    }
})
