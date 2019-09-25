<template>
  <div class="cell-box-1">
        <div class="cell"><label><input v-bind:name="myid" type="radio" value="true" v-model="val"><span class="success-text">成功 : </span>說明文字。</label></div>
        <div class="cell"><label><input v-bind:name="myid" type="radio" value="false" v-model="val"><span class="fail-text">失敗 : </span>說明文字。</label></div>
    </div>    
</template>
  
<script>
import {myMixin} from '../common/library'
export default {
    props: {id:String, title:String, value:Boolean},
    mixins: [myMixin],
    data() {
        return { val: null,myTitle:"" }
    },
    mounted() {
        this.val = this.value
        this.myTitle = this.title
    },
    updated() {
        let setResult = (this.val === 'true')
        this.$emit("input", setResult)
    }
    
}
</script>