<template>
    <div class="vchat-login" v-bgInmage="bg">

        <div class="logo" :class="{active: showSign}">
            <h3 class="title">Welcome to CARE!</h3>
            <span class="begain" @click="experience">Join us now!</span>
        </div>
        <div class="sign" v-if="showSign">
            <div class="title">
                <span :class="{active: islogin}" @click="choose(true)">Log in</span>
                <span :class="{active: !islogin}" @click="choose(false)">Sign up</span>
            </div>
            <el-form ref="signForm" label-width="80px" class="signForm" :rules="signRules" :model="signForm">
                <el-form-item prop="name">
                    <el-input v-model="signForm.name" placeholder="Username">
                        <i class="iconfont icon-zhanghao" slot="prepend"></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="pass">
                    <el-input v-model="signForm.pass" placeholder="Password" type="password" @keyup.enter.native="enter(islogin)">
                        <i class="iconfont icon-mima3" slot="prepend"></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="repass" v-if="!islogin">
                    <el-input v-model="signForm.repass" placeholder="Enter password again" type="password" @keyup.enter.native="enter(islogin)">
                        <i class="iconfont icon-mima2" slot="prepend"></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="regcode" class="regcode-box">
                    <el-input v-model="signForm.regcode" placeholder="Verification code" @keyup.enter.native="enter(islogin)">
                        <i class="iconfont icon-mima3" slot="prepend"></i>
                    </el-input>
                    <canvas ref="regcode" width="90" height="38"></canvas>
                </el-form-item>

            </el-form>
            <button @click="enter(islogin)">
                <v-icon class="el-icon-loading" color="#fff" :size="14" v-if="loading"></v-icon>
                {{islogin ? 'log in' : 'sign up'}}
            </button>

        </div>
    </div>
</template>

<script>
    import api from '../api';
    import Canvas from 'vchat-regcode';
    import bg from '../assets/img/0076.jpg';
    export default {
        name: 'login',
        data() {
            let validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter the username'));
                } else {
                    let reg = /^[a-zA-Z0-9_]{2,8}$/;
                    if (!reg.test(value)) {
                        callback(new Error('Please input 2~8 numbers and letters'));
                        return;
                    }
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter the password'));
                } else {
                    let reg = /^[a-zA-Z0-9]{6,12}$/;
                    if (!reg.test(value)) {
                        callback(new Error('Please enter the  password of 6-12 digits or letters'));
                        return;
                    }
                    callback();
                }
            };
            let validateRePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please confirm your password'));
                } else {
                    if (value !== this.signForm.pass) {
                        callback(new Error('The passwords you entered are not the same one'));
                        return;
                    }
                    callback();
                }
            };
            let validateRegcode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter the verification code'));
                } else {
                    if (value.toLowerCase() !== this.regcode.toLowerCase()) {
                        this.regCodeClass.drawAgain();
                        callback(new Error('verification code error'));
                        return;
                    }
                    callback();
                }
            };
            return {
                signForm: {
                    name: '',
                    pass: '',
                    regcode: '',
                    repass: ''
                },
                bg: bg,
                IMGURL: process.env.IMG_URL,
                islogin: true, // 登录 or 注册
                showSign: false, // 登录框显示
                regcode: '', // 验证码
                regCodeClass: null, // 验证码类
                signRules: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    repass: [
                        { validator: validateRePass, trigger: 'blur' }
                    ],
                    regcode: [
                        { validator: validateRegcode, trigger: 'blur' }
                    ]
                },
                signSuccess: { // 注册成功提示框
                    code: '',
                    Visible: false
                },
                loading: false
            }
        },
        watch: {
            islogin() {
                this.regCodeClass.drawAgain();
            },
            showSign() {
                if (this.showSign) {
                    this.initRegcode();
                }
            }
        },
        methods: {
            initRegcode() {
                this.$nextTick(() => {
                    this.regCodeClass = new Canvas(this.$refs['regcode'],{
                        fontSize: 20,
                        lineNum: 2,
                        dotNum: 10
                    });
                    this.regCodeClass.draw((r) => {
                        this.regcode = r;
                    });
                })
            },
            choose(flag) {
                this.$refs['signForm'].resetFields();
                this.islogin = flag;
            },
            experience() {
                this.showSign = true;
            },
            enter(f) {
                this.$refs['signForm'].validate((valid) => {
                    if (valid) {
                        if (f) {
                            this.login();
                        } else {
                            this.signUp();
                        }
                    } else {
                        return false;
                    }
                });
            },
            login() {
                let params = {
                    name: this.signForm.name,
                    pass: this.signForm.pass
                };
                this.loading = true;
                api.login(params).then(r => {
                    if (r.code === 0) {
                        this.$message.success('Log in successfully');
                        this.$store.dispatch('getUserInfo', this);
                    } else if (r.code === -1) {
                        this.$message.error('The username or password error');
                        this.loading = false;
                    } else {
                        this.$message.error('Fail to log in');
                        this.loading = false;
                    }
                });
            },
            signUp() {
                let params = {
                    name: this.signForm.name,
                    pass: this.signForm.pass
                };
                this.loading = true;
                api.signUp(params).then(r => {
                    if (r.code === 0) {
                        this.$refs['signForm'].resetFields();
                        this.$notify({
                            title: 'Sign up successfully',
                            message: `Your user number is：${r.data}，You can use this number to log in,just enjoy your life!`,
                            duration: 5000,
                            type: 'success'
                        });
                        this.islogin = true;
                    } else if (r.code === 1) {
                        this.$message.error('The username existed!')
                    } else {
                        this.$message.error('Fail to sign up')
                    }
                    this.loading = false;
                });
            },
            handelClose(done) {
                this.islogin = true;
                done();
            }
        },
        mounted() {
            /*fetch('/api/getUser').then(res=>res.json()).then(r=>{
                if(r.code === 0){
                    console.log(r);
                }
            });*/
            /*api.getUser().then(r => {console.log(r)});*/
        }
    }
