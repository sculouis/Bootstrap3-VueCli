<template>
    <div class="section-box-area">
        <div class="box-area-title sub-id-flag"><b class="sub-title-flag" v-text="title"></b></div>
        <div class="box">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {title:String},

}
</script>
