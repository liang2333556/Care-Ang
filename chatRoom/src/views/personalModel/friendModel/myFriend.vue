<template>
    <div class="vchat-myFriend vchat-noUser">
        <v-apheader title="My friends">
            <el-dropdown trigger="click" @command="handleCommand">
                <v-icon cursor="pointer" name="hanbaobao" color="#fff"></v-icon>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="/main/personalMain/friendly/search">Add friends</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </v-apheader>
        <div class="vchat-myFriend-container">
            <div class="me-li" @click="goFriendDetail(user.id)">
                <a href="javascript:;">
                    <img :src="IMG_URL + user.photo" alt="">
                </a>
                <div>
                    <span class="vchat-line1" :title="user.nickname">{{user.nickname}}</span>
                    <v-icon name="enter" color="#d5d5d5"></v-icon>
                </div>
            </div>
            <div class="vchat-linkman-container" :class="{active: showList.indexOf('mine') > -1}" v-if="friendList.length">
                <h3 @click="setShowList('mine')">
                    <p>
                        <v-icon name="fanhui" :size="16" color="#b7b6b6" class="list-icon"></v-icon>
                        <span>My Friends</span>
                    </p>
                    <span>{{friendList.length}}</span>
                </h3>
                <ul class="vchat-linkman-list">
                    <li v-for="v in friendList" :key="v._id" style="cursor: auto;">
                        <a href="javascript:;" @click="goFriendDetail(v.id,v.createDate)" @contextmenu="contextmenuClick($event, v)">
                            <img :src="IMG_URL + v.photo" alt="">
                        </a>
                        <div style="display: inline-block;">
                            <div>
                              <p>
                              <span class="vchat-line1" :title="v.nickname" style="vertical-align: center;float:left;color: #1c1c1c;">
                                {{v.nickname}}
                              </span>
                              </p>
                              <p style="color: red">{{v.birthdayRemind}}</p>
                            </div>
                            <div>
                                <span :title="v.signature" class="vchat-line1" style="float:left;">{{v.signature}}</span>
                            </div>
                        </div>
                        <div style="display: inline-block;width: 40px;height: 40px;cursor: pointer;" @click="clickCaring(v)">
                          <img v-if="v.caring === '1'" src="../../../../static/font/aixin.png" style="width: 32px;height: 32px;padding-top: 4px"/>
                        </div>
                    </li>
                </ul>
            </div>
            <v-nodata v-else>
                <p class="vchat-no-have">
                    You do not have friends，to <router-link to="/main/personalMain/friendly/search">add more friends</router-link>。
                    </p>
            </v-nodata>
        </div>
        <v-dropdown :command="currFriend" :x="x" :y="y" :visible="visible" @upVisible="upVisible">
            <v-dropdown-item slot-scope="{command}" @dropdownClick="handleConversitionList(command)" slot="dropdown">
                {{addOrDel ? 'Delete from the list' : 'Add to message list'}}
            </v-dropdown-item>
        </v-dropdown>
    </div>
</template>

