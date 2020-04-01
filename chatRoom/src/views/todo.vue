<template>
    <div class="vchat-todo"  :style="background1">
        <vHeader :isMainHeader="false"></vHeader>

        <full-calendar  :events="fcEvents"  @dayClick="dayClick">
            <template slot="fc-event-card" slot-scope="p">
                <el-popover
                        placement="bottom"
                        :title="p.event.title"
                        width="200"
                        trigger="click">
                        <p class="todoInfo">
                            Time：{{formatTime(p.event.start)}} to {{formatTime(p.event.end)}}
                        </p>
                        <p class="todoInfo">
                            Location：{{p.event.address}}
                        </p>
                        <p class="todoInfo">
                            Content：{{p.event.content}}
                        </p>
                        <p class="todoTitle-box" slot="reference">
                            <span class="vchat-line1 todoTitle">{{p.event.title}}</span>
                            <span>
                                <v-icon class="el-icon-delete" cursor="pointer" :size="14" @clickIcon="delTodo(p.event['_id'])"></v-icon>
                                <v-icon class="el-icon-edit" cursor="pointer" :size="14" @clickIcon="upTodo(p.event)"></v-icon>
                            </span>
                        </p>
                </el-popover>
            </template>
        </full-calendar>
        <dialog-todo :visible="dialogVisible" @close="close" @sure="sure" :date="chooseDate" :info="upInfo" @up="up"></dialog-todo>
    </div>
</template>

<script>
    import api from '@/api';
    import vHeader from '@/views/components/header/vHeader';
    import dialogTodo from './dialogTodo.vue';
    import utils from '@/utils/utils';
    export default{
        data() {
            return {
                background1: {
                    backgroundImage: 'url(' + require('../assets/img/b4.jpg') + ')',
                    backgroundRepeat: "repeat",

                },
                fcEvents: [],
                dialogVisible: false,
                chooseDate: '',
                upInfo: {}
            }
        },
        components: {
            vHeader,
            dialogTodo
        },
        methods: {
            formatTime(t) {
                return utils.formatTime(new Date(t));
            },
            dayClick(date) {
                this.chooseDate = date;
                this.dialogVisible = true;
            },
            up(o) {
                this.fcEvents.forEach(v => {
                    if (v['_id'] === o['_id']) {
                        v = o;
                    }
                });
                this.dialogVisible = false;
            },
            sure(o) {
                this.fcEvents.push(o);
                this.dialogVisible = false;
            },
            getTodoList() {
                api.getTodoList().then(r => {
                    if (r.code === 0) {
                        this.fcEvents = r.data;
                    }
                });
            },
            close() {
                this.dialogVisible = false;
                this.upInfo = {};
            },
            upTodo(info) {
                this.upInfo = Object.assign(info);
                this.dialogVisible = true;
            },
            delTodo(id) {
                this.$confirm('Are you sure to delete the schedule？', 'Confirm')
                    .then(() => {
                        api.delTodo({'_id': id}).then(r => {
                            if (r.code === 0) {
                                this.fcEvents = this.fcEvents.filter(v => id !== v['_id']);
                                this.$message({
                                    message: 'Delete successfully',
                                    type: 'success'
                                });
                            } else {
                                this.$message({
                                    message: 'Fail to delete',
                                    type: 'warning'
                                });
                            }
                        })
                    })
                    .catch(action => {
                    });
            }
        },
        mounted() {
            this.getTodoList();
        }
    }
</script>

<style lang="scss" scoped>

    .todoTitle-box{
        display: flex;
        justify-content: space-between;
        padding: 0 5px;
        box-sizing: border-box;
        i:nth-of-type(1){
            margin-right: 3px;
        }
    }
    .todoTitle{
        max-width: 100px;
        margin-right: 10px;
    }
    .todoInfo{
        font-size: 12px;
        color: #323232;
        font-family: word;
        margin-bottom: 5px;
    }
</style>
