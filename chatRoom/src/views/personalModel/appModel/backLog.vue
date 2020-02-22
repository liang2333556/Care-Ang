<template>
    <div class="backLog">
      <div class="compler-tab">
        <h3>
            <span>待办日程</span>
            <v-icon name="jia2" color="#ff6b6b" cursor="pointer" title="前往日程管理" @clickIcon="$router.push({name: 'todo'})"></v-icon>
        </h3>
        <div class="todoList">
            <ul v-if="todoList.length">
                <li v-for="(v, i) in todoList" :key="i">
                    <p class="title">{{v.title}}</p>
                    <p class="content">
                        <v-icon name="clock" color="#686868" :size="18"></v-icon>： {{v.content}}
                    </p>
                    <p class="info">
                        <span><i class="address">{{v.address}} </i> {{formatTime(v.start)}} 至 {{formatTime(v.end)}}</span>
                        <span>
                            <v-icon class="el-icon-delete" cursor="pointer" :size="14" @clickIcon="delTodo(v['_id'])"></v-icon>
                            <!--<v-icon class="el-icon-edit" cursor="pointer" :size="14"></v-icon>-->
                        </span>
                    </p>
                </li>
            </ul>
            <v-nodata :url="bg" v-else>
                <p class="vchat-no-have">
                    暂无日程安排哟!
                </p>
            </v-nodata>
        </div>
      </div>
      <div class="compler-tab" style="margin-left: 1.5%">
        <h3>
          <span>许愿墙</span>
          <v-icon name="jia2" color="#ff6b6b" cursor="pointer" title="许个愿吧" @clickIcon="addWishing()"></v-icon>
        </h3>
        <div class="record-tab div-overflow" >
          <ul v-if="wishList.length" style="padding: 0">
            <li v-for="(v, i) in wishList" :key="i" class="record-li" style="height: 90px;">
              <div style="height: 30px">
                <div style="padding: 4px 10px;text-align: left;font-size: 14px;color: #8A8A8D;float: left">{{v.nickname}}</div>
                <div style="padding: 4px 10px;text-align: right;font-size: 14px;color: #8A8A8D;float: right">{{v.wishTime}}</div>
              </div>
              <div>
                <div style="text-align: left;padding: 2px 10px;float: left;cursor:pointer;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;" @click="detailWish(v)">
                  {{v.wish}}
                </div>
              </div>
            </li>
          </ul>
          <v-nodata :url="bg" v-else>
            <p class="vchat-no-have">
              暂无愿望动态哟!
            </p>
          </v-nodata>
        </div>
      </div>
      <div class="compler-tab" style="margin-left: 1.5%;overflow: hidden">
        <h3>
          <span>日记</span>
          <v-icon name="jia2" color="#ff6b6b" cursor="pointer" title="添加日志" @clickIcon="addRecord()"></v-icon>
        </h3>
        <div class="record-tab div-overflow">
          <ul v-if="recordList.length" style="padding: 0">
            <li v-for="(v, i) in recordList" :key="i" class="record-li" v-on:mouseover="addActive(i,true)" v-on:mouseout="addActive(i,false)">
              <div style="padding: 4px 10px;text-align: left;font-size: 14px;color: #8A8A8D;">{{v.updateTime}}</div>
              <div>
                <div style="text-align: left;padding: 5px 10px;float: left;cursor:pointer;" @click="detailRecord(v)">
                  {{v.title}}
                </div>
                <div style="float: right;padding: 5px 10px;cursor:pointer;" v-show="v.editFlag" >
                  <span v-on:mouseover="addActive1(i,1)" v-on:mouseout="addActive1(i,2)" v-bind:class="{ editItem1: v.editItem==1,editItem2: v.editItem!=1}" @click="editRecord(v)">编辑</span>
                  <span v-on:mouseover="addActive2(i,1)" v-on:mouseout="addActive2(i,2)" v-bind:class="{ delItem1: v.delItem==1,delItem2: v.delItem!=1}" @click="delRecord(v)">删除</span>
                </div>
              </div>
            </li>
          </ul>
          <v-nodata :url="bg" v-else>
            <p class="vchat-no-have">
              暂无日志记录哟!
            </p>
          </v-nodata>
        </div>
      </div>
      <div>
        <el-dialog title="添加日志" :visible.sync="dialogRecord" width="70%">
          <el-form ref="recordRule" :model="recordForm" style="padding: 0px 15px">
            <el-form-item label="标题" prop="title">
              <el-input v-model="recordForm.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <el-input v-model="recordForm.content" type="textarea" :autosize="{ minRows: 18}"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogRecord = false">取 消</el-button>
            <el-button type="primary" @click="submitRecord('recordRule')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="record-detail">
        <el-dialog
          :visible.sync="dialogRecordDetail"
          width="70%"
          center>
          <div style="padding: 0px 49px">
            <div style="text-align: center;font-size: 30px;">{{detailRecordForm.title}}</div>
            <div style="text-align: right;font-size: 15px;padding:20px 0px;margin-right: 6%;">{{detailRecordForm.updateTime}}</div>
            <!--<div style="height: auto;min-height:350px;font-size: 18px">{{detailRecordForm.content}}</div>-->
            <el-input v-model="detailRecordForm.content" type="textarea" :autosize="{ minRows: 18}" readonly></el-input>
          </div>
        </el-dialog>
      </div>

      <div>
        <el-dialog title="许愿" :visible.sync="dialogWishing" width="50%">
          <el-input type="textarea" :autosize="{ minRows: 8}" v-model="wishForm.wish"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogWishing = false">取 消</el-button>
            <el-button type="primary" @click="submitWish()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="愿望详情" :visible.sync="dialogWishingDetail" width="50%">
          <!--<el-input type="textarea" :autosize="{ minRows: 8}" v-model="wishForm.wish"></el-input>-->
          <div style="margin-bottom: 28px">
            <span style="float: left;font-size: 18px;">{{wishForm.nickname}}</span>
            <span style="float: left;font-size: 15px;margin-left: 6%;line-height: 25px;">{{wishForm.wishTime}}</span>
          </div>

          <div style="height: auto;font-size: 18px">
            <el-input type="textarea" :autosize="{ minRows: 5}" v-model="wishForm.wish" readonly></el-input>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
    import bg from '../../../assets/img/zwsj4.png';
    import api from '@/api';
    import { mapState } from 'vuex';
    import utils from '@/utils/utils';
    export default{
        name: 'backLog',
        data() {
            return {
              bg: bg,
              todoList: [],
              dialogWishing: false,
              dialogRecord: false,
              wishForm:{
                wish:''
              },
              wishList:[],
              dialogWishingDetail: false,
              recordTitle: '',
              dialogRecordDetail: false,
              dialogRecordEdit: false,
              recordList: [],
              recordForm:{
                userId:'',
                title:'',
                content:'',
                createTime:'',
                updateTime:''
              },
              detailRecordForm:{},
              recordRule:{
                title:[{ required: true, message: '请输入标题', trigger: 'blur' }],
                content:[{ required: true, message: '请输入内容', trigger: 'blur' }],
              },

            }
        },
        methods: {
          getTodoList() {
              api.getTodoList().then(r => {
                  if (r.code === 0) {
                      this.todoList = r.data;
                  }
              });
          },
          formatTime(t) {
              return utils.formatTime(new Date(t));
          },
          delTodo(id) {
              this.$confirm('确认删除该日程记录吗？', '确认信息')
                  .then(() => {
                      api.delTodo({'_id': id}).then(r => {
                          if (r.code === 0) {
                              this.todoList = this.todoList.filter(v => id !== v['_id']);
                              this.$message({
                                  message: '删除成功',
                                  type: 'success'
                              });
                          } else {
                              this.$message({
                                  message: '删除失败',
                                  type: 'warning'
                              });
                          }
                      })
                  })
                  .catch(action => {
                  });
          },
          addWishing(){
            this.wishForm.wish = ''
            this.dialogWishing = true;
          },
          detailWish(obj){
            this.wishForm = obj
            this.dialogWishingDetail = true
          },
          submitWish(){
            if(this.wishContent === '') {
              this.$message({
                message: '您还没有许下愿望哟',
                type: 'warning'
              });
              return
            } else {
              var params = {
                userId: this.user.id,
                wishTime: utils.formatDateTime(Date.now()),
                wish: this.wishForm.wish
              }
              api.addWishing(params).then(res => {
                if(res.code === 0){
                  this.$message({
                    message: '您已经许下愿望啦',
                    type: 'success'
                  });
                  this.getWish()
                  this.dialogWishing = false
                }
              })
            }
          },
          getWish(){
            api.getWishing({}).then(res => {
              console.log(res)
              if(res.code===0  && res.data.length > 0) {
                var userIds = []
                res.data.forEach(item => {
                  userIds.push(item)
                })
                api.getUser({_id:userIds}).then( res1 => {
                  res.data.forEach( item => {
                    res1.data.forEach( item1 => {
                      if(item.userId === item1._id) {
                        item.nickname = item1.nickname
                      }
                    })
                  })
                  this.wishList = res.data
                })
              }
            })
          },
          submitRecord(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.recordForm.updateTime = utils.formatDateTime(Date.now())
                if(this.recordTitle === "添加") {
                  this.recordForm.userId = this.user.id
                  this.recordForm.createTime = utils.formatDateTime(Date.now())
                  api.addRecord(this.recordForm).then(res => {
                    if(res.code === 0) {
                      this.$message({
                        message: '保存日志成功',
                        type: 'success'
                      });
                      this.getRecord();
                      this.dialogRecord = false
                    }
                  })
                } else {
                  api.upRecord(this.recordForm).then( res => {
                    if(res.code === 0) {
                      this.$message({
                        message: '保存日志成功',
                        type: 'success'
                      });
                      this.getRecord();
                      this.dialogRecord = false
                    }
                  })
                }
              }
            });
          },
          getRecord(){
              api.getRecord({userId:this.user.id}).then( res => {
                if(res.code === 0 ) {
                  console.log(res.data)
                  this.recordList = res.data
                }
              })
          },
          addActive(i,flag){
            var obj = this.recordList[i]
            obj.editFlag = flag
            this.$set(this.recordList,i,obj)
          },
          addActive1(i,flag){
            var obj = this.recordList[i]
            obj.editItem = flag
            this.$set(this.recordList,i,obj)
          },
          addActive2(i,flag){
            var obj = this.recordList[i]
            obj.delItem = flag
            this.$set(this.recordList,i,obj)
          },
          detailRecord(obj){
            this.detailRecordForm = obj;
            this.dialogRecordDetail = true
          },
          editRecord(obj){
            this.recordTitle = "修改"
            this.recordForm = obj
            this.dialogRecord = true
          },
          delRecord(obj){
            this.$confirm('确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              api.delRecord({_id:obj._id}).then( res => {
                debugger
                if(res.code === 0) {
                  this.$message({
                    message: '删除日志成功',
                    type: 'success'
                  });
                  this.getRecord();
                  this.dialogRecord = false
                }
              })
            })
          },
          addRecord(){
            this.recordForm = {
              userId:'',
                title:'',
                content:'',
                createTime:'',
                updateTime:''
            }
            this.recordTitle = "添加"
            this.dialogRecord = true;
          }
        },
        mounted() {
            this.getTodoList();
            this.getWish();
            this.getRecord();
        },
        computed: {
          ...mapState(['conversationsList', 'user'])
        }
    }
