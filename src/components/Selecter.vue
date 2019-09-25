<template>
    <select v-bind:id="myid" v-model="val" data-hide-disabled="true" data-size="10" tabindex="-98" class="selectpicker show-tick form-control"  :class="{'select-h30':smallSize}"  data-live-search="true" title="請選擇">
            <option selected value="-1">取消選擇</option>
            <option value="1">選項一</option>
            <option value="2">選項二</option>
    </select>
</template>

<script>
    import 'bootstrap-select/sass/bootstrap-select.scss'
    import 'bootstrap-select'
    import {myMixin} from '../common/library'    
    import { mapMutations } from 'vuex'
    export default {
        mixins: [myMixin],
        props:{value:String,smallSize:Boolean},
        methods:{...mapMutations('forms',['selectPicker'])},
        data() {
            return {
                val: "",
                myid:"",
                small:false
            };
        },
        mounted() {
            //console.log($(this.$refs.select).val())
            this.val = this.value
            this.small = this.smallSize
            $("#" + this.myid).val(this.val)
            $("#" + this.myid).selectpicker('refresh')
        },
        updated() {
            this.$emit('input', this.val);  //回寫對應到dataModel
            $("#" + this.myid).val(this.val)
            $("#" + this.myid).selectpicker('refresh')
        },
    };
</script>