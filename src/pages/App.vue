<template>
    <div>
        <NavBar></NavBar>
        <BreadCrumb>
        </BreadCrumb>
        <div class="container" role="main">
            <router-view></router-view>
        </div> <!-- /container -->
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import BreadCrumb from '../components/BreadCrumb.vue'
export default {
    components:{NavBar,BreadCrumb}
};
</script>

<style>

</style>
