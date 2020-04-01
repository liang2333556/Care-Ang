<template>
  <div class="ca" >
    <el-dialog :title="logTitle" :visible.sync="dialogVisible"  @close="close" >
        <el-form :model="todoForm" ref="todoForm">
            <el-form-item label="Topic" label-width="100px" prop="title" :rules="[{ required: true, message: 'Topic can not be null'}]">
                <el-input v-model="todoForm.title"></el-input>
            </el-form-item>
            <el-form-item label="Content" label-width="100px" prop="content" :rules="[{ required: true, message: 'Content can not be null'}]">
                <el-input type="textarea" v-model="todoForm.content" resize="none"></el-input>
            </el-form-item>
            <el-form-item label="Location" label-width="100px">
                <el-input v-model="todoForm.address"></el-input>
            </el-form-item>
            <el-form-item label="Start time" label-width="100px">
                <el-date-picker
                        v-model="todoForm.start"
                        type="datetime"
                        placeholder="Select the date and time">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="Ending time" label-width="100px">
                <el-date-picker
                        v-model="todoForm.end"
                        type="datetime"
                        placeholder="Select the date and time">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">Chancel</el-button>
            <el-button type="primary" @click="sure">
                <v-icon class="el-icon-loading" color="#fff" :size="14" v-if="loading"></v-icon>
                Submit
            </el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
    import api from '@/api';


    export default{

        name: 'dialogTodo',
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            date: {
                default: new Date()
            },
            info: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        data() {
            return {

                logTitle: 'Create a activity record',
                todoForm: {
                    title: '',
                    start: '',
                    end: '',
                    address: '',
                    content: ''
                },
                dialogVisible: false,
                loading: false // 保存中
            }
        },

        watch: {
            visible(f) {
                this.dialogVisible = f;
            },
            date(date) {
                this.todoForm.start = date['_d'].getTime();
                this.todoForm.end = date['_d'].getTime() + 1000 * 60 * 60 * 24 - 1000;
            },
            info(info) {
                if (info.title) {
                    this.logTitle = 'Edit';
                    Object.keys(this.todoForm).forEach(k => {
                        this.todoForm[k] = info[k];
                    });
                    this.todoForm['_id'] = info['_id'];
                } else {
                    this.logTitle = 'Create';
                }
            }
        },
        methods: {
            close() {
                this.$refs['todoForm'].resetFields();
                this.$emit('close');
            },
            cancel() {
                this.$emit('close');
            },
            sure() {
                this.$refs['todoForm'].validate((valid) => {
                    if (valid && this.loading === false) {
                        this.loading = true;
                        if (this.info.title) {
                            this.upTodo(JSON.parse(JSON.stringify(this.todoForm)));
                        } else {
                            this.addTodo(JSON.parse(JSON.stringify(this.todoForm)));
                        }
                    } else {
                        return false;
                    }
                });
            },
            addTodo(o) {
                api.addTodo(o).then(r => {
                    this.loading = false;
                    if (r.code === 0) {
                        this.$emit('sure', o);
                        this.$message({
                            message: 'Create successfully',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: 'Fail to create',
                            type: 'warning'
                        });
                    }
                });
            },
            upTodo(o) {
                api.upTodo(o).then(r => {
                    this.loading = false;
                    if (r.code === 0) {
                        this.$emit('up', o);
                        this.$message({
                            message: 'Edit successfully',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: 'Fail to edit',
                            type: 'warning'
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.ca{
  font-family:word;

}
</style>
