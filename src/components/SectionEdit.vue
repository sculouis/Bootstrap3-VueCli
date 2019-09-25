<template>
    <div class="section-edit">
        <div class="section-title"><div class="point">●</div><span v-text="title"></span></div>
        <slot></slot>
    </div>
</template>
<script>
export default {
        props: {title:String},
}
</script>

