<template>
    <div class="person-means">
        <el-form ref="personForm" label-width="80px" class="personForm" :model="personForm" :rules="personRules">
            <el-form-item label="Profile photo">
                <div class="avatar" @click="setShowCrop">
                    <img :src="imageUrl">
                </div>
            </el-form-item>
            <el-form-item label="Gender">
                <el-radio v-model="personForm.sex" label="1">Male</el-radio>
                <el-radio v-model="personForm.sex" label="2">Female</el-radio>
                <el-radio v-model="personForm.sex" label="3">Secert</el-radio>
            </el-form-item>
            <el-form-item label="Username" prop="nickname">
                <el-input v-model="personForm.nickname" placeholder="Username">
                </el-input>
            </el-form-item>
<!--            <el-form-item label="Address" prop="nickname">-->
<!--                <el-select v-model="personForm.province" filterable placeholder="Please select" style="width: 120px;margin-right: 10px;">-->
<!--                    <el-option-->
<!--                            v-for="item in provinces"-->
<!--                            :key="item.value"-->
<!--                            :label="item.name"-->
<!--                            :value="item">-->
<!--                    </el-option>-->
<!--                </el-select>-->
<!--                <el-select v-model="personForm.city" filterable placeholder="Please select" style="width: 120px;margin-right: 10px;">-->
<!--                    <el-option-->
<!--                            v-for="item in cities"-->
<!--                            :key="item.value"-->
<!--                            :label="item.name"-->
<!--                            :value="item">-->
<!--                    </el-option>-->
<!--                </el-select>-->
<!--                <el-select v-model="personForm.town" filterable placeholder="Please select" style="width: 120px;">-->
<!--                    <el-option-->
<!--                            v-for="item in towns"-->
<!--                            :key="item.value"-->
<!--                            :label="item.name"-->
<!--                            :value="item">-->
<!--                    </el-option>-->
<!--                </el-select>-->
<!--            </el-form-item>-->
            <el-form-item label="Phone number" prop="phone">
                <el-input v-model="personForm.phone" placeholder="Phone number">
                </el-input>
            </el-form-item>
            <el-form-item label="E-mail" prop="email">
                <el-input v-model="personForm.email" placeholder="E-mail">
                </el-input>
            </el-form-item>
            <el-form-item label="Birthday" >
              <el-date-picker v-model="personForm.birthday" type="date" :value-format="formatDate" placeholder="Select the date">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="Personal statement" prop="signature">
                <el-input v-model="personForm.signature" placeholder="Personal statement" type="textarea" aotusize resize="none">
                </el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="saveInfo">Save</el-button>
        <el-dialog
                :visible.sync="showCrop"
                width="700px"
                :before-close="handleClose">
            <cropper :url="cropUrl" @avatar="getAvatar"></cropper>
        </el-dialog>
    </div>
