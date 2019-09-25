<template>
    <div class='w100 input-group date01 custom-input datetimepicker1' v-bind:id="myid" ref="date">
        <input type='text' class="input" :class="{'h30':small}" placeholder="yyyy-mm-dd" v-model="val" />
        <span class="input-group-addon d-input" v-bind:class="{'addon-table':small}">
            <span class="glyphicon glyphicon-calendar"></span>
        </span>
    </div>

</template>
<script>
import '../style/bootstrap-datetimepicker.css'
import 'moment'
import  '../common/bootstrap-datetimepicker.min.js'
import {myMixin} from '../common/library'

export default {
    props: {title:String, value:String,smallSize:Boolean},
    mixins: [myMixin],
    data() {
        return {
            val: "",
            myid: "",
            small:false
        };
    },
    mounted() {
        this.val = this.value
        this.small = this.smallSize
            //為了帶入datepicker的db.change事件必需如此做
            //this 感覺是date-picker這個scope，所以要新增一個scope
            const self = this   
            $(this.$refs.date).datetimepicker({
                format: 'YYYY/MM/DD',
            });    
            $("#" + this.myid).on("dp.change", function (e) {
                //vm.$emit('input', e.currentTarget.firstChild.value);
                self.val = e.currentTarget.firstChild.value
                self.$emit('input', self.val);   //回對datamodel
            })
    }
    
}
</script>

