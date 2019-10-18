<template>
    <div class="remodal" v-bind:data-remodal-id="remodalId" role="dialog"
        aria-labelledby="modal1Title" aria-describedby="modal1Desc" tabindex="-1">
        <button data-remodal-action="close" class="remodal-close" aria-label="Close"></button>
        <div class="col-sm-12">
            <span id="modal1Title" class="popup-title-left" v-text="title"></span>
        </div>
        <div class="popup-box">
                <slot></slot>    
        </div>
        <div class="col-sm-12">
            <div class="popup-btn-row">
                <a data-remodal-action="cancel" class="remodal-cancel-btn" v-on:click="cancel($event)">取消</a>
                <a data-remodal-action="confirm" class="remodal-confirm-btn" v-on:click="confirm($event)">確認</a>
            </div>
        </div>
    </div>
</template>
<script>
import 'remodal/dist/remodal-default-theme.css'
import 'remodal/dist/remodal.css'
import 'remodal/dist/remodal.min.js'
import { METHODS } from 'http';
export default {
    props:{remodalId:String,title:String},
    data(){
        return {}
    },
    methods:{
        confirm(e){
            console.log(`press confirm button -> remodalId:${this.remodalId}`)
            console.log(e)
        },
        cancel(e){
            console.log(`press cancel button -> remodalId:${this.remodalId}`)
            console.log(e)
        }
    }
}
</script>
