<template>
    <div class="area-fix02-2">
        <div class="Links" v-show="!empty">
            <div class="Links-peo">
                <span v-text="text"></span>
                <div class="XX01" @click="remove()"><i class="glyphicon glyphicon-remove"></i></div>
            </div>
        </div>
        <div class="no-file-text" v-show="empty"><b>- 選擇1位人員 -</b></div>
    </div>
</template>
<script>
export default {
    props:{selText:String},
    data(){
        return {
            empty:true
        }
    },
    methods:{
        remove(){
            this.empty = !this.empty
        }
    },
    computed:{
        text(){
            if (this.selText !== ""){
                this.empty = false
            }
            return this.selText
        }
    }    
}
</script>

