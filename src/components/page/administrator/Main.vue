<template>
<div class="main">


                <router-view>
                </router-view>

</div>
</template>

<script>
export default {
        name: "Main",
}
</script>

<style scoped>
.main{
        height: 100%;
        width: 100%;
        line-height: 70px;
        background-color: #e9eef3;
}
</style>