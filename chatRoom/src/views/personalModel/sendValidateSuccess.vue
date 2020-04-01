<template>
    <div class="vchat-sendValidate">
        <v-apheader title="Send successfully">
            <router-link :to="{name: $route.query.name}">Close</router-link>
        </v-apheader>
        <div class="success">
            <v-icon class="el-icon-success" :size="56" color="#67c23a"></v-icon>
            <span>Request sent successfully, waiting for approval</span>
        </div>
    </div>
</template>

<script>
    import api from '@/api';
    import vApheader from '@/views/components/header/vApheader';
    export default{
        name: 'sendValidate',
        data() {
            return {
            }
        },
        components: {
            vApheader
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-sendValidate{
        width:100%;
        height: 100%;
        background-color: #f7f7f7;
        position: relative;
        .success{
            width:100%;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            left:0;
            top: 120px;
            span{
                font-size: 14px;
                margin-top: 15px;
            }
        }
    }
</style>