</template>
<script>
    import api from '@/api';
    import cropper from '@/views/components/cropper/cropper';
    import { pca, pcaa } from 'area-data'; // 省市区数据
    export default{
        name: 'means',
        data() {
            let validateNick = (rule, value, callback) => {
                if (value === '') {
                    callback();
                } else {
                    if (value.length > 12) {
                        callback(new Error('Please enter within 12 characters'));
                        return;
                    }
                    callback();
                }
            };
            let validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback();
                } else {
                    let reg = /^1[3|4|5|7|8]\d{9}$/;
                    if (!reg.test(value)) {
                        callback(new Error('Please enter the correct format！'));
                        return;
                    }
                    callback();
                }
            };
            let validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback();
                } else {
                    let reg =  /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/;
                    if (!reg.test(value)) {
                        callback(new Error('Please enter the correct mail format'));
                        return;
                    }
                    callback();
                }
            };
            let validateSignature = (rule, value, callback) => {
                if (value === '') {
                    callback();
                } else {
                    if (value.length > 100) {
                        callback(new Error('Please enter within 100 characters'));
                        return;
                    }
                    callback();
                }
            };
            return {
                imageUrl: process.env.IMG_URL + this.$store.state.user.photo, // 显示图片路径
                personForm: {
                    nickname: '',
                    signature: '',
                    sex: '',
                    email: '',
                    phone: '',
                    province: '',
                    city: '',
                    town: '',
                    birthday: ''
                },
                showCrop: false, // 裁剪框开关
                cropUrl: '', // 裁剪图片地址
                personRules: {
                    nickname: [
                        { validator: validateNick, trigger: 'blur' }
                    ],
                    phone: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    email: [
                        { validator: validateEmail, trigger: 'blur' }
                    ],
                    signature: [
                        { validator: validateSignature, trigger: 'blur' }
                    ]/*,
                    birthday: [
                        { type: 'date',  message: '请选择日期', trigger: 'change' }
                    ]*/
                },
                cities: [],
                towns: [],
              formatDate:"yyyy-MM-dd HH:mm:ss"
            }
        },
        computed: {
            provinces() {
                let arr = this.MapData(pca['86']);
                this.personForm.province = arr[0];
                return arr;
            }
        },
        components: {
            cropper
        },
        watch: {
            'personForm.province': {
                handler(v) {
                    this.provinceChange(v);
                },
                deep: true
            },
            'personForm.city': {
                handler(v) {
                    this.cityChange(v);
                },
                deep: true
            }
        },
        methods: {
            MapData(data) {
                return Object.keys(data).map(k => {
                    return {
                        name: data[k],
                        value: k
                    }
                });
            },
            provinceChange(v) {
                this.cities = this.MapData(pcaa[v.value]);
                this.personForm.city = this.cities[0];
            },
            cityChange(v) {
                this.towns = this.MapData(pcaa[v.value]);
                this.personForm.town = this.towns[0];
            },
            getAvatar(url) { // 裁剪后的图像路径
                this.imageUrl = process.env.IMG_URL + url;
                this.showCrop = false;
                api.upUserInfo({photo: url, unlink: this.$store.state.user.photo}).then(r => {
                    if (r.code === 0) {
                        this.$message({
                            message: 'Save successfully',
                            type: 'success'
                        });
                        this.$store.commit('setUser', {photo: url});
                    } else {
                        this.$message({
                            message: 'Fail to save!',
                            type: 'warning'
                        })
                    }
                });
            },
            handleClose(done) {  // 关闭裁剪框清空地址
                this.cropUrl = '';
                done();
            },
            setShowCrop() { // 点击上传图像
                this.showCrop = true;
                this.cropUrl = this.imageUrl;
            },
            saveInfo() { // 保存修改
                this.$refs['personForm'].validate((valid) => {
                    if (valid) {
                        api.upUserInfo(this.personForm).then(r => {
                            if (r.code === 0) {
                                this.$message({
                                    message: 'Save successfully',
                                    type: 'success'
                                });
                                this.$store.commit('setUser', {nickname: this.personForm.nickname, signature: this.personForm.signature, province: this.personForm.province, city: this.personForm.city, town: this.personForm.town, birthday:this.personForm.birthday});
                            } else {
                                this.$message({
                                    message: 'Fail to save!',
                                    type: 'warning'
                                })
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            getUserDetail() {  // 获取个人设置用户信息
                api.getUserDetail().then(r => {
                    if (r.code === 0) {
                        this.personForm = Object.assign(this.personForm, r.data);
                    }
                });
            }
        },
        mounted() {
            this.getUserDetail();
        }
    }
</script>
<style lang="scss" scoped>
    .person-means{
        padding: 20px 30px;
        box-sizing: border-box;
        .el-input{
            width:300px;
        }
        .avatar {
            width: 120px;
            height: 120px;
            border: 1px solid #ddd;
            border-radius: 50%;
            overflow: hidden;
            img{
                width:100%;
            }
        }
    }
</style>
