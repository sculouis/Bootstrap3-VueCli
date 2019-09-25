<template>
    <Box title="明細控制項">
    <TableBase v-bind:tableData="noDelData">
        <template slot="FirstHead">
            <th class="th-title w5">no</th>
            <th class="th-title w15">textNumber</th>
            <th class="th-title w15">selecter</th>
            <th class="th-title w15">datePicker</th>
            <th class="th-title w15">checkbox</th>
            <th class="th-title w15">
                radioButton
            </th>
        </template>
        <template v-slot:FirstDetail = "{ data,index }">
            <td v-text="index + 1" rowspan="200"></td>
            <td><TextNumber v-model="data.val" :smallSize="true"></TextNumber></td>
            <td><Selecter v-model="data.select" :smallSize="true"></Selecter></td>
            <td><DatePicker v-model="data.date" :smallSize="true"></DatePicker></td>
            <td><CheckBox v-model="data.checked" v-bind:title="data.title"></CheckBox></td>
            <td>
                <RadioButton v-model="data.picker"></RadioButton>
            </td>
        </template>
        <template v-slot:SecondDetailHead>
                <th class="th-title-1 w15">textNumber1</th>
                <th class="th-title-1 w15">selecter1</th>
                <th class="th-title-1 w15">datePicker1</th>
                <th class="th-title-1 w15">checkbox1</th>
                <th class="th-title-1 w15" colspan="2">
                    radioButton1
                </th>
        </template>
        <template v-slot:SecondDetail= "{ data }">
                <td><TextNumber v-model="data.val1" :smallSize="true"></TextNumber></td>
                <td><Selecter v-model="data.select1" :smallSize="true"></Selecter></td>
                <td v-text="data.date1"></td>
                <td><CheckBox v-model="data.checked1" v-bind:title="data.title"></CheckBox></td>
                <td colspan="2">
                    <RadioButton v-model="data.picker1"></RadioButton>
                </td>
        </template>
        <template v-slot:ThirdHead="{ data }">
                <th class="th-title-1">編號</th>
                <th class="th-title-1">子項目</th>
                <th class="th-title-1" colspan="2">子項目</th>
        </template>
        <template v-slot:ThirdDetail="{ subdata,index }">
                <td v-text="index + 1"></td>
                <td v-text="subdata.data1"></td>
                <td colspan="2" v-text="subdata.data2"></td>
                <td colspan="2" v-text="subdata.data3"></td>
        </template>
    </TableBase>
    </Box>
</template>
<script>
import Box from '../components/Box.vue'
import Selecter from '../components/Selecter.vue'
import TextNumber from '../components/TextNumber.vue'
import DatePicker from '../components/DatePicker.vue'
import CheckBox from '../components/CheckBox.vue'
import RadioButton from '../components/RadioButton.vue'
import TableBase from '../components/TableBase.vue'
import tableData from '../data/table.json'
import { mapGetters, mapMutations } from 'vuex'

export default {
    components: {
        Box,
        Selecter,
        TextNumber,
        DatePicker,
        CheckBox,
        RadioButton,
        TableBase
    },
    mounted(){
            tableData.forEach(element => {
                this.initData(element)    
            });
    },
    methods:{...mapMutations('table',['initData'])
    },
    computed:{...mapGetters('table',['noDelData'])	

}
}
</script>