<script>
    import vApheader from '@/views/components/header/vApheader';
    import { mapState } from 'vuex';
    import api from '@/api';
    export default{
        data() {
            return {
                friendList: [],
                IMG_URL: process.env.IMG_URL,
                showList: ['mine'], // 分组 备用
                visible: false, // dropdown显示
                currFriend: {},
                x: '', // dropdown left
                y: '' // dropdown top
            }
        },
        components: {
            vApheader
        },
        computed: {
            ...mapState(['conversationsList', 'user']),
            addOrDel() {
                return this.conversationsList.filter(v => v.id === this.currFriend.roomid).length;
            }
        },
        methods: {
            handleCommand(command) {
                this.$router.push(command);
            },
            goFriendDetail(id,createDate) {
                this.$router.push({name: 'friendDetail', params: {id: id,friendTime:createDate}});
            },
            setShowList(v) {
                if (this.showList.indexOf(v) > -1) {
                    this.showList.splice(this.showList.indexOf(v), 1);
                } else {
                    this.showList.push(v);
                }

            },
            upVisible(f) {
                this.visible = f;
            },
            contextmenuClick(e, v) {
                e.preventDefault();
                e.stopPropagation();
                this.currFriend = v;
                this.visible = true;
                this.x = e.clientX;
                this.y = e.clientY;
            },
            handleConversitionList(v) {
                if (!this.addOrDel) {
                    this.addConversitionList(v);
                } else {
                    this.removeConversitionList(v);
                }
            },
            addConversitionList(v) { // 加入会话列表
                let params = {
                    name: v.nickname,
                    photo: v.photo,
                    id: v.roomid,
                    type: 'friend'
                };
                api.addConversitionList(params).then(r => {
                    if (r.code === 0) {
                        this.$message({
                            type: 'success',
                            message: 'Add successfully!'
                        });
                        this.$store.commit('setConversationsList', params);
                    } else {
                        this.$message({
                            type: 'success',
                            message: 'Fail to add'
                        });
                    }
                    this.visible = false;
                });
            },
            removeConversitionList(v) {
                let params = {
                    id: v.roomid
                };
                api.removeConversitionList(params).then(r => {
                    if (r.code === 0) {
                        this.$message({
                            type: 'success',
                            message: 'Delete successfully'
                        });
                        this.$store.commit('setConversationsList', Object.assign({}, params, {d: true}));
                    } else {
                        this.$message({
                            type: 'success',
                            message: 'Fail to delete'
                        });
                    }
                    this.visible = false;
                });
            },
            findMyfriends() {
                let params = {
                    userId: this.user.id
                };
                var date1 = new Date();
                var nowDate = date1.getMonth() +'-'+ date1.getDate()
                api.findMyfriends(params).then(r => {
                    if (r.code === 0) {
                      r.data.forEach( info => {
                        info.birthdayRemind = ''
                        if (info.birthday !== '') {
                          var date2 = new Date(info.birthday)
                          var frindsDate = date2.getMonth() +'-'+ date2.getDate()
                          if (nowDate === frindsDate) {
                            info.birthdayRemind = 'Birthday Remind'
                          }
                        }
                      })
                      var params = {
                        userM: this.user.id
                      }
                      api.getCaring(params).then( res => {
                        if(res.code === 0) {
                          r.data.forEach(r1 => {
                            console.log(r1.id)
                            res.data.forEach(r2 => {
                              console.log(r2.userY)
                              if(r1.id === r2.userY) {
                                r1.caring = r2.caring
                              }
                            })
                          })
                          this.friendList = r.data;
                        }
                      })
                    }
                })
            },
            clickCaring(v){
              var params = {
                userM:this.user.id,
                userY:v.id,
                caring:v.caring === '1' ? '0' : '1'
              }
              v.caring = params.caring
              api.upCaring(params).then(res => {
                if(res.code === 0) {
                }else{
                    console.log("upCaring error 500")
                }
              })
            }
        },
        mounted() {
            this.findMyfriends();
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-myFriend{
        width:100%;
        height: 100%;
        .vchat-myFriend-container{
            width:100%;
            padding-top: 10px;
            height: calc(100% - 40px);
            overflow-y: auto;
            box-sizing: border-box;
        }
        .me-li{
            width:100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 5px 15px 6px;
            box-sizing: border-box;
            margin-bottom: 5px;
            cursor: pointer;
            >a{
                width:38px;
                height: 38px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 10px;
                border: 1px solid #d5d5d5;
                box-sizing: border-box;
                img{
                    width:38px;
                }
            }
            >div{
                width:calc(100% - 52px);
                font-size: 14px;
                color: #a3a3a3;
                text-align: left;
                display: flex;
                justify-content: space-between;
                span{
                    max-width: 160px;
                }
            }
        }
        .me-li:hover{
            background-color: #f5f5f5;
        }
    }
</style>
