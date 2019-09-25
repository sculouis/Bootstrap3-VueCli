<template>
  <div class="index-nav">
    <div class="nav-logo-box">
      <a href="#">
        <div class="index-logo-icon"></div>
        <h1 class="index-logo-title">OA表單管理系統</h1>
      </a>
    </div>

    <div class="nav-info-box">
      <p>
        <router-link to="/codegen">程式產生控件</router-link>
      </p>
      <p>
        <router-link to="/formbase">基本控件</router-link>
      </p>
      <p>  
        <router-link to="/table">明細控件</router-link>
      </p>
      <p><span class="glyphicon glyphicon-user nav-icon-size-peo"></span>測試者</p>
      <p class="sign-out"><a href="#"><span class="glyphicon glyphicon-cog nav-icon-size-time"></span>管理中心</a>
      </p>
      <p></p>
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>