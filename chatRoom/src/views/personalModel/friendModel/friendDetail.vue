<template>
    <div class="vchat-Detail">
        <v-apheader back="-1" bgColor="transparent" class="vchat-Detail-header">
            <v-icon name="erweima" color="#f5f5f5" cursor="pointer" @clickIcon="showFriendQr = true"></v-icon>
        </v-apheader>
        <el-carousel trigger="click" height="200px" arrow="never" :indicator-position="friendInfo.cover.length > 1 ? '' : 'none'" :autoplay="false">
            <el-carousel-item v-for="item in friendInfo.cover" :key="item">
                <a class="DetailImage-a" :style="{backgroundImage: 'url('+ IMG_URL + item +')'}">
                </a>
            </el-carousel-item>
            <div class="DetailImage-bg">
                <p class="title">
                    {{friendInfo.nickname}}
                </p>
                <p>{{friendInfo.signature}}</p>
            </div>
        </el-carousel>
        <div class="vchat-Detail-container friend-detail-container">
            <a class="detail-avatar">
                <img :src="IMG_URL + friendInfo.photo" alt="">
            </a>
            <div class="firend-info">
                <p>
                    ID：{{friendInfo.code}}
                </p>
              <p>
                    Username：{{friendInfo.nickname}}
              </p>
                <p>
                    Gender：{{friendInfo.sex === '1' ? 'boy' : friendInfo.sex === '2' ? 'girl' : 'secret'}}
                </p>
                <p>
                  Personal statement:   {{friendInfo.signature}}
                </p>
                <p class="day">
                  Become friends：{{friendTime}}days
                  <img src="../../../assets/img/vchat.png" style="width:30px;height:30px">
                </p>
            </div>
            <div class="detail-item" v-if="friendInfo.code === user.code" @click="toPhoto">
                <span>Photo wall</span>
                <p>
                    <v-icon name="enter" color="#d5d5d5"></v-icon>
                </p>
            </div>
            <div class="detail-button" v-if="friendInfo.code !== user.code">
                <button @click="apply" class="vchat-full-button minor" v-if="!myFriendFlag">Become friends</button>
                <button @click="remove" class="vchat-full-button error" v-else>Delete friend</button>
            </div>
        </div>
        <div class="Qr-dialog" :class="{active: showFriendQr}">
            <v-icon class="el-icon-circle-close-outline QrClose" @clickIcon="showFriendQr = false" color="#f5f5f5" :size="28" cursor="pointer"></v-icon>
        </div>
    </div>
</template>

<script>
    import vApheader from '@/views/components/header/vApheader';
    import api from '@/api';
    import utils from '@/utils/utils';
    import { mapState } from 'vuex';
    export default{
        data() {
            return {
                IMG_URL: process.env.IMG_URL,
                friendInfo: {cover: [], province: {}, city: {}, town: {} ,birthday:{}}, // user详情
                showFriendQr: false, // 二维码开关
                myFriendFlag: false, // 是否为我的好友
                friendTime: 0
            }
        },
        components: {
            vApheader
        },
        computed: {

            ...mapState(['user'])
        },
        methods: {
            apply() {
                localStorage.friend = JSON.stringify({
                    userYname: this.friendInfo.nickname,
                    userYloginName: this.friendInfo.name,
                    userYphoto: this.friendInfo.photo
                });
                this.$router.push({name: 'applyFriend', params: {id: this.$route.params.id}, query: {}});
            },
            remove() {

            },
            getUserInfo() {
                let params = {
                    id: this.$route.params.id
                };
                api.getUserInfo(params).then(r => {
                    if (r.code === 0) {
                        this.friendInfo = r.data;
                    }
                })
            },
            toPhoto() {
                this.$router.push({name: 'photoWall', params: this.$route.params});
            },
            checkMyfriends() {
                let params = {
                    userM: this.$route.params.id,
                    userY: this.user.id
                };
                api.checkMyfriends(params).then(r => {
                    if (r.code === 0) {
                        this.myFriendFlag = r.data;
                    }
                })
            },
          getFirendTime() {
              var that = this
              let today = new Date();
              let todayTime = Math.ceil(today.getTime()/1000);
              let friendTime = Math.ceil(new Date(this.$route.params.friendTime)/1000);
              that.friendTime = Math.ceil((todayTime-friendTime)/86400);
          }
        },
        created() {
            this.getUserInfo();
            this.checkMyfriends();
            this.getFirendTime();
        }
    }
</script>

<style lang="scss" scoped>
    @import "../vchatDetail";
  .day{
    color:	#FF3300;
  }
</style>
