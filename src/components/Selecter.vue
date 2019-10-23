<template>
    <select v-bind:id="myid"  v-model="val" v-on="inputListeners" data-hide-disabled="true" data-size="10" tabindex="-98" class="selectpicker show-tick form-control"  :class="{'select-h30':smallSize}"  data-live-search="true" title="請選擇">
            <option selected value="-1">取消選擇</option>
            <template v-for="item in items">
                    <option :key="item.value" :value="item.value" v-text="item.text"></option>
            </template>
    </select>
</template>

<script>
    import $ from 'jquery'
    import 'bootstrap-select/sass/bootstrap-select.scss'
    import 'bootstrap-select'
    import {
        myMixin
    } from '../common/library'
    export default {
        mixins: [myMixin],
        props:{smallSize:Boolean,optionData:Array},
        data() {
            return {
                val: "",
                myid: "",
                selectDatas:[],
                small: false
            };
        },
        mounted() {
            //console.log($(this.$refs.select).val())
            this.val = this.value
            this.small = this.smallSize
            // this.items = this.optionData
            // $("#" + this.myid).val(this.val)
            // $("#" + this.myid).selectpicker('refresh')
        },
        updated() {
            this.$emit('input', this.val); //回寫對應到dataModel
            $("#" + this.myid).val(this.val)
            $("#" + this.myid).selectpicker('refresh')
        },
        computed: {
            inputListeners() {
                var vm = this
                // `Object.assign` merges objects together to form a new object
                return Object.assign({},
                    // We add all the listeners from the parent
                    this.$listeners,
                    // Then we can add custom listeners or override the
                    // behavior of some listeners.
                    {
                        // This ensures that the component works with v-model
                        change(event) {
                            vm.$emit('change', event.target.value)
                        }
                    }
                )
            },
            items(){
                // this.selectDatas = this.optionData
                return this.optionData
            }
        }

    }
</script>