</script>

<style lang="scss" scoped>
    .compler-tab{
      float: left;
      vertical-align: top;
      width: 32%;
      height: 99%;
      border-left: 1px solid white;
      border-bottom: 1px solid white;
      border-right: 1px solid white;
    }
    .backLog{
        width: 100%;
        height: calc(100% - 250px);
        overflow-y: auto;
        box-sizing: border-box;
        h3{
            display: flex;
            justify-content: space-between;
            line-height: 36px;
            border-bottom: 1px solid #d5d5d5;
            padding: 0 10px;
            box-sizing: border-box;
            font-weight: 400;
            color: #84c2c5;
            background-color: #fff;
        }
        .todoList{
            li{
                text-align: left;
                background-color: #fff;
                padding: 5px 10px;
                box-sizing: border-box;
                margin-bottom: 10px;
            }
            .title{
                font-size: 16px;
                color: #161616;
                margin-bottom: 5px;
                border-left: 3px solid #28828f;
                padding-left: 5px;
            }
            .content{
                font-size: 14px;
                color: #686868;
                margin-bottom: 5px;
            }
            .info{
                font-size: 12px;
                color: #9a9a9a;
                font-family: "Times New Roman", Times, serif;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .address{
                    color: #ff714f;
                    font-style: normal;
                    display: inline-block;
                    border: 1px solid #ff714f;
                    padding: 1px 5px;
                }
                i{
                    margin-right: 6px;
                }
                span:nth-of-type(2) {
                    display: none;
                }
                i:nth-of-type(1):hover{
                    color: #ff2b3a !important;
                }
                i:nth-of-type(2):hover{
                    color: #1fbeca !important;
                }
            }
            li:hover{
                background-color: #f8f8f8;
            }
            li:hover span:nth-of-type(2) {
                display: block;
            }
        }
      .record-tab{
        height: 100%;
      }
      .record-tab .record-li {
        border: 1px ;
        border-radius: 5px;
        margin: 8px 5px;
        height: 60px;
        background-color: #A1CFF9;
      }
      .div-overflow{
        overflow-y:auto;
      }
      .editItem1{
        color: #214283;
        margin: 0 3px;
      }
      .editItem2{
        color: #8A8A8D;
        margin: 0 3px;
      }
      .delItem1{
        color: red;
        margin: 0 3px;
      }
      .delItem2{
        color: #8A8A8D;
        margin: 0 3px;
      }
      .record-detail{

      }
      .record-detail .el-dialog__wrapper .el-dialog .el-dialog__header .el-dialog__title {
        font-size: 30px !important;
        /*font-style: ;*/
      }
      .el-dialog__title{
        font-size: 30px !important;
        /*font-style: ;*/
      }
    }
</style>
