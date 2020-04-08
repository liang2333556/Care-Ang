<template>
    <div class="backLog">
      <div class="compler-tab"  :style="background3">
        <h3>
            <span>Schedule</span>
            <v-icon name="jia2" color="#ff6b6b" cursor="pointer" title="Manage schedule" @clickIcon="$router.push({name: 'todo'})"></v-icon>
        </h3>
        <div class="todoList">
            <ul v-if="todoList.length">
                <li v-for="(v, i) in todoList" :key="i">
                    <p class="title">{{v.title}}</p>
                    <p class="content">
                        <v-icon name="clock" color="white" :size="18"></v-icon>： {{v.content}}
                    </p>
                    <p class="info">
                        <span><i class="address">{{v.address}} </i> {{formatTime(v.start)}} to {{formatTime(v.end)}}</span>
                        <span>
                            <v-icon class="el-icon-delete" cursor="pointer" :size="14" @clickIcon="delTodo(v['_id'])"></v-icon>
                            <!--<v-icon class="el-icon-edit" cursor="pointer" :size="14"></v-icon>-->
                        </span>
                    </p>
                </li>
            </ul>
            <v-nodata :url="bg" v-else>
                <p class="vchat-no-have">
                  There is nothing...
                 </p>
            </v-nodata>
        </div>
      </div>
      <div class="compler-tab"  :style="background3" style="margin-left: 1.5%">
        <h3>
          <span>Wishing wall</span>
          <v-icon name="jia2" color="#ff6b6b" cursor="pointer" title="Leave your wish here~" @clickIcon="addWishing()"></v-icon>
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
              Nothing...
            </p>
          </v-nodata>
        </div>
      </div>
      <div class="compler-tab" :style="background3" style="margin-left: 1.5%;overflow: hidden">
        <h3>
          <span>Diary</span>
          <v-icon name="jia2" color="#ff6b6b" cursor="pointer" title="Add Diary" @clickIcon="addRecord()"></v-icon>
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
          There is nothing
            </p>
          </v-nodata>
        </div>
      </div>
      <div>
        <el-dialog class ="diary" title="Add Diary" :visible.sync="dialogRecord" width="70%"  :style="backgroundDiv">
          <img src="../../../assets/img/diaryico.png" class="diaryico" alt="">
          <el-form ref="recordRule" :model="recordForm" style="padding: 0px 15px" >
            <el-form-item label="Title" prop="title">
              <el-input v-model="recordForm.title"></el-input>
            </el-form-item>
            <el-form-item label="Content" prop="content" >
              <el-input v-model="recordForm.content" type="textarea" :autosize="{ minRows: 18}"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogRecord = false">Chancel</el-button>
            <el-button type="primary" @click="submitRecord('recordRule')">Submit</el-button>
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
        <el-dialog  title="Wish" :visible.sync="dialogWishing" width="70%"  :style="background1" >
          <img src="../../../assets/img/wishico.png" class="wishico" alt="">
          <el-input type="textarea" :autosize="{ minRows: 8}" v-model="wishForm.wish"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogWishing = false">Chancel</el-button>
            <el-button type="primary" @click="submitWish()">Submit</el-button>
          </div>
        </el-dialog>
      </div>

      <div >
        <el-dialog title="Wish" :visible.sync="dialogWishingDetail" width="50%">
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
    import bg from '../../../assets/img/zwsj1.png';

    import api from '@/api';
    import { mapState } from 'vuex';
    import utils from '@/utils/utils';
    export default{
        name: 'backLog',
        data() {
            return {
                backgroundDiv: {
                    backgroundImage: 'url(' + require('../../../assets/img/b2.jpg') + ')',
                    backgroundRepeat: "repeat",

                },
                background1: {
                    backgroundImage: 'url(' + require('../../../assets/img/b4.jpg') + ')',
                    backgroundRepeat: "repeat",

                },
                background2: {
                    backgroundImage: 'url(' + require('../../../assets/img/b5.jpg') + ')',
                    backgroundRepeat: "repeat",

                },
                background3: {
                    backgroundImage: 'url(' + require('../../../assets/img/b20.jpg') + ')',
                    backgroundRepeat: "repeat",

                },
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
                title:[{ required: true, message: 'Input the title', trigger: 'blur' }],
                content:[{ required: true, message: 'Input the content', trigger: 'blur' }],
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
              this.$confirm('Are you sure to delete？', 'Confirm')
                  .then(() => {
                      api.delTodo({'_id': id}).then(r => {
                          if (r.code === 0) {
                              this.todoList = this.todoList.filter(v => id !== v['_id']);
                              this.$message({
                                  message: 'Delete sucessfully',
                                  type: 'success'
                              });
                          } else {
                              this.$message({
                                  message: 'Fail to delete!',
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
                message: 'You have not write your wish!',
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
                    message: 'You have left your wish!',
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
                if(this.recordTitle === "Add") {
                  this.recordForm.userId = this.user.id
                  this.recordForm.createTime = utils.formatDateTime(Date.now())
                  api.addRecord(this.recordForm).then(res => {
                    if(res.code === 0) {
                      this.$message({
                        message: 'Save Diary successfully',
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
                        message: 'Save successfully!',
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
            this.recordTitle = "Edit"
            this.recordForm = obj
            this.dialogRecord = true
          },
          delRecord(obj){
            this.$confirm('Delete?', 'Tip', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Chancel',
              type: 'warning'
            }).then(() => {
              api.delRecord({_id:obj._id}).then( res => {
                debugger
                if(res.code === 0) {
                  this.$message({
                    message: 'Delete successfully!',
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
            this.recordTitle = "Add"
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
      height: 100%;
      border-left: 1px solid white;
      border-bottom: 1px solid white;
      border-right: 1px solid white;
      border-radius: 29px 29px 0 0;
      font-family:word;
      /*background-image: url("../../../assets/img/b2.jpg");*/

    }
    .backLog{
        width: 100%;
        height: calc(100% - 250px);
        overflow-y: auto;
        box-sizing: border-box;
      border-radius: 29px 29px 0 0;
      /*background-image: url("../../../assets/img/b1.jpg");*/

      font-family:word;

      h3{
            display: flex;
            justify-content: space-between;
            line-height: 36px;
            border-bottom: 1px solid #d5d5d5;
            padding: 0 10px;
            box-sizing: border-box;
            font-weight: 400;
            color: 	#4B0082;
        border-radius: 15px 15px 0 0;
        background:	#CC99CC;
        font-family:word;


      }
      .diaryico{
        width:50px;
        height:50px;
      }
      .wishico{
        width:50px;
        height:50px;
      }
        .todoList{
            li{
                text-align: left;
              margin: 8px 5px;
              font-family:word;
             background-color:#CC9999;
              opacity: 0.8;

              /*background-image: url("../../../assets/img/detail.jpg");*/
                padding: 5px 10px;
                box-sizing: border-box;
                margin-bottom: 10px;
               color:#4B0082;
            }
            .title{
                font-size: 16px;
                color: white;
                margin-bottom: 5px;
                border-left: 3px solid #28828f;
                padding-left: 5px;
              font-family:word;

            }
            .content{
                font-size: 14px;
                color: white;
                margin-bottom: 5px;
              font-family:word;

            }
            .info{
                font-size: 12px;
                color: white;
                font-family: "Times New Roman", Times, serif;
                display: flex;
                justify-content: space-between;
                align-items: center;
              font-family:word;

              .address{
                    color: red;
                    font-style: normal;
                    display: inline-block;
                    border: 1px solid #ff714f;
                    padding: 1px 5px;
                font-family:word;

              }
                i{
                    margin-right: 6px;
                  font-family:word;

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
                background-color:#FFDDAA;
            }
            li:hover span:nth-of-type(2) {
                display: block;
            }
        }
      .record-tab{
        height: 100%;      }
      .record-tab .record-li {
        border: 1px ;
        border-radius: 5px;
        margin: 8px 5px;
        height: 60px;
        font-family:word;
        background-color:#CC9999;
        opacity: 0.9;

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