</script>

<style scoped lang="scss">
    .vchat-login{
        width:100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }

    .logo{
        margin-top: 15%;
        transform: translateY(0%);
        transition: transform 0.5s;
        h3.title{
            font-size: 38px;
            color: #fff;
            text-align: center;
            font-weight: 400;
            margin-bottom: 20px;
        }
        span.begain{
            color: #fff;
            font-size: 20px;
            animation: fide 2s infinite;
            cursor: pointer;
        }
        span.begain:hover{
            opacity: 1;
            animation-play-state:paused;
            -webkit-animation-play-state:paused;
        }
        @keyframes fide {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 0.3;
            }
            100% {
                opacity: 1;
            }
        }
    }
    .logo.active{
        transform: translateY(-100%);
    }
    .sign{
        width: 350px;
        // height: 370px;
        padding: 15px 25px 25px;
        background-color: #fff;
        border-radius: 10px;
        box-sizing: border-box;
        position: absolute;
        left:50%;
        top:50%;
        margin-left: -175px;
        margin-top: -175px;
        animation: move 1.2s;
    }
    @keyframes move {
        0% {
            left: 0
        }
        40% {
            left: 50%;
        }
        40%, 100% {
            -webkit-transform: translate(0, 0);
        }
        50%,
        70%,
        90% {
            -webkit-transform: translate(-5px, -5px);
        }
        60%,
        80% {
            -webkit-transform: translate(5px, 5px);
        }
    }
    .sign .title{
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
    }
    .sign .title span{
        width:100px;
        border-right: 1px solid #d5d5d5;
        cursor: pointer;
    }
    .sign .title span:nth-of-type(2){
        border-right: none;
    }
    .sign .title span.active{
        color: #1fbeca;
    }
    .sign button{
        width:100%;
        border: none;
        outline: none;
        height: 36px;
        background-color: rgba(19, 164, 192, 0.82);
        color: #fff;
        border-radius: 25px;
        cursor: pointer;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .sign button:hover{
        background-color: #1fbeca;
        color: #fff;
    }
    .login-foot{
        width:100%;
        font-size: 12px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #d5d5d5;
    }
    .login-foot span{
        width:100px;
        height: 1px;
        background-color: #d5d5d5;
        display: inline-block;
        margin: 0 10px;
    }
    .regcode-box{
        .el-input{
            width:205px;
        }
        canvas{
            display: inline-block;
            vertical-align: middle;
        }
    }
</style>
