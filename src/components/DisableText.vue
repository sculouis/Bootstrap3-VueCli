<template>
    <div class="disable-text" v-if="text === undefined || text === ''">
        <span class="undone-text">{{placeHolder}}</span>
    </div>
    <div class="disable-text" v-else>
        {{text}}
    </div>
</template>                   
<script>
export default {
    props:{placeHolder:String,text:String}
}
</script>
