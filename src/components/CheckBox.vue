<template>
    <label><input v-bind:id="myid" v-model="val" type="checkbox"><span class="checkbox-text" v-text="myTitle"></span></label>
</template>
<script>
import {myMixin} from '../common/library'
import { mapMutations } from 'vuex'
export default {
    props: {id:String, title:String, value:Boolean},
    mixins: [myMixin],
    methods:{...mapMutations('forms',['checked'])},
    data() {
        return { val: null,myTitle:"" }
    },
    mounted() {
        this.val = this.value
        this.myTitle = this.title
    },
    updated() {
        if (this.val === true) {
            this.$emit("input", true)
        } else if (this.val === false) {
            this.$emit("input", false)
        }
    }    
}
</script>
