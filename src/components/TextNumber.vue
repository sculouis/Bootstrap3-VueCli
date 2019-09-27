<template>
  <input class="input" :class="{h30:small}" v-model="numVal" v-on:keypress="checkNum($event)">
</template>
<script>
export default {
    props:['value','smallSize'],
    data() {
        return {
            val: "",
            pattern: "",
            small:false
        };
    },
    mounted() {
        this.val = this.value;
        this.small = this.smallSize;
    },
    methods:{
          checkNum(event)   
        {   
            const char = String.fromCharCode(event.keyCode)
                if (!/[0-9]|\./.test(char)) {
                event.preventDefault()
            } 
        }   
     },
    computed: {
        numVal: {
            get: function () {
                var unformatValue = this.val.toString().replace(/[^0-9\.\-]+/g, "");
                if (unformatValue.length - 1 === unformatValue.indexOf(".")) {
                    return this.val;
                } else {
                    let l10nEN = new Intl.NumberFormat("en-US");
                    let result = (Number(unformatValue)).toLocaleString('en-US',{maximumFractionDigits:10});
                    if (result === "NaN") {
                        return this.val;
                    } else {
                        return (Number(unformatValue)).toLocaleString('en-US',{maximumFractionDigits:10});
                    }
                }
            },
            set: function (newVal) {
                if (newVal !== ""){ 
                var unformatValue = newVal.toString().replace(/[^0-9\.\-]+/g, "");
                unformatValue = unformatValue.replace(/[^\d.]/g,""); //先把非數字的都替換掉，除了數字和. 
                unformatValue = unformatValue.replace(/^\./g,""); //必須保證第一個為數字而不是. 
                unformatValue = unformatValue.replace(/\.{2,}/g,"."); //保證只有出現一個.而沒有多個. 
                unformatValue = unformatValue.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                this.$emit("input", Number(unformatValue));
                // this.val = Number(unformatValue);
                this.val = unformatValue ;
                }else{
                    this.val = ""
                    this.$emit("input", "");
                }
            }
        }
    }
};
</script>