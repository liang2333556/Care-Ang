<template>
    <div class="vchat-chatSetting">
        <h3>Chatting setting</h3>
        <v-icon class="el-icon-circle-close-outline deClose" @clickIcon="$emit('clickIcon')" color="#323232" :size="24" cursor="pointer"></v-icon>
        <h5>Chatting background</h5>
        <ul class="bg">
            <li class="bg-li" v-for="(v, i) in bgList" :key="i" v-bgInmage="IMGURL + v.url">
                <p @click="setChatBg(v)">{{v.name}}</p>
                <v-icon class="el-icon-circle-check-outline" color="rgb(80, 243, 0)" v-if="user.wallpaper.split(',')[0] === v.url"></v-icon>
            </li>
            <li class="upload-btn">
                <span class="vchat-button-mini minor">Upload</span>
                <input type="file" @change="fileChange" ref="wallpaperFile" accept="image/png, image/jpeg, image/gif, image/jpg">
            </li>
        </ul>

        <h5>Backgroud transparency</h5>
        <div class="aphSlider-container">
            <el-slider v-model="aphSlider" :format-tooltip="formatTooltip" tooltip-class="aphTooltip" @change="Sliderchange"></el-slider>
            <span class="vchat-button-mini minor" @click="saveBgopa">Save</span>
        </div>
        <h5>Word color</h5>
        <p class="isColor-container">
            <span>Current color:</span>
            <span class="isColor" v-bgColor="user.chatColor">{{user.chatColor}}</span>
        </p>
        <div class="color-container">
            <el-color-picker
                    v-model="chooseColor"
                    show-alpha
                    :predefine="predefineColors"
                    @change="colorChange"
            ></el-color-picker>
        </div>
    </div>
</template>

<script>
    import api from '@/api';
    import { mapState } from 'vuex';
    export default{
        data() {
            return {
                chooseColor: '#ffffff', // 自定义颜色
                IMGURL: process.env.IMG_URL,
                predefineColors: [ // 预置颜色
                    '#ff4500',
                    '#ff8c00',
                    '#ffd700',
                    '#90ee90',
                    '#00ced1',
                    '#1e90ff',
                    '#c71585',
                    'rgba(255, 69, 0, 0.68)',
                    'rgb(255, 120, 0)',
                    'hsv(51, 100, 98)',
                    'hsva(120, 40, 94, 0.5)',
                    'hsl(181, 100%, 37%)',
                    'hsla(209, 100%, 56%, 0.73)',
                    '#c7158577'
                ],
                aphSlider: 20
            }
        },
        watch: {
            user: {
                handler(user) {
                    this.aphSlider = user.bgOpa * 100 || 20;
                },
                deep: true,
                immediate: true
            }
        },
        computed: {
            ...mapState(['user']),
            bgList() {
                return [{name: 'Future', url: '/img/wallpaper.jpg', id: 1}, {name: 'Sky', url: '/img/0055.jpg', id: 2}, {name: 'Hope', url: '/img/xiang.jpg', id: 3}, {name: '自定义', url: this.user.wallpaper && this.user.wallpaper.split(',')[1] || false, id: 4}];
            }
        },
        methods: {
            Sliderchange() {
                let params = {
                    bgOpa: this.aphSlider / 100
                };
                this.$store.commit('setUser', params);
            },
            saveBgopa() {
                let params = {
                    bgOpa: this.aphSlider / 100
                };
                this.upUserInfo(params);
            },
            formatTooltip(val) {
                return val / 100;
            },
            upUserInfo(params) {
                api.upUserInfo(params).then(r => {
                    if (r.code === 0) {
                        this.$store.commit('setUser', params);
                        this.$message({
                            message: 'Set successfully',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: 'Fail to set',
                            type: 'warning'
                        })
                    }
                });
            },
            setChatBg(v) { // 设置壁纸
                if (this.user.wallpaper.split(',')[0] === v.url) {
                    return;
                }
                if (!v.url) {
                    this.$message({
                        message: 'Please upload your picture',
                        type: 'warning'
                    });
                    return;
                }
                let params = {
                    wallpaper: v.url +(this.user.wallpaper.split(',')[1] ?  ',' + this.user.wallpaper.split(',')[1] : '')
                };
                this.upUserInfo(params);
            },
            colorChange() {
                this.upUserInfo({chatColor: this.chooseColor});
            },
            fileChange() {
                let f = this.$refs['wallpaperFile'].files[0];
                const isLt1M = f.size / 1024 / 1024 < 1;
                if (!isLt1M) {
                    this.$message.error('The size of picture can not beyond 1MB!');
                    this.$refs['wallpaperFile'].value = '';
                    return;
                }
                let formdata = new FormData();
                formdata.append('f', f);
                api.uploadFile(formdata).then(r => {
                    if (r.code === 0) {
                        let params = {
                            wallpaper:  r.data + ',' + r.data
                        };
                        if (this.user.wallpaper.split(',')[1]) {
                            params.unlink = this.user.wallpaper.split(',')[1];
                        }
                        api.upUserInfo(params).then(res => {
                            if (res.code === 0) {
                                this.$store.commit('setUser', { wallpaper: r.data + ',' + r.data });
                                this.$message({
                                    message: 'Upload successfully',
                                    type: 'success'
                                })
                            } else {
                                this.$message({
                                    message: 'Fail to upload',
                                    type: 'warning'
                                })
                            }
                        })
                    } else {
                        this.$message({
                            message: 'Fail to upload',
                            type: 'warning'
                        })
                    }
                });
                this.$refs['wallpaperFile'].value = '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-chatSetting{
        width:100%;
        .aphSlider-container{
            padding: 0 5px;
            box-sizing: border-box;
            text-align: left;
        }
    }
</style>
