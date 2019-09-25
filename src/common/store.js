import Vue from 'vue'
import Vuex from 'vuex'
import  tableAction from './modules/tableAction'
import  forms from './modules/forms'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        table: tableAction,
        forms: forms
    }
})
