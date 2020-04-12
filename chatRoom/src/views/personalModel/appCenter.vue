<template>
    <div class="vchat-appCenter">

      <test></test>
        <backLog></backLog>

    </div>
</template>

<script>
    import backLog from './appModel/backLog.vue';
    import test from './appModel/test.vue';

    export default{
        data() {
            return {

            }
        },
        components: {
            backLog,
           test,
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-appCenter{
        width:100%;
        height: 700px;
        border-radius: 5px;
        background-color: #B0C4DE;
        box-shadow: 0 0 1px 1px #d5d5d5;
        box-sizing: border-box;
    }
</style>
