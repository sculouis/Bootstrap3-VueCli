<template>
    <div class="SUBMENU SUBMENU-2" id="MENU">
        <div class="submenu-title-1">快速閱覽</div>
        <div class="submenu-title-link"><a href="#SendSection" class="send-setting"><b class="icon-2-send"></b><p>傳送設定</p></a></div>
        <div class="submenu-area">
            <div class="submenu-title-link"><a href="#InformationSection"><b class="icon-paper"></b>文件資訊</a></div>
            <div class="submenu-title-box">
                <slot></slot>
            </div>
        </div>
        <div class="submenu-area">
            <div class="submenu-title-link"><a href="#SpeechSection"><b class="icon-speech-bubble"></b>意見溝通</a></div>
            <div class="submenu-title-box">
                <a>意見溝通內容</a>
                <a>意見溝通紀錄</a>
                <a>意見溝通檔案上傳區</a>
            </div>
        </div>
        <div class="submenu-title-link"><a href="#fileSection" class="send-setting"><b class="icon-2-send"></b><p>檔案附件</p></a></div>
        <div class="submenu-title-link"><a href="#recordSection" class="raduse-setting"><b class="icon-content_paste"></b>流程紀錄</a></div>
        <div class="SUBbtnOA icon-keyboard_arrow_left icon-right-size" id="MENUICON"></div>
        <div class="SUBbtnOA icon-keyboard_arrow_right icon-right-size" id="MENUICON-close"></div>
    </div>
</template>
<script>
export default {
    mounted(){
    $('#MENUICON').show(); $('#MENUICON-close').hide();
    }
}
</script>

