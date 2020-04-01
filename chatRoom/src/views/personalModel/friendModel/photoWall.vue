<template>
    <div class="vchat-photoWall">
        <v-apheader title="Photo wall" back="-1"></v-apheader>
        <ul class="photoWall-ul">
            <li v-for="(v, i) in coverList" :key="i" :style="{backgroundImage: 'url('+ IMG_URL + v +')'}">
                <i class="el-icon-circle-close-outline icon" @click="del(v)"></i>
            </li>
            <li class="upload-li" v-if="coverList.length < 6">
                <i class="el-icon-plus"></i>
                <input type="file" @change="fileChange" ref="imgFile" accept="image/png, image/jpeg, image/gif, image/jpg">
            </li>
        </ul>
        <span>You can add within 6 photos</span>
    </div>
</template>

<script>
    import api from '@/api';
    import vApheader from '@/views/components/header/vApheader';
    export default{
        name: 'photoWall',
        data() {
            return {
                IMG_URL: process.env.IMG_URL,
                coverList: []
            }
        },
        components: {
            vApheader
        },
        methods: {
            getCover() {
                let params = {
                    id: this.$route.params.id
                };
                api.getUserInfo(params).then(r => {
                    if (r.code === 0) {
                        this.coverList = r.data.cover;
                    }
                })
            },
            fileChange() {
                let f = this.$refs['imgFile'].files[0];
                const isLt2M = f.size / 1024 / 1024 < 1;
                if (!isLt2M) {
                    this.$message.error('The size of picture ca not beyond  1MB!');
                    this.$refs['wallpaperFile'].value = '';
                    return;
                }
                let formdata = new FormData();
                formdata.append('f', f);
                api.uploadFile(formdata).then(r => {
                    if (r.code === 0) {
                        let arr = JSON.parse(JSON.stringify(this.coverList));
                        arr.push(r.data);
                        api.upUserInfo({cover: arr}).then(res => {
                            if (res.code === 0) {
                                this.coverList.push(r.data);
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
                this.$refs['imgFile'].value = '';
            },
            del(f) {
                this.$confirm('Delete?', 'Tip', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'warning'
                }).then(() => {
                    let arr = this.coverList.filter(v => v !== f);
                    api.upUserInfo({cover: arr, unlink: f}).then(r => {
                        if (r.code === 0) {
                            this.coverList = arr;
                            this.$message({
                                type: 'success',
                                message: 'Delete successfully!'
                            });
                        } else {
                            this.$message({
                                type: 'warning',
                                message: 'Fail to delete!'
                            });
                        }
                    })
                }).catch(() => {
                });
            }
        },
        mounted() {
            this.getCover();
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-photoWall{
        width:100%;
        height: 100%;
        span{
            font-size: 12px;
            color:blue;
            display: block;
            text-align: left;
            padding: 0 20px;
        }
        .photoWall-ul{
            width:100%;
            padding: 10px 15px 10px;
            box-sizing: border-box;
            text-align: left;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            align-content: flex-start;
            li{
                margin: 5px;
                display: inline-block;
                width:130px;
                height: 70px;
                border:1px solid #eeeeee;
                box-sizing: border-box;
                overflow: hidden;
                position: relative;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                .icon{
                    position: absolute;
                    top:0;
                    right: 0;
                    color: #fff;
                    font-size: 20px;
                    display: none;
                    cursor: pointer;
                }
                .icon:hover{
                    color: #f5dedf;
                }
            }
            li:hover .icon{
                display: block;
            }
            .upload-li{
                text-align: center;
                line-height: 70px;
                border:1px solid #eeeeee;
                cursor: pointer;
                input{
                    width:100%;
                    height: 100%;
                    opacity: 0;
                    position: absolute;
                    left:0;
                    top:0;
                    cursor: pointer;
                }
            }
            .upload-li:hover{
                background-color: #eeeeee;
            }
        }
    }
</style>